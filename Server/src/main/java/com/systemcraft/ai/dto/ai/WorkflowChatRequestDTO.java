package com.systemcraft.ai.dto.ai;

import java.util.List;

public class WorkflowChatRequestDTO {
    private List<ChatMessageDTO> history;
    private String message;
    private String context;

    public WorkflowChatRequestDTO() {}

    public WorkflowChatRequestDTO(List<ChatMessageDTO> history, String message, String context) {
        this.history = history;
        this.message = message;
        this.context = context;
    }

    public List<ChatMessageDTO> getHistory() {
        return history;
    }

    public void setHistory(List<ChatMessageDTO> history) {
        this.history = history;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public static class ChatMessageDTO {
        private String role; // "user" or "model"
        private String content;

        public ChatMessageDTO() {}

        public ChatMessageDTO(String role, String content) {
            this.role = role;
            this.content = content;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

        public String getContent() {
            return content;
        }

        public void setContent(String content) {
            this.content = content;
        }
    }
}
