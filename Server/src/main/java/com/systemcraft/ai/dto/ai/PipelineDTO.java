package com.systemcraft.ai.dto.ai;

import java.util.List;

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

    public PipelineDTO() {}

    public PipelineDTO(String id, String name, String architecture, String summary, List<String> tools, String complexity, List<String> risks, String scalability, List<String> pros, List<String> cons) {
        this.id = id;
        this.name = name;
        this.architecture = architecture;
        this.summary = summary;
        this.tools = tools;
        this.complexity = complexity;
        this.risks = risks;
        this.scalability = scalability;
        this.pros = pros;
        this.cons = cons;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getArchitecture() { return architecture; }
    public void setArchitecture(String architecture) { this.architecture = architecture; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public List<String> getTools() { return tools; }
    public void setTools(List<String> tools) { this.tools = tools; }
    public String getComplexity() { return complexity; }
    public void setComplexity(String complexity) { this.complexity = complexity; }
    public List<String> getRisks() { return risks; }
    public void setRisks(List<String> risks) { this.risks = risks; }
    public String getScalability() { return scalability; }
    public void setScalability(String scalability) { this.scalability = scalability; }
    public List<String> getPros() { return pros; }
    public void setPros(List<String> pros) { this.pros = pros; }
    public List<String> getCons() { return cons; }
    public void setCons(List<String> cons) { this.cons = cons; }
}
