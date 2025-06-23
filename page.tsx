'use client'

import { useState } from 'react'
import './globals.css'

export default function PromptGenerator() {
  const [prompt, setPrompt] = useState("");
  const [task, setTask] = useState("");
  const [funnel, setFunnel] = useState("");
  const [automation, setAutomation] = useState("");

  const promptLibrary = [
    {
      task: "Write a cold outreach email for lead generation",
      funnel: "awareness",
      automation: "medium",
      prompt: "Craft a cold outreach email to introduce PLACEHOLDER_SERVICE to PLACEHOLDER_TARGET_AUDIENCE. Include a hook, value prop, and low-friction CTA."
    },
    {
      task: "Create a win-back email for churned customers",
      funnel: "retention",
      automation: "medium",
      prompt: "Write a win-back email for PLACEHOLDER_CUSTOMER_TYPE who hasn’t purchased in PLACEHOLDER_TIME. Offer a benefit or incentive to re-engage."
    }
  ];

  const generatePrompt = () => {
    const match = promptLibrary.find(
      (p) =>
        p.task.toLowerCase().includes(task.toLowerCase()) &&
        p.funnel === funnel &&
        p.automation === automation
    );
    if (match) {
      setPrompt(match.prompt);
    } else {
      const base = `Write a prompt for the following task: ${task}.`;
      const funnelText = funnel ? ` This is intended for the ${funnel} stage of the funnel.` : "";
      const automationText = automation ? ` The prompt should support ${automation}-level automation.` : "";
      setPrompt(base + funnelText + automationText);
    }
  };

  const exportPrompt = () => {
    const blob = new Blob([prompt], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated_prompt.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Prompt Generator</h1>
      <input
        type="text"
        placeholder="Enter your task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
      />
      <select onChange={(e) => setFunnel(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }}>
        <option value="">Select funnel stage</option>
        <option value="awareness">Awareness</option>
        <option value="consideration">Consideration</option>
        <option value="conversion">Conversion</option>
        <option value="retention">Retention</option>
      </select>
      <select onChange={(e) => setAutomation(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }}>
        <option value="">Select automation level</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button onClick={generatePrompt} style={{ marginRight: '10px', padding: '10px' }}>Generate Prompt</button>
      <button onClick={exportPrompt} style={{ padding: '10px' }}>Download Prompt</button>
      <textarea
        value={prompt}
        readOnly
        placeholder="Prompt output will appear here"
        style={{ width: '100%', height: '120px', marginTop: '10px', padding: '10px' }}
      />
    </div>
  );
}