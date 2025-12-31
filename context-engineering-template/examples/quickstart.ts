#!/usr/bin/env node

/**
 * Quick Start Script
 * 
 * Run this to see the context engineering template in action!
 * 
 * Usage:
 *   ts-node examples/quickstart.ts
 *   node dist/examples/quickstart.js (after compilation)
 */

import {
  ContextBuilder,
  FeedbackLoopManager,
  ContextOptimizer,
  executeTool,
  getToolDefinitionsForContext,
} from '../src/index';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

function log(color: string, ...args: any[]) {
  console.log(`${color}${args.join(' ')}${colors.reset}`);
}

async function main() {
  log(colors.cyan + colors.bright, '\n╔═══════════════════════════════════════════════╗');
  log(colors.cyan + colors.bright, '║  Context Engineering Template - Quick Start   ║');
  log(colors.cyan + colors.bright, '╚═══════════════════════════════════════════════╝\n');

  // Demo 1: Tool Definitions
  log(colors.blue + colors.bright, '📚 Demo 1: Understanding Tools');
  log(colors.dim, '────────────────────────────────────────────────\n');

  const toolContext = getToolDefinitionsForContext();
  log(colors.white, toolContext.substring(0, 300) + '...\n');

  // Demo 2: Building Context
  log(colors.blue + colors.bright, '🏗️  Demo 2: Building Context');
  log(colors.dim, '────────────────────────────────────────────────\n');

  const builder = new ContextBuilder(5000);
  builder
    .addSection(
      'Project Goal',
      'Build a simple todo application with TypeScript',
      'high'
    )
    .addSection(
      'Requirements',
      '- Add/remove todos\n- Mark complete/incomplete\n- Persist to localStorage',
      'high'
    )
    .addSection(
      'Tech Stack',
      'TypeScript, React, Vite',
      'medium'
    )
    .addExamples([
      {
        input: 'User clicks add button',
        output: 'New todo appears in list',
      },
    ]);

  const { context: initialContext } = builder.build();
  const stats = builder.getStats();
  log(colors.green, `✅ Context built successfully`);
  log(colors.white, `   Sections: ${stats.sections}`);
  log(colors.white, `   Size: ${stats.totalLength} chars\n`);

  // Demo 3: Executing Tools
  log(colors.blue + colors.bright, '⚙️  Demo 3: Executing Tools');
  log(colors.dim, '────────────────────────────────────────────────\n');

  try {
    const result = await executeTool('analyze_code', {
      code: `
const todos = [];

function addTodo(title) {
  todos.push({ id: Date.now(), title, completed: false });
}

function removeTodo(id) {
  return todos.filter(t => t.id !== id);
}
      `,
      language: 'javascript',
    });

    log(colors.green, '✅ Tool executed successfully');
    log(colors.white, `   Complexity: ${result.complexity}`);
    log(colors.white, `   Suggestions:`);
    result.suggestions.forEach((s: string) => {
      log(colors.white, `     • ${s}`);
    });
  } catch (error) {
    log(colors.red, `❌ Error: ${error}`);
  }

  log(colors.white, '');

  // Demo 4: Feedback Loops
  log(colors.blue + colors.bright, '📊 Demo 4: Feedback Loops');
  log(colors.dim, '────────────────────────────────────────────────\n');

  const feedbackManager = new FeedbackLoopManager();

  // Simulate 3 executions
  const executions = [
    { tool: 'analyze_code', success: true, time: 45, quality: 'excellent' as const },
    { tool: 'generate_docs', success: true, time: 52, quality: 'good' as const },
    { tool: 'read_file', success: true, time: 38, quality: 'good' as const },
  ];

  log(colors.yellow, 'Recording executions...');
  executions.forEach((exec, idx) => {
    feedbackManager.recordExecution({
      toolName: exec.tool,
      success: exec.success,
      executionTime: exec.time,
      contextTokensUsed: 1200 + Math.random() * 500,
      outputQuality: exec.quality,
    });
    log(colors.green, `  [${idx + 1}/${executions.length}] ${exec.tool} ✅`);
  });

  log(colors.white, '');
  const feedback = feedbackManager.analyzeFeedback();
  log(colors.green, `✅ Analysis Complete`);
  log(colors.white, `   Success Rate: ${(feedback.successRate * 100).toFixed(1)}%`);
  log(colors.white, `   Avg Time: ${feedback.avgExecutionTime.toFixed(0)}ms`);
  log(colors.white, `   Recommendations: ${feedback.recommendations.length}\n`);

  // Demo 5: Context Optimization
  log(colors.blue + colors.bright, '🔄 Demo 5: Context Optimization');
  log(colors.dim, '────────────────────────────────────────────────\n');

  const optimizer = new ContextOptimizer(feedbackManager);

  log(colors.yellow, 'Optimizing context based on feedback...');
  const optimized = optimizer.optimizeContext(initialContext);

  log(colors.green, `✅ Context Optimized`);
  log(colors.white, `   Original: ${initialContext.length} chars`);
  log(colors.white, `   Optimized: ${optimized.optimizedContext.length} chars`);
  log(colors.white, `   Tokens Used: ${optimized.tokensUsed} / 8000`);
  if (optimized.optimizations.length > 0) {
    log(colors.white, `   Changes Applied: ${optimized.optimizations.length}`);
  }

  log(colors.white, '\n');

  // Demo 6: Complete Workflow Summary
  log(colors.blue + colors.bright, '✨ Demo 6: Complete Workflow');
  log(colors.dim, '────────────────────────────────────────────────\n');

  const workflow = `
1. ✅ Built context with priorities
2. ✅ Executed analysis tools  
3. ✅ Recorded performance metrics
4. ✅ Analyzed feedback patterns
5. ✅ Optimized context for next iteration

Result: Ready for iterative refinement!
  `;

  log(colors.green, workflow);

  // Next Steps
  log(colors.blue + colors.bright, '🚀 Next Steps');
  log(colors.dim, '────────────────────────────────────────────────\n');

  const nextSteps = `
1. Review the template structure:
   - src/tools/toolDefinitions.ts      → Tool system
   - src/feedback/feedbackLoop.ts      → Feedback mechanism
   - src/utils/contextBuilder.ts       → Context utilities

2. Check out the examples:
   - examples/basic-workflow.ts        → Start here
   - examples/advanced-workflow.ts     → Advanced patterns

3. Read the documentation:
   - docs/GUIDE.md                     → Beginner's guide
   - docs/ARCHITECTURE.md              → System design

4. Try these exercises:
   - Create your own tool definition
   - Build a multi-step workflow
   - Set up iterative refinement
   - Monitor performance metrics

5. Next level:
   - Integrate with your AI system
   - Customize metrics for your use case
   - Build tools for your domain
   - Deploy in production
  `;

  log(colors.cyan, nextSteps);

  // Footer
  log(colors.dim, '────────────────────────────────────────────────');
  log(colors.yellow, '💡 Remember: Context engineering is iterative!');
  log(colors.yellow, '   Start simple → Measure → Optimize → Repeat\n');
}

// Run
main().catch(error => {
  log(colors.red, `\n❌ Error: ${error.message}`);
  process.exit(1);
});
