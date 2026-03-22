package com.systemcraft.ai.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String scale; // small, medium, large
    
    @Column(columnDefinition = "TEXT")
    private String folderStructure;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Users user;

    @OneToOne(mappedBy = "project", cascade = CascadeType.ALL)
    private Architecture architecture;

    @OneToOne(mappedBy = "project", cascade = CascadeType.ALL)
    private DatabaseSchema databaseSchema;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<ApiDefinition> apiDefinitions;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    private List<ChatHistory> chatHistories;

    public Project() {}

    public Project(Long id, String name, String description, String scale, LocalDateTime createdAt, Users user) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.scale = scale;
        this.createdAt = createdAt;
        this.user = user;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getScale() { return scale; }
    public void setScale(String scale) { this.scale = scale; }
    public String getFolderStructure() { return folderStructure; }
    public void setFolderStructure(String folderStructure) { this.folderStructure = folderStructure; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public Users getUser() { return user; }
    public void setUser(Users user) { this.user = user; }
    public Architecture getArchitecture() { return architecture; }
    public void setArchitecture(Architecture architecture) { this.architecture = architecture; }
    public DatabaseSchema getDatabaseSchema() { return databaseSchema; }
    public void setDatabaseSchema(DatabaseSchema databaseSchema) { this.databaseSchema = databaseSchema; }
    public List<ApiDefinition> getApiDefinitions() { return apiDefinitions; }
    public void setApiDefinitions(List<ApiDefinition> apiDefinitions) { this.apiDefinitions = apiDefinitions; }
    public List<ChatHistory> getChatHistories() { return chatHistories; }
    public void setChatHistories(List<ChatHistory> chatHistories) { this.chatHistories = chatHistories; }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public static ProjectBuilder builder() {
        return new ProjectBuilder();
    }

    public static class ProjectBuilder {
        private Long id;
        private String name;
        private String description;
        private String scale;
        private String folderStructure;
        private LocalDateTime createdAt;
        private Users user;

        public ProjectBuilder id(Long id) { this.id = id; return this; }
        public ProjectBuilder name(String name) { this.name = name; return this; }
        public ProjectBuilder description(String description) { this.description = description; return this; }
        public ProjectBuilder scale(String scale) { this.scale = scale; return this; }
        public ProjectBuilder folderStructure(String folderStructure) { this.folderStructure = folderStructure; return this; }
        public ProjectBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public ProjectBuilder user(Users user) { this.user = user; return this; }

        public Project build() {
            Project p = new Project(id, name, description, scale, createdAt, user);
            p.setFolderStructure(folderStructure);
            return p;
        }
    }
}
