import api from './api';

export const aiWorkflowService = {
  generatePipelines: (intake) => 
    api.post('/ai/workflow/pipelines/generate', intake),
    
  evaluatePipelines: (pipelines, intake) => 
    api.post('/ai/workflow/pipelines/evaluate', { pipelines, intake }),
    
  generateBlueprint: (pipeline, intake) => 
    api.post('/ai/workflow/blueprints/generate', { pipeline, intake }),
    
  sendChatMessage: (history, message, context) => 
    api.post('/ai/workflow/chat', { history, message, context }),
};
