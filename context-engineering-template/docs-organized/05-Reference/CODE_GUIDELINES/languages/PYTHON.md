# Python Code Guidelines

Guidelines specific to Python development. See [Code Guidelines](../README.md) for general standards.

**[← Back to Index](../INDEX.md)**

---

## Naming & Conventions

- **Functions & Variables**: snake_case
- **Classes**: PascalCase
- **Constants**: UPPER_SNAKE_CASE
- **Private Methods**: Single leading underscore (_private_method)

---

## Type Hints

- **Style**: PEP 484 type hints for all functions
- **Docstrings**: Use PEP 257 format (Google or NumPy style)

**Good (✓)**:
```python
def process_user(user_id: str, verbose: bool = False) -> dict:
    """
    Process a user by their ID.
    
    Args:
        user_id: The unique identifier for the user
        verbose: Enable verbose logging (default False)
    
    Returns:
        A dictionary containing processed user data
    """
    # implementation
```

---

## Line Length

- **Standard**: 88 characters (Black formatter)
- **Tool**: Use Black for automatic formatting

---

## Imports

- **Organization**: Per PEP 8
  - Standard library imports first
  - Third-party imports second
  - Local imports last
  - Blank lines between groups

**Good (✓)**:
```python
import os
import sys
from pathlib import Path

import requests
import numpy as np

from myproject.utils import helpers
from myproject.models import User
```

---

## Functions & Methods

- **Length**: Keep under 80 lines
- **Parameters**: Use type hints for all parameters
- **Defaults**: Mutable defaults ([], {}) can be problematic; use None as default

**Good (✓)**:
```python
def add_item(items: list[str] | None = None, item: str = "") -> list[str]:
    if items is None:
        items = []
    items.append(item)
    return items
```

**Avoid (❌)**:
```python
def add_item(items: list = [], item: str = ""):  # Mutable default!
    items.append(item)
    return items
```

---

## List Comprehensions

- **Simple**: One condition on single line
- **Complex**: Break into multiple lines or use regular loops for clarity

**Good (✓) - Simple**:
```python
squared = [x**2 for x in numbers if x > 0]
```

**Good (✓) - Complex**:
```python
filtered_users = [
    user for user in users
    if user.is_active and user.email_verified
]
```

**Avoid (❌)**:
```python
# Too nested
result = [
    [item for item in group if item.valid]
    for group in groups
    if group.enabled
]
```

---

## Exception Handling

- **Specific**: Catch specific exceptions, not bare `except:`
- **Logging**: Always log exceptions with context

**Good (✓)**:
```python
try:
    result = risky_operation()
except ValueError as e:
    logger.error(f"Invalid value: {e}", extra={"user_id": user_id})
    raise
```

**Avoid (❌)**:
```python
try:
    result = risky_operation()
except:  # Too broad!
    pass
```

---

## Context Managers

- **Use**: `with` statements for resource management
- **Avoid**: Manual open/close of files or connections

**Good (✓)**:
```python
with open('file.txt', 'r') as f:
    content = f.read()
```

**Avoid (❌)**:
```python
f = open('file.txt', 'r')
content = f.read()
f.close()  # Easy to forget if exception occurs
```

---

## Pre-Approval Checklist (Python)

Use this checklist for Python code reviews:

- [ ] All functions have type hints
- [ ] Docstrings use PEP 257 format
- [ ] Line length ≤ 88 characters (or Black formatted)
- [ ] Imports organized per PEP 8
- [ ] No mutable defaults in function signatures
- [ ] Functions ≤ 80 lines
- [ ] List comprehensions are readable
- [ ] Specific exceptions caught, not bare `except:`
- [ ] Exceptions logged with context
- [ ] `with` statements used for resource management
- [ ] snake_case used for functions and variables
- [ ] PascalCase used for classes
- [ ] UPPER_SNAKE_CASE used for constants

---

## Related Documentation

- [Main Code Guidelines](../README.md)
- [TypeScript/JavaScript Guidelines](TYPESCRIPT.md)
- [Java Guidelines](JAVA.md)
- [Go Guidelines](GO.md)
- [C#/.NET Guidelines](CSHARP.md)
