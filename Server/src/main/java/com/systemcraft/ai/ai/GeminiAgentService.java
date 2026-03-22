package com.systemcraft.ai.ai;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.systemcraft.ai.dto.ai.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class GeminiAgentService {

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    @Value("${google.ai.api.key}")
    private String apiKey;

    @Value("${google.ai.api.url}")
    private String apiUrl;

    public GeminiAgentService(WebClient.Builder webClientBuilder, ObjectMapper objectMapper) {
        this.webClient = webClientBuilder.build();
        this.objectMapper = objectMapper;
    }

    public List<PipelineDTO> generatePipelines(ProjectIntakeDTO intake) {
        String prompt = String.format("%s\n\nProject Details:\nProblem: %s\nUser: %s\nOutput: %s\nConstraints: %s",
                GeminiConstants.ENUMERATION_PROMPT, intake.getProblem(), intake.getUser(), intake.getOutput(), intake.getConstraints());

        Map<String, Object> schema = Map.of(
            "type", "ARRAY",
            "items", Map.of(
                "type", "OBJECT",
                "properties", Map.of(
                    "id", Map.of("type", "STRING"),
                    "name", Map.of("type", "STRING"),
                    "architecture", Map.of("type", "STRING"),
                    "summary", Map.of("type", "STRING"),
                    "tools", Map.of("type", "ARRAY", "items", Map.of("type", "STRING")),
                    "complexity", Map.of("type", "STRING"),
                    "risks", Map.of("type", "ARRAY", "items", Map.of("type", "STRING")),
                    "scalability", Map.of("type", "STRING"),
                    "pros", Map.of("type", "ARRAY", "items", Map.of("type", "STRING")),
                    "cons", Map.of("type", "ARRAY", "items", Map.of("type", "STRING"))
                ),
                "required", List.of("id", "name", "architecture", "summary", "tools", "complexity", "risks", "scalability", "pros", "cons")
            )
        );

        String jsonResponse = callGemini(prompt, schema);
        try {
            return objectMapper.readValue(jsonResponse, new TypeReference<List<PipelineDTO>>() {});
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse Pipelines: " + e.getMessage(), e);
        }
    }

    public EvaluationDTO evaluatePipelines(List<PipelineDTO> pipelines, ProjectIntakeDTO intake) {
        String prompt = String.format("%s\n\nProject Context:\n%s\n\nPipelines to Evaluate:\n%s",
                GeminiConstants.EVALUATION_PROMPT, intake.toString(), pipelines.toString());

        Map<String, Object> schema = Map.of(
            "type", "OBJECT",
            "properties", Map.of(
                "selectedPipelineId", Map.of("type", "STRING"),
                "reasoning", Map.of("type", "STRING"),
                "reasoningSummary", Map.of("type", "STRING"),
                "evaluations", Map.of(
                    "type", "ARRAY",
                    "items", Map.of(
                        "type", "OBJECT",
                        "properties", Map.of(
                            "pipelineId", Map.of("type", "STRING"),
                            "speed", Map.of("type", "NUMBER"),
                            "reliability", Map.of("type", "NUMBER"),
                            "cognitiveLoad", Map.of("type", "NUMBER"),
                            "extensibility", Map.of("type", "NUMBER")
                        ),
                        "required", List.of("pipelineId", "speed", "reliability", "cognitiveLoad", "extensibility")
                    )
                )
            ),
            "required", List.of("selectedPipelineId", "reasoning", "reasoningSummary", "evaluations")
        );

        String jsonResponse = callGemini(prompt, schema);
        try {
            Map<String, Object> rawData = objectMapper.readValue(jsonResponse, new TypeReference<Map<String, Object>>() {});
            
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> evaluations = (List<Map<String, Object>>) rawData.get("evaluations");
            Map<String, EvaluationDTO.ScoreDTO> scores = new HashMap<>();
            
            if (evaluations != null) {
                for (Map<String, Object> e : evaluations) {
                    scores.put((String) e.get("pipelineId"), EvaluationDTO.ScoreDTO.builder()
                            .speed(((Number) e.get("speed")).doubleValue())
                            .reliability(((Number) e.get("reliability")).doubleValue())
                            .cognitiveLoad(((Number) e.get("cognitiveLoad")).doubleValue())
                            .extensibility(((Number) e.get("extensibility")).doubleValue())
                            .build());
                }
            }

            return EvaluationDTO.builder()
                    .selectedPipelineId((String) rawData.get("selectedPipelineId"))
                    .reasoning((String) rawData.get("reasoning"))
                    .reasoningSummary((String) rawData.get("reasoningSummary"))
                    .scores(scores)
                    .build();
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse Evaluation: " + e.getMessage(), e);
        }
    }

    public BlueprintDTO generateBlueprint(PipelineDTO pipeline, ProjectIntakeDTO intake) {
        String prompt = String.format("%s\n\nSelected Pipeline:\n%s\n\nProject Context:\n%s",
                GeminiConstants.BLUEPRINT_PROMPT, pipeline.toString(), intake.toString());

        Map<String, Object> schema = Map.of(
            "type", "OBJECT",
            "properties", Map.of(
                "markdown", Map.of("type", "STRING"),
                "summary", Map.of("type", "STRING"),
                "flowchart", Map.of("type", "STRING")
            ),
            "required", List.of("markdown", "summary", "flowchart")
        );

        String jsonResponse = callGemini(prompt, schema);
        try {
            return objectMapper.readValue(jsonResponse, BlueprintDTO.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse Blueprint: " + e.getMessage(), e);
        }
    }

    public String sendChatMessage(List<WorkflowChatRequestDTO.ChatMessageDTO> history, String message, String context) {
        String systemInstruction = String.format("%s\n\nCurrent Project Context:\n%s", GeminiConstants.SYSTEM_PROMPT_BASE, context);
        
        List<Map<String, Object>> contents = history.stream()
                .map(m -> Map.of(
                        "role", m.getRole().equals("user") ? "user" : "model",
                        "parts", List.of(Map.of("text", m.getContent()))
                ))
                .collect(Collectors.toList());
        
        // Add the new message
        Map<String, Object> userMessage = new HashMap<>(); // Use HashMap to allow modification if needed
        userMessage.put("role", "user");
        userMessage.put("parts", List.of(Map.of("text", message)));
        contents.add(userMessage);

        Map<String, Object> payload = Map.of(
            "contents", contents,
            "systemInstruction", Map.of(
                "parts", List.of(Map.of("text", systemInstruction))
            )
        );

        return webClient.post()
                .uri(apiUrl + "?key=" + apiKey)
                .bodyValue(payload)
                .retrieve()
                .bodyToMono(Map.class)
                .timeout(Duration.ofSeconds(60))
                .map(response -> {
                    try {
                        @SuppressWarnings("unchecked")
                        List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
                        @SuppressWarnings("unchecked")
                        Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
                        @SuppressWarnings("unchecked")
                        List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                        return (String) parts.get(0).get("text");
                    } catch (Exception e) {
                        throw new RuntimeException("Failed to extract Chat AI response", e);
                    }
                })
                .block();
    }

    private String callGemini(String prompt, Map<String, Object> responseSchema) {
        Map<String, Object> generationConfig = new HashMap<>();
        generationConfig.put("responseMimeType", "application/json");
        if (responseSchema != null) {
            generationConfig.put("responseSchema", responseSchema);
        }

        Map<String, Object> payload = Map.of(
            "contents", List.of(
                Map.of("parts", List.of(Map.of("text", prompt)))
            ),
            "systemInstruction", Map.of(
                "parts", List.of(Map.of("text", GeminiConstants.SYSTEM_PROMPT_BASE))
            ),
            "generationConfig", generationConfig
        );

        return webClient.post()
                .uri(apiUrl + "?key=" + apiKey)
                .bodyValue(payload)
                .retrieve()
                .bodyToMono(Map.class)
                .timeout(Duration.ofSeconds(90))
                .map(response -> {
                    try {
                        @SuppressWarnings("unchecked")
                        List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
                        if (candidates == null || candidates.isEmpty()) {
                            throw new RuntimeException("No candidates in AI response");
                        }
                        Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
                        List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                        return (String) parts.get(0).get("text");
                    } catch (Exception e) {
                        throw new RuntimeException("Failed to extract AI response text", e);
                    }
                })
                .block();
    }
}
