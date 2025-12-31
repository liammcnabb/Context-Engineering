# Agent Quick Reference Card

## In 60 Seconds

**Project**: Context Engineering Template  
**Status**: 3 of 5 phases complete, fully tested  
**Your Task**: Extend to Go, add advanced features, prepare for production  
**NEW**: Documentation reorganized into 8 purpose-based folders in `docs-organized/` (Dec 2025)

---

## What Works Today

| Component | Status | Test Command |
|-----------|--------|--------------|
| TypeScript Core | ✅ Complete | `npm start` |
| Python Impl | ✅ Complete | `python3 src/tools/examples/code-analyzer/python/analyze.py` |
| Proof Steps | ✅ Complete | Same as Python |
| Documentation | ✅ 2000+ lines | Read PHILOSOPHY.md |

---

## What You'll Build

1. **Go Implementation** (Week 1-2)
   - Create: `src/tools/examples/code-analyzer/go/`
   - Copy pattern from Python
   - Use same ExecutionMetrics

2. **Advanced Features** (Week 3+)
   - Cross-language examples
   - Test execution engine
   - Custom proof patterns

---

## Critical Files You MUST Know

| File | Purpose | Action |
|------|---------|--------|
| `docs-organized/README.md` | Documentation hub | **READ FIRST** |
| `docs-organized/04-Learning-Guides/PHILOSOPHY.md` | Design principles | Navigate by role |
| `src/tools/toolDefinitions.ts` | Tool system | Reference for structure |
| `src/tools/examples/code-analyzer/python/analyze.py` | Working example | Copy pattern for Go |
| `src/feedback/feedbackLoop.ts` | Metrics tracking | Understand ExecutionMetrics |
| `src/utils/contextBuilder.ts` | Context assembly | Understand token budgeting |

---

## Your First Commands

```bash
# Navigate to project
cd "path/to/context-engineering-template"

# View documentation hub
cat docs-organized/README.md

# Verify TypeScript works
npm start                    # Should show 6 demos, exit 0

# Verify Python works
python3 src/tools/examples/code-analyzer/python/analyze.py

# View your task list
cat docs-organized/07-Handoff-Docs/AGENT_MISSION.md

# Read the philosophy
cat docs-organized/04-Learning-Guides/PHILOSOPHY.md
```

---

## ExecutionMetrics Schema (MEMORIZE THIS)

```typescript
{
  toolName: string,
  success: boolean,
  executionTime: number,      // milliseconds
  contextTokensUsed: number,
  outputQuality: number,      // 0-1
  timestamp?: number,
  notes?: string
}
```

Use this in:
- TypeScript: `src/feedback/feedbackLoop.ts`
- Python: `src/feedback/python/feedback.py`
- Go: You'll create in `src/feedback/go/feedback.go`

---

## Folder Structure TL;DR

```
Tools live here:
src/tools/examples/TOOLNAME/
├── README.md                    (specification)
├── python/                      (Python impl)
│   └── implement.py
├── typescript/                  (TypeScript impl)
│   └── implement.ts
└── go/                          (Go impl - YOU CREATE THIS)
    └── implement.go
```

---

## Proof Steps Basics

### What It Does
```python
analyze_code(
    code="buggy code",
    language="python",
    generate_proof=True,           # NEW!
    issue_to_resolve="undefined var"
)
# Returns: Tests that FAIL with bug, PASS with fix
```

### 4 Issue Patterns (in `analyze.py`)
1. Uninitialized variables (NameError)
2. Missing error handling (Exception)
3. Type safety (TypeError)
4. Logic errors (Wrong calculation)

### Your Task for Go
Create `_generate_go_proof_tests()` function that does the same thing in Go

---

## One-Page Implementation Guide

### To Add Go Support:

```
1. Create folder structure
   mkdir -p src/tools/examples/code-analyzer/go

2. Create main file: analyze.go
   - Copy structure from analyze.py
   - Convert Python to Go
   - Keep same function signatures
   - Maintain ExecutionMetrics struct

3. Create proof generation
   - Implement _generate_go_proof_tests()
   - Generate Go-idiomatic tests
   - Use same patterns as Python

4. Update README.md
   - Add Go section
   - Show Go usage example
   - List Go implementation

5. Test it
   - go build analyze.go
   - Create example_test.go
   - Verify output matches spec

6. Document it
   - Add Go example to top-level docs
   - Update LANGUAGE_AGNOSTIC.md
   - Add Go section to guides
```

