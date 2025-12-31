# Code Guidelines

A checklist of standards to review before approving new work. Guidelines are organized by category for easy reference and updates.

**[← Back to Index](INDEX.md)**

---

## Formatting Standards

### Line Length
- **Maximum**: 110 characters per line
- **Rationale**: Improves readability and reduces horizontal scrolling
- **Exception**: URLs, comments with long references can exceed slightly

### Indentation
- **Style**: Allman Brackets (opening bracket on new line)
- **Example**:
  ```typescript
  function example()
  {
    if (condition)
    {
      // code
    }
  }
  ```

### Naming Conventions
- **Variables & Functions**: camelCase
- **Classes & Interfaces**: PascalCase
- **Constants**: UPPER_SNAKE_CASE
- **Private Members**: prefixed with underscore (_privateVar)

### Getters and Setters
- **Required**: All public and private variables must have getter and setter methods
- **Naming**: `GetVariableName()` and `SetVariableName(value)`
- **Rationale**: Encapsulation and future flexibility for validation logic
- **Example**:
  ```typescript
  class User
  {
    private _email: string;
    private _age: number;
    
    GetEmail(): string
    {
      return this._email;
    }
    
    SetEmail(email: string): void
    {
      if (this.isValidEmail(email))
      {
        this._email = email;
      }
    }
    
    GetAge(): number
    {
      return this._age;
    }
    
    SetAge(age: number): void
    {
      if (age > 0 && age < 150)
      {
        this._age = age;
      }
    }
  }
  ```

---

## Structure Standards

### Nesting Depth
- **Soft Cap**: 3 levels of nesting (including function declaration)
- **Rationale**: Reduces cognitive load and improves maintainability
- **Approach**: Extract nested logic into separate functions when exceeding limit
- **Counting**: Function body = Level 1, first nested block = Level 2, second nested block = Level 3

**Avoid (❌)**:
```typescript
function process()
{
  if (condition1)  // Level 2
  {
    if (condition2)  // Level 3
    {
      if (condition3)  // Level 4 - TOO DEEP, refactor
      {
        doSomething();
      }
    }
  }
}
```

**Preferred (✓)**:
```typescript
function shouldProcess(): boolean
{
  return condition1 && condition2 && condition3;
}

function process()
{
  if (shouldProcess())  // Level 2
  {
    doSomething();
  }
}
```

### Method/Function Length
- **Soft Cap**: 80 lines per method
- **Rationale**: Single responsibility principle, easier testing
- **Approach**: Extract inner loops and complex logic into separate functions

**Avoid (❌) - Before**:
```typescript
function processGoods(items: Item[])
{
  // Setup: 20 lines
  let total = 0;
  let processed = 0;
  const results: ProcessedItem[] = [];
  // ... more setup
  
  for (const item of items)  // Level 2
  {
    // Processing: 70 lines
    const validated = validateItem(item);
    const transformed = transformItem(validated);
    const stored = storeItem(transformed);
    // ... complex processing logic
  }
}
```

**Preferred (✓) - After**:
```typescript
function processGood(item: Item): ProcessedItem
{
  // 70 lines of processing logic
  const validated = validateItem(item);
  const transformed = transformItem(validated);
  const stored = storeItem(transformed);
  // ... processing
  return processed;
}

function processGoods(items: Item[])
{
  // Setup: 20 lines
  let total = 0;
  let processed = 0;
  const results: ProcessedItem[] = [];
  // ... more setup
  
  for (const item of items)  // Level 2
  {
    results.push(processGood(item));
  }
  return results;
}
```

---

## Control Flow Standards

### Early Terminations
- **Prefer**: Early returns and guard clauses in if statements
- **Rationale**: Reduces nesting, improves readability

**Avoid (❌)**:
```typescript
function validate(user: User): boolean
{
  if (user.isActive)
  {
    if (user.isVerified)
    {
      if (user.hasPermission)
      {
        return true;
      }
    }
  }
  return false;
}
```

**Preferred (✓)**:
```typescript
function validate(user: User): boolean
{
  if (!user.isActive) return false;
  if (!user.isVerified) return false;
  if (!user.hasPermission) return false;
  return true;
}
```

### Conditional Complexity
- **Avoid**: Deeply nested ternary operators
- **Prefer**: Early returns or if/else statements for clarity

