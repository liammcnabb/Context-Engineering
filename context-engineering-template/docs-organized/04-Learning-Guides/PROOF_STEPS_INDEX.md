# Proof Steps Feature - Documentation Index

## Overview

This directory contains comprehensive documentation and implementation of the **Proof Steps** feature - automatically generated unit test proofs that assert issues and verify fixes.

---

## Quick Start

### For Developers
1. **Read**: `PROOF_STEPS_FEATURE_SUMMARY.md` (5 min)
2. **Understand**: `PROOF_STEPS_WORKFLOW_EXAMPLE.md` (10 min)
3. **Implement**: Use `analyze_code(..., generate_proof=True)`

### For Teams
1. **Overview**: `PROOF_STEPS_FEATURE_SUMMARY.md`
2. **Best Practices**: Section in `PROOF_STEPS_GUIDE.md`
3. **Integration**: `PROOF_STEPS_WORKFLOW_EXAMPLE.md`

### For Reference
- **Complete Guide**: `PROOF_STEPS_GUIDE.md`
- **API Details**: Section in `PROOF_STEPS_GUIDE.md`
- **Patterns**: Section in `PROOF_STEPS_COMPLETE_SUMMARY.md`

---

## Documentation Files

### 1. PROOF_STEPS_FEATURE_SUMMARY.md
**Length**: ~400 lines  
**Time to Read**: 10-15 minutes  
**Best For**: Quick overview and integration examples

**Sections**:
- What was added
- How it works (4-step process)
- Key features
- Usage examples
- Proof patterns
- Integration examples
- Files changed

**Read if**: You want to understand the feature quickly

---

### 2. PROOF_STEPS_GUIDE.md
**Length**: ~500 lines  
**Time to Read**: 30-45 minutes  
**Best For**: Complete reference and deep understanding

**Sections**:
- Why proof steps matter (benefits)
- How it works (detailed steps)
- Proof step types (4 main types)
- API reference (complete)
- Usage examples (Python, JavaScript, Java)
- Proof patterns (reusable templates)
- Best practices (do's and don'ts)
- Workflow integration (dev and CI/CD)
- Troubleshooting (solutions)

**Read if**: You want complete documentation

---

### 3. PROOF_STEPS_WORKFLOW_EXAMPLE.md
**Length**: ~400 lines  
**Time to Read**: 20-30 minutes  
**Best For**: Real-world scenario and practical learning

**Sections**:
- Complete bug-fixing scenario
- Step-by-step walkthrough
- Running tests against buggy code
- Fixing the code
- Verifying tests pass
- Writing real tests
- Advanced: Multiple issues
- Key insights

**Read if**: You want to see a real example

---

### 4. PROOF_STEPS_COMPLETE_SUMMARY.md
**Length**: ~400 lines  
**Time to Read**: 20-25 minutes  
**Best For**: Complete implementation details and summary

**Sections**:
- What was requested and delivered
- Components added (all changes)
- How it works (basic usage)
- Feature highlights
- Files created/modified
- Usage statistics
- Example execution
- Advantages for developers/teams
- Extensibility
- Testing the feature

**Read if**: You want complete implementation details

---

## Code Files

### Main Implementation
- **Tool Spec**: `src/tools/examples/code-analyzer/README.md`
- **Python Implementation**: `src/tools/examples/code-analyzer/python/analyze.py`

### Key Classes
```python
# New dataclasses in analyze.py
class ProofStep:
    test_name: str
    test_code: str
    assertion_description: str
    should_fail_with_bug: bool
    should_pass_with_fix: bool

class ProofSteps:
    should_generate_proof: bool
    generated_tests: List[str]
    proof_description: str
    assertions_failed: List[str]
    proof_examples: List[ProofStep]
```

### Key Functions
```python
def analyze_code(
    code: str,
    language: str,
    analyze_for: Optional[List[str]] = None,
    generate_proof: bool = False,           # NEW
    issue_to_resolve: Optional[str] = None  # NEW
) -> CodeAnalysisResult:
```

