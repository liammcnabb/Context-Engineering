# Code Analyzer Tool

## Description
Analyzes code snippets for complexity, patterns, and potential issues.

## Input Schema
```json
{
  "code": {
    "type": "string",
    "description": "Code snippet to analyze",
    "required": true
  },
  "language": {
    "type": "string",
    "description": "Programming language",
    "required": true,
    "enum": ["python", "javascript", "typescript", "java", "cpp", "go", "rust"]
  },
  "analyzeFor": {
    "type": "array",
    "description": "Aspects to analyze (optional)",
    "items": {"type": "string"}
  },
  "generateProof": {
    "type": "boolean",
    "description": "Generate unit test proofs for identified issues",
    "required": false
  },
  "issueToResolve": {
    "type": "string",
    "description": "Specific issue to create proof/test for (required if generateProof is true)",
    "required": false
  }
}
```

## Output Schema
```json
{
  "success": {
    "type": "boolean",
    "description": "Whether analysis succeeded"
  },
  "language": {
    "type": "string",
    "description": "Language analyzed"
  },
  "complexity": {
    "type": "string",
    "enum": ["simple", "moderate", "complex"],
    "description": "Code complexity level"
  },
  "issues": {
    "type": "array",
    "items": {"type": "string"},
    "description": "Identified issues"
  },
  "suggestions": {
    "type": "array",
    "items": {"type": "string"},
    "description": "Improvement suggestions"
  },
  "proofSteps": {
    "type": "object",
    "description": "Proof/test generation for issue resolution",
    "properties": {
      "shouldGenerateProof": {"type": "boolean"},
      "generatedTests": {"type": "array", "items": {"type": "string"}},
      "proofDescription": {"type": "string"},
      "assertionsFailed": {"type": "array", "items": {"type": "string"}}
    }
  }
}
```

- **Go** - `go/analyze.go`
- **Rust** - `rust/analyze.rs`

## Proof Steps

When `generateProof` is true, the tool generates unit tests that:
1. **Assert the Issue Exists** - Tests that fail with the buggy code
2. **Verify the Fix** - Tests that pass with corrected code
3. **Edge Cases** - Tests for boundary conditions
4. **Regression Prevention** - Tests to prevent future issues

Example proof output:
```python
# Test that asserts the issue
def test_calculate_total_initialized():
    """Proof: 'total' must be initialized before use"""
    with pytest.raises(NameError):
        calculate([{"price": 10}])  # Fails: total not defined

# Fixed code would pass:
def test_calculate_total_fixed():
    """Proof: Initialized total works correctly"""
    assert calculate([{"price": 10}]) == 10
```

## Implementations

## Usage Example

### Python - Basic Analysis
```python
from analyze import analyze_code

result = analyze_code(
    code="def add(a, b): return a + b",
    language="python"
)
print(result)  # {success: True, complexity: 'simple', ...}
```

### Python - With Proof Generation
```python
from analyze import analyze_code

result = analyze_code(
    code="def calculate(items):\n    for item in items:\n        total += item",
    language="python",
    generate_proof=True,
    issue_to_resolve="undefined variable 'total'"
)
# Returns analysis + unit tests that would catch the issue
# proofSteps.generatedTests contains test code that fails with buggy code
```

### JavaScript
```typescript
import { analyzeCode } from './analyze';

const result = await analyzeCode({
  code: 'const add = (a, b) => a + b;',
  language: 'javascript'
});
console.log(result);  // {success: true, complexity: 'simple', ...}
```

### Go
```go
package main

import "analyze"

func main() {
    result := analyze.AnalyzeCode(analyze.CodeInput{
        Code: "func Add(a, b int) int { return a + b }",
        Language: "go",
    })
    // result.Success, result.Complexity, etc.
}
```

## Metrics to Track

When using this tool, record:
- `toolName`: "code_analyzer"
- `executionTime`: Time in milliseconds
- `outputQuality`: Quality of analysis (excellent/good/fair/poor)
- `success`: Whether analysis completed
- `proofGenerated`: Whether proof steps were created
- `testsCovered`: Number of test cases generated (if proof enabled)

## Notes

This is a reference implementation. Actual analysis complexity depends on:
- Code parsing capabilities
- Language-specific patterns
- Available linters/analysis tools
- Integration with language servers (LSP)
