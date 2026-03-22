package com.systemcraft.ai.ai;

import com.systemcraft.ai.entity.Project;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class PromptBuilder {

    public String buildProjectAnalysisPrompt(String name, String description, String scale) {
        return String.format(
            "Analyze the project and provide ONLY a strict JSON response. No markdown, no conversational text, no backticks.\n" +
            "Project Name: %s\n" +
            "Description: %s\n" +
            "Scale: %s\n\n" +
            "Structure:\n" +
            "{\n" +
            "  \"features\": [\"feature1\", \"feature2\"],\n" +
            "  \"architecture\": {\n" +
            "    \"type\": \"Monolith or Microservices\",\n" +
            "    \"techStack\": \"Detailed tech stack description\",\n" +
            "    \"description\": \"Overall architectural design description\"\n" +
            "  },\n" +
            "  \"databaseSchema\": { \"tables\": [...] },\n" +
            "  \"apiEndpoints\": [\n" +
            "    { \"endpoint\": \"/api/v1/...\", \"method\": \"GET/POST\", \"description\": \"...\" }\n" +
            "  ],\n" +
            "  \"folderStructure\": \"A detailed ASCII directory tree of the project using ├── and └── symbols. Include all essential folders and key files (e.g., config, controllers, entities, services, tests, README, etc.).\"\n" +
            "}",
            name, description, scale
        );
    }

    public String buildChatPrompt(Project project, String history, String userMessage) {
        String apiInfo = project.getApiDefinitions() != null ? 
            project.getApiDefinitions().stream()
                .map(api -> String.format("- %s %s: %s", api.getMethod(), api.getEndpoint(), api.getDescription()))
                .collect(Collectors.joining("\n")) : "None defined";

        String schemaInfo = project.getDatabaseSchema() != null ? 
            project.getDatabaseSchema().getSchemaJson() : "None defined";

        return String.format(
            "You are SystemCraft AI, a senior software architect. You are assisting with the project: '%s'.\n\n" +
            "PROJECT CONTEXT:\n" +
            "Description: %s\n" +
            "Architecture: %s\n" +
            "Tech Stack: %s\n\n" +
            "BLUEPRINTS:\n" +
            "Database Schema:\n%s\n\n" +
            "API Endpoints:\n%s\n\n" +
            "STRICT GUIDELINES:\n" +
            "1. USE THE BLUEPRINTS: Your answers MUST be specific to the tables, columns, and endpoints defined above.\n" +
            "2. NO PLACEHOLDERS: Absolutely forbidden to use generic terms like '[specific domain data]' or template overviews.\n" +
            "3. BE EXACT: If asked for project details, use the name, description, and technologies mentioned in the context.\n" +
            "4. FORMATTING: Use Markdown (bolding, code blocks, lists). Get straight to the technical content.\n" +
            "5. NO CONVERSATIONAL FILLER: Do not say 'Sure' or 'I understand'.\n\n" +
            "HISTORY:\n%s\n\n" +
            "USER: %s\n" +
            "ANSWER:",
            project.getName(),
            project.getDescription(),
            project.getArchitecture() != null ? project.getArchitecture().getType() : "Standard",
            project.getArchitecture() != null ? project.getArchitecture().getTechStack() : "Not defined yet",
            schemaInfo,
            apiInfo,
            history,
            userMessage
        );
    }
}

