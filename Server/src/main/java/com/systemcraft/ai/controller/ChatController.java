package com.systemcraft.ai.controller;

import com.systemcraft.ai.dto.MessageRequest;
import com.systemcraft.ai.entity.ChatHistory;
import com.systemcraft.ai.entity.Project;
import com.systemcraft.ai.service.ChatService;
import com.systemcraft.ai.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    ChatService chatService;

    @Autowired
    ProjectService projectService;

    @PostMapping("/{projectId}")
    public ResponseEntity<ChatHistory> sendMessage(@PathVariable Long projectId,
                                                  @Valid @RequestBody MessageRequest messageRequest) {
        Project project = projectService.getProjectById(projectId);
        return ResponseEntity.ok(chatService.processChatMessage(project, messageRequest.getMessage()));
    }

    @GetMapping("/{projectId}/history")
    public ResponseEntity<List<ChatHistory>> getChatHistory(@PathVariable Long projectId) {
        Project project = projectService.getProjectById(projectId);
        return ResponseEntity.ok(chatService.getChatHistory(project));
    }
}
