/**
 * Context Engineering Template - Main Entry Point
 * 
 * This demonstrates the complete workflow of context engineering with
 * tool calls and feedback loops.
 */

export {
  toolRegistry,
  executeTool,
  getToolDefinitionsForContext,
  fileReaderTool,
  codeAnalyzerTool,
  docGeneratorTool,
} from './tools/toolDefinitions';

export {
  FeedbackLoopManager,
  ContextOptimizer,
} from './feedback/feedbackLoop';

export {
  ContextBuilder,
  formatContext,
  extractContextMetadata,
  mergeContexts,
} from './utils/contextBuilder';

// Re-export types
export type { ToolParameter, ToolDefinition } from './tools/toolDefinitions';
export type { ExecutionMetrics, ContextAdjustment } from './feedback/feedbackLoop';
