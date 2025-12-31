/**
 * Basic Workflow Example
 * 
 * This demonstrates a complete context engineering workflow:
 * 1. Build context
 * 2. Execute tools
 * 3. Record feedback
 * 4. Optimize based on results
 * 5. Iterate
 */

import {
  ContextBuilder,
  FeedbackLoopManager,
  ContextOptimizer,
  executeTool,
  getToolDefinitionsForContext,
} from '../src/index';

/**
 * Example: Code Analysis Workflow
 */
export async function codeAnalysisWorkflow() {
  console.log('\n' + '='.repeat(60));
  console.log('📚 Context Engineering: Code Analysis Workflow');
  console.log('='.repeat(60));

  // Step 1: Build Initial Context
  console.log('\n[Step 1] Building Initial Context...');
  const contextBuilder = new ContextBuilder(8000);

  contextBuilder
    .addSection(
      'Project Overview',
      'Analyzing TypeScript code for quality and best practices',
      'high'
    )
    .addSection(
      'Task',
      'Analyze code snippet and generate recommendations',
      'high'
    )
    .addToolContext([
      {
        name: 'analyze_code',
        description: 'Analyze code for complexity and issues',
      },
      {
        name: 'generate_docs',
        description: 'Generate documentation',
      },
    ])
    .addExamples([
      {
        input: 'function add(a, b) { return a + b; }',
        output: 'Simple arithmetic function. Well-formed.',
      },
    ]);

  const { context: initialContext, truncated } = contextBuilder.build();
  console.log(`✅ Context built (${initialContext.length} chars)`);
  if (truncated) console.log('⚠️  Context was truncated');

  // Step 2: Initialize Feedback System
  console.log('\n[Step 2] Setting up Feedback System...');
  const feedbackManager = new FeedbackLoopManager();
  const contextOptimizer = new ContextOptimizer(feedbackManager);

  // Step 3: Execute Tool
  console.log('\n[Step 3] Executing Analysis Tool...');
  try {
    const result = await executeTool('analyze_code', {
      code: `
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total = total + items[i].price;
  }
  return total;
}
      `,
      language: 'javascript',
      analyzeFor: ['performance', 'readability', 'best-practices'],
    });

    // Step 4: Record Feedback
    console.log('\n[Step 4] Recording Execution Feedback...');
    feedbackManager.recordExecution({
      toolName: 'analyze_code',
      success: result.success,
      executionTime: 45,
      contextTokensUsed: Math.ceil(initialContext.length / 4),
      outputQuality: 'good',
      feedback: 'Code analysis completed with actionable suggestions',
    });

    // Step 5: Generate Feedback Report
    console.log('\n[Step 5] Analyzing Feedback...');
    const report = feedbackManager.generateReport();
    console.log(report);

    // Step 6: Optimize Context for Next Iteration
    console.log('\n[Step 6] Optimizing Context for Next Iteration...');
    const optimized = contextOptimizer.optimizeContext(initialContext);
    console.log(`📊 Context Optimization Results:`);
    console.log(`   - Tokens Used: ${optimized.tokensUsed}/${8000}`);
    console.log(`   - Optimizations Applied: ${optimized.optimizations.length}`);
    optimized.optimizations.forEach((opt) => {
      console.log(`     • ${opt}`);
    });
  } catch (error) {
    console.error('❌ Workflow error:', error);
  }
}

/**
 * Example: Multi-Tool Sequential Workflow
 */
export async function multiToolWorkflow() {
  console.log('\n' + '='.repeat(60));
  console.log('🔄 Multi-Tool Sequential Workflow');
  console.log('='.repeat(60));

  const feedbackManager = new FeedbackLoopManager();
  const toolContexts = getToolDefinitionsForContext();

  console.log('\nAvailable tools for this workflow:');
  console.log(toolContexts);

  // Simulate a 3-step workflow
  const steps = [
    {
      tool: 'read_file',
      params: { filePath: '/src/example.js' },
      expectedQuality: 'excellent' as const,
    },
    {
      tool: 'analyze_code',
      params: { code: 'function test() {}', language: 'javascript' },
      expectedQuality: 'good' as const,
    },
    {
      tool: 'generate_docs',
      params: { input: 'function test() {}', format: 'markdown' },
      expectedQuality: 'good' as const,
    },
  ];

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    console.log(`\n[Tool ${i + 1}/${steps.length}] Executing ${step.tool}...`);

    try {
      const result = await executeTool(step.tool, step.params);

      feedbackManager.recordExecution({
        toolName: step.tool,
        success: true,
        executionTime: Math.random() * 100,
        contextTokensUsed: 1000 + Math.random() * 500,
        outputQuality: step.expectedQuality,
      });

      console.log(`✅ Step ${i + 1} completed`);
    } catch (error) {
      console.error(`❌ Step ${i + 1} failed`);
    }
  }

  // Final analysis
  console.log('\n' + '-'.repeat(60));
  console.log('WORKFLOW COMPLETE - FINAL ANALYSIS');
  console.log('-'.repeat(60));
  console.log(feedbackManager.generateReport());
}

/**
 * Example: Context Management Under Constraints
 */
export function contextManagementExample() {
  console.log('\n' + '='.repeat(60));
  console.log('📦 Context Management Under Token Constraints');
  console.log('='.repeat(60));

  // Create builder with tight token limit
  const builder = new ContextBuilder(2000);

  // Try to add lots of content
  builder
    .addSection(
      'System Instructions',
      'You are an expert code reviewer. Focus on best practices.',
      'high'
    )
    .addSection(
      'Codebase Info',
      `This is a large project with:
      - 150+ TypeScript files
      - Modular architecture
      - Comprehensive test suite
      - CI/CD pipeline`,
      'high'
    )
    .addSection(
      'Current Task',
      'Review the authentication module for security issues',
      'high'
    )
    .addSection(
      'Recent Changes',
      `Modified files:
      - src/auth/service.ts
      - src/auth/middleware.ts
      - tests/auth.test.ts`,
      'medium'
    )
    .addSection(
      'Context from Previous Review',
      'Previous reviewers noted potential race conditions in token refresh logic',
      'medium'
    )
    .addExamples([
      {
        input: 'Insecure password hashing',
        output: 'Use bcrypt with salt rounds >= 12',
      },
      {
        input: 'Missing input validation',
        output: 'Validate all user inputs before processing',
      },
    ]);

  const stats = builder.getStats();
  console.log(`\n📊 Context Statistics:`);
  console.log(`   - Sections: ${stats.sections}`);
  console.log(`   - Total Size: ${stats.totalLength} chars`);
  console.log(`   - Token Limit: 2000 (est. 8000 chars)`);
  console.log(`   - Within Limit: ${stats.withinLimit ? '✅ Yes' : '⚠️  No'}`);

  const { context, truncated } = builder.build();
  console.log(`\n📄 Built Context: ${context.length} chars`);
  if (truncated) {
    console.log('⚠️  Content was truncated to fit token limit');
  }

  console.log('\nFirst 500 chars of context:');
  console.log(context.substring(0, 500) + '...');
}

// Run examples
async function main() {
  await codeAnalysisWorkflow();
  console.log('\n\n');
  await multiToolWorkflow();
  console.log('\n\n');
  contextManagementExample();
}

// Execute if this is the main module
if (require.main === module) {
  main().catch(console.error);
}

export { main };
