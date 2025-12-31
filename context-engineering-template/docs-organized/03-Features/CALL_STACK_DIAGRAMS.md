# Call Stack Diagrams - Execution Traces

Detailed call stack diagrams showing how functions call each other during execution of the main workflows.

---

## 1. Basic Workflow Call Stack

How the basic workflow executes step-by-step through the codebase.

### Complete Execution Stack

```mermaid
graph TB
    START["main()"]
    
    START --> EXEC["executeBasicWorkflow()"]
    
    EXEC --> STEP1["buildContext()"]
    STEP1 --> CB["new ContextBuilder()"]
    CB --> PARSE["parseSystemRole()"]
    PARSE --> TOKEN["countTokens()"]
    TOKEN --> PRIORITY["assignPriority()"]
    PRIORITY --> RESULT1["↩️ contextObject"]
    
    EXEC --> STEP2["addToolDefinitions()"]
    STEP2 --> TR["getToolRegistry()"]
    TR --> LOOKUP["lookupTools()"]
    LOOKUP --> VALIDATE_TOOLS["validateToolSchema()"]
    VALIDATE_TOOLS --> RESULT2["↩️ toolRegistry"]
    
    EXEC --> STEP3["prepareInput()"]
    STEP3 --> PARSE_INPUT["parseRequest()"]
    PARSE_INPUT --> VALIDATE_PARAMS["validateParameters()"]
    VALIDATE_PARAMS --> RESULT3["↩️ validatedInput"]
    
    EXEC --> STEP4["executeTool()"]
    STEP4 --> SELECT_TOOL["selectTool()"]
    SELECT_TOOL --> FIND_IMPL["findImplementation()"]
    FIND_IMPL --> CALL_TOOL["callTool()"]
    CALL_TOOL --> RESULT4["↩️ toolResult"]
    
    EXEC --> STEP5["recordMetrics()"]
    STEP5 --> CAPTURE["captureMetrics()"]
    CAPTURE --> STORE["storeInFeedback()"]
    STORE --> RESULT5["↩️ metricsStored"]
    
    EXEC --> STEP6["analyzeFeedback()"]
    STEP6 --> CALC["calculateMetrics()"]
    CALC --> ANALYZE["generateRecommendations()"]
    ANALYZE --> RESULT6["↩️ analysis"]
    
    RESULT1 --> GATHER["Gather Results"]
    RESULT2 --> GATHER
    RESULT3 --> GATHER
    RESULT4 --> GATHER
    RESULT5 --> GATHER
    RESULT6 --> GATHER
    
    GATHER --> RETURN["↩️ finalResult"]
```

### Function Call Hierarchy

```mermaid
graph TB
    subgraph "Layer 1: Entry Point"
        MAIN["main()"]
    end
    
    subgraph "Layer 2: Workflow Orchestration"
        WF["executeWorkflow()"]
    end
    
    subgraph "Layer 3: Stage Management"
        S1["Stage1_Context()"]
        S2["Stage2_Tools()"]
        S3["Stage3_Input()"]
        S4["Stage4_Execution()"]
        S5["Stage5_Metrics()"]
        S6["Stage6_Feedback()"]
    end
    
    subgraph "Layer 4: Core Logic"
        CB["ContextBuilder"]
        TR["ToolRegistry"]
        EX["Executor"]
        FB["FeedbackLoop"]
    end
    
    subgraph "Layer 5: Utilities"
        PARSE["Parser"]
        VALIDATE["Validator"]
        TOKEN["TokenCounter"]
        STORE["Storage"]
    end
    
    MAIN --> WF
    
    WF --> S1
    WF --> S2
    WF --> S3
    WF --> S4
    WF --> S5
    WF --> S6
    
    S1 --> CB
    S2 --> TR
    S3 --> PARSE
    S4 --> EX
    S5 --> FB
    S6 --> FB
    
    CB --> TOKEN
    TR --> VALIDATE
    EX --> STORE
    FB --> STORE
```

