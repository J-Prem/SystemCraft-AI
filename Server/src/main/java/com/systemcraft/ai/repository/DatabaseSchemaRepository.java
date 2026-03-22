package com.systemcraft.ai.repository;

import com.systemcraft.ai.entity.DatabaseSchema;
import com.systemcraft.ai.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface DatabaseSchemaRepository extends JpaRepository<DatabaseSchema, Long> {
    Optional<DatabaseSchema> findByProject(Project project);
}
