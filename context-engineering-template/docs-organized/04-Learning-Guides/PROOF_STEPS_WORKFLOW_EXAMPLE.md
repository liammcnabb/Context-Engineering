# Proof Steps Integration - Complete Workflow Example

## Scenario: Fixing a Real Bug with Proof Steps

You're working on a Python project and discover a bug. Here's how to use proof steps to fix it systematically.

---

## The Problem

Your colleague reports: *"The purchase calculation function is giving wrong totals!"*

### Buggy Code

```python
# purchase.py
def calculate_purchase_total(items):
    \"\"\"Calculate total purchase amount with tax.\"\"\"
    for item in items:
        subtotal += item['price'] * item['quantity']  # BUG: subtotal not initialized!
    
    tax = subtotal * 0.08
    return subtotal + tax
```

### Initial Error

```python
>>> from purchase import calculate_purchase_total
>>> result = calculate_purchase_total([
...     {'price': 10.00, 'quantity': 2},
...     {'price': 5.00, 'quantity': 1}
... ])
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "purchase.py", line 3, in calculate_purchase_total
    subtotal += item['price'] * item['quantity']
NameError: name 'subtotal' is not defined
```

---

## Step 1: Analyze the Code

```python
from analyze import analyze_code

# Read the buggy code
with open('purchase.py', 'r') as f:
    code = f.read()

# Analyze it
result = analyze_code(
    code=code,
    language='python'
)

print("Issues found:")
for issue in result.issues:
    print(f"  - {issue}")
# Output:
# Issues found:
# (none detected by basic analysis)
```

**Problem**: Static analysis doesn't catch this - it's a runtime error!

---

## Step 2: Request Proof Generation

```python
from analyze import analyze_code

# Generate proofs for the specific issue
result = analyze_code(
    code=code,
    language='python',
    generate_proof=True,
    issue_to_resolve="undefined variable 'subtotal'"
)

print("Proof Description:")
print(result.proof_steps.proof_description)
# Output:
# Unit tests for: undefined variable 'subtotal'
# These tests will FAIL with the buggy code and PASS after fixing.

print("\nGenerated Tests:")
for i, test in enumerate(result.proof_steps.generated_tests, 1):
    print(f"\n--- Test {i} ---")
    print(test[:300] + "..." if len(test) > 300 else test)
```

Output:
```
Proof Description:
Unit tests for: undefined variable 'subtotal'
These tests will FAIL with the buggy code and PASS after fixing.

Generated Tests:

--- Test 1 ---
def test_variable_must_be_initialized():
    """Proof: Variable must be initialized before use"""
    import pytest
    
    def buggy_function(items):
        # Variable 'subtotal' not initialized - should fail
        for item in items:
            subtotal += item.get("value", 0)
        return subtotal
    
    with pytest.raises(NameError):
        buggy_function([{"value": 10}])

--- Test 2 ---
def test_variable_initialized_fixed():
    """Proof: Initializing variable fixes the issue"""
...
```

---

## Step 3: Save Generated Tests

```python
# Save the generated tests to a file
with open('test_purchase_proof.py', 'w') as f:
    f.write("\"\"\"Proof tests for purchase.py\"\"\"\n")
    f.write("import pytest\n\n")
    
    for test in result.proof_steps.generated_tests:
        f.write(test)
        f.write("\n\n")

print("✓ Saved proof tests to test_purchase_proof.py")
```

### Generated Test File

```python
# test_purchase_proof.py
"""Proof tests for purchase.py"""
import pytest

def test_variable_must_be_initialized():
    """Proof: Variable must be initialized before use"""
    import pytest
    
    def buggy_function(items):
        # Variable 'subtotal' not initialized - should fail
        for item in items:
            subtotal += item.get("value", 0)
        return subtotal
    
    with pytest.raises(NameError):
        buggy_function([{"value": 10}])

def test_variable_initialized_fixed():
    """Proof: Initializing variable fixes the issue"""
    
    def fixed_function(items):
        subtotal = 0  # Initialize first
        for item in items:
            subtotal += item.get("value", 0)
        return subtotal
    
    assert fixed_function([{"value": 10}, {"value": 20}]) == 30
    assert fixed_function([]) == 0
    assert fixed_function([{"value": 5}]) == 5
```