### Parameter Passing Through Stack

```mermaid
sequenceDiagram
    participant Caller as main()
    participant WF as Workflow
    participant Builder as ContextBuilder
    participant Counter as TokenCounter
    participant Store as Storage
    
    Caller->>WF: context, tools, input
    WF->>Builder: systemRole, capabilities
    Builder->>Counter: content (string)
    Counter->>Counter: count tokens
    Counter-->>Builder: tokenCount (number)
    Builder->>Store: save context
    Store-->>Builder: ✓ saved
    Builder-->>WF: contextObject
    WF-->>Caller: finalResult
```

---

## 2. Advanced Workflow Call Stack

Multi-tool execution with dependency management.

### Multi-Tool Orchestration Stack

```mermaid
graph TB
    START["executeAdvancedWorkflow()"]
    
    START --> ANALYZE["analyzeRequirements()"]
    
    ANALYZE --> BUILD["buildExecutionPlan()"]
    BUILD --> GRAPH["buildDependencyGraph()"]
    GRAPH --> TOPO["topologicalSort()"]
    TOPO --> PLAN["↩️ executionPlan[]"]
    
    ANALYZE --> FORK1["Parallel Fork"]
    
    FORK1 --> EX_A["executeToolA()"]
    FORK1 --> EX_B["executeToolB()"]
    
    EX_A --> SEL_A["selectTool()"]
    SEL_A --> RUN_A["runTool()"]
    RUN_A --> RES_A["↩️ resultA"]
    
    EX_B --> SEL_B["selectTool()"]
    SEL_B --> RUN_B["runTool()"]
    RUN_B --> RES_B["↩️ resultB"]
    
    RES_A --> WAIT["Wait for all"]
    RES_B --> WAIT
    
    WAIT --> EX_C["executeToolC()"]
    EX_C --> INPUT_C["mergeInputs(resultA, resultB)"]
    INPUT_C --> RUN_C["runTool()"]
    RUN_C --> RES_C["↩️ resultC"]
    
    RES_C --> EX_D["executeToolD()"]
    EX_D --> INPUT_D["useAsInput(resultC)"]
    INPUT_D --> RUN_D["runTool()"]
    RUN_D --> RES_D["↩️ resultD"]
    
    RES_D --> AGGREGATE["aggregateResults()"]
    AGGREGATE --> MERGE["mergeMetrics()"]
    MERGE --> ANALYZE_CHAIN["analyzeToolChain()"]
    ANALYZE_CHAIN --> FINAL["↩️ finalResult"]
```

### Tool Execution Tree with Timing

```mermaid
graph TD
    START["t=0: Start"]
    
    START --> T1A["t=0: Tool A<br/>Execution"]
    START --> T1B["t=0: Tool B<br/>Execution"]
    
    T1A --> T1A_CALL["callTool_A()"]
    T1B --> T1B_CALL["callTool_B()"]
    
    T1A_CALL --> T1A_TIME["Exec Time: 150ms"]
    T1B_CALL --> T1B_TIME["Exec Time: 200ms"]
    
    T1A_TIME --> T1A_DONE["t=150: Tool A Done"]
    T1B_TIME --> T1B_DONE["t=200: Tool B Done"]
    
    T1A_DONE --> WAIT["t=200: All Ready"]
    T1B_DONE --> WAIT
    
    WAIT --> T2C["t=200: Tool C<br/>Input: A+B"]
    T2C --> T2C_CALL["callTool_C()"]
    T2C_CALL --> T2C_TIME["Exec Time: 100ms"]
    T2C_TIME --> T2C_DONE["t=300: Tool C Done"]
    
    T2C_DONE --> T3D["t=300: Tool D<br/>Input: C"]
    T3D --> T3D_CALL["callTool_D()"]
    T3D_CALL --> T3D_TIME["Exec Time: 50ms"]
    T3D_TIME --> T3D_DONE["t=350: Tool D Done"]
    
    T3D_DONE --> FINAL["t=350: Total<br/>Wall Time: 350ms"]
    
    style T1A_DONE fill:#90EE90
    style T1B_DONE fill:#90EE90
    style T2C_DONE fill:#87CEEB
    style T3D_DONE fill:#FFD700
    style FINAL fill:#FF69B4
```

