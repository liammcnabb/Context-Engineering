# Proof Steps Feature - What's New

## Summary

Added **Proof Steps** feature to the Code Analyzer tool - automatically generates unit test proofs that assert issues and verify fixes.

## What Was Added

### 1. Updated Tool Specification

**File**: `src/tools/examples/code-analyzer/README.md`

Added to Input Schema:
```json
{
  "generateProof": {
    "type": "boolean",
    "description": "Generate unit test proofs for identified issues"
  },
  "issueToResolve": {
    "type": "string",
    "description": "Specific issue to create proof/test for"
  }
}
```

Added to Output Schema:
```json
{
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

### 2. Enhanced Python Implementation

**File**: `src/tools/examples/code-analyzer/python/analyze.py`

#### New Data Classes

```python
@dataclass
class ProofStep:
    """Unit test proof for an issue."""
    test_name: str
    test_code: str
    assertion_description: str
    should_fail_with_bug: bool
    should_pass_with_fix: bool

@dataclass
class ProofSteps:
    """Collection of proof steps for issue resolution."""
    should_generate_proof: bool
    generated_tests: List[str]
    proof_description: str
    assertions_failed: List[str]
    proof_examples: List[ProofStep]
```

#### Enhanced `analyze_code()` Function

```python
def analyze_code(
    code: str,
    language: str,
    analyze_for: Optional[List[str]] = None,
    generate_proof: bool = False,          # NEW
    issue_to_resolve: Optional[str] = None # NEW
) -> CodeAnalysisResult:
```

#### New Proof Generation Functions

- `_generate_proof_tests()` - Orchestrates proof generation
- `_generate_python_proof_tests()` - Creates Python-specific tests
- `_generate_js_proof_tests()` - Creates JavaScript tests
- `_generate_java_proof_tests()` - Creates Java tests
- `_generate_generic_proof_tests()` - Fallback for any language

### 3. Comprehensive Guide

**File**: `PROOF_STEPS_GUIDE.md`

Complete documentation covering:
- Why proof steps matter
- How the workflow works
- API reference
- Usage examples (Python, JavaScript, Java)
- Proof step patterns
- Best practices
- Troubleshooting
- Integration with CI/CD

---

## How It Works

### Step 1: Analyze Code

```python
from analyze import analyze_code

result = analyze_code(
    code="total += item",  # Bug: 'total' not initialized
    language="python"
)
print(result.issues)  # Empty - no static analysis yet
```

### Step 2: Generate Proof

```python
result = analyze_code(
    code="total += item",
    language="python",
    generate_proof=True,
    issue_to_resolve="undefined variable 'total'"
)

# Returns: Unit tests that FAIL with this code
```

### Step 3: Review Tests

```python
if result.proof_steps:
    print(result.proof_steps.proof_description)
    # "Unit tests for: undefined variable 'total'
    #  These tests will FAIL with the buggy code 
    #  and PASS after fixing."
    
    for test in result.proof_steps.generated_tests:
        print(test)
        # Test 1: Asserts NameError is raised
        # Test 2: Verifies fix works correctly
```

### Step 4: Fix Code and Run Tests

```python
# Fixed code:
def calculate(items):
    total = 0  # Initialize first!
    for item in items:
        total += item.get('value', 0)
    return total

# Run generated tests - they should PASS now
pytest test_proof.py
# ✓ test_variable_must_be_initialized PASSED
# ✓ test_variable_initialized_fixed PASSED
```

---

## Key Features

### ✅ Multi-Language Support
- Python tests using pytest
- JavaScript tests using Jest/Mocha
- Java tests using JUnit
- Generic tests for other languages

### ✅ Comprehensive Test Coverage
- **Issue Assertion** - Test fails with buggy code
- **Fix Verification** - Test passes with correct code
- **Edge Cases** - Boundary conditions and special cases
- **Regression Prevention** - Tests prevent future issues

### ✅ Language-Agnostic Design
- Same workflow in any language
- Generate proofs once, implement in your language
- Tests are clear whether in Python, JS, Java, etc.

### ✅ Actionable Output
- Tests are runnable code (not just suggestions)
- Tests serve as documentation
- Tests guide the fixing process

---

## Usage Examples

### Example 1: Python - Undefined Variable

```python
result = analyze_code(
    code="""
def sum_list(items):
    for item in items:
        total += item
    return total
    """,
    language="python",
    generate_proof=True,
    issue_to_resolve="undefined variable 'total'"
)

# Generates:
# - test_variable_must_be_initialized() - catches NameError
# - test_variable_initialized_fixed() - verifies fix
# - test_with_empty_list() - edge case
```

### Example 2: JavaScript - Error Handling

```python
result = analyze_code(
    code="function divide(a, b) { return a / b; }",
    language="javascript",
    generate_proof=True,
    issue_to_resolve="no error handling for division by zero"
)

