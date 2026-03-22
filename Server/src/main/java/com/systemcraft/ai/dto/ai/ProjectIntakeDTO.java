package com.systemcraft.ai.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectIntakeDTO {
    private String problem;
    private String user;
    private String output;
    private String constraints;
}