### Conditional Statements
- **Prefer**: Ternary for simple assignments, if/else for complex logic
- **Short-circuit**: Use && and || for guard clauses
- **Single-line if**: Permitted without brackets for simple one-line statements
  ```typescript
  if (condition) doSomething();
  ```
- **Ternary operators**: Accepted ONLY for simple value assignment (e.g., null checks)
  - Use for: Simple conditional value selection
  - Avoid: Any logic beyond assignment, nested ternaries, function calls with side effects

**Good (✓) - Ternary for Simple Value Assignment**:
```typescript
const name = user !== null ? user.name : "Unknown";
const status = isActive ? "active" : "inactive";
const count = items.length > 0 ? items.length : 0;
const color = isDarkMode ? "#000000" : "#FFFFFF";
```

**Avoid (❌) - Complex Logic or Nested Ternaries**:
```typescript
// Complex logic - use if/else instead
const result = condition ? performExpensiveOperation() : performOtherOperation();

// Nested ternaries - use if/else instead
const status = isActive ? isVerified ? isPaid ? "premium" : "verified" : "inactive" : "disabled";

// Function calls with side effects - use if/else instead
const value = condition ? (logger.log("A"), valueA) : (logger.log("B"), valueB);

// Multi-step logic - use if/else instead
const total = isDiscount ? calculateDiscountedPrice(price, discount) + tax : price + tax;
```

**Preferred (✓) - Use If/Else for Complex Logic**:
```typescript
let status: string;
if (isActive)
{
  if (isVerified)
  {
    status = isPaid ? "premium" : "verified";
  }
  else
  {
    status = "inactive";
  }
}
else
{
  status = "disabled";
}
```

---

## Code Quality Standards

### Comments
- **When**: Explain *why*, not *what*
- **Style**: Concise and meaningful
- **Outdated Comments**: Remove or update; never leave misleading comments

### Error Handling
- **Approach**: Fail fast with clear error messages
- **Logging**: Include context for debugging

### DRY (Don't Repeat Yourself)
- **Rule**: Extract repeated code into reusable functions or utilities
- **Scope**: Even 2-3 line repeats should be considered

---

## Language-Specific Guidelines

Each language has specific conventions and best practices. Reference the appropriate guide for your technology:

- **[TypeScript/JavaScript Guidelines](languages/TYPESCRIPT.md)**
- **[Python Guidelines](languages/PYTHON.md)**
- **[Java Guidelines](languages/JAVA.md)**
- **[Go Guidelines](languages/GO.md)**
- **[C#/.NET Guidelines](languages/CSHARP.md)**

---

## Pre-Approval Checklist

Use this checklist before marking work as ready for review. **For language-specific items, refer to the appropriate language guide.**

### General Standards (All Languages)

- [ ] No lines exceed 110 characters
- [ ] Nesting depth ≤ 3 levels (including function body)
- [ ] Methods/functions ≤ 80 lines
- [ ] Naming follows camelCase/PascalCase conventions
- [ ] Allman style brackets applied correctly
- [ ] All public/private variables have GetVariable() and SetVariable() methods
- [ ] Early terminations used for guard clauses
- [ ] One-line if statements without brackets permitted
- [ ] Ternary operators used only for simple value assignments
- [ ] No unnecessary nested conditionals
- [ ] Comments explain *why*, not *what*
- [ ] Code is DRY (no repeated logic)
- [ ] Error handling is present and meaningful
- [ ] No trailing whitespace or inconsistent formatting
- [ ] Functions/methods have single responsibility

### Language-Specific Checklists

- **[TypeScript/JavaScript](languages/TYPESCRIPT.md#pre-approval-checklist-typescriptjavascript)**
- **[Python](languages/PYTHON.md#pre-approval-checklist-python)**
- **[Java](languages/JAVA.md#pre-approval-checklist-java)**
- **[Go](languages/GO.md#pre-approval-checklist-go)**
- **[C#/.NET](languages/CSHARP.md#pre-approval-checklist-cnet)**

---

## Adding New Guidelines

To add a new guideline:

1. Identify the **category** (Formatting, Structure, Control Flow, Quality, Language-Specific)
2. Add under appropriate section with:
   - **Rule name** in bold
   - **Guideline** statement
   - **Rationale** (if not obvious)
   - **Example** (if applicable)
3. Update the **Pre-Approval Checklist** if it's a critical rule

---

## Questions or Exceptions?

If a guideline doesn't apply to your use case:
- Document the exception in your PR
- Explain the reasoning
- Propose an update to this document if the exception is valid for future code