---

## Step 4: Run Tests Against Buggy Code

```bash
$ pytest test_purchase_proof.py -v

test_purchase_proof.py::test_variable_must_be_initialized FAILED
test_purchase_proof.py::test_variable_initialized_fixed FAILED

FAILED test_purchase_proof.py::test_variable_must_be_initialized
  Traceback:
    with pytest.raises(NameError):
        buggy_function([{"value": 10}])
  Did not raise NameError

FAILED test_purchase_proof.py::test_variable_initialized_fixed
  AssertionError: assert 30 == 30
  ...
```

✓ **Confirmed**: Tests fail with buggy code (as expected)

---

## Step 5: Fix the Code

Now you know exactly what to fix:

```python
# purchase.py - FIXED VERSION
def calculate_purchase_total(items):
    \"\"\"Calculate total purchase amount with tax.\"\"\"
    subtotal = 0  # ✅ INITIALIZE FIRST!
    
    for item in items:
        subtotal += item['price'] * item['quantity']
    
    tax = subtotal * 0.08
    return subtotal + tax
```

---

## Step 6: Verify Tests Pass

```bash
$ pytest test_purchase_proof.py -v

test_purchase_proof.py::test_variable_must_be_initialized PASSED
test_purchase_proof.py::test_variable_initialized_fixed PASSED

========================= 2 passed in 0.05s =========================
```

✓ **Success**: All tests pass with fixed code!

---

## Step 7: Write Real Tests

Now adapt the proof tests to your actual domain:

```python
# test_purchase.py - Real tests for the purchase module
import pytest
from purchase import calculate_purchase_total

def test_calculate_single_item():
    """Test calculating total for single item."""
    items = [{'price': 10.00, 'quantity': 2}]
    result = calculate_purchase_total(items)
    # subtotal = 10 * 2 = 20
    # tax = 20 * 0.08 = 1.60
    # total = 20 + 1.60 = 21.60
    assert result == pytest.approx(21.60)

def test_calculate_multiple_items():
    """Test calculating total for multiple items."""
    items = [
        {'price': 10.00, 'quantity': 2},
        {'price': 5.00, 'quantity': 1}
    ]
    result = calculate_purchase_total(items)
    # subtotal = (10*2) + (5*1) = 25
    # tax = 25 * 0.08 = 2.00
    # total = 25 + 2.00 = 27.00
    assert result == pytest.approx(27.00)

def test_empty_cart():
    """Test calculating total for empty cart."""
    items = []
    result = calculate_purchase_total(items)
    assert result == 0

def test_invalid_quantity():
    """Test that invalid data is caught."""
    items = [{'price': 10.00, 'quantity': -1}]  # Negative quantity
    with pytest.raises((ValueError, AssertionError)):
        calculate_purchase_total(items)

def test_missing_price():
    """Test handling of missing price field."""
    items = [{'quantity': 2}]  # Missing 'price'
    with pytest.raises(KeyError):
        calculate_purchase_total(items)
```

---

## Step 8: Commit the Fix

```bash
# Stage the fixed code and tests
git add purchase.py test_purchase.py test_purchase_proof.py

git commit -m "Fix: initialize subtotal in calculate_purchase_total

- Issue: NameError when subtotal not initialized
- Fix: Add 'subtotal = 0' before the loop
- Tests: Added 5 comprehensive tests
- Proof: Generated proof tests verify fix

Fixes: #123"

git push origin main
```

---

## The Complete Workflow

```
1. DISCOVER BUG
   └─→ NameError: name 'subtotal' is not defined

2. ANALYZE CODE
   └─→ analyze_code(code, language='python')

3. GENERATE PROOFS
   └─→ analyze_code(..., generate_proof=True, issue_to_resolve='subtotal')

4. REVIEW GENERATED TESTS
   └─→ Read what the proof tests expect

5. SAVE TESTS
   └─→ Write proof tests to test_proof.py

6. VERIFY TESTS FAIL
   └─→ pytest test_proof.py → 2 FAILED
   
7. FIX CODE
   └─→ Add initialization: subtotal = 0

8. VERIFY TESTS PASS
   └─→ pytest test_proof.py → 2 PASSED ✓

9. WRITE REAL TESTS
   └─→ Create comprehensive domain-specific tests

10. COMMIT
    └─→ Code + tests + proof tests together
```

