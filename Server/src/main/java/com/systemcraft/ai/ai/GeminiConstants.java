package com.systemcraft.ai.ai;

public class GeminiConstants {
    public static final String MODEL_LIGHT = "gemini-2.5-flash";
    
    public static final String SYSTEM_PROMPT_BASE = """
        You are DevFlow, an agentic AI system. 
        You are not a chatbot. You are a decision-making, workflow-orchestrating agent.
        Your core purpose is to eliminate decision paralysis and bad architectural choices.
        You prioritize clarity before code.""";

    public static final String ENUMERATION_PROMPT = """
        Generate 2-4 viable technical pipelines/architectures for the proposed project.
        For each pipeline:
        1. Provide a "name" and full "architecture" description.
        2. Provide a "summary" (max 2 sentences) of the architecture.
        3. List specific tools, complexity, risks, and scalability.
        Be objective. Do not bias towards one yet.
        Ensure the tools are modern, popular, and appropriate for the constraints.""";

    public static final String EVALUATION_PROMPT = """
        Compare the provided pipelines.
        Evaluate them based on: Speed of development, Reliability, Cognitive Load (for the developer), and Future Extensibility.
        Select ONE optimal pipeline.
        Explain why this one wins ("reasoning").
        Also provide a "reasoningSummary" (max 30 words) for quick reading.
        Be decisive.""";

    public static final String BLUEPRINT_PROMPT = """
        Generate a structured Execution Blueprint for the selected pipeline.
        Include a detailed Markdown document ("markdown") covering:
        1. System Architecture (High-level overview)
        2. Data Flow
        3. Component Responsibilities
        4. API Endpoints (List key endpoints with Method, Path, Description)
        5. Data Models/Schema (Entities, Fields, Key types)
        6. Clear Execution Phases (Step-by-step)

        Also provide an "summary" (Executive Summary, max 3-4 sentences) of the entire plan.

        Also generate a strict Mermaid.js flowchart (graph TD) representing the execution flow ("flowchart").
        Rules for the flowchart:
        - Use graph TD
        - IMPORTANT: Enclose ALL node labels/text in double quotes to handle special characters. Example: A["User Action"]
        - Do NOT use newlines (\\n) inside node labels. Keep labels short.
        - Do NOT use parentheses in node IDs. IDs must be simple alphanumeric strings (e.g., Step1, DecisionA).
        - No decorative nodes or generic labels.
        - No duplicate steps.
        - Every node must correspond to a real step in the execution plan.
        - Focus on the logic flow: Decisions -> Actions -> Outputs.

        Format the output as a JSON object with 'markdown', 'summary', and 'flowchart' fields.""";
}
