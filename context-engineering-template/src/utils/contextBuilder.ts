/**
 * Context Builder Utilities
 * 
 * Helpers for constructing effective context for AI systems
 */

/**
 * Build context string from various sources
 */
export class ContextBuilder {
  private sections: Map<string, string> = new Map();
  private maxLength: number = 10000;

  constructor(maxLength?: number) {
    if (maxLength) {
      this.maxLength = maxLength;
    }
  }

  /**
   * Add a context section
   */
  addSection(title: string, content: string, priority: 'high' | 'medium' | 'low' = 'medium'): this {
    const priorityPrefix = priority === 'high' ? '⭐ ' : '';
    this.sections.set(title, `${priorityPrefix}## ${title}\n\n${content}`);
    return this;
  }

  /**
   * Add tool context
   */
  addToolContext(tools: any[]): this {
    let toolContext = '### Available Tools\n\n';
    tools.forEach((tool) => {
      toolContext += `- **${tool.name}**: ${tool.description}\n`;
    });
    this.sections.set('Tools', toolContext);
    return this;
  }

  /**
   * Add current state
   */
  addState(state: Record<string, any>): this {
    let stateContext = '### Current State\n\n```json\n';
    stateContext += JSON.stringify(state, null, 2);
    stateContext += '\n```';
    this.sections.set('State', stateContext);
    return this;
  }

  /**
   * Add examples
   */
  addExamples(examples: Array<{ input: string; output: string }>): this {
    let exampleContext = '### Examples\n\n';
    examples.forEach((ex, idx) => {
      exampleContext += `**Example ${idx + 1}:**\n`;
      exampleContext += `Input: ${ex.input}\n`;
      exampleContext += `Output: ${ex.output}\n\n`;
    });
    this.sections.set('Examples', exampleContext);
    return this;
  }

  /**
   * Build final context string, respecting token limits
   */
  build(): { context: string; truncated: boolean } {
    let finalContext = '';
    let truncated = false;

    // Prioritize high-priority sections
    const ordered = Array.from(this.sections.entries()).sort((_, b) => {
      const bIsHigh = b[1].includes('⭐');
      return bIsHigh ? 1 : -1;
    });

    for (const [_, content] of ordered) {
      if (finalContext.length + content.length <= this.maxLength) {
        finalContext += content + '\n\n';
      } else {
        truncated = true;
        break;
      }
    }

    return {
      context: finalContext.trim(),
      truncated,
    };
  }

  /**
   * Clear all sections
   */
  clear(): this {
    this.sections.clear();
    return this;
  }

  /**
   * Get size statistics
   */
  getStats(): { sections: number; totalLength: number; withinLimit: boolean } {
    let totalLength = 0;
    for (const content of this.sections.values()) {
      totalLength += content.length;
    }

    return {
      sections: this.sections.size,
      totalLength,
      withinLimit: totalLength <= this.maxLength,
    };
  }
}

/**
 * Format context for better readability and structure
 */
export function formatContext(context: string): string {
  // Add visual separators
  const sections = context.split('##');
  let formatted = sections[0];

  for (let i = 1; i < sections.length; i++) {
    formatted += '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    formatted += '##' + sections[i];
  }

  return formatted;
}

/**
 * Extract key information from context
 */
export function extractContextMetadata(context: string): {
  sections: string[];
  wordCount: number;
  estimatedTokens: number;
} {
  const sections = context.match(/##\s+(\w+)/g) || [];
  const sectionNames = sections.map((s) => s.replace('## ', '').trim());

  const wordCount = context.split(/\s+/).length;
  const estimatedTokens = Math.ceil(context.length / 4); // Rough estimate

  return {
    sections: sectionNames,
    wordCount,
    estimatedTokens,
  };
}

/**
 * Merge multiple contexts intelligently
 */
export function mergeContexts(
  contexts: Array<{ title: string; content: string; priority: number }>
): string {
  // Sort by priority (higher first)
  const sorted = contexts.sort((a, b) => b.priority - a.priority);

  return sorted.map((ctx) => `## ${ctx.title}\n\n${ctx.content}`).join('\n\n');
}
