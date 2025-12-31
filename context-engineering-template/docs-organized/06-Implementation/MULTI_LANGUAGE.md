# Context Engineering - Multi-Language Structure

## 🎯 Why Language-Agnostic?

Context engineering **principles are universal** - they work in any programming language, framework, or system. The template now supports multiple languages while maintaining consistent concepts.

## 📁 New Structure

```
context-engineering-template/
├── LANGUAGE_AGNOSTIC.md        ← Core concepts
│
├── src/
│   ├── tools/
│   │   └── examples/
│   │       └── code-analyzer/
│   │           ├── README.md      (Tool specification)
│   │           ├── python/
│   │           │   └── analyze.py
│   │           ├── javascript/
│   │           │   └── analyze.ts
│   │           └── go/
│   │               └── analyze.go
│   │
│   ├── feedback/
│   │   ├── typescript/           (Original implementation)
│   │   │   └── feedbackLoop.ts
│   │   ├── python/               (New!)
│   │   │   └── feedback.py
│   │   └── go/
│   │       └── feedback.go
│   │
│   └── context/
│       ├── typescript/           (Original)
│       ├── python/               (New!)
│       │   └── builder.py
│       └── go/
│           └── builder.go
│
├── examples/
│   ├── typescript/
│   │   ├── quickstart.ts
│   │   ├── basic-workflow.ts
│   │   └── advanced-workflow.ts
│   │
│   └── python/                  (New!)
│       ├── quickstart.py
│       ├── basic_workflow.py
│       └── advanced_workflow.py
│
└── docs/
    ├── PRINCIPLES.md           (Universal concepts)
    └── GUIDE.md                (How to use any language)
```

## 🔄 Key Benefits

### 1. **Choose Your Language**
Use TypeScript for frameworks, Python for data science, Go for performance, Rust for systems programming - all work with context engineering.

### 2. **Reusable Concepts**
- Tool schemas are language-agnostic
- Metrics are standardized
- Workflows are universal

### 3. **Easy Integration**
Connect tools across languages via:
- REST APIs
- Message queues
- Shared data formats
- Function calls

### 4. **Modular Tools**
Each tool can have:
- Multiple implementations
- Language-specific optimizations
- Native integrations

## 💻 Using Python Implementation

### Run Python Demo
```bash
python3 examples/python/quickstart.py
```

### Use Python Tools
```python
from src.feedback.python.feedback import FeedbackAnalyzer, ExecutionMetrics
from src.context.python.builder import ContextBuilder
from src.tools.examples.code_analyzer.python.analyze import analyze_code

# Build context
builder = ContextBuilder()
builder.add_section('Task', 'Analyze code', 'high')
context, truncated = builder.build()

# Analyze code
result = analyze_code(code="def add(a, b): return a + b", language="python")

# Track feedback
analyzer = FeedbackAnalyzer()
analyzer.record(ExecutionMetrics(...))
```

## 🛠️ Creating Tools

### Step 1: Define Tool Schema
Create `src/tools/examples/your-tool/README.md`:
```markdown
# Your Tool Name

## Description
What it does

## Input Schema
JSON schema for inputs

## Output Schema
JSON schema for outputs

## Implementations
- Python: `python/`
- JavaScript: `javascript/`
```

### Step 2: Implement in Any Language

**Python** (`python/tool.py`):
```python
def your_tool(param1: str, param2: str) -> dict:
    # Implementation
    return {"success": True, "result": "..."}
```

**JavaScript** (`javascript/tool.ts`):
```typescript
export async function yourTool(
  param1: string,
  param2: string
): Promise<ToolResult> {
  // Implementation
  return { success: true, result: "..." };
}
```

**Go** (`go/tool.go`):
```go
func YourTool(param1, param2 string) map[string]interface{} {
    // Implementation
    return map[string]interface{}{"success": true, "result": "..."}
}
```

### Step 3: Follow Standard Metrics
All implementations track:
- `toolName`
- `timestamp`
- `success`
- `executionTime`
- `contextTokensUsed`
- `outputQuality`

## 📊 Example: Multi-Language Tool

### Tool: Format Code

**Specification** (`README.md`):
```
Input: code (string), language (string), style (optional)
Output: formatted_code (string), changes (integer)
```

**Python** (`python/format.py`):
```python
def format_code(code: str, language: str) -> dict:
    # Use black for Python, autopep8, etc
    formatted = formatter.format(code)
    return {"formatted_code": formatted}
```

**JavaScript** (`javascript/format.ts`):
```typescript
async function formatCode(code: string, language: string) {
  const formatted = await prettier.format(code);
  return { formatted_code: formatted };
}
```

**Go** (`go/format.go`):
```go
func FormatCode(code, language string) map[string]interface{} {
    formatted := format.Format(code)
    return map[string]interface{}{"formatted_code": formatted}
}
```

## 🔗 Connecting Languages

### Option 1: Direct Function Calls
```python
# Python calling Go
from subprocess import run
result = run(['./tool_binary', code], capture_output=True)
```

### Option 2: REST API
```python
# Python calling JavaScript service
import requests
response = requests.post('http://localhost:3000/format', json={"code": code})
```

### Option 3: Message Queue
```python
# Using RabbitMQ
channel.basic_publish(
    exchange='tools',
    routing_key='format_code',
    body=json.dumps({"code": code})
)
```

## 🎯 Quick Start - Multi-Language

### TypeScript (Original)
```bash
npm install
npm start
npm run demo:basic
```

### Python (New!)
```bash
python3 examples/python/quickstart.py
python3 -m examples.python.basic_workflow
```

### Go (Coming Soon!)
```bash
go run examples/go/quickstart.go
```

## 📚 Learn More

- `LANGUAGE_AGNOSTIC.md` - Full multi-language guide
- `docs/GUIDE.md` - Concepts and patterns
- `src/tools/examples/` - Reference implementations
- `examples/` - Language-specific examples

## ✨ Best Practices

1. **Define Tool Schemas First** - Language-agnostic specification
2. **Implement in Multiple Languages** - Reuse tool definitions
3. **Standardize Metrics** - All languages report same metrics
4. **Test Integration** - Verify cross-language communication
5. **Document Thoroughly** - Help other developers understand

## 🚀 Next Steps

1. **Try Python Implementation**
   ```bash
   python3 examples/python/quickstart.py
   ```

2. **Create Your First Tool**
   - Define schema in README.md
   - Implement in your language
   - Test with feedback loop

3. **Add Another Language**
   - Choose: Go, Rust, Java, etc.
   - Create parallel implementation
   - Connect via REST or queue

4. **Deploy**
   - Package tools as services
   - Use message queues for communication
   - Monitor with standardized metrics

---

**Context Engineering works in ANY language!** Choose what fits your needs. 🎉
