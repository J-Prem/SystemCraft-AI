package com.systemcraft.ai.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PipelineDTO {
    private String id;
    private String name;
    private String architecture;
    private String summary;
    private List<String> tools;
    private String complexity; // enum: ["Low", "Medium", "High"]
    private List<String> risks;
    private String scalability;
    private List<String> pros;
    private List<String> cons;
}
