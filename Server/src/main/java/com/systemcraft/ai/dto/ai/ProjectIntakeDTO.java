package com.systemcraft.ai.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class ProjectIntakeDTO {
    private String problem;
    private String user;
    private String output;
    private String constraints;

    public ProjectIntakeDTO() {}

    public ProjectIntakeDTO(String problem, String user, String output, String constraints) {
        this.problem = problem;
        this.user = user;
        this.output = output;
        this.constraints = constraints;
    }

    public String getProblem() {
        return problem;
    }

    public void setProblem(String problem) {
        this.problem = problem;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }

    public String getConstraints() {
        return constraints;
    }

    public void setConstraints(String constraints) {
        this.constraints = constraints;
    }
}
