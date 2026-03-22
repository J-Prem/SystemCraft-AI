package com.systemcraft.ai.repository;

import com.systemcraft.ai.entity.ApiDefinition;
import com.systemcraft.ai.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ApiDefinitionRepository extends JpaRepository<ApiDefinition, Long> {
    List<ApiDefinition> findByProject(Project project);
}
