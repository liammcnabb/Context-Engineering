# Context Engineering Workflows

These workflows describe the flow and logic in markdown format. Implementations follow the same pattern in any language.

## 1. Basic Workflow: Build Context → Execute Tool → Analyze Feedback

### Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│ BASIC WORKFLOW: Simple Tool Execution with Feedback             │
└─────────────────────────────────────────────────────────────────┘

START
  │
  ├─→ [1. Define System Context]
  │    │ Establish what the system knows
  │    │ Priority: HIGH
  │    └─→ Add: System role, capabilities, constraints
  │
  ├─→ [2. Add Tool Definitions]
  │    │ Specify available tools
  │    │ Priority: HIGH
  │    └─→ Each tool: name, parameters, description
  │
  ├─→ [3. Prepare Input]
  │    │ User request or data
  │    │ Priority: MEDIUM
  │    └─→ Validate against tool requirements
  │
  ├─→ [4. Execute Tool]
  │    │ Call tool with input
  │    │ Capture: result, execution_time, success status
  │    └─→ Record metrics
  │
  ├─→ [5. Record Metrics]
  │    │ ExecutionMetrics: {
  │    │    tool_name, success, execution_time,
  │    │    context_tokens_used, output_quality
  │    │ }
  │    └─→ Store in feedback system
  │
  ├─→ [6. Analyze Feedback]
  │    │ Calculate: success_rate, avg_execution_time
  │    │ Generate recommendations
  │    └─→ Return analysis report
  │
  └─→ END: Output result + metrics
```

### Detailed Steps

#### Step 1: Define System Context
**What**: Establish what the system knows and can do  
**Why**: Guides tool selection and parameters  
**Inputs**: System role, capabilities, constraints  
**Output**: Context object

```markdown
Context Structure:
├── Section: "system_role"
│   └── Content: "I am a code analyzer that finds issues and suggests improvements"
│   └── Priority: HIGH
│   └── Tokens: ~50
│
├── Section: "available_tools"
│   └── Content: List of tools the system can use
│   └── Priority: HIGH
│   └── Tokens: ~100
│
└── Section: "constraints"
    └── Content: Rate limits, token budget, etc.
    └── Priority: MEDIUM
    └── Tokens: ~50
```

#### Step 2: Add Tool Definitions
**What**: Specify which tools are available  
**Why**: System knows what it can call  
**Inputs**: Tool specifications  
**Output**: Tool registry

```markdown
Each Tool Definition:
├── Name: "analyze_code"
├── Parameters:
│   ├── code (string, required)
│   ├── language (string, required)
│   └── check_for (array, optional)
├── Description: "Analyzes code for issues and complexity"
├── Returns: { complexity, issues, suggestions }
└── Priority in context: HIGH
```

#### Step 3: Prepare Input
**What**: Get the request/data to process  
**Why**: Ensures tool gets correct parameters  
**Inputs**: User request or data  
**Output**: Validated parameters

```markdown
Input Validation Checklist:
[ ] Request has all required parameters
[ ] Parameter types match tool definition
[ ] Values are within acceptable ranges
[ ] Complexity is within token budget
[ ] Output can be generated in time limit
```

#### Step 4: Execute Tool
**What**: Call the tool with validated parameters  
**Why**: Actually performs the work  
**Inputs**: Tool name, parameters  
**Output**: Tool result

```markdown
Execution Steps:
1. Look up tool in registry
2. Verify tool exists
3. Call tool with parameters
4. Measure execution time (start → finish)
5. Capture result (success or error)
6. Record any side effects
```

#### Step 5: Record Metrics
**What**: Store execution metrics for analysis  
**Why**: Build feedback loop  
**Inputs**: Execution result  
**Output**: ExecutionMetrics entry

```markdown
ExecutionMetrics:
├── tool_name: "analyze_code"
├── success: true
├── execution_time: 45 (milliseconds)
├── context_tokens_used: 250
├── output_quality: 0.85 (0-1 scale)
├── timestamp: 1735564800000
├── notes: "Found 3 issues in code"
└── [Store in feedback system]
```

#### Step 6: Analyze Feedback
**What**: Find patterns in execution metrics  
**Why**: Improve future tool usage  
**Inputs**: All recorded metrics  
**Output**: Analysis report

```markdown
Analysis:
├── Success Rate: 95% (19/20 successful)
├── Average Execution Time: 42ms
│   ├── Min: 15ms
│   ├── Max: 120ms
│   └── Trend: Stable
│
├── Quality Metrics: 0.87 average
│   ├── Range: 0.65-1.0
│   └── Trend: Improving
│
├── Context Efficiency: 92%
│   ├── Tokens used vs budgeted
│   └── Optimization: Good
│
└── Recommendations:
    ├── "analyze_code with language='python' is fastest"
    ├── "Consider caching results for identical inputs"
    └── "Quality drops when execution time > 80ms"