### Error Handling Call Stack

```mermaid
graph TD
    EXEC["executeToolC()"]
    
    EXEC --> TRY["try:"]
    
    TRY --> PREP["prepareInput()"]
    PREP --> CHECK{Input<br/>Valid?}
    
    CHECK -->|No| ERROR1["throw InvalidInputError()"]
    CHECK -->|Yes| RUN["runTool()"]
    
    RUN --> CATCH_RUN{Tool<br/>Throws?}
    
    CATCH_RUN -->|Yes| ERROR2["catch ToolExecutionError()"]
    CATCH_RUN -->|No| SUCCESS["Result OK"]
    
    ERROR1 --> HANDLE1["handleInvalidInput()"]
    ERROR2 --> HANDLE2["handleExecutionError()"]
    
    HANDLE1 --> LOG["logError()"]
    HANDLE2 --> LOG
    
    LOG --> FALLBACK["executeFallback()"]
    
    FALLBACK --> RETRY{Retry<br/>Available?}
    RETRY -->|Yes| RUN
    RETRY -->|No| RESULT_ERROR["↩️ errorResult"]
    
    SUCCESS --> RESULT_OK["↩️ result"]
```

---

## 3. Proof Steps Call Stack

Generation and validation of test proofs.

### Proof Generation Stack

```mermaid
graph TB
    START["analyzeAndGenerateProof()"]
    
    START --> PARSE_CODE["parseCode()"]
    PARSE_CODE --> AST["buildAST()"]
    AST --> CODES["↩️ codeAST"]
    
    CODES --> ANALYZE["analyzeForIssues()"]
    
    ANALYZE --> LEV1["checkSyntax()"]
    LEV1 --> SYNTAX["↩️ syntaxIssues"]
    
    ANALYZE --> LEV2["checkSemantics()"]
    LEV2 --> SEMANTIC["↩️ semanticIssues"]
    
    ANALYZE --> LEV3["checkLogic()"]
    LEV3 --> LOGIC["↩️ logicIssues"]
    
    ANALYZE --> LEV4["checkPerformance()"]
    LEV4 --> PERF["↩️ perfIssues"]
    
    SYNTAX --> COMBINE["combineIssues()"]
    SEMANTIC --> COMBINE
    LOGIC --> COMBINE
    PERF --> COMBINE
    
    COMBINE --> ISSUES["↩️ allIssues[]"]
    
    ISSUES --> GENERATE["generateProofs()"]
    
    GENERATE --> LOOP["for each issue:"]
    LOOP --> SELECT["selectTemplate()"]
    SELECT --> GEN_FAIL["generateFailTest()"]
    SELECT --> GEN_PASS["generatePassTest()"]
    
    GEN_FAIL --> TEST_FAIL["↩️ testFail"]
    GEN_PASS --> TEST_PASS["↩️ testPass"]
    
    TEST_FAIL --> COLLECT["collectTests()"]
    TEST_PASS --> COLLECT
    
    COLLECT --> VALIDATE["validateProofs()"]
    VALIDATE --> CHECK_FAIL["runAgainstBuggy()"]
    VALIDATE --> CHECK_PASS["runAgainstFixed()"]
    
    CHECK_FAIL --> VERIFY_FAIL["↩️ verified[]"]
    CHECK_PASS --> VERIFY_FAIL
    
    VERIFY_FAIL --> FINAL["↩️ proofSuite"]
```

### Test Generation Templates

