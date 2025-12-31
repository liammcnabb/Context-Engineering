/**
 * Advanced Workflow Example
 * 
 * Demonstrates:
 * - Multiple feedback loops
 * - Context prioritization
 * - Iterative refinement
 * - Performance optimization
 */

import {
  ContextBuilder,
  FeedbackLoopManager,
  ContextOptimizer,
  mergeContexts,
  extractContextMetadata,
} from '../src/index';

interface WorkflowConfig {
  maxIterations: number;
  targetSuccessRate: number;
  tokenBudget: number;
}

/**
 * Advanced: Iterative Context Refinement
 */
export class IterativeContextRefiner {
  private config: WorkflowConfig;
  private feedbackManager: FeedbackLoopManager;
  private contextOptimizer: ContextOptimizer;
  private iteration: number = 0;

  constructor(config: WorkflowConfig) {
    this.config = config;
    this.feedbackManager = new FeedbackLoopManager();
    this.contextOptimizer = new ContextOptimizer(this.feedbackManager);
  }

  /**
   * Run iterative refinement workflow
   */
  async refine(
    initialContext: string,
    executionFunction: (context: string) => Promise<any>
  ): Promise<{
    finalContext: string;
    iterations: number;
    successRate: number;
  }> {
    let currentContext = initialContext;
    let successRate = 0;

    console.log('\n' + '='.repeat(60));
    console.log('🔁 Starting Iterative Context Refinement');
    console.log('='.repeat(60));

    while (
      this.iteration < this.config.maxIterations &&
      successRate < this.config.targetSuccessRate
    ) {
      this.iteration++;
      console.log(`\n[Iteration ${this.iteration}/${this.config.maxIterations}]`);

      try {
        // Execute with current context
        const result = await executionFunction(currentContext);

        // Record metrics
        this.feedbackManager.recordExecution({
          toolName: `iteration_${this.iteration}`,
          success: result.success,
          executionTime: result.executionTime || Math.random() * 100,
          contextTokensUsed: Math.ceil(currentContext.length / 4),
          outputQuality: result.quality || 'good',
        });

        // Analyze and optimize
        const feedback = this.feedbackManager.analyzeFeedback();
        successRate = feedback.successRate;

        console.log(`   Success Rate: ${(successRate * 100).toFixed(1)}%`);
        console.log(
          `   Target: ${(this.config.targetSuccessRate * 100).toFixed(1)}%`
        );

        // Optimize context for next iteration
        if (successRate < this.config.targetSuccessRate) {
          const optimized = this.contextOptimizer.optimizeContext(currentContext);
          currentContext = optimized.optimizedContext;

          console.log(`   ✅ Context optimized (${optimized.optimizations.length} changes)`);
        }
      } catch (error) {
        console.error(`   ❌ Error during iteration: ${error}`);
      }
    }

    console.log('\n' + '-'.repeat(60));
    console.log(`✅ Refinement Complete`);
    console.log(`   Iterations: ${this.iteration}`);
    console.log(`   Final Success Rate: ${(successRate * 100).toFixed(1)}%`);
    console.log('-'.repeat(60));

    return {
      finalContext: currentContext,
      iterations: this.iteration,
      successRate,
    };
  }
}

/**
 * Example: Multi-Priority Context
 */
