package com.systemcraft.ai.service;

import com.systemcraft.ai.ai.AiService;
import com.systemcraft.ai.ai.PromptBuilder;
import com.systemcraft.ai.ai.ResponseParser;
import com.systemcraft.ai.entity.*;
import com.systemcraft.ai.repository.*;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;


import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectService {

    @Autowired
    ProjectRepository projectRepository;

    @Autowired
    ArchitectureRepository architectureRepository;

    @Autowired
    DatabaseSchemaRepository databaseSchemaRepository;

    @Autowired
    ApiDefinitionRepository apiDefinitionRepository;

    @Autowired
    AiService aiService;

    @Autowired
    PromptBuilder promptBuilder;

    @Autowired
    ResponseParser responseParser;

    @Transactional
    public Project createProject(String name, String description, String scale, Users user) {
        Project project = Project.builder()
                .name(name)
                .description(description)
                .scale(scale)
                .user(user)
                .build();

        project = projectRepository.save(project);

        // Call AI to generate initial analysis
        String prompt = promptBuilder.buildProjectAnalysisPrompt(name, description, scale);
        String aiResponse = aiService.callAiSync(prompt);
        JsonNode analysis = responseParser.parseJsonResponse(aiResponse);

        // Save Architecture
        JsonNode archNode = analysis.path("architecture");
        Architecture architecture = Architecture.builder()
                .type(archNode.path("type").asText("Monolith"))
                .techStack(archNode.path("techStack").toString())
                .description(archNode.path("description").asText("Generated architecture plan"))
                .project(project)
                .build();
        architectureRepository.save(architecture);

        // Save DB Schema
        JsonNode dbNode = analysis.path("databaseSchema");
        DatabaseSchema schema = DatabaseSchema.builder()
                .schemaJson(dbNode.toString())
                .project(project)
                .build();
        databaseSchemaRepository.save(schema);

        // Save APIs
        JsonNode apisNode = analysis.path("apiEndpoints");
        if (apisNode.isArray()) {
            List<ApiDefinition> apis = new ArrayList<>();
            for (JsonNode apiNode : apisNode) {
                apis.add(ApiDefinition.builder()
                        .endpoint(apiNode.path("endpoint").asText("/"))
                        .method(apiNode.path("method").asText("GET"))
                        .description(apiNode.path("description").asText("API Endpoint"))
                        .project(project)
                        .build());
            }
            apiDefinitionRepository.saveAll(apis);
        }

        // Save Folder Structure
        project.setFolderStructure(analysis.path("folderStructure").asText("src/\n  main/\n  test/"));
        projectRepository.save(project);

        return project;
    }

    public List<Project> getProjectsByUser(Users user) {
        return projectRepository.findByUser(user);
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found"));
    }

    @Transactional
    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found");
        }
        projectRepository.deleteById(id);
    }
}
