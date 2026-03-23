package com.systemcraft.ai.dto.ai;

import java.util.Map;

public class EvaluationDTO {
    private String selectedPipelineId;
    private String reasoning;
    private String reasoningSummary;
    private Map<String, ScoreDTO> scores; // pipelineId -> score
    
    public EvaluationDTO() {}

    public EvaluationDTO(String selectedPipelineId, String reasoning, String reasoningSummary, Map<String, ScoreDTO> scores) {
        this.selectedPipelineId = selectedPipelineId;
        this.reasoning = reasoning;
        this.reasoningSummary = reasoningSummary;
        this.scores = scores;
    }

    public String getSelectedPipelineId() { return selectedPipelineId; }
    public void setSelectedPipelineId(String selectedPipelineId) { this.selectedPipelineId = selectedPipelineId; }
    public String getReasoning() { return reasoning; }
    public void setReasoning(String reasoning) { this.reasoning = reasoning; }
    public String getReasoningSummary() { return reasoningSummary; }
    public void setReasoningSummary(String reasoningSummary) { this.reasoningSummary = reasoningSummary; }
    public Map<String, ScoreDTO> getScores() { return scores; }
    public void setScores(Map<String, ScoreDTO> scores) { this.scores = scores; }

    public static class ScoreDTO {
        private double speed;
        private double reliability;
        private double cognitiveLoad;
        private double extensibility;

        public ScoreDTO() {}

        public ScoreDTO(double speed, double reliability, double cognitiveLoad, double extensibility) {
            this.speed = speed;
            this.reliability = reliability;
            this.cognitiveLoad = cognitiveLoad;
            this.extensibility = extensibility;
        }

        public double getSpeed() { return speed; }
        public void setSpeed(double speed) { this.speed = speed; }
        public double getReliability() { return reliability; }
        public void setReliability(double reliability) { this.reliability = reliability; }
        public double getCognitiveLoad() { return cognitiveLoad; }
        public void setCognitiveLoad(double cognitiveLoad) { this.cognitiveLoad = cognitiveLoad; }
        public double getExtensibility() { return extensibility; }
        public void setExtensibility(double extensibility) { this.extensibility = extensibility; }
    }
}
