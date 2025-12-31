# 💻 Implementation

**See how it works in code.** Examples and source code.

---

## 🎯 What You'll Find Here

Links to implementation files, code examples, and working implementations.

---

## 📍 Where the Code Lives

### Source Code
**Location:** `../src/`  
**Contains:**
- **index.ts** - Main exports
- **tools/toolDefinitions.ts** - Tool system implementation
- **feedback/feedbackLoop.ts** - Feedback loop implementation
- **utils/contextBuilder.ts** - Context utilities

### Examples
**Location:** `../examples/`  
**Contains:**
- **quickstart.ts** - Interactive demo (START HERE!)
- **basic-workflow.ts** - Beginner examples
- **advanced-workflow.ts** - Advanced patterns

---

## 🚀 Getting Started with Code

### Step 1: Run Examples (5 min)
```bash
cd "../.."  # Go to project root
npm install
npm start    # Run interactive demo
```

### Step 2: Explore Basic Example (15 min)
**File:** `../examples/basic-workflow.ts`
- Open in editor
- Read comments
- Understand structure
- Run variations

### Step 3: Understand Source Code (30 min)
**Files:** 
- `../src/tools/toolDefinitions.ts` - Understand tools
- `../src/feedback/feedbackLoop.ts` - Understand feedback
- `../src/utils/contextBuilder.ts` - Understand context

### Step 4: Build Your Own (60+ min)
Create a new file in examples/ with your own workflow

---

## 📖 Code Learning Paths

### Path 1: Understand Basic Structure (30 min)
1. Read: 02-Learning-Guides/PHILOSOPHY.md
2. Look: ../examples/quickstart.ts (skim)
3. Look: ../examples/basic-workflow.ts (read carefully)
4. Understand: How everything connects

### Path 2: Build a Tool (45 min)
1. Read: 02-Learning-Guides/GUIDE.md → "Building Tools"
2. Look: ../src/tools/toolDefinitions.ts
3. Look: ../examples/basic-workflow.ts → tool definition
4. Copy: Tool definition pattern
5. Build: Your own tool

### Path 3: Add Feedback (45 min)
1. Read: 02-Learning-Guides/GUIDE.md → "Using Feedback"
2. Look: ../src/feedback/feedbackLoop.ts
3. Look: ../examples/advanced-workflow.ts (uses feedback)
4. Implement: Feedback collection for your workflow

### Path 4: Advanced Workflows (90 min)
1. Read: 02-Learning-Guides/GUIDE.md (all)
2. Look: ../examples/advanced-workflow.ts (line by line)
3. Study: 03-Features/WORKFLOW_DIAGRAMS.md
4. Build: Your own advanced workflow

---

## 🔧 Quick Code Examples

### Define a Tool
See: `../src/tools/toolDefinitions.ts`
```typescript
const myTool = {
  name: "my_tool",
  description: "What it does",
  parameters: { /* ... */ },
  returns: { /* ... */ }
};
```

### Execute a Tool
See: `../examples/basic-workflow.ts`
```typescript
const result = await executor.callTool("my_tool", params);
```

### Collect Feedback
See: `../src/feedback/feedbackLoop.ts`
```typescript
feedbackLoop.recordMetrics(execution);
const analysis = feedbackLoop.analyze();
```

### Build Context
See: `../src/utils/contextBuilder.ts`
```typescript
const context = contextBuilder.buildContext(config);
```

---

## 📁 Code Structure

```
../
├── src/
│   ├── index.ts                Main exports
│   ├── tools/
│   │   └── toolDefinitions.ts  Tool system
│   ├── feedback/
│   │   └── feedbackLoop.ts     Feedback system
│   └── utils/
│       └── contextBuilder.ts   Context utilities
│
├── examples/
│   ├── quickstart.ts           Start here!
│   ├── basic-workflow.ts       Basic example
│   └── advanced-workflow.ts    Advanced example
│
└── docs/ (if exists)
    └── ARCHITECTURE.md         Technical docs
```

---

## 🎯 Learning by Feature

### Want to understand Tools?
1. Read: 03-Features/README.md → "Feature 1: Tool System"
2. Study: ../src/tools/toolDefinitions.ts
3. Try: ../examples/basic-workflow.ts
4. Build: Your own tool

### Want to understand Context?
1. Read: 03-Features/README.md → "Feature 2: Context Management"
2. Study: ../src/utils/contextBuilder.ts
3. Try: ../examples/advanced-workflow.ts
4. Modify: Context parameters

### Want to understand Feedback?
1. Read: 03-Features/README.md → "Feature 4: Feedback System"
2. Study: ../src/feedback/feedbackLoop.ts
3. Try: ../examples/advanced-workflow.ts
4. Add: Your own metrics

### Want to understand Workflows?
1. Read: 02-Learning-Guides/GUIDE.md
2. Study: ../examples/basic-workflow.ts
3. Analyze: ../examples/advanced-workflow.ts
4. Create: Your own workflow

---

## 💡 Tips for Reading Code

1. **Start with examples/** - These are easier to understand
2. **Read comments** - Code has inline comments explaining logic
3. **Follow function calls** - Trace from top to bottom
4. **Look at types** - TypeScript helps you understand parameters
5. **Run it** - Try npm start and play with the examples
6. **Modify it** - Change values and see what happens
7. **Reference diagrams** - Look at 03-Features/ for visual help

---

## 🔗 Related Folders

- **02-Learning-Guides/** - Learn theory first
- **03-Features/** - Understand features conceptually
- **05-Reference/** - Quick reference materials

---

## ✅ Recommended Sequence

**Week 1: Understand**
1. 01-Getting-Started/ - Setup and orientation
2. 03-Features/ - System overview and diagrams
3. 02-Learning-Guides/PHILOSOPHY.md - Core principles

**Week 2: Learn**
1. 02-Learning-Guides/GUIDE.md - How to use
2. 03-Features/FEATURES_AND_COMPONENTS.md - Feature details
3. ../examples/basic-workflow.ts - See it in action

**Week 3: Build**
1. ../examples/advanced-workflow.ts - Advanced pattern
2. ../src/ - Study implementation
3. Create your own example

---

**👉 Start with: ../examples/quickstart.ts**

Then continue to: **02-Learning-Guides/GUIDE.md**