```mermaid
graph TD
    ISSUE["Issue Selected:<br/>e.g., Undefined Variable"]
    
    ISSUE --> SELECT["selectTemplate()"]
    
    SELECT --> T1["Template: Syntax Error<br/>- Parse test code<br/>- Verify parser throws<br/>- Check error message"]
    
    SELECT --> T2["Template: Logic Error<br/>- Set up test case<br/>- Execute code<br/>- Verify unexpected behavior"]
    
    SELECT --> T3["Template: Type Error<br/>- Type check input<br/>- Verify mismatch<br/>- Check type error"]
    
    SELECT --> T4["Template: Edge Case<br/>- Test boundaries<br/>- Test nulls/empties<br/>- Test overflows"]
    
    T1 --> GEN["generateTest()"]
    T2 --> GEN
    T3 --> GEN
    T4 --> GEN
    
    GEN --> OUT["↩️ testCode"]
```

### Proof Validation Stack

```mermaid
sequenceDiagram
    participant Gen as Proof<br/>Generator
    participant Exec as Executor
    participant Buggy as Buggy<br/>Code
    participant Fixed as Fixed<br/>Code
    participant Validator as Validator
    
    Gen->>Validator: testSuite[]
    Validator->>Exec: execute_test
    Exec->>Buggy: run test_fail
    Buggy->>Exec: throws NameError
    Exec->>Validator: ✓ expected fail
    
    Validator->>Exec: execute_test
    Exec->>Fixed: run test_pass
    Fixed->>Exec: returns 30
    Exec->>Validator: ✓ expected pass
    
    Validator->>Gen: ✓ all proofs verified
```

---

## 4. Context Building Call Stack

Detailed stack for context construction and optimization.

### Context Construction Stack

```mermaid
graph TB
    START["buildContext()"]
    
    START --> INPUT["receiveInput()"]
    INPUT --> CONFIG["↩️ systemConfig"]
    
    CONFIG --> CLASSIFY["classifyByPriority()"]
    
    CLASSIFY --> HIGH["extractHighPriority()"]
    HIGH --> H1["getSystemRole()"]
    H1 --> H1_RES["↩️ role: ~50 tokens"]
    HIGH --> H2["getCoreTools()"]
    H2 --> H2_RES["↩️ tools: ~100 tokens"]
    HIGH --> H3["getCriticalConstraints()"]
    H3 --> H3_RES["↩️ constraints: ~50 tokens"]
    
    CLASSIFY --> MEDIUM["extractMediumPriority()"]
    MEDIUM --> M1["getToolDescriptions()"]
    M1 --> M1_RES["↩️ descriptions: ~100 tokens"]
    MEDIUM --> M2["getHelperContext()"]
    M2 --> M2_RES["↩️ helpers: ~50 tokens"]
    
    CLASSIFY --> LOW["extractLowPriority()"]
    LOW --> L1["getExamples()"]
    L1 --> L1_RES["↩️ examples: ~100 tokens"]
    LOW --> L2["getReferences()"]
    L2 --> L2_RES["↩️ references: ~50 tokens"]
    
    H1_RES --> BUILD["buildContextString()"]
    H2_RES --> BUILD
    H3_RES --> BUILD
    M1_RES --> BUILD
    M2_RES --> BUILD
    
    BUILD --> CHECK["checkTokenBudget()"]
    CHECK --> OVER{Over<br/>Budget?}
    
    OVER -->|No| INCLUDE_L["includeAll()"]
    OVER -->|Yes| TRIM["trimLowPriority()"]
    
    L1_RES --> OVER
    L2_RES --> OVER
    
    TRIM --> TRIM_L1["remove examples"]
    TRIM_L1 --> CHECK
    
    INCLUDE_L --> FINAL["assembleContext()"]
    FINAL --> RETURN["↩️ finalContext"]
```

### Token Counting Call Stack

