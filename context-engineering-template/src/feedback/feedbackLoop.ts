/**
 * Feedback Loop System for Context Engineering
 * 
 * This module implements feedback mechanisms to:
 * - Track execution quality metrics
 * - Optimize context based on results
 * - Iteratively improve outputs
 * - Learn from successes and failures
 */

export interface ExecutionMetrics {
  toolName: string;
  timestamp?: number;
  success: boolean;
  executionTime: number;
  contextTokensUsed: number;
  outputQuality: 'excellent' | 'good' | 'fair' | 'poor';
  feedback?: string;
}

export interface ContextAdjustment {
  metric: string;
  change: string;
  reason: string;
  impact: 'high' | 'medium' | 'low';
}

/**
 * Feedback Loop Manager
 * Tracks tool executions and provides optimization recommendations
 */
export class FeedbackLoopManager {
  private metrics: ExecutionMetrics[] = [];
  private adjustmentHistory: ContextAdjustment[] = [];
  private successThreshold = 0.8; // 80% success rate target

  /**
   * Record a tool execution with quality feedback
   */
  recordExecution(metrics: ExecutionMetrics): void {
    this.metrics.push({
      ...metrics,
      timestamp: metrics.timestamp || Date.now(),
    });

    console.log(`\n📊 Execution Recorded`);
    console.log(`   Tool: ${metrics.toolName}`);
    console.log(`   Status: ${metrics.success ? '✅ Success' : '❌ Failed'}`);
    console.log(`   Quality: ${metrics.outputQuality}`);
    console.log(`   Time: ${metrics.executionTime}ms`);
  }

  /**
   * Analyze recent executions and provide feedback
   */
  analyzeFeedback(): {
    successRate: number;
    avgExecutionTime: number;
    recommendations: ContextAdjustment[];
  } {
    if (this.metrics.length === 0) {
      return {
        successRate: 0,
        avgExecutionTime: 0,
        recommendations: [],
      };
    }

    // Calculate success rate
    const successCount = this.metrics.filter((m) => m.success).length;
    const successRate = successCount / this.metrics.length;

    // Calculate average execution time
    const totalTime = this.metrics.reduce((sum, m) => sum + m.executionTime, 0);
    const avgExecutionTime = totalTime / this.metrics.length;

    // Generate recommendations
    const recommendations = this.generateRecommendations(
      successRate,
      avgExecutionTime
    );

    return {
      successRate,
      avgExecutionTime,
      recommendations,
    };
  }

  /**
   * Generate context adjustments based on performance
   */
  private generateRecommendations(
    successRate: number,
    avgExecutionTime: number
  ): ContextAdjustment[] {
    const recommendations: ContextAdjustment[] = [];

    // Low success rate feedback
    if (successRate < this.successThreshold) {
      recommendations.push({
        metric: 'success_rate',
        change: 'Increase tool parameter validation',
        reason: `Success rate (${(successRate * 100).toFixed(1)}%) below target (${(this.successThreshold * 100).toFixed(1)}%)`,
        impact: 'high',
      });

      recommendations.push({
        metric: 'context_clarity',
        change: 'Add more detailed tool descriptions to prompts',
        reason: 'Tools may not be receiving clear enough instructions',
        impact: 'high',
      });
    }

    // High execution time feedback
    if (avgExecutionTime > 1000) {
      recommendations.push({
        metric: 'performance',
        change: 'Consider breaking complex tasks into smaller steps',
        reason: `Average execution time (${avgExecutionTime.toFixed(0)}ms) exceeds optimal threshold`,
        impact: 'medium',
      });
    }

    // Quality feedback
    const poorQualityCount = this.metrics.filter(
      (m) => m.outputQuality === 'poor'
    ).length;
    if (poorQualityCount > this.metrics.length * 0.2) {
      recommendations.push({
        metric: 'output_quality',
        change: 'Provide more context examples and expected formats',
        reason: `${(poorQualityCount / this.metrics.length * 100).toFixed(1)}% of outputs rated as poor quality`,
        impact: 'high',
      });
    }

    return recommendations;
  }

  /**
   * Apply a context adjustment
   */
  applyAdjustment(adjustment: ContextAdjustment): void {
    this.adjustmentHistory.push(adjustment);

    console.log(`\n🔄 Adjustment Applied`);
    console.log(`   Metric: ${adjustment.metric}`);
    console.log(`   Change: ${adjustment.change}`);
    console.log(`   Impact: ${adjustment.impact}`);
  }

  /**
   * Get a summary report
   */
  generateReport(): string {
    const feedback = this.analyzeFeedback();

    let report = '# Feedback Loop Report\n\n';
    report += `## Performance Metrics\n`;
    report += `- Success Rate: ${(feedback.successRate * 100).toFixed(1)}%\n`;
    report += `- Avg Execution Time: ${feedback.avgExecutionTime.toFixed(0)}ms\n`;
    report += `- Total Executions: ${this.metrics.length}\n\n`;

    report += `## Recommendations\n`;
    if (feedback.recommendations.length === 0) {
      report += `✅ No adjustments needed - performance is optimal!\n`;
    } else {
      feedback.recommendations.forEach((rec) => {
        report += `### ${rec.metric.toUpperCase()} (${rec.impact} impact)\n`;
        report += `- **Change**: ${rec.change}\n`;
        report += `- **Reason**: ${rec.reason}\n\n`;
      });
    }

    return report;
  }

  /**
   * Reset metrics for a new feedback cycle
   */
  reset(): void {
    this.metrics = [];
    this.adjustmentHistory = [];
    console.log('🔄 Feedback loop reset');
  }
}

/**
 * Context Optimizer
 * Adjusts context based on feedback patterns
 */
export class ContextOptimizer {
  private manager: FeedbackLoopManager;
  private maxTokens = 8000; // Token budget
  private contextPriority: Map<string, number> = new Map();

  constructor(feedbackManager: FeedbackLoopManager) {
    this.manager = feedbackManager;
  }

  /**
   * Optimize context for next execution based on feedback
   */
  optimizeContext(currentContext: string): {
    optimizedContext: string;
    tokensUsed: number;
    optimizations: string[];
  } {
    const feedback = this.manager.analyzeFeedback();
    const optimizations: string[] = [];

    let optimizedContext = currentContext;

    // Apply recommendations to context
    feedback.recommendations.forEach((rec) => {
      if (rec.impact === 'high') {
        optimizedContext += `\n\n## Context Adjustment\n${rec.change}`;
        optimizations.push(rec.change);
      }
    });

    // Estimate token usage (rough approximation: 1 token ≈ 4 characters)
    const tokensUsed = Math.ceil(optimizedContext.length / 4);

    // Warn if exceeding token budget
    if (tokensUsed > this.maxTokens) {
      console.warn(
        `⚠️  Context exceeds token budget (${tokensUsed} > ${this.maxTokens})`
      );
      optimizedContext = this.trimContext(optimizedContext);
    }

    return {
      optimizedContext,
      tokensUsed,
      optimizations,
    };
  }

  /**
   * Trim context to fit within token budget
   */
  private trimContext(context: string): string {
    console.log('📍 Trimming context to fit token budget...');
    const targetLength = this.maxTokens * 4 * 0.9; // 90% of budget
    if (context.length <= targetLength) {
      return context;
    }
    return context.substring(0, targetLength) + '\n\n[... context trimmed ...]';
  }

  /**
   * Set priority for context elements
   */
  setPriority(element: string, priority: number): void {
    this.contextPriority.set(element, priority);
  }
}