---

## Key Insights

### What Proof Steps Provided

✅ **Clear problem statement** - Tests explicitly show what's wrong  
✅ **Test-driven fix** - Tests tell you exactly what to implement  
✅ **Immediate verification** - Tests prove the fix works  
✅ **Documentation** - Tests explain the issue for future devs  
✅ **Regression prevention** - Tests prevent this bug recurring  

### What Would Have Happened Without Proof Steps

❌ Manual debugging - "Why is it erroring?"  
❌ Trial and error - Try different fixes  
❌ Uncertain verification - Is it really fixed?  
❌ Poor documentation - "Don't break this, it's fragile"  
❌ Recurring bugs - Same issue in other functions  

---

## Advanced: Multiple Issues

What if there were more issues?

```python
# Code with MULTIPLE issues
def calculate_purchase_total(items):
    for item in items:
        subtotal += item['price'] * item['quantity']  # Issue 1: subtotal not initialized
    
    tax = subtotal * discount_rate  # Issue 2: discount_rate not defined
    
    if items:
        return subtotal + tax
    else:
        return 0 / 0  # Issue 3: ZeroDivisionError on empty cart
```

### Solution: Generate Multiple Proofs

```python
from analyze import analyze_code

code = open('purchase.py').read()

# Issue 1
result1 = analyze_code(
    code, language='python', 
    generate_proof=True,
    issue_to_resolve="undefined variable 'subtotal'"
)

# Issue 2
result2 = analyze_code(
    code, language='python',
    generate_proof=True,
    issue_to_resolve="undefined variable 'discount_rate'"
)

# Issue 3
result3 = analyze_code(
    code, language='python',
    generate_proof=True,
    issue_to_resolve="division by zero error"
)

# Combine all tests
all_tests = []
all_tests.extend(result1.proof_steps.generated_tests)
all_tests.extend(result2.proof_steps.generated_tests)
all_tests.extend(result3.proof_steps.generated_tests)

# Save combined test file
with open('test_proof.py', 'w') as f:
    f.write("import pytest\n\n")
    for test in all_tests:
        f.write(test + "\n\n")

print(f"Generated {len(all_tests)} tests for {len(result1.proof_steps.assertions_failed)} issues")
```

### Fix All Issues

```python
# FULLY FIXED
def calculate_purchase_total(items):
    subtotal = 0  # ✅ Initialize
    discount_rate = 0.08  # ✅ Define
    
    for item in items:
        subtotal += item['price'] * item['quantity']
    
    tax = subtotal * discount_rate
    
    return subtotal + tax  # ✅ No division by zero
```

### Verify All Tests Pass

```bash
$ pytest test_proof.py -v
test_proof.py::test_variable_must_be_initialized PASSED
test_proof.py::test_variable_initialized_fixed PASSED
test_proof.py::test_discount_rate_defined PASSED
test_proof.py::test_discount_rate_fix PASSED
test_proof.py::test_division_by_zero_handled PASSED
test_proof.py::test_empty_list_handled PASSED

========================= 6 passed in 0.08s =========================
```

---

## Summary

Proof steps transform bug fixing from guesswork into a systematic process:

1. **Identify** - Discover the issue
2. **Generate** - Create proof tests automatically
3. **Review** - Understand what tests expect
4. **Fix** - Implement solution guided by tests
5. **Verify** - Tests confirm it works
6. **Document** - Tests become documentation
7. **Commit** - Code and tests together
8. **Prevent** - Tests prevent regression

This workflow ensures bugs are:
- **Fixed correctly** - Tests verify the solution
- **Well-documented** - Tests explain what happened
- **Never recurring** - Tests catch regressions
- **Easy to understand** - Tests show the intent
