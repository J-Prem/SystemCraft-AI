package com.systemcraft.ai.repository;

import com.systemcraft.ai.entity.Project;
import com.systemcraft.ai.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByUser(Users user);
}
