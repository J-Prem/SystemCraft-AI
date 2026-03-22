package com.systemcraft.ai.dto;

import jakarta.validation.constraints.NotBlank;

public class ProjectRequest {
    @NotBlank
    private String name;

    @NotBlank
    private String description;

    @NotBlank
    private String scale; // small, medium, large

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getScale() { return scale; }
    public void setScale(String scale) { this.scale = scale; }
}
