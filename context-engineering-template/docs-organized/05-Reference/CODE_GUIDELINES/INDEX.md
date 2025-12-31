# Code Guidelines Documentation

Complete code quality standards and best practices for the project. These guidelines ensure consistency, maintainability, and quality across all codebases.

---

## Quick Navigation

### For Reviewers
Start here when reviewing code:
1. **[Main Code Guidelines](README.md)** - General standards applicable to all languages
2. Select your language guide in the [languages](languages/) folder
3. Use the pre-approval checklist before approving

### For Developers
Start here when writing code:
1. Read the general standards in **[Code Guidelines](README.md)**
2. Follow your language-specific guide in the [languages](languages/) folder
3. Self-review using the checklist before submitting

---

## General Standards

**[Code Guidelines](README.md)** - Core standards for all code

Core principles:
- ✅ Max 110 character line length
- ✅ Max 3 levels of nesting (including function body)
- ✅ Max 80 lines per method/function
- ✅ Allman style brackets (opening bracket on new line)
- ✅ camelCase for variables/functions, PascalCase for classes
- ✅ Getters/setters for all public/private variables
- ✅ Early terminations using guard clauses
- ✅ Single-line if statements permitted (no brackets)
- ✅ Ternary operators for simple value assignments

---

## Language-Specific Guidelines

Select your language for detailed conventions and best practices:

### Backend Languages

| Language | Guide | Key Features |
|----------|-------|--------------|
| **Python** | [Python Guidelines](languages/PYTHON.md) | PEP 8, Type hints, snake_case, 88 char lines |
| **Java** | [Java Guidelines](languages/JAVA.md) | Javadoc, Access modifiers, Getters/Setters, Exception handling |

### Desktop & Systems Languages

| Language | Guide | Key Features |
|----------|-------|--------------|
| **C++ & Qt** | [C++/Qt Guidelines](languages/CPLUSPLUS_QT.md) | Memory management, Smart pointers, Signals/Slots, Qt conventions |

---

## Pre-Approval Checklists

### General Checklist (All Languages)

Use this for all code submissions:

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

Before approving code, also check the language-specific checklist:

- **[Python](languages/PYTHON.md#pre-approval-checklist-python)**
- **[Java](languages/JAVA.md#pre-approval-checklist-java)**
- **[C++ & Qt](languages/CPLUSPLUS_QT.md#pre-approval-checklist-cqt)**

---

## Common Patterns & Examples

### Early Terminations
Guard clauses reduce nesting and improve readability.

**[Learn More →](README.md#early-terminations)**

### Function Length Refactoring
Extract loops and complex logic into separate functions to stay under 80 lines.

**[Learn More →](README.md#methodfunction-length)**

### Nesting Depth
Keep nested blocks to 3 levels maximum (function body = level 1).

**[Learn More →](README.md#nesting-depth)**

---

## Adding New Guidelines

To propose a new guideline or update existing ones:

1. Identify the **category**:
   - General (add to `README.md`)
   - Language-specific (add to appropriate language file in `languages/`)

2. Add the guideline with:
   - **Rule name** in bold
   - **Guideline** statement
   - **Rationale** (if not obvious)
   - **Example** showing Good (✓) and Avoid (❌)

3. Update relevant checklists

4. Ensure consistent formatting:
   - Use **Avoid (❌)** / **Preferred (✓)** labels
   - Use **Good (✓)** for positive examples
   - Use **Before/After** for refactoring examples
   - Use Allman brackets in all code samples

---

## Questions or Exceptions?

If a guideline doesn't apply to your use case:
- Document the exception in your PR
- Explain the reasoning
- Propose an update to this documentation if valid for future code

---

## File Structure

## File Structure

```
CODE_GUIDELINES/
├── INDEX.md                    (this file)
├── README.md                   (general standards)
└── languages/
    ├── PYTHON.md               (Python)
    ├── JAVA.md                 (Java)
    └── CPLUSPLUS_QT.md         (C++ and Qt)
```

## Workflow

### For Code Review Process

```
1. Developer submits PR
         ↓
2. Reviewer opens CODE_GUIDELINES/INDEX.md
         ↓
3. Identify language(s) used in PR
         ↓
4. Check General Checklist
         ↓
5. Check Language-Specific Checklist in languages/
         ↓
6. Use language guide for reference if issues found
         ↓
7. Approve or request changes
```

### For Development

```
1. Developer opens CODE_GUIDELINES/INDEX.md
         ↓
2. Locate language-specific guide in languages/
         ↓
3. Review relevant sections during development
         ↓
4. Self-review using Language-Specific Checklist
         ↓
5. Verify General Checklist items
         ↓
6. Submit PR
```

---

## Version History

## Version History

- **v1.1** (2025-12-30) - Updated guidelines
  - Removed TypeScript/JavaScript, Go, and C#/.NET guides
  - Added C++ and Qt guidelines
  - Updated language table and file structure
  - Simplified to core backend and desktop languages

- **v1.0** (2025-12-30) - Initial comprehensive guidelines with all languages
  - General standards document
  - 5 language-specific guides
  - Pre-approval checklists for each language
  - Organized folder structure

## Document Maintenance

Last updated: **2025-12-30**

Maintained by: **Code Quality Team**

To suggest improvements, create an issue with the tag `code-guidelines`.