```

### Markdown Pseudocode

```markdown
## Execute Basic Workflow

### Input
```
request = {
  code: "function add(a, b) { return a + b; }",
  language: "javascript"
}
```

### Process

1. **Build Context**
   - Add system role to context
   - Add tool definitions to context
   - Calculate total tokens: 200
   - Remaining budget: 1800

2. **Execute**
   ```
   result = execute_tool("analyze_code", {
     code: request.code,
     language: request.language
   })
   ```

3. **Record**
   ```
   metrics = ExecutionMetrics(
     tool_name: "analyze_code",
     success: true,
     execution_time: 23,
     output_quality: 0.92,
     timestamp: now()
   )
   feedback_loop.record(metrics)
   ```

4. **Report**
   ```
   analysis = feedback_loop.analyze()
   return {
     result: result,
     metrics: analysis
   }
   ```

### Output
```
{
  analysis: {
    complexity: "simple",
    issues: [],
    suggestions: ["Add JSDoc comments"]
  },
  metrics: {
    execution_time: 23ms,
    success_rate: 95%,
    quality: 0.92
  }
}
```
```

---

## 2. Advanced Workflow: Multi-Tool with Context Optimization

### Flow Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│ ADVANCED WORKFLOW: Multiple Tools + Context Optimization          │
└──────────────────────────────────────────────────────────────────┘

START
  │
  ├─→ [1. Build Initial Context]
  │    │ Priority: HIGH, MEDIUM, LOW
  │    │ Total: 2000 tokens
  │    │ Available: 2000 tokens
  │    └─→ Context: {role, tools, examples, constraints}
  │
  ├─→ [2. First Tool: Analyze Code]
  │    │ Input: {code, language}
  │    │ Time: 23ms
  │    │ Quality: 0.92
  │    │ Tokens used: 150
  │    └─→ Result: {complexity, issues, suggestions}
  │
  ├─→ [3. Record & Analyze]
  │    │ Store metrics from Tool 1
  │    │ Check success rate
  │    │ Identify patterns
  │    └─→ Feedback: "Tool 1 working well"
  │
  ├─→ [4. Optimize Context]
  │    │ Keep: HIGH priority items (role, tools)
  │    │ Keep: Most recent examples
  │    │ Remove: LOW priority, least recent items
  │    │ Save: ~300 tokens
  │    └─→ Optimized context: 1700 tokens
  │
  ├─→ [5. Second Tool: Generate Docs]
  │    │ Input: {code, analysis}
  │    │ Time: 45ms
  │    │ Quality: 0.88
  │    │ Tokens used: 200
  │    └─→ Result: {documentation}
  │
  ├─→ [6. Record & Check Status]
  │    │ Store metrics from Tool 2
  │    │ Tokens remaining: 1200
  │    │ Can run more tools
  │    └─→ Feedback: "On track"
  │
  ├─→ [7. Third Tool: Generate Tests]
  │    │ Input: {code, docs}
  │    │ Time: 67ms
  │    │ Quality: 0.85
  │    │ Tokens used: 250
  │    └─→ Result: {test_code}
  │
  ├─→ [8. Final Analysis]
  │    │ All tools completed
  │    │ Success rate: 100%
  │    │ Avg quality: 0.88
  │    │ Total time: 135ms
  │    └─→ Recommendations for next run
  │
  └─→ END: All outputs + complete metrics report
```

### Detailed Steps

#### Step 1: Build Initial Context (2000 tokens available)

```markdown
Context Assembly:
├── HIGH Priority (must include)
│   ├── System Role: "Code quality assistant"
│   │   └── Tokens: 50
│   ├── Tool Definitions: All 3 tools
│   │   └── Tokens: 150
│   └── Recent Examples: Last 2 successful runs
│       └── Tokens: 200
│
├── MEDIUM Priority (try to include)
│   ├── Constraints & Limits
│   │   └── Tokens: 100
│   └── Performance Guidelines
│       └── Tokens: 80
│
└── LOW Priority (include if space)
    ├── Historical context
    └── Tokens: 200

Total Used: 780 tokens
Total Available: 2000 tokens
Available for output: 1220 tokens
```

#### Step 2: Execute Tool 1 - Analyze Code

