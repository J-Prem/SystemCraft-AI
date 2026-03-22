package com.systemcraft.ai.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EvaluationDTO {
    private String selectedPipelineId;
    private String reasoning;
    private String reasoningSummary;
    private Map<String, ScoreDTO> scores; // pipelineId -> score
    
    // Internal use for parsing Gemini response
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GeminiEvaluation {
        private String pipelineId;
        private double speed;
        private double reliability;
        private double cognitiveLoad;
        private double extensibility;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ScoreDTO {
        private double speed;
        private double reliability;
        private double cognitiveLoad;
        private double extensibility;
    }
}
