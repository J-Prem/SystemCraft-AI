package com.systemcraft.ai.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "api_definitions")
public class ApiDefinition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String endpoint;
    private String method; // GET, POST, etc.

    @Column(columnDefinition = "TEXT")
    private String requestBody;

    @Column(columnDefinition = "TEXT")
    private String responseBody;

    @Column(columnDefinition = "TEXT")
    private String description;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;


    public ApiDefinition() {}

    public ApiDefinition(Long id, String endpoint, String method, String requestBody, String responseBody, String description, Project project) {
        this.id = id;
        this.endpoint = endpoint;
        this.method = method;
        this.requestBody = requestBody;
        this.responseBody = responseBody;
        this.description = description;
        this.project = project;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getEndpoint() { return endpoint; }
    public void setEndpoint(String endpoint) { this.endpoint = endpoint; }
    public String getMethod() { return method; }
    public void setMethod(String method) { this.method = method; }
    public String getRequestBody() { return requestBody; }
    public void setRequestBody(String requestBody) { this.requestBody = requestBody; }
    public String getResponseBody() { return responseBody; }
    public void setResponseBody(String responseBody) { this.responseBody = responseBody; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }

    public static ApiDefinitionBuilder builder() {
        return new ApiDefinitionBuilder();
    }

    public static class ApiDefinitionBuilder {
        private Long id;
        private String endpoint;
        private String method;
        private String requestBody;
        private String responseBody;
        private String description;
        private Project project;

        public ApiDefinitionBuilder id(Long id) { this.id = id; return this; }
        public ApiDefinitionBuilder endpoint(String endpoint) { this.endpoint = endpoint; return this; }
        public ApiDefinitionBuilder method(String method) { this.method = method; return this; }
        public ApiDefinitionBuilder requestBody(String requestBody) { this.requestBody = requestBody; return this; }
        public ApiDefinitionBuilder responseBody(String responseBody) { this.responseBody = responseBody; return this; }
        public ApiDefinitionBuilder description(String description) { this.description = description; return this; }
        public ApiDefinitionBuilder project(Project project) { this.project = project; return this; }

        public ApiDefinition build() {
            return new ApiDefinition(id, endpoint, method, requestBody, responseBody, description, project);
        }
    }
}