```mermaid
graph TD
    COUNT["countTokens()"]
    
    COUNT --> INPUT["receiveString()"]
    INPUT --> STR["↩️ textString"]
    
    STR --> SPLIT["splitTokens()"]
    SPLIT --> WORDS["↩️ words[]"]
    
    WORDS --> ENCODE["encodeTokens()"]
    ENCODE --> SUBWORD["applySplitting()"]
    SUBWORD --> TOKENS["↩️ tokenIds[]"]
    
    TOKENS --> SUM["sumTokenCount()"]
    SUM --> RESULT["↩️ count: 235"]
    
    RESULT --> COMPARE["compareWithBudget()"]
    COMPARE --> BUDGET["↩️ usage: 235/2000"]
```

---

## 5. Feedback Loop Call Stack

How feedback is recorded, analyzed, and used.

### Metrics Recording Stack

```mermaid
graph TB
    EXEC["toolExecution()"]
    
    EXEC --> RECORD["recordMetrics()"]
    
    RECORD --> CAPTURE["captureExecutionData()"]
    CAPTURE --> SUCCESS["recordSuccess()"]
    CAPTURE --> TIME["recordExecutionTime()"]
    CAPTURE --> TOKENS["recordTokensUsed()"]
    CAPTURE --> QUALITY["analyzeOutputQuality()"]
    
    SUCCESS --> METRIC1["success: true"]
    TIME --> METRIC2["time_ms: 150"]
    TOKENS --> METRIC3["tokens: 235"]
    QUALITY --> METRIC4["quality: 0.92"]
    
    METRIC1 --> CREATE["createMetricRecord()"]
    METRIC2 --> CREATE
    METRIC3 --> CREATE
    METRIC4 --> CREATE
    
    CREATE --> RECORD_OBJ["{ name, success,<br/>time_ms, tokens,<br/>quality, timestamp }"]
    
    RECORD_OBJ --> STORE["storeInFeedback()"]
    STORE --> APPEND["appendToHistory()"]
    APPEND --> PERSIST["persistToStorage()"]
    PERSIST --> DONE["↩️ recorded"]
```

### Analysis Stack

```mermaid
graph TD
    ANALYZE["analyzeFeedback()"]
    
    ANALYZE --> READ["readMetricsHistory()"]
    READ --> HISTORY["↩️ metrics[]"]
    
    HISTORY --> CALC["calculateAggregates()"]
    
    CALC --> SUCCESS_RATE["calcSuccessRate()"]
    SUCCESS_RATE --> SR["100 / 100 = 100%"]
    
    CALC --> AVG_TIME["calcAverageTime()"]
    AVG_TIME --> AT["avg: 142ms"]
    
    CALC --> TOKEN_EFF["calcTokenEfficiency()"]
    TOKEN_EFF --> TE["tokens/result: 2.4"]
    
    CALC --> QUALITY_AVG["calcAvgQuality()"]
    QUALITY_AVG --> QA["avg: 0.94"]
    
    SR --> TREND["detectTrends()"]
    AT --> TREND
    TE --> TREND
    QA --> TREND
    
    TREND --> IMPROVING{Improving?}
    IMPROVING -->|Yes| SUGGEST1["suggest: Continue<br/>current strategy"]
    IMPROVING -->|No| SUGGEST2["suggest: Optimize<br/>context priority"]
    
    SUGGEST1 --> RECS["generateRecommendations()"]
    SUGGEST2 --> RECS
    
    RECS --> RETURN["↩️ analysisReport"]
```

---

## Next Steps

For more details:
- **[ARCHITECTURE_OVERVIEW.md](ARCHITECTURE_OVERVIEW.md)** - System components
- **[WORKFLOW_DIAGRAMS.md](WORKFLOW_DIAGRAMS.md)** - Workflow visualizations
- **[FEATURES_AND_COMPONENTS.md](FEATURES_AND_COMPONENTS.md)** - Feature deep-dives
