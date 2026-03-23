package com.systemcraft.ai.ai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;
import java.time.Duration;
import java.util.Map;
import java.util.List;

@Service
public class AiService {

    private final WebClient webClient;

    @Value("${google.ai.api.key}")
    private String apiKey;

    @Value("${google.ai.api.url}")
    private String apiUrl;

    public AiService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public Mono<String> callAiAsync(String prompt) {
        // Constructing a payload for Google Gemini API
        Map<String, Object> payload = Map.of(
            "contents", List.of(
                Map.of("parts", List.of(Map.of("text", prompt)))
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
                        if (candidates == null || candidates.isEmpty()) {
                            System.err.println("AI API Warning: No candidates in response! Full body: " + response);
                            return "Error: No response from AI.";
                        }
                        Map<String, Object> firstCandidate = candidates.get(0);
                        @SuppressWarnings("unchecked")
                        Map<String, Object> content = (Map<String, Object>) firstCandidate.get("content");
                        @SuppressWarnings("unchecked")
                        List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                        Map<String, Object> firstPart = parts.get(0);
                        return (String) firstPart.get("text");
                    } catch (Exception e) {
                        System.err.println("AI Response Extraction Error: " + e.getMessage() + ". Full body: " + response);
                        throw new RuntimeException("Failed to extract AI response: " + e.getMessage(), e);
                    }
                });
    }

    public String callAiSync(String prompt) {
        if ("AIzaSyDPX5QNm0VRS5f6KoH5K0w6IMuxvT5LEWM".equals(apiKey)) {
            System.err.println("Using mock AI response because default API key is present.");
            if (prompt.contains("Analyze the project and provide ONLY a strict JSON response")) {
                return "{\"architecture\": {\"type\": \"Monolith\", \"techStack\": [\"React\", \"Spring Boot\"], \"description\": \"Mock Architecture\"}, \"databaseSchema\": {}, \"apiEndpoints\": [], \"folderStructure\": \"src/\"}";
            } else {
                return "I am running in mock mode because the default API key is being used. Please configure `google.ai.api.key` in application.properties to enable real AI project analysis and chat responses.";
            }
        }
        try {
            return callAiAsync(prompt).block();
        } catch (WebClientResponseException e) {
            System.err.println("AI API Error (HTTP " + e.getStatusCode() + "): " + e.getResponseBodyAsString());
            throw e;
        } catch (Exception e) {
            System.err.println("AI API Unexpected Error: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("AI Service failed: " + e.getMessage(), e);
        }
    }
}
