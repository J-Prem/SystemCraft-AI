package com.systemcraft.ai.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "chat_history")
public class ChatHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String message;

    @Column(columnDefinition = "TEXT")
    private String response;

    private LocalDateTime timestamp;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "project_id", nullable = false)
    private Project project;


    public ChatHistory() {}

    public ChatHistory(Long id, String message, String response, LocalDateTime timestamp, Project project) {
        this.id = id;
        this.message = message;
        this.response = response;
        this.timestamp = timestamp;
        this.project = project;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getResponse() { return response; }
    public void setResponse(String response) { this.response = response; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }

    public static ChatHistoryBuilder builder() {
        return new ChatHistoryBuilder();
    }

    public static class ChatHistoryBuilder {
        private Long id;
        private String message;
        private String response;
        private LocalDateTime timestamp;
        private Project project;

        public ChatHistoryBuilder id(Long id) { this.id = id; return this; }
        public ChatHistoryBuilder message(String message) { this.message = message; return this; }
        public ChatHistoryBuilder response(String response) { this.response = response; return this; }
        public ChatHistoryBuilder timestamp(LocalDateTime timestamp) { this.timestamp = timestamp; return this; }
        public ChatHistoryBuilder project(Project project) { this.project = project; return this; }

        public ChatHistory build() {
            return new ChatHistory(id, message, response, timestamp, project);
        }
    }

    @PrePersist
    protected void onCreate() {
        timestamp = LocalDateTime.now();
    }
}