export function multiPriorityContextExample() {
  console.log('\n' + '='.repeat(60));
  console.log('⭐ Multi-Priority Context Management');
  console.log('='.repeat(60));

  // Create contexts with different priorities
  const contexts = [
    {
      title: 'Critical System Instructions',
      content: `
- Always validate user input
- Maintain backwards compatibility
- Log all security events
      `.trim(),
      priority: 100,
    },
    {
      title: 'Current Task',
      content: `
Implement user authentication module with:
- Login/logout
- Session management
- Token refresh
      `.trim(),
      priority: 90,
    },
    {
      title: 'Code Style Guide',
      content: `
- Use TypeScript strict mode
- Name constants in UPPER_CASE
- Maximum line length: 100
      `.trim(),
      priority: 50,
    },
    {
      title: 'Performance Constraints',
      content: 'Response time must be under 500ms',
      priority: 80,
    },
    {
      title: 'Reference Information',
      content: 'See docs/architecture.md for system design',
      priority: 30,
    },
  ];

  console.log('\n📊 Context Priorities (Before Merge):');
  contexts.forEach((ctx) => {
    console.log(`   ${ctx.priority.toString().padStart(3)} | ${ctx.title}`);
  });

  const merged = mergeContexts(contexts);

  console.log('\n📝 Merged Context (Priority-Ordered):\n');
  console.log(merged.substring(0, 400) + '\n   ...\n');

  // Extract metadata
  const metadata = extractContextMetadata(merged);
  console.log('\n📈 Context Metadata:');
  console.log(`   Sections: ${metadata.sections.join(', ')}`);
  console.log(`   Word Count: ${metadata.wordCount}`);
  console.log(`   Est. Tokens: ${metadata.estimatedTokens}`);
}

/**
 * Example: Adaptive Context Based on Performance
 */
export async function adaptiveContextExample() {
  console.log('\n' + '='.repeat(60));
  console.log('🎯 Adaptive Context Based on Performance');
  console.log('='.repeat(60));

  const feedbackManager = new FeedbackLoopManager();

  // Simulate 5 executions with varying success
  const executions = [
    { success: true, quality: 'excellent' as const, time: 50 },
    { success: true, quality: 'good' as const, time: 55 },
    { success: false, quality: 'poor' as const, time: 120 },
    { success: true, quality: 'good' as const, time: 45 },
    { success: false, quality: 'fair' as const, time: 95 },
  ];

  console.log('\n📝 Simulating 5 tool executions...\n');

  executions.forEach((exec, idx) => {
    feedbackManager.recordExecution({
      toolName: `tool_${idx + 1}`,
      success: exec.success,
      executionTime: exec.time,
      contextTokensUsed: 1500 + Math.random() * 500,
      outputQuality: exec.quality,
    });
  });

  // Analyze feedback
  const feedback = feedbackManager.analyzeFeedback();

  console.log('📊 Performance Analysis:');
  console.log(`   Success Rate: ${(feedback.successRate * 100).toFixed(1)}%`);
  console.log(`   Avg Execution Time: ${feedback.avgExecutionTime.toFixed(0)}ms`);
  console.log(`   Recommendations: ${feedback.recommendations.length}`);

  console.log('\n💡 Adaptive Adjustments Recommended:');
  feedback.recommendations.forEach((rec, idx) => {
    console.log(
      `\n   ${idx + 1}. ${rec.metric.toUpperCase()} (${rec.impact} impact)`
    );
    console.log(`      Action: ${rec.change}`);
    console.log(`      Reason: ${rec.reason}`);
  });

  console.log('\n' + feedbackManager.generateReport());
}

// Example execution
export async function runAdvancedExamples() {
  // Example 1: Multi-priority context
  multiPriorityContextExample();

  // Example 2: Adaptive context
  await adaptiveContextExample();

  // Example 3: Iterative refinement (simulated)
  console.log('\n' + '='.repeat(60));
  console.log('🔄 Iterative Context Refinement Example');
  console.log('='.repeat(60));

  const refiner = new IterativeContextRefiner({
    maxIterations: 3,
    targetSuccessRate: 0.9,
    tokenBudget: 8000,
  });

  const initialContext = `
## Task
Write a function that calculates factorial

## Context
- Use TypeScript
- Handle edge cases
- Add documentation
`;

  // Simulated execution function
  const mockExecutor = async (context: string) => {
    const random = Math.random();
    return {
      success: random > 0.3,
      quality: random > 0.5 ? 'good' : 'fair',
      executionTime: Math.random() * 100,
    };
  };

  const result = await refiner.refine(initialContext, mockExecutor);

  console.log('\nRefinement Results:');
  console.log(`   Iterations: ${result.iterations}`);
  console.log(`   Final Success Rate: ${(result.successRate * 100).toFixed(1)}%`);
}

// Run if main module
if (require.main === module) {
  runAdvancedExamples().catch(console.error);
}
