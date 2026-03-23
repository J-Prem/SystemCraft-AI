package com.systemcraft.ai.dto.ai;

import java.util.List;

public class EvaluationRequestDTO {
    private List<PipelineDTO> pipelines;
    private ProjectIntakeDTO intake;

    public EvaluationRequestDTO() {}

    public EvaluationRequestDTO(List<PipelineDTO> pipelines, ProjectIntakeDTO intake) {
        this.pipelines = pipelines;
        this.intake = intake;
    }

    public List<PipelineDTO> getPipelines() {
        return pipelines;
    }

    public void setPipelines(List<PipelineDTO> pipelines) {
        this.pipelines = pipelines;
    }

    public ProjectIntakeDTO getIntake() {
        return intake;
    }

    public void setIntake(ProjectIntakeDTO intake) {
        this.intake = intake;
    }
}