---

## Environment Check

Before you code, verify:
```bash
# TypeScript environment
npm --version        # Should be 10+
node --version       # Should be 18+

# Python environment
python3 --version    # Should be 3.13+

# Go environment (if available)
go version          # Should be 1.20+

# Git
git --version       # Should have git configured
```

---

## Your Daily Standup Questions

### Did I...?
- [ ] Understand what I'm building?
- [ ] Know the success criteria?
- [ ] Have all dependencies working?
- [ ] Know where to find examples?
- [ ] Have the right documentation open?

### Can I...?
- [ ] Run existing tests successfully?
- [ ] Explain the architecture from memory?
- [ ] Name the 4 proof patterns?
- [ ] Find every file I need to modify?
- [ ] Describe ExecutionMetrics without looking?

---

## The 3-Tier Success Criteria

### Tier 1: Week 1 (Onboarding)
- ✅ All tests pass
- ✅ Can explain PHILOSOPHY
- ✅ Environment configured

### Tier 2: Week 2 (Implementation)
- ✅ Go skeleton created
- ✅ Compiles and runs
- ✅ Examples working

### Tier 3: Week 3 (Production)
- ✅ Complete implementation
- ✅ All tests passing
- ✅ Documentation updated

---

## When Something's Wrong

| Issue | Check | Fix |
|-------|-------|-----|
| TypeScript won't compile | `npm run type-check` | Check type errors |
| Python won't run | `python3 -m py_compile file.py` | Fix syntax |
| Don't understand code | Read PHILOSOPHY.md | Trace execution |
| Tests failing | Check assumptions | Review test expectations |
| Not sure what to do | Read AGENT_MISSION.md | Follow the checklist |

---

## Slack Messages You'll Send

**Start of day**: "Starting onboarding. Running tests now."
**After day 1**: "Tests pass. Reading PHILOSOPHY.md. ETA 4 hours."
**Start week 2**: "Starting Go implementation. 80% confident."
**Mid-week**: "Go skeleton compiling. Adding proof generation."
**End week 2**: "Go implementation complete. Writing tests."
**Week 3**: "Cross-language examples ready. Starting advanced features."

---

## The ONE Thing to Remember

> **"Language-agnostic specifications, language-specific implementations"**

This applies to:
- ✅ Tools (spec in README, implementation in language folder)
- ✅ Metrics (same schema everywhere)
- ✅ Context (same approach, different languages)
- ✅ Workflows (markdown specs, code implementations)
- ✅ Examples (same examples in Python, TypeScript, Go)

---

## Bookmarks You'll Need

1. **PHILOSOPHY.md** - Why we do what we do
2. **LANGUAGE_AGNOSTIC.md** - How we support multiple languages
3. **WORKFLOWS.md** - The processes we follow
4. **AGENT_HANDOFF.md** - Detailed project overview
5. **This file (AGENT_MISSION.md)** - Your quick reference

---

## Your Superpower

You have:
- ✅ Complete working code in 2 languages
- ✅ Comprehensive documentation
- ✅ Clear architecture
- ✅ Proven patterns
- ✅ Good examples

You don't have to:
- ❌ Reinvent the wheel
- ❌ Figure out the design
- ❌ Write from scratch
- ❌ Guess best practices
- ❌ Debug unclear code

Just follow the patterns and extend!

---

## Go Time! 🚀

**Next 30 Minutes**:
1. Read PHILOSOPHY.md (10 min)
2. Run tests (5 min)
3. Read LANGUAGE_AGNOSTIC.md (10 min)
4. Plan Go implementation (5 min)

**Then**:
1. Create Go skeleton
2. Implement functions
3. Test and verify
4. Document and commit

You've got everything you need. Go build something great!

---

**Version**: 1.0  
**Date**: December 30, 2025  
**Status**: ✅ Ready for Agent