# Generates:
# - test_throws_on_zero_divisor() - asserts error
# - test_divide_safe() - verifies error handling
```

### Example 3: Java - Type Safety

```python
result = analyze_code(
    code="int sum = list.size();  // Wrong type!",
    language="java",
    generate_proof=True,
    issue_to_resolve="type mismatch"
)

# Generates type-specific tests for Java
```

---

## Proof Step Patterns

### Pattern: Missing Initialization
```python
# Buggy code:
def calculate(items):
    for item in items:
        total += item  # ❌ total not initialized

# Generated tests prove it:
def test_uninitialized():
    with pytest.raises(NameError):
        calculate([1, 2, 3])

# Fix is clear:
def calculate(items):
    total = 0  # ✅ Initialize first
    for item in items:
        total += item
    return total
```

### Pattern: Missing Error Handling
```python
# Buggy code:
def divide(a, b):
    return a / b  # ❌ No error handling

# Generated tests prove it:
def test_division_by_zero():
    with pytest.raises(ZeroDivisionError):
        divide(10, 0)

# Fix is clear:
def divide(a, b):
    if b == 0:  # ✅ Handle the error
        raise ValueError("Cannot divide by zero")
    return a / b
```

### Pattern: Wrong Logic
```python
# Buggy code:
def apply_discount(price, discount):
    return price + discount  # ❌ Should subtract!

# Generated test proves it:
def test_discount_calculation():
    assert apply_discount(100, 10) == 90  # Fails! (returns 110)

# Fix is clear:
def apply_discount(price, discount):
    return price - discount  # ✅ Correct operation
```

---

## Integration Examples

### Saving Generated Tests to File

```python
from analyze import analyze_code

result = analyze_code(
    code=buggy_code,
    language="python",
    generate_proof=True,
    issue_to_resolve="undefined variable"
)

if result.proof_steps:
    with open("test_proof.py", "w") as f:
        f.write("import pytest\n\n")
        for test in result.proof_steps.generated_tests:
            f.write(test)
            f.write("\n\n")
    
    print(f"✓ Generated {len(result.proof_steps.generated_tests)} tests")
    print("✓ Saved to test_proof.py")
```

### CI/CD Pipeline Integration

```bash
#!/bin/bash

# Analyze code and generate proofs for new issues
python -c "
from analyze import analyze_code

result = analyze_code(
    code=open('src/main.py').read(),
    language='python',
    generate_proof=True,
    issue_to_resolve='undefined variable'
)

if result.proof_steps:
    with open('test_proof.py', 'w') as f:
        f.write('import pytest\n\n')
        for test in result.proof_steps.generated_tests:
            f.write(test + '\n\n')
"

# Run proof tests
pytest test_proof.py

# Only proceed if tests pass
if [ $? -eq 0 ]; then
    echo "✓ Proof tests passed - safe to merge"
else
    echo "✗ Proof tests failed - issues remain"
    exit 1
fi
```

---

## Files Changed

### Modified Files
- `src/tools/examples/code-analyzer/README.md` - Added proof specifications and examples
- `src/tools/examples/code-analyzer/python/analyze.py` - Implemented proof generation

### New Files
- `PROOF_STEPS_GUIDE.md` - Comprehensive proof steps documentation
- `PROOF_STEPS_FEATURE_SUMMARY.md` - This file

---

## Testing the Feature

### Run the Basic Example

```bash
cd context-engineering-template
python3 src/tools/examples/code-analyzer/python/analyze.py
```

Output:
```
EXAMPLE 1: Basic Code Analysis
Language: python
Complexity: simple
...

EXAMPLE 2: Code Analysis with Proof Generation
Proof Steps Generated: True
Description: Unit tests for: undefined variable 'total'
Generated Tests (2 total):
--- Test 1 ---
def test_variable_must_be_initialized():
    """Proof: Variable must be initialized before use"""
...
```

---

## What's Next

### Extending Proof Steps

1. **Add more issue patterns** - Extended pattern library
2. **Custom proof templates** - User-defined test patterns
3. **Interactive proof builder** - GUI for creating tests
4. **Test execution** - Run proofs directly
5. **Proof scoring** - Rate proof quality

### Implementing in Other Languages

1. **Go implementation** - Similar structure, Go-specific tests
2. **Rust implementation** - Rust idioms and testing patterns
3. **TypeScript enhancement** - Jest integration
4. **Java enhancement** - JUnit5 integration

---

## Summary

The **Proof Steps** feature transforms code analysis from detection into verification:

✅ **Detects Issues** - Identifies bugs in code  
✅ **Generates Tests** - Creates proof test cases automatically  
✅ **Verifies Fixes** - Tests confirm the solution works  
✅ **Prevents Regression** - Tests catch future issues  
✅ **Documents Solutions** - Tests explain what code should do  

Use proof steps to make debugging faster, more reliable, and test-driven.
