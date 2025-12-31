# Getting Started with Context Engineering Template

## 📦 Installation

### Option 1: Using npm

```bash
cd context-engineering-template

# Install dependencies
npm install

# Run the quick start demo
npm start

# Run other examples
npm run demo:basic
npm run demo:advanced
```

### Option 2: Using TypeScript directly

```bash
cd context-engineering-template

# Install TypeScript and ts-node globally (if not already installed)
npm install -g typescript ts-node

# Run examples
ts-node examples/quickstart.ts
ts-node examples/basic-workflow.ts
ts-node examples/advanced-workflow.ts
```

### Option 3: Compile to JavaScript

```bash
# Compile TypeScript to JavaScript
npm run build

# Run compiled examples
node dist/examples/quickstart.js
node dist/examples/basic-workflow.js
node dist/examples/advanced-workflow.js
```

## 🎯 First Steps

### 1. Explore the Structure
```bash
# View the main components
ls src/
# Output: tools/, feedback/, utils/, index.ts

ls examples/
# Output: quickstart.ts, basic-workflow.ts, advanced-workflow.ts

ls docs/
# Output: GUIDE.md, ARCHITECTURE.md, STRUCTURE.md
```

### 2. Read the Overview
Open and read:
1. `README.md` - Project overview
2. `docs/GUIDE.md` - Learning guide
3. `docs/STRUCTURE.md` - What's included

### 3. Run the Quick Start
```bash
npm start
```

This will show you:
- How to build context
- How to execute tools
- How to use feedback loops
- How to optimize context

### 4. Review the Examples

#### Basic Workflow (Good starting point)
```bash
npm run demo:basic
```

Demonstrates:
- Building context with priorities
- Executing analysis tools
- Recording feedback
- Multi-tool workflows

#### Advanced Workflow (After basics)
```bash
npm run demo:advanced
```

Demonstrates:
- Iterative refinement
- Multi-priority contexts
- Adaptive optimization
- Advanced patterns

## 🔨 Creating Your First Tool

### Step 1: Understand the Tool Structure
```typescript
interface ToolDefinition {
  name: string;              // e.g., 'my_tool'
  description: string;       // What it does
  parameters: ToolParameter[]; // Input schema
  execute: (params) => Promise<any>; // Implementation
}
```

### Step 2: Create a Tool File
Create `src/tools/myFirstTool.ts`:

```typescript
import { ToolDefinition } from './toolDefinitions';

export const myFirstTool: ToolDefinition = {
  name: 'greet',
  description: 'Greets a person by name',
  parameters: [
    {
      name: 'name',
      type: 'string',
      description: 'The person to greet',
      required: true,
    },
    {
      name: 'formal',
      type: 'boolean',
      description: 'Whether to use formal greeting',
      required: false,
    },
  ],
  execute: async (params) => {
    const greeting = params.formal 
      ? `Good day, ${params.name}`
      : `Hi ${params.name}`;
    
    return {
      success: true,
      message: greeting,
      timestamp: new Date().toISOString(),
    };
  },
};
```

### Step 3: Register Your Tool
In `src/tools/toolDefinitions.ts`, add:

```typescript
import { myFirstTool } from './myFirstTool';

toolRegistry.set(myFirstTool.name, myFirstTool);
```

### Step 4: Use Your Tool
```typescript
import { executeTool } from './src/index';

const result = await executeTool('greet', {
  name: 'Alice',
  formal: false,
});

console.log(result.message); // "Hi Alice"
```

## 📊 Setting Up Feedback

### Step 1: Initialize Feedback Manager
```typescript
import { FeedbackLoopManager } from './src/index';

const feedbackManager = new FeedbackLoopManager();
```

### Step 2: Record Executions
```typescript
feedbackManager.recordExecution({
  toolName: 'greet',
  success: true,
  executionTime: 25,
  contextTokensUsed: 800,
  outputQuality: 'excellent',
  feedback: 'Greeting was appropriate and well-formatted',
});
```

### Step 3: Analyze Results
```typescript
const feedback = feedbackManager.analyzeFeedback();

console.log('Success Rate:', feedback.successRate);
console.log('Avg Time:', feedback.avgExecutionTime);
console.log('Recommendations:', feedback.recommendations);
```

### Step 4: Generate Report
```typescript
const report = feedbackManager.generateReport();
console.log(report);
```

## 🏗️ Building Context

### Step 1: Create Builder
```typescript
import { ContextBuilder } from './src/index';

const builder = new ContextBuilder(8000); // token limit
```

### Step 2: Add Sections
```typescript
builder
  .addSection(
    'System Instructions',
    'You are a helpful assistant',
    'high'  // priority
  )
  .addSection(
    'Current Task',
    'Answer the user question',
    'high'
  )
  .addSection(
    'Background Info',
    'Some context...',
    'medium'
  );
```

