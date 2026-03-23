import React, { useState } from 'react';
import AiIntake from '../components/ai/AiIntake';
import AiPipelineList from '../components/ai/AiPipelineList';
import AiEvaluation from '../components/ai/AiEvaluation';
import AiBlueprint from '../components/ai/AiBlueprint';
import { aiWorkflowService } from '../services/aiWorkflowService';

const PHASES = {
  INTAKE: 'intake',
  ENUMERATION: 'enumeration',
  EVALUATION: 'evaluation',
  BLUEPRINT: 'blueprint'
};

const AiArchitect = () => {
  const [phase, setPhase] = useState(PHASES.INTAKE);
  const [loading, setLoading] = useState(false);
  const [intake, setIntake] = useState(null);
  const [pipelines, setPipelines] = useState([]);
  const [evaluation, setEvaluation] = useState(null);
  const [selectedPipeline, setSelectedPipeline] = useState(null);
  const [blueprint, setBlueprint] = useState(null);
  const [chat, setChat] = useState([]);

  const handleIntakeSubmit = async (data) => {
    setLoading(true);
    setIntake(data);
    try {
      const response = await aiWorkflowService.generatePipelines(data);
      setPipelines(response.data);
      setPhase(PHASES.ENUMERATION);
    } catch (error) {
      console.error("Failed to generate pipelines", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEvaluate = async () => {
    setLoading(true);
    try {
      const response = await aiWorkflowService.evaluatePipelines(pipelines, intake);
      const evalData = response.data;
      setEvaluation(evalData);
      
      const winner = pipelines.find(p => p.id === evalData.selectedPipelineId);
      setSelectedPipeline(winner);
      setPhase(PHASES.EVALUATION);
    } catch (error) {
      console.error("Evaluation failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateBlueprint = async () => {
    setLoading(true);
    try {
      const response = await aiWorkflowService.generateBlueprint(selectedPipeline, intake);
      setBlueprint(response.data);
      setPhase(PHASES.BLUEPRINT);
    } catch (error) {
      console.error("Blueprint generation failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (msg) => {
    const userMsg = { role: 'user', content: msg };
    setChat(prev => [...prev, userMsg]);
    setLoading(true);
    try {
      const context = `
        Current Strategy: ${selectedPipeline?.name}
        Architecture: ${selectedPipeline?.architecture}
        Blueprint Summary: ${blueprint?.summary}
        Data Schema: ${blueprint?.schemaChart}
        API Architecture: ${blueprint?.apiChart}
      `;
      const response = await aiWorkflowService.sendChatMessage(chat, msg, context);
      setChat(prev => [...prev, { role: 'model', content: response.data }]);
    } catch (error) {
      setChat(prev => [...prev, { role: 'model', content: "I'm sorry, I encountered an error processing your request." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      {phase === PHASES.INTAKE && (
        <AiIntake onNext={handleIntakeSubmit} loading={loading} />
      )}
      {phase === PHASES.ENUMERATION && (
        <AiPipelineList 
          pipelines={pipelines} 
          onEvaluate={handleEvaluate} 
          loading={loading} 
        />
      )}
      {phase === PHASES.EVALUATION && (
        <AiEvaluation 
          evaluation={evaluation} 
          selectedPipeline={selectedPipeline} 
          onGenerateBlueprint={handleGenerateBlueprint} 
          loading={loading} 
        />
      )}
      {phase === PHASES.BLUEPRINT && (
        <AiBlueprint 
          blueprint={blueprint} 
          chat={chat} 
          onSendMessage={handleSendMessage} 
          loading={loading} 
        />
      )}
    </div>
  );
};

export default AiArchitect;
