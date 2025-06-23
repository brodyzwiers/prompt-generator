import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

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
  },
  {
    task: "Write a brand origin story for the About page",
    funnel: "awareness",
    automation: "low",
    prompt: "Write a compelling origin story for PLACEHOLDER_BRAND based on PLACEHOLDER_MOTIVATION and PLACEHOLDER_MARKET_PROBLEM."
  },
  {
    task: "Generate SEO-optimized blog title and meta description",
    funnel: "awareness",
    automation: "high",
    prompt: "Based on the topic PLACEHOLDER_TOPIC, generate an SEO-optimized blog title and meta description using primary keyword PLACEHOLDER_KEYWORD."
  }
];

export default function PromptGenerator() {
  const [prompt, setPrompt] = useState("");
  const [task, setTask] = useState("");
  const [funnel, setFunnel] = useState("");
  const [automation, setAutomation] = useState("");

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

  return (
    <div className="grid gap-4 p-4">
      <Card>
        <CardContent className="grid gap-4 p-4">
          <Input
            placeholder="Describe your task (e.g., cold email, onboarding flow)"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <Select onValueChange={setFunnel}>
            <SelectTrigger>
              <SelectValue placeholder="Select funnel stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="awareness">Awareness</SelectItem>
              <SelectItem value="consideration">Consideration</SelectItem>
              <SelectItem value="conversion">Conversion</SelectItem>
              <SelectItem value="retention">Retention</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setAutomation}>
            <SelectTrigger>
              <SelectValue placeholder="Select automation level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={generatePrompt}>Generate Prompt</Button>

          <Textarea
            placeholder="Your generated prompt will appear here"
            value={prompt}
            readOnly
            className="min-h-[120px]"
          />
        </CardContent>
      </Card>
    </div>
  );
}