### Step 3: Add Examples
```typescript
builder.addExamples([
  {
    input: 'What is 2+2?',
    output: '2+2 equals 4',
  },
  {
    input: 'What is 3*5?',
    output: '3*5 equals 15',
  },
]);
```

### Step 4: Build and Check
```typescript
const { context, truncated } = builder.build();

console.log('Context size:', context.length);
if (truncated) {
  console.warn('Context was truncated to fit token limit');
}
```

## 🔄 Complete Workflow Example

```typescript
import {
  ContextBuilder,
  FeedbackLoopManager,
  ContextOptimizer,
  executeTool,
} from './src/index';

// 1. Build context
const builder = new ContextBuilder();
builder.addSection('Task', 'Analyze this code', 'high');
const { context } = builder.build();

// 2. Execute tool
const result = await executeTool('analyze_code', {
  code: 'function add(a, b) { return a + b; }',
  language: 'javascript',
});

// 3. Record feedback
const feedbackManager = new FeedbackLoopManager();
feedbackManager.recordExecution({
  toolName: 'analyze_code',
  success: result.success,
  executionTime: 45,
  contextTokensUsed: 1200,
  outputQuality: 'good',
});

// 4. Analyze
const feedback = feedbackManager.analyzeFeedback();
console.log(`Success rate: ${feedback.successRate * 100}%`);

// 5. Optimize for next iteration
const optimizer = new ContextOptimizer(feedbackManager);
const optimized = optimizer.optimizeContext(context);
console.log(`Optimization applied: ${optimized.optimizations.length} changes`);

// 6. Use optimized context for next execution
// ... repeat with better context
```

## 📚 Common Tasks

### Creating Multiple Tools
```typescript
const tools = [
  fileTool,
  codeAnalyzerTool,
  docGeneratorTool,
  myFirstTool,
];

tools.forEach(tool => {
  toolRegistry.set(tool.name, tool);
});
```

### Chaining Tools
```typescript
// Read file
const fileContent = await executeTool('read_file', {
  filePath: '/src/app.ts',
});

// Analyze the content
const analysis = await executeTool('analyze_code', {
  code: fileContent.content,
  language: 'typescript',
});

// Generate docs
const docs = await executeTool('generate_docs', {
  input: fileContent.content,
  format: 'markdown',
});
```

### Managing Token Budget
```typescript
const builder = new ContextBuilder(4000); // 4000 token limit

builder
  .addSection('Critical', 'Essential info', 'high')
  .addSection('Important', 'Important info', 'medium')
  .addSection('Reference', 'Optional reference', 'low');

const { context, truncated } = builder.build();

if (truncated) {
  // Remove low-priority sections and rebuild
  // or adjust token budget
}
```

## 🚀 Next Steps

1. **Master the Basics**
   - Run all examples
   - Read all documentation
   - Create your first tool

2. **Build Your System**
   - Create domain-specific tools
   - Set up feedback loops
   - Build context for your task

3. **Iterate and Optimize**
   - Track metrics
   - Analyze feedback
   - Refine context
   - Repeat

4. **Integrate with AI**
   - Use tools in AI prompts
   - Provide structured context
   - Implement feedback loops
   - Deploy in production

## 🆘 Troubleshooting

### TypeScript Errors
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Rebuild everything
npm run clean
npm run build
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Examples Won't Run
```bash
# Make sure ts-node is installed
npm install -g ts-node typescript

# Run with explicit node path
NODE_PATH=. ts-node examples/quickstart.ts
```

## 📖 Documentation Files

| File | Purpose |
|------|---------|
| README.md | Project overview |
| GETTING_STARTED.md | This file - Setup and first steps |
| docs/GUIDE.md | Complete learning guide |
| docs/ARCHITECTURE.md | System design and internals |
| docs/STRUCTURE.md | File structure and components |

## 💡 Tips & Tricks

1. **Start simple**: Begin with the basic examples before advanced patterns
2. **Read descriptions**: Tool descriptions guide AI behavior
3. **Track metrics**: Always record feedback for analysis
4. **Test iteratively**: Build, test, optimize, repeat
5. **Manage tokens**: Stay aware of context size limits
6. **Use priorities**: High-priority context comes first
7. **Document well**: Clear comments help future iterations

## 🎓 Learning Resources

- **Beginner**: quickstart.ts → basic-workflow.ts → GUIDE.md
- **Intermediate**: advanced-workflow.ts → Create custom tools
- **Advanced**: ARCHITECTURE.md → System customization

---

**Ready to get started?** Run `npm start` and follow along with the interactive demo! 🚀