```markdown
Tool Execution #1: analyze_code

Input:
├── code: "function add(a,b){return a+b;}"
├── language: "javascript"
└── check_for: ["complexity", "issues", "best_practices"]

Execution:
├── Tool lookup: Found ✓
├── Parameter validation: Passed ✓
├── Execution time: 23ms
└── Result: Success ✓

Output:
├── complexity: "simple"
├── issues: []
├── suggestions: ["Add JSDoc", "Use const instead of var"]
└── confidence: 0.92

Metrics Recorded:
├── tool_name: "analyze_code"
├── success: true
├── execution_time: 23ms
├── output_quality: 0.92
└── context_tokens_used: 150
```

#### Step 3: Record and Analyze Feedback

```markdown
Feedback Analysis After Tool 1:

Current Status:
├── Tools run: 1/3
├── Success rate: 100%
├── Avg quality: 0.92
├── Total tokens used: 930 (150 context + 150 execution)
├── Tokens remaining: 1070
└── Status: ✓ On track

Decision: Proceed with Tool 2
```

#### Step 4: Optimize Context (Free up space)

```markdown
Context Optimization - Before: 780 tokens

Remove LOW priority (least recent):
├── Historical context from 5+ runs ago
│   └── Save: 150 tokens
└── Detailed error logs
    └── Save: 50 tokens

Reorganize MEDIUM priority:
├── Keep only most relevant constraints
│   └── Save: 40 tokens
└── Consolidate guidelines
    └── Save: 20 tokens

Result: 520 tokens (from 780)
Freed: 260 tokens
New Available: 1330 tokens

Optimized Context Now Includes:
├── System role ✓
├── All 3 tool definitions ✓
├── Last successful example ✓
└── Current execution metrics ✓
```

#### Step 5: Execute Tool 2 - Generate Docs

```markdown
Tool Execution #2: generate_docs

Input:
├── code: "function add(a,b){return a+b;}"
├── analysis: {complexity: "simple", issues: []}
└── style: "JSDoc"

Execution:
├── Tool lookup: Found ✓
├── Parameter validation: Passed ✓
├── Execution time: 45ms
└── Result: Success ✓

Output:
├── documentation: "/**\n * Adds two numbers\n * @param {number} a\n * @param {number} b\n * @returns {number}\n */"
└── quality: 0.88

Metrics Recorded:
├── tool_name: "generate_docs"
├── success: true
├── execution_time: 45ms
├── output_quality: 0.88
└── context_tokens_used: 200
```

#### Step 6: Check Status Before Tool 3

```markdown
Status Check:

Progress:
├── Tools completed: 2/3
├── Success rate: 100%
├── Avg quality: 0.90
└── Avg time: 34ms

Resource Usage:
├── Total tokens used so far: 870
├── Context tokens available: 1070
├── Can run Tool 3: YES ✓
└── Estimated remaining after Tool 3: 820 tokens

Decision: Execute Tool 3
```

#### Step 7: Execute Tool 3 - Generate Tests

```markdown
Tool Execution #3: generate_tests

Input:
├── code: "function add(a,b){return a+b;}"
├── analysis: {complexity: "simple"}
└── framework: "jest"

Execution:
├── Tool lookup: Found ✓
├── Parameter validation: Passed ✓
├── Execution time: 67ms
└── Result: Success ✓

Output:
├── tests: "describe('add', () => { it('should return sum', () => { expect(add(2, 3)).toBe(5); }); })"
└── quality: 0.85

Metrics Recorded:
├── tool_name: "generate_tests"
├── success: true
├── execution_time: 67ms
├── output_quality: 0.85
└── context_tokens_used: 250
```

#### Step 8: Final Analysis and Recommendations

```markdown
Complete Workflow Analysis:

Overall Metrics:
├── Tools executed: 3/3 (100%)
├── Success rate: 100%
├── Average quality: 0.88
├── Total execution time: 135ms
│   ├── analyze_code: 23ms (17%)
│   ├── generate_docs: 45ms (33%)
│   └── generate_tests: 67ms (50%)
└── Peak execution: generate_tests at 67ms

Token Efficiency:
├── Total tokens used: 600
├── Budget allocated: 2000
├── Utilization: 30%
├── Efficiency: Excellent ✓

Quality Analysis:
├── Tool 1 (analyze): 0.92 ⬆️
├── Tool 2 (docs): 0.88 ↔️
├── Tool 3 (tests): 0.85 ⬇️
└── Trend: Slight decline in Tool 3 (possibly due to complexity)

Recommendations for Next Run:
├── "generate_tests is the bottleneck (67ms)"
│   └── Consider: Pre-cached test templates
├── "Quality decreases in Tool 3"
│   └── Consider: More context about testing patterns
├── "analyze_code and generate_docs are stable"
│   └── Action: Keep current approach
└── "Token efficiency is high (30% usage)"
    └── Action: Can increase context quality next time
```