---

## Usage Quick Reference

### Basic Usage

```python
from analyze import analyze_code

# Generate proof for an issue
result = analyze_code(
    code="total += item",
    language="python",
    generate_proof=True,
    issue_to_resolve="undefined variable 'total'"
)

# Review the generated tests
for test in result.proof_steps.generated_tests:
    print(test)
```

### Save Tests to File

```python
if result.proof_steps:
    with open("test_proof.py", "w") as f:
        f.write("import pytest\n\n")
        for test in result.proof_steps.generated_tests:
            f.write(test)
            f.write("\n\n")
```

### Supported Languages

- ✅ Python (pytest)
- ✅ JavaScript/TypeScript (Jest)
- ✅ Java (JUnit)
- ✅ Generic (any language)

---

## Proof Types

### 1. Uninitialized Variable
```python
# Bug
total += item  # NameError: name 'total' is not defined

# Generated Test
def test_variable_must_be_initialized():
    with pytest.raises(NameError):
        buggy_function()

# Fix
total = 0
total += item
```

### 2. Missing Error Handling
```python
# Bug
return a / b  # ZeroDivisionError if b == 0

# Generated Test
def test_division_by_zero():
    with pytest.raises(ZeroDivisionError):
        divide(10, 0)

# Fix
if b == 0:
    raise ValueError("Cannot divide by zero")
return a / b
```

### 3. Type Safety
```python
# Bug
process_items("not a list")  # TypeError

# Generated Test
def test_type_validation():
    with pytest.raises(TypeError):
        process_items("invalid")

# Fix
def process_items(items: list):
    for item in items:
        # ...
```

### 4. Logic Error
```python
# Bug
return price + discount  # Should be subtract!

# Generated Test
def test_discount():
    assert apply_discount(100, 10) == 90  # Fails with bug

# Fix
return price - discount
```

---

## Learning Paths

### Path 1: Quick Start (15 minutes)
1. Read `PROOF_STEPS_FEATURE_SUMMARY.md` (sections: Overview, How It Works)
2. Run the example: `python analyze.py`
3. Try it yourself with your own code

### Path 2: Practical Learning (45 minutes)
1. Read `PROOF_STEPS_WORKFLOW_EXAMPLE.md` (complete scenario)
2. Follow each step with your code
3. Save and run generated tests
4. Verify tests pass/fail as expected

### Path 3: Complete Understanding (90 minutes)
1. Read `PROOF_STEPS_FEATURE_SUMMARY.md` (all sections)
2. Read `PROOF_STEPS_GUIDE.md` (all sections)
3. Study proof patterns in detail
4. Review API reference
5. Try advanced examples (multiple issues)

### Path 4: Reference (as needed)
- Use `PROOF_STEPS_GUIDE.md` for API details
- Use `PROOF_STEPS_COMPLETE_SUMMARY.md` for implementation info
- Use `PROOF_STEPS_WORKFLOW_EXAMPLE.md` for examples

---

## Key Concepts

### What are Proof Steps?
Automatically generated unit tests that:
- **Assert the issue exists** - Test fails with buggy code
- **Verify the fix** - Test passes with corrected code
- **Cover edge cases** - Boundary conditions included
- **Prevent regression** - Guard against future issues

### Why Proof Steps?
- **Clear problem statement** - Tests show exactly what's wrong
- **Test-driven fixing** - Tests guide implementation
- **Immediate verification** - Tests prove solution works
- **Better documentation** - Tests explain intent
- **Quality assurance** - Tests catch regressions

### How Proof Steps Work?
1. Analyze code → detect issues
2. Generate tests → create proofs
3. Review tests → understand problem
4. Fix code → implement solution
5. Run tests → verify success
6. Commit → code + tests together

---

## Integration Examples

