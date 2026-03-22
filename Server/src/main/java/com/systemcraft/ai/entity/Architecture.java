package com.systemcraft.ai.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "architectures")
public class Architecture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // Monolith, Microservices

    @Column(columnDefinition = "TEXT")
    private String techStack;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String tradeOffs;

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;


    public Architecture() {}

    public Architecture(Long id, String type, String techStack, String description, String tradeOffs, Project project) {
        this.id = id;
        this.type = type;
        this.techStack = techStack;
        this.description = description;
        this.tradeOffs = tradeOffs;
        this.project = project;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getTechStack() { return techStack; }
    public void setTechStack(String techStack) { this.techStack = techStack; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getTradeOffs() { return tradeOffs; }
    public void setTradeOffs(String tradeOffs) { this.tradeOffs = tradeOffs; }
    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }

    public static ArchitectureBuilder builder() {
        return new ArchitectureBuilder();
    }

    public static class ArchitectureBuilder {
        private Long id;
        private String type;
        private String techStack;
        private String description;
        private String tradeOffs;
        private Project project;

        public ArchitectureBuilder id(Long id) { this.id = id; return this; }
        public ArchitectureBuilder type(String type) { this.type = type; return this; }
        public ArchitectureBuilder techStack(String techStack) { this.techStack = techStack; return this; }
        public ArchitectureBuilder description(String description) { this.description = description; return this; }
        public ArchitectureBuilder tradeOffs(String tradeOffs) { this.tradeOffs = tradeOffs; return this; }
        public ArchitectureBuilder project(Project project) { this.project = project; return this; }

        public Architecture build() {
            return new Architecture(id, type, techStack, description, tradeOffs, project);
        }
    }
}
