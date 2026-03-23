package com.systemcraft.ai.dto.ai;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

public class BlueprintDTO {
    private String markdown;
    private String summary;
    private String flowchart;
    private String schemaChart;
    private String apiChart;

    public BlueprintDTO() {}

    public BlueprintDTO(String markdown, String summary, String flowchart, String schemaChart, String apiChart) {
        this.markdown = markdown;
        this.summary = summary;
        this.flowchart = flowchart;
        this.schemaChart = schemaChart;
        this.apiChart = apiChart;
    }

    public String getMarkdown() { return markdown; }
    public void setMarkdown(String markdown) { this.markdown = markdown; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getFlowchart() { return flowchart; }
    public void setFlowchart(String flowchart) { this.flowchart = flowchart; }
    public String getSchemaChart() { return schemaChart; }
    public void setSchemaChart(String schemaChart) { this.schemaChart = schemaChart; }
    public String getApiChart() { return apiChart; }
    public void setApiChart(String apiChart) { this.apiChart = apiChart; }
}
