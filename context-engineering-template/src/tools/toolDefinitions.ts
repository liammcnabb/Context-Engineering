/**
 * Tool Definitions for Context Engineering
 * 
 * This module defines a schema-based tool system where each tool has:
 * - name: Unique identifier
 * - description: What the tool does (guides AI execution)
 * - parameters: Input schema with types and constraints
 * - execute: The actual implementation
 */

export interface ToolParameter {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'array' | 'object';
  description: string;
  required: boolean;
  enum?: string[];
}

export interface ToolDefinition {
  name: string;
  description: string;
  parameters: ToolParameter[];
  execute: (params: Record<string, any>) => Promise<any>;
}

// Example Tool 1: File Reader
export const fileReaderTool: ToolDefinition = {
  name: 'read_file',
  description: 'Read contents of a file from the filesystem',
  parameters: [
    {
      name: 'filePath',
      type: 'string',
      description: 'Absolute path to the file to read',
      required: true,
    },
    {
      name: 'encoding',
      type: 'string',
      description: 'File encoding (utf8, ascii, etc)',
      required: false,
      enum: ['utf8', 'ascii', 'utf16le'],
    },
  ],
  execute: async (params) => {
    // Simulated implementation
    console.log(`Reading file: ${params.filePath}`);
    return {
      success: true,
      content: `File content from ${params.filePath}`,
      encoding: params.encoding || 'utf8',
    };
  },
};

// Example Tool 2: Code Analyzer
export const codeAnalyzerTool: ToolDefinition = {
  name: 'analyze_code',
  description: 'Analyze code for complexity, patterns, and potential issues',
  parameters: [
    {
      name: 'code',
      type: 'string',
      description: 'Code snippet to analyze',
      required: true,
    },
    {
      name: 'language',
      type: 'string',
      description: 'Programming language of the code',
      required: true,
      enum: ['javascript', 'typescript', 'python', 'java', 'cpp'],
    },
    {
      name: 'analyzeFor',
      type: 'array',
      description: 'What aspects to analyze',
      required: false,
    },
  ],
  execute: async (params) => {
    console.log(`Analyzing ${params.language} code...`);
    return {
      success: true,
      language: params.language,
      complexity: 'moderate',
      issues: [],
      suggestions: ['Add type hints', 'Extract duplicated logic'],
    };
  },
};

// Example Tool 3: Documentation Generator
export const docGeneratorTool: ToolDefinition = {
  name: 'generate_docs',
  description: 'Generate documentation from code or descriptions',
  parameters: [
    {
      name: 'input',
      type: 'string',
      description: 'Code or text to document',
      required: true,
    },
    {
      name: 'format',
      type: 'string',
      description: 'Output documentation format',
      required: true,
      enum: ['markdown', 'jsdoc', 'rst', 'html'],
    },
    {
      name: 'includeExamples',
      type: 'boolean',
      description: 'Whether to include usage examples',
      required: false,
    },
  ],
  execute: async (params) => {
    console.log(`Generating ${params.format} documentation...`);
    return {
      success: true,
      format: params.format,
      documentation: '# Generated Documentation\n\n...',
      wordCount: 150,
    };
  },
};

// Tool Registry for easy access
export const toolRegistry: Map<string, ToolDefinition> = new Map([
  [fileReaderTool.name, fileReaderTool],
  [codeAnalyzerTool.name, codeAnalyzerTool],
  [docGeneratorTool.name, docGeneratorTool],
]);

/**
 * Execute a tool by name with provided parameters
 * This demonstrates proper tool invocation
 */
export async function executeTool(
  toolName: string,
  params: Record<string, any>
): Promise<any> {
  const tool = toolRegistry.get(toolName);
  if (!tool) {
    throw new Error(`Tool not found: ${toolName}`);
  }

  console.log(`\n📌 Executing tool: ${toolName}`);
  console.log(`Parameters:`, params);

  try {
    const result = await tool.execute(params);
    console.log(`✅ Tool execution successful`);
    return result;
  } catch (error) {
    console.error(`❌ Tool execution failed:`, error);
    throw error;
  }
}

/**
 * Get tool definitions for context - useful for providing to AI
 * This can be formatted and included in prompts to guide tool usage
 */
export function getToolDefinitionsForContext(): string {
  let contextStr = '# Available Tools\n\n';

  toolRegistry.forEach((tool) => {
    contextStr += `## ${tool.name}\n`;
    contextStr += `${tool.description}\n\n`;
    contextStr += `### Parameters:\n`;

    tool.parameters.forEach((param) => {
      const required = param.required ? '(required)' : '(optional)';
      contextStr += `- **${param.name}** ${required}: ${param.description}\n`;
      if (param.enum) {
        contextStr += `  Options: ${param.enum.join(', ')}\n`;
      }
    });

    contextStr += '\n';
  });

  return contextStr;
}
