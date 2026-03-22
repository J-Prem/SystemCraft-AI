package com.systemcraft.ai.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "database_schemas")
public class DatabaseSchema {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String schemaJson; // Structured JSON of tables/relations

    @Column(columnDefinition = "TEXT")
    private String sqlScript; // Generated SQL

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;


    public DatabaseSchema() {}

    public DatabaseSchema(Long id, String schemaJson, String sqlScript, Project project) {
        this.id = id;
        this.schemaJson = schemaJson;
        this.sqlScript = sqlScript;
        this.project = project;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSchemaJson() { return schemaJson; }
    public void setSchemaJson(String schemaJson) { this.schemaJson = schemaJson; }
    public String getSqlScript() { return sqlScript; }
    public void setSqlScript(String sqlScript) { this.sqlScript = sqlScript; }
    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }

    public static DatabaseSchemaBuilder builder() {
        return new DatabaseSchemaBuilder();
    }

    public static class DatabaseSchemaBuilder {
        private Long id;
        private String schemaJson;
        private String sqlScript;
        private Project project;

        public DatabaseSchemaBuilder id(Long id) { this.id = id; return this; }
        public DatabaseSchemaBuilder schemaJson(String schemaJson) { this.schemaJson = schemaJson; return this; }
        public DatabaseSchemaBuilder sqlScript(String sqlScript) { this.sqlScript = sqlScript; return this; }
        public DatabaseSchemaBuilder project(Project project) { this.project = project; return this; }

        public DatabaseSchema build() {
            return new DatabaseSchema(id, schemaJson, sqlScript, project);
        }
    }
}
