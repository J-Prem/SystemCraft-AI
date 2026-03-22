package com.systemcraft.ai.controller;

import com.systemcraft.ai.ai.GeminiAgentService;
import com.systemcraft.ai.dto.ai.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/ai/workflow")
public class AiWorkflowController {

    @Autowired
    private GeminiAgentService geminiAgentService;

    @PostMapping("/pipelines/generate")
    public ResponseEntity<List<PipelineDTO>> generatePipelines(@RequestBody ProjectIntakeDTO intake) {
        return ResponseEntity.ok(geminiAgentService.generatePipelines(intake));
    }

    @PostMapping("/pipelines/evaluate")
    public ResponseEntity<EvaluationDTO> evaluatePipelines(@RequestBody EvaluationRequestDTO request) {
        return ResponseEntity.ok(geminiAgentService.evaluatePipelines(request.getPipelines(), request.getIntake()));
    }

    @PostMapping("/blueprints/generate")
    public ResponseEntity<BlueprintDTO> generateBlueprint(@RequestBody BlueprintRequestDTO request) {
        return ResponseEntity.ok(geminiAgentService.generateBlueprint(request.getPipeline(), request.getIntake()));
    }

    @PostMapping("/chat")
    public ResponseEntity<String> sendChatMessage(@RequestBody WorkflowChatRequestDTO request) {
        return ResponseEntity.ok(geminiAgentService.sendChatMessage(request.getHistory(), request.getMessage(), request.getContext()));
    }
}