### Markdown Pseudocode

```markdown
## Execute Advanced Workflow

### Step 1: Initialize
```
context = new ContextBuilder()
context.add_section("system_role", "Code quality assistant", priority="HIGH")
context.add_section("tools", all_tool_definitions, priority="HIGH")
context.add_section("examples", last_2_successful_runs, priority="HIGH")
context.add_section("constraints", rate_limits, priority="MEDIUM")

initial_context = context.build()
available_tokens = 2000
```

### Step 2-3: Execute and Record Tool 1
```
result_1 = execute_tool("analyze_code", {
  code: input_code,
  language: "javascript"
})

metrics_1 = ExecutionMetrics(
  tool_name: "analyze_code",
  success: true,
  execution_time: 23,
  output_quality: 0.92
)
feedback_loop.record(metrics_1)

available_tokens = available_tokens - 150
```

### Step 4: Optimize Context
```
# Remove lowest priority items to free space
context.remove_low_priority_items()
optimized_context = context.build()

freed_tokens = context.tokens_freed()
available_tokens = available_tokens + freed_tokens
```

### Step 5-6: Execute Tool 2
```
result_2 = execute_tool("generate_docs", {
  code: input_code,
  analysis: result_1
})

metrics_2 = ExecutionMetrics(
  tool_name: "generate_docs",
  success: true,
  execution_time: 45,
  output_quality: 0.88
)
feedback_loop.record(metrics_2)

available_tokens = available_tokens - 200
```

### Step 7: Execute Tool 3
```
result_3 = execute_tool("generate_tests", {
  code: input_code,
  analysis: result_1
})

metrics_3 = ExecutionMetrics(
  tool_name: "generate_tests",
  success: true,
  execution_time: 67,
  output_quality: 0.85
)
feedback_loop.record(metrics_3)
```

### Step 8: Final Report
```
analysis = feedback_loop.analyze()

return {
  results: {
    analysis: result_1,
    documentation: result_2,
    tests: result_3
  },
  metrics: {
    success_rate: 100%,
    avg_quality: 0.88,
    total_time: 135ms,
    recommendations: analysis.recommendations
  }
}
```
```

---

## 3. Error Recovery Workflow

### Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│ ERROR RECOVERY: Handle Failures Gracefully                       │
└─────────────────────────────────────────────────────────────────┘

START
  │
  ├─→ [1. Execute Tool]
  │    │ Try to run tool
  │    └─→ Check result
  │         │
  │         ├─→ SUCCESS? → Record metrics → Continue
  │         │
  │         └─→ FAILED? → Go to Step 2
  │
  ├─→ [2. Classify Error]
  │    │ What kind of error?
  │    ├─→ Timeout? → Too long
  │    ├─→ Invalid input? → Wrong parameters
  │    ├─→ Resource unavailable? → Retry-able
  │    └─→ Unexpected? → Critical error
  │
  ├─→ [3. Take Recovery Action]
  │    │ Based on error type
  │    ├─→ Timeout: Use cached result or skip
  │    ├─→ Invalid input: Fix parameters + retry
  │    ├─→ Resource: Wait + retry (up to 3x)
  │    └─→ Critical: Fallback to alternative tool
  │
  ├─→ [4. Record Failure]
  │    │ ExecutionMetrics: {
  │    │    success: false,
  │    │    error_type: "...",
  │    │    recovery_action: "...",
  │    │    timestamp: now()
  │    │ }
  │    └─→ Store in feedback system
  │
  ├─→ [5. Learn from Failure]
  │    │ Feedback analysis:
  │    ├─→ "Tool X fails on inputs > 500 chars"
  │    ├─→ "Always timeout after 100ms"
  │    └─→ Update context: "Split large inputs", "Increase timeout"
  │
  ├─→ [6. Decide: Retry or Fallback?]
  │    │ Check retry count
  │    ├─→ Retries < 3? → Go back to Step 1 with adjustments
  │    └─→ Retries >= 3? → Use alternative approach
  │
  └─→ END: Return result (success or graceful failure)
```

### Error Types and Responses

```markdown
## Error Types

### Type 1: Timeout (Execution time exceeds limit)
**Trigger**: execution_time > max_allowed_time  
**Recovery**:
1. Store partial results if available
2. Use cached result from previous run
3. Simplify input and retry (Step 1)
4. Move to alternative tool

### Type 2: Invalid Input
**Trigger**: Parameter validation fails  
**Recovery**:
1. Log invalid parameter details
2. Attempt to fix:
   - Trim whitespace
   - Convert types
   - Apply constraints
