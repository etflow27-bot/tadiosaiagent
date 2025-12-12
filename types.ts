import React from 'react';

export interface WorkflowStep {
  id?: string;
  label: string;
  subLabel?: string;
  type: 'trigger' | 'action' | 'decision' | 'end' | 'resource';
  resources?: WorkflowStep[]; // Connected nodes (e.g., tools below an agent)
  branches?: WorkflowStep[]; // Splitting paths (e.g., true/false)
}

export interface WorkflowItem {
  id: string;
  category: string;
  title: string;
  description: string;
  timeSaved: string;
  steps: WorkflowStep[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface ToolItem {
  name: string;
  category: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon?: React.ElementType;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}