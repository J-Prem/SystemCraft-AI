package com.systemcraft.ai.service;

import com.systemcraft.ai.ai.AiService;
import com.systemcraft.ai.ai.PromptBuilder;
import com.systemcraft.ai.entity.ChatHistory;
import com.systemcraft.ai.entity.Project;
import com.systemcraft.ai.repository.ChatHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatService {

    @Autowired
    ChatHistoryRepository chatHistoryRepository;

    @Autowired
    AiService aiService;

    @Autowired
    PromptBuilder promptBuilder;

    public ChatHistory processChatMessage(Project project, String message) {
        // Get history
        List<ChatHistory> history = chatHistoryRepository.findByProjectOrderByTimestampAsc(project);
        String historyStr = history.stream()
                .map(h -> "User: " + h.getMessage() + "\nAI: " + h.getResponse())
                .collect(Collectors.joining("\n"));

        // Call AI
        String prompt = promptBuilder.buildChatPrompt(project, historyStr, message);
        String response = aiService.callAiSync(prompt);

        // Save history
        ChatHistory chatHistory = ChatHistory.builder()
                .message(message)
                .response(response)
                .project(project)
                .build();

        return chatHistoryRepository.save(chatHistory);
    }

    public List<ChatHistory> getChatHistory(Project project) {
        return chatHistoryRepository.findByProjectOrderByTimestampAsc(project);
    }
}