3. Retry with fixed input
4. If still fails: Skip this input

### Type 3: Resource Unavailable
**Trigger**: Tool cannot access required resource  
**Recovery**:
1. Wait: 100ms
2. Retry (attempt 1)
3. Wait: 500ms
4. Retry (attempt 2)
5. Wait: 2000ms
6. Retry (attempt 3)
7. If still fails: Fallback

### Type 4: Tool Error
**Trigger**: Tool returns error code  
**Recovery**:
1. Check error code:
   - Rate limited? → Backoff + retry
   - Not found? → Use alternative
   - Internal error? → Retry once
2. If critical: Escalate

### Type 5: Unexpected Error
**Trigger**: Something we didn't anticipate  
**Recovery**:
1. Log full error details
2. Record failure metrics
3. Extract what we can
4. Use fallback result
5. Alert operator
```

### Markdown Pseudocode

```markdown
## Execute Tool with Error Handling

### Main Flow
```
try:
  result = execute_tool("analyze_code", input)
  if result.success:
    metrics = ExecutionMetrics(success=true, ...)
    feedback_loop.record(metrics)
    return result
  else:
    error_type = classify_error(result.error)
    go_to "Recovery Workflow"
except Exception as e:
  error_type = "UNEXPECTED_ERROR"
  go_to "Recovery Workflow"
```

### Recovery Workflow
```
if error_type == "TIMEOUT":
  action = check_cache_or_skip()
  
elif error_type == "INVALID_INPUT":
  fixed_input = fix_input_parameters(input)
  if fixed_input != input:
    go_to "Main Flow" with fixed_input
  else:
    action = "SKIP_AND_LOG"
    
elif error_type == "RESOURCE_UNAVAILABLE":
  for attempt in 1..3:
    wait(backoff_time[attempt])
    result = retry_execute_tool()
    if result.success:
      go_to "Main Flow"
  action = "USE_FALLBACK"
  
elif error_type == "TOOL_ERROR":
  if is_retryable(error):
    action = "RETRY"
  else:
    action = "USE_ALTERNATIVE_TOOL"
    
else:  # UNEXPECTED_ERROR
  action = "ESCALATE_AND_FALLBACK"

# Record failure
metrics = ExecutionMetrics(
  success: false,
  error_type: error_type,
  recovery_action: action,
  error_details: error
)
feedback_loop.record(metrics)

# Execute recovery action
execute_action(action)
```

### Learning from Failure
```
# After recording failure
analysis = feedback_loop.analyze()

patterns = analysis.find_patterns()
for pattern in patterns:
  if pattern.frequency > 3:
    # Add to context for next run
    context.add_warning(pattern.description)
    context.add_guideline(pattern.solution)

# Example:
# Pattern: "analyze_code fails on inputs > 500 chars"
# Solution: "Split large inputs into chunks"
# Added to context: "When input > 500 chars, use chunking strategy"
```
```

---

## 4. Comparison Table: When to Use Each Workflow

| Workflow | Use Case | Complexity | Tools | Token Budget | Error Handling |
|----------|----------|-----------|-------|--------------|----------------|
| **Basic** | Single tool execution, simple task | Low | 1-2 | Small (< 500) | Simple retry |
| **Advanced** | Multi-tool pipeline, complex task | High | 3+ | Large (> 1000) | Optimize + recovery |
| **Error Recovery** | When things go wrong | Medium | Any | Any | Comprehensive |

---

## 5. Choosing Your Workflow

### Use **Basic Workflow** if:
- Single operation needed
- Quick decision required
- Limited token budget
- Simple success/failure

### Use **Advanced Workflow** if:
- Multiple dependent tools
- Complex decision making
- Large token budget available
- Want quality optimization
- Need efficiency metrics

### Use **Error Recovery** if:
- Previous run failed
- Need to handle edge cases
- Working with unreliable tools
- Want graceful degradation
- Need failure analysis

---

## Key Principles (All Workflows)

1. **Record Everything** - All metrics matter for learning
2. **Measure Time** - Track execution time for bottlenecks
3. **Track Quality** - Score output quality consistently
4. **Prioritize Context** - HIGH priority items first
5. **Learn from Feedback** - Use analysis to improve next run
6. **Graceful Degradation** - Always have a fallback
7. **Language Agnostic** - Same flow in any language

---

## Workflow Implementation Checklist

- [ ] Define all steps clearly in markdown
- [ ] Specify inputs and outputs for each step
- [ ] Identify decision points
- [ ] Plan recovery actions
- [ ] Implement metrics collection
- [ ] Create analysis logic
- [ ] Document all assumptions
- [ ] Test with sample data