### Development Workflow
```
Issue Found
  ↓
Generate Proofs
  ↓
Review Tests
  ↓
Fix Code
  ↓
Run Tests (PASS)
  ↓
Commit Code + Tests
```

### CI/CD Pipeline
```
analyze_code(...)
  ↓
generate_proof=True
  ↓
save to test_proof.py
  ↓
pytest test_proof.py
  ↓
all pass? → merge : fail
```

---

## File Structure

```
context-engineering-template/
├── PROOF_STEPS_FEATURE_SUMMARY.md      ← Quick overview
├── PROOF_STEPS_GUIDE.md                ← Complete guide
├── PROOF_STEPS_WORKFLOW_EXAMPLE.md     ← Real scenario
├── PROOF_STEPS_COMPLETE_SUMMARY.md     ← Implementation details
├── PROOF_STEPS_INDEX.md                ← This file
│
└── src/tools/examples/code-analyzer/
    ├── README.md                       ← Tool specification
    └── python/
        └── analyze.py                  ← Implementation
```

---

## Common Questions

### Q: When should I use proof steps?
**A**: When you have a bug and want to fix it systematically with tests proving it works.

### Q: What languages are supported?
**A**: Python, JavaScript/TypeScript, Java, and generic templates for others.

### Q: Can I customize the generated tests?
**A**: Yes! Generated tests are starting points. Adapt them to your domain.

### Q: Do I need pytest?
**A**: Only if running Python tests. Each language has its own testing framework.

### Q: Can I use this in CI/CD?
**A**: Yes! Save generated tests and run them in your pipeline.

### Q: What if the generated test doesn't match my issue?
**A**: Review the templates in the guide and customize them.

---

## Next Steps

1. **Read** - Choose a documentation file from above
2. **Understand** - Review key concepts section
3. **Try** - Run the example: `python analyze.py`
4. **Implement** - Use with your own code
5. **Share** - Show your team the workflow
6. **Extend** - Add custom proof patterns

---

## Support & Learning

### Documentation
- `PROOF_STEPS_GUIDE.md` - Complete reference
- `PROOF_STEPS_WORKFLOW_EXAMPLE.md` - Real scenario
- `PROOF_STEPS_FEATURE_SUMMARY.md` - Quick overview

### Code Examples
- `src/tools/examples/code-analyzer/python/analyze.py` - Implementation
- Bottom of `analyze.py` - Usage examples
- `PROOF_STEPS_WORKFLOW_EXAMPLE.md` - Detailed walkthrough

### Getting Help
- Check "Troubleshooting" in `PROOF_STEPS_GUIDE.md`
- Review examples in `PROOF_STEPS_FEATURE_SUMMARY.md`
- Study patterns in `PROOF_STEPS_WORKFLOW_EXAMPLE.md`

---

## Summary

The Proof Steps feature transforms bug fixing from guesswork into a systematic, test-driven process:

✅ **Detect Issues** - Code analyzer identifies problems  
✅ **Generate Proofs** - Creates test cases automatically  
✅ **Guide Fixes** - Tests show what to implement  
✅ **Verify Solutions** - Tests prove it works  
✅ **Document Intent** - Tests explain the why  

**Result**: Faster, more reliable bug fixing with built-in quality assurance.

---

## File Sizes for Reference

| File | Lines | Sections | Best For |
|------|-------|----------|----------|
| PROOF_STEPS_FEATURE_SUMMARY.md | 400 | 10 | Quick overview |
| PROOF_STEPS_GUIDE.md | 500 | 12 | Complete reference |
| PROOF_STEPS_WORKFLOW_EXAMPLE.md | 400 | 10 | Real scenario |
| PROOF_STEPS_COMPLETE_SUMMARY.md | 400 | 10 | Implementation details |
| PROOF_STEPS_INDEX.md | 350 | 15 | Navigation (this file) |

**Total Documentation**: ~2000 lines  
**Total Implementation**: ~500 lines of code  
**Total Feature**: Comprehensive, production-ready system
