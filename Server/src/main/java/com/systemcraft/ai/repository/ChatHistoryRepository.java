package com.systemcraft.ai.repository;

import com.systemcraft.ai.entity.ChatHistory;
import com.systemcraft.ai.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChatHistoryRepository extends JpaRepository<ChatHistory, Long> {
    List<ChatHistory> findByProjectOrderByTimestampAsc(Project project);
}
