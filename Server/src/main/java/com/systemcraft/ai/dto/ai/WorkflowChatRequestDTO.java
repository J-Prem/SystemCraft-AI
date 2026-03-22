package com.systemcraft.ai.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorkflowChatRequestDTO {
    private List<ChatMessageDTO> history;
    private String message;
    private String context;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ChatMessageDTO {
        private String role; // "user" or "model"
        private String content;
    }
}
