package com.systemcraft.ai.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class BlueprintRequestDTO {
    private PipelineDTO pipeline;
    private ProjectIntakeDTO intake;

    public BlueprintRequestDTO() {}

    public BlueprintRequestDTO(PipelineDTO pipeline, ProjectIntakeDTO intake) {
        this.pipeline = pipeline;
        this.intake = intake;
    }

    public PipelineDTO getPipeline() {
        return pipeline;
    }

    public void setPipeline(PipelineDTO pipeline) {
        this.pipeline = pipeline;
    }

    public ProjectIntakeDTO getIntake() {
        return intake;
    }

    public void setIntake(ProjectIntakeDTO intake) {
        this.intake = intake;
    }
}
