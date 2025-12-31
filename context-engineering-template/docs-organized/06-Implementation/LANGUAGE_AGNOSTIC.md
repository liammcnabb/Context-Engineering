# Context Engineering - Language Agnostic Guide

## 🎯 Core Principles (Language Independent)

Context Engineering is **completely language-agnostic**. The principles apply to any programming language or system.

### Universal Concepts

1. **Tool Definition** - Clearly specify what a tool does
   ```
   Name: "analyze_code"
   Description: "Analyze code for complexity and issues"
   Parameters: [
     { name: "code", type: "string", required: true },
     { name: "language", type: "string", required: true }
   ]
   Output: { complexity, issues, suggestions }
   ```

2. **Feedback Loop** - Track and measure results
   ```
   Execute tool → Record metrics → Analyze → Optimize
   ```

3. **Context Management** - Organize information strategically
   ```
   Prioritize information → Respect constraints → Build context
   ```

4. **Iteration** - Improve based on feedback
   ```
   Current context → Execute → Measure → Optimize → Repeat
   ```

---

## 🗂️ Improved Folder Structure

```
context-engineering-template/
├── docs/
│   ├── PRINCIPLES.md           ← Language-agnostic concepts
│   ├── GUIDE.md                ← Framework overview
│   └── ARCHITECTURE.md         ← Design patterns
│
├── src/
│   ├── core/                   ← Language-agnostic interfaces
│   │   ├── tool.schema.json    ← Tool definition schema
│   │   ├── feedback.schema.json ← Feedback metrics schema
│   │   └── context.schema.json  ← Context structure schema
│   │
│   ├── tools/
│   │   ├── examples/           ← Example tool implementations
│   │   │   ├── code-analyzer/
│   │   │   │   ├── README.md
│   │   │   │   ├── python/
│   │   │   │   ├── javascript/
│   │   │   │   └── go/
│   │   │   │
│   │   │   ├── file-reader/
│   │   │   │   ├── README.md
│   │   │   │   ├── python/
│   │   │   │   ├── javascript/
│   │   │   │   └── rust/
│   │   │   │
│   │   │   └── doc-generator/
│   │   │       ├── README.md
│   │   │       ├── python/
│   │   │       └── javascript/
│   │   │
│   │   └── YOUR_CUSTOM_TOOLS/  ← Your domain-specific tools
│   │
│   ├── feedback/               ← Language-agnostic feedback
│   │   ├── metrics.schema.json
│   │   ├── analyzer.py
│   │   ├── analyzer.js
│   │   └── analyzer.go
│   │
│   └── context/                ← Language-agnostic context
│       ├── builder.py
│       ├── builder.js
│       └── builder.go
│
├── examples/
│   ├── python/
│   │   ├── basic_workflow.py
│   │   ├── advanced_workflow.py
│   │   └── custom_tools.py
│   │
│   ├── javascript/
│   │   ├── basic-workflow.ts
│   │   ├── advanced-workflow.ts
│   │   └── custom-tools.ts
│   │
│   ├── go/
│   │   ├── basic_workflow.go
│   │   └── custom_tools.go
│   │
│   └── rust/
│       └── custom_tools.rs
│
└── README.md
```

---

## 📋 Tool Structure

Each tool should have its own folder with:

### `tools/examples/code-analyzer/README.md`
```markdown
# Code Analyzer Tool

## Description
Analyzes code for complexity, patterns, and potential issues.

## Input Schema
```json
{
  "code": "string (required)",
  "language": "string (required)",
  "analyzeFor": "array (optional)"
}
```

## Output Schema
```json
{
  "success": "boolean",
  "complexity": "string",
  "issues": "array",
  "suggestions": "array"
}
```

## Implementations
- Python: `python/analyze.py`
- JavaScript: `javascript/analyze.ts`
- Go: `go/analyze.go`
```

### `tools/examples/code-analyzer/python/analyze.py`
```python
def analyze_code(code: str, language: str, analyze_for: list = None) -> dict:
    """
    Analyze code for complexity and issues.
    
    Args:
        code: Code snippet to analyze
        language: Programming language
        analyze_for: Optional list of aspects to analyze
    
    Returns:
        dict with complexity, issues, and suggestions
    """
    # Implementation
    return {
        "success": True,
        "complexity": "moderate",
        "issues": [],
        "suggestions": ["Add type hints"]
    }
```

### `tools/examples/code-analyzer/javascript/analyze.ts`
```typescript
interface CodeAnalysisResult {
  success: boolean;
  complexity: 'simple' | 'moderate' | 'complex';
  issues: string[];
  suggestions: string[];
}

export async function analyzeCode(
  code: string,
  language: string,
  analyzeFor?: string[]
): Promise<CodeAnalysisResult> {
  // Implementation
  return {
    success: true,
    complexity: 'moderate',
    issues: [],
    suggestions: ['Add type hints']
  };
}
```

---

## 🔄 Feedback Metrics (Language Agnostic)

All languages should track the same metrics:

```json
{
  "toolName": "string",
  "timestamp": "number (milliseconds since epoch)",
  "success": "boolean",
  "executionTime": "number (milliseconds)",
  "contextTokensUsed": "number",
  "outputQuality": "excellent | good | fair | poor",
  "feedback": "string (optional)"
}
```

