package com.systemcraft.ai.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

@Component
public class ResponseParser {

    private final ObjectMapper objectMapper = new ObjectMapper();

    public JsonNode parseJsonResponse(String rawResponse) {
        try {
            // Find the first '{' and the last '}'
            int start = rawResponse.indexOf('{');
            int end = rawResponse.lastIndexOf('}');
            
            if (start != -1 && end != -1 && end > start) {
                String cleanJson = rawResponse.substring(start, end + 1);
                return objectMapper.readTree(cleanJson);
            }
            
            // Fallback for simple markdown cleaning
            String cleanJson = rawResponse.replaceAll("```json", "").replaceAll("```", "").trim();
            return objectMapper.readTree(cleanJson);
        } catch (Exception e) {
            System.err.println("JSON Parsing Failed. Raw Response: " + rawResponse);
            throw new RuntimeException("Failed to parse AI response as JSON: " + e.getMessage());
        }
    }

    public String extractContent(String rawResponse) {
        // Simple extraction for chat responses
        return rawResponse.trim();
    }
}
