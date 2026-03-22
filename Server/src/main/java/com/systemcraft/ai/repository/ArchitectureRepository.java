package com.systemcraft.ai.repository;

import com.systemcraft.ai.entity.Architecture;
import com.systemcraft.ai.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ArchitectureRepository extends JpaRepository<Architecture, Long> {
    Optional<Architecture> findByProject(Project project);
}