### Python Implementation
```python
from dataclasses import dataclass
from datetime import datetime
from typing import Literal

@dataclass
class ExecutionMetrics:
    tool_name: str
    timestamp: float
    success: bool
    execution_time: float  # milliseconds
    context_tokens_used: int
    output_quality: Literal['excellent', 'good', 'fair', 'poor']
    feedback: str = None
```

### Go Implementation
```go
type ExecutionMetrics struct {
    ToolName          string
    Timestamp         int64   // milliseconds since epoch
    Success           bool
    ExecutionTime     float64 // milliseconds
    ContextTokensUsed int
    OutputQuality     string  // "excellent", "good", "fair", "poor"
    Feedback          *string
}
```

---

## 🎯 Universal Workflow

Every language implementation should follow:

```
1. BUILD CONTEXT
   ├─ Gather information from multiple sources
   ├─ Prioritize by importance (high/medium/low)
   └─ Respect token budget

2. EXECUTE TOOL
   ├─ Pass context to tool
   ├─ Tool performs its function
   └─ Tool returns structured result

3. RECORD FEEDBACK
   ├─ Capture all metrics
   ├─ Store in standardized format
   └─ Log for analysis

4. ANALYZE RESULTS
   ├─ Calculate success rate
   ├─ Identify patterns
   └─ Generate recommendations

5. OPTIMIZE CONTEXT
   ├─ Apply recommendations
   ├─ Adjust priorities
   └─ Prepare for next iteration

6. ITERATE
   └─ Repeat with improved context
```

---

## 🛠️ Implementing in Your Language

### Step 1: Define Tool Schema

Create `tools/your-tool/README.md`:
```markdown
# Your Tool Name

## Description
What this tool does

## Input Schema
```json
{ "param1": "type", "param2": "type" }
```

## Output Schema
```json
{ "result": "type", "metadata": "type" }
```

## Implementations
- Your language: `your-language/`
```

### Step 2: Create Tool Implementation

In your language of choice:
```pseudocode
FUNCTION execute_tool(name, parameters):
  VALIDATE parameters against schema
  EXECUTE tool logic
  RETURN structured result
```

### Step 3: Record Metrics

All implementations must track:
- Tool name
- Timestamp
- Success/failure
- Execution time
- Tokens used
- Output quality (self-assessed)

### Step 4: Analyze Feedback

Calculate across all executions:
- Success rate: successes / total
- Average execution time
- Quality distribution
- Optimization recommendations

### Step 5: Iterate

Adjust context based on metrics and re-execute.

---

## 📊 Example: Multi-Language Tool

### Tool: Code Formatter

**Common Interface** (all languages):
```json
{
  "name": "format_code",
  "description": "Format code according to style guide",
  "input": {
    "code": "string",
    "language": "string",
    "style": "string (optional)"
  },
  "output": {
    "success": "boolean",
    "formatted_code": "string",
    "changes": "integer"
  }
}
```

**Python Implementation**:
```python
def format_code(code: str, language: str, style: str = None) -> dict:
    # Use language-specific formatter
    formatted = formatter.format(code)
    return {
        "success": True,
        "formatted_code": formatted,
        "changes": count_changes(code, formatted)
    }
```

**JavaScript Implementation**:
```typescript
async function formatCode(
  code: string, 
  language: string, 
  style?: string
): Promise<FormatResult> {
  const formatted = await formatter.format(code);
  return {
    success: true,
    formatted_code: formatted,
    changes: countChanges(code, formatted)
  };
}
```

**Go Implementation**:
```go
func FormatCode(code, language, style string) map[string]interface{} {
    formatted := formatter.Format(code)
    return map[string]interface{}{
        "success": true,
        "formatted_code": formatted,
        "changes": countChanges(code, formatted),
    }
}
```

---

## 🔗 Connecting Across Languages

### Option 1: REST API
Each tool can be a microservice:
```
POST /tools/format_code
Content-Type: application/json

{
  "code": "...",
  "language": "python",
  "style": "pep8"
}
```

### Option 2: Message Queue
Tools communicate via message queue:
```
Queue: tool-requests
Message: {
  "tool": "format_code",
  "parameters": {...},
  "request_id": "uuid"
}

Queue: tool-responses
Message: {
  "request_id": "uuid",
  "result": {...},
  "metrics": {...}
}
```

### Option 3: Shared Data Format
All tools write/read standardized JSON:
```json
{
  "execution_id": "uuid",
  "tool": "format_code",
  "input": {...},
  "output": {...},
  "metrics": {...}
}
```

---

## 💡 Key Takeaways

1. **Context Engineering is Universal** - Principles apply to any language
2. **Tools are Language-Specific** - Implement in whatever language fits
3. **Metrics are Standardized** - All tools report same metrics
4. **Workflows are Consistent** - All implementations follow same pattern
5. **Feedback is Shared** - All languages feed into same analysis loop

---

## 📚 Learn More

- `docs/PRINCIPLES.md` - Core concepts
- `docs/GUIDE.md` - Detailed guide
- `examples/` - Language-specific examples
- `src/tools/examples/` - Reference implementations

---

## 🎯 Next Steps

1. **Choose Your Language** - Pick where to implement
2. **Define Your Tools** - What problems do you need to solve?
3. **Create Tool Folders** - One folder per tool
4. **Implement** - Write tool in your language
5. **Record Metrics** - Track performance
6. **Analyze & Iterate** - Use feedback to improve

**Context Engineering works in any language!** 🚀
