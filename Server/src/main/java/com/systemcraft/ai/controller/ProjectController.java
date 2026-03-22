package com.systemcraft.ai.controller;

import com.systemcraft.ai.dto.ProjectRequest;
import com.systemcraft.ai.entity.Project;
import com.systemcraft.ai.entity.Users;
import com.systemcraft.ai.service.ProjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    ProjectService projectService;

    @PostMapping
    public ResponseEntity<Project> createProject(@Valid @RequestBody ProjectRequest projectRequest,
                                               @AuthenticationPrincipal Users user) {
        Project project = projectService.createProject(
                projectRequest.getName(),
                projectRequest.getDescription(),
                projectRequest.getScale(),
                user
        );
        return ResponseEntity.ok(project);
    }

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects(@AuthenticationPrincipal Users user) {
        return ResponseEntity.ok(projectService.getProjectsByUser(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
}
