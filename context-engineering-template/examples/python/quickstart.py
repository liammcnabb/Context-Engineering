#!/usr/bin/env python3
"""
Context Engineering Template - Python Quick Start

Demonstrates context engineering principles using Python.
Language-agnostic approach with multi-language support.
"""

import sys
import time
from typing import Any, Dict, List, Literal

# Import our implementations
sys.path.insert(0, 'src/tools/examples/code-analyzer/python')
sys.path.insert(0, 'src/feedback/python')
sys.path.insert(0, 'src/context/python')

from analyze import analyze_code
from feedback import ExecutionMetrics, FeedbackAnalyzer
from builder import ContextBuilder


def print_header(title: str) -> None:
    """Print formatted header."""
    print(f"\n📚 {title}")
    print("─" * 50)


def main():
    """Run the context engineering demo."""
    
    print("\n" + "=" * 50)
    print("🎓 Context Engineering - Python Demo")
    print("=" * 50)
    
    # Demo 1: Build Context
    print_header("Demo 1: Building Strategic Context")
    
    builder = ContextBuilder(max_length=5000)
    builder \
        .add_section(
            'Project Goal',
            'Build a data processing pipeline in Python',
            'high'
        ) \
        .add_section(
            'Requirements',
            '- Process large datasets efficiently\n'
            '- Support multiple data formats\n'
            '- Include error handling',
            'high'
        ) \
        .add_section(
            'Tech Stack',
            'Python 3.10+, Pandas, NumPy',
            'medium'
        ) \
        .add_examples([
            {
                'input': 'process([1, 2, 3, 4, 5])',
                'output': 'Results after processing'
            }
        ])
    
    context, truncated = builder.build()
    stats = builder.get_stats()
    
    print(f"✅ Context built successfully")
    print(f"   Sections: {stats['sections']}")
    print(f"   Size: {stats['total_length']} chars")
    print(f"   Truncated: {truncated}")
    
    # Demo 2: Execute Tool
    print_header("Demo 2: Execute Analysis Tool")
    
    code_sample = """
def process_data(data: list) -> dict:
    result = {}
    for item in data:
        result[item] = item * 2
    return result
    """
    
    start_time = time.time()
    analysis_result = analyze_code(
        code=code_sample,
        language='python',
        analyze_for=['readability', 'performance']
    )
    execution_time = (time.time() - start_time) * 1000
    
    print(f"✅ Analysis complete")
    print(f"   Complexity: {analysis_result.complexity}")
    print(f"   Issues: {analysis_result.issues}")
    print(f"   Suggestions:")
    for suggestion in analysis_result.suggestions:
        print(f"     • {suggestion}")
    
    # Demo 3: Record Feedback
    print_header("Demo 3: Record Execution Feedback")
    
    analyzer = FeedbackAnalyzer(success_threshold=0.8)
    
    # Simulate 3 executions
    executions = [
        ExecutionMetrics(
            tool_name='code_analyzer',
            timestamp=None,
            success=True,
            execution_time=45,
            context_tokens_used=1200,
            output_quality='excellent'
        ),
        ExecutionMetrics(
            tool_name='code_analyzer',
            timestamp=None,
            success=True,
            execution_time=50,
            context_tokens_used=1250,
            output_quality='good'
        ),
        ExecutionMetrics(
            tool_name='code_analyzer',
            timestamp=None,
            success=True,
            execution_time=48,
            context_tokens_used=1200,
            output_quality='good'
        ),
    ]
    
    print("Recording executions...")
    for i, exec_metrics in enumerate(executions, 1):
        analyzer.record(exec_metrics)
    
    # Demo 4: Analyze Feedback
    print_header("Demo 4: Analyze Feedback & Get Recommendations")
    
    analysis = analyzer.analyze()
    print(f"✅ Analysis Complete")
    print(f"   Success Rate: {analysis['success_rate']:.1%}")
    print(f"   Avg Time: {analysis['avg_execution_time']:.0f}ms")
    print(f"   Recommendations: {len(analysis['recommendations'])}")
    
    # Demo 5: Report
    print_header("Demo 5: Full Analysis Report")
    print(analyzer.report())
    
    # Demo 6: Summary
    print_header("Demo 6: Complete Workflow Summary")
    
    workflow = """
1. ✅ Built strategic context with priorities
2. ✅ Executed analysis tool
3. ✅ Recorded performance metrics
4. ✅ Analyzed feedback patterns
5. ✅ Generated recommendations

Result: Ready for iterative refinement!
    """
    print(workflow)
    
    # Demo 7: Next Steps
    print_header("Demo 7: Next Steps")
    
    next_steps = """
1. Review the multi-language structure:
   - src/tools/examples/ - Tool implementations
   - src/feedback/python/ - Feedback system
   - src/context/python/ - Context builder

2. Create tools in your language:
   - src/tools/your-tool/your-language/
   - Follow the interface standards
   - Document the tool schema

3. Read the documentation:
   - LANGUAGE_AGNOSTIC.md - Framework overview
   - docs/GUIDE.md - Concepts and patterns

4. Try these exercises:
   - Create a tool in your language
   - Build a custom workflow
   - Integrate with your system

5. Scale up:
   - Connect tools across languages
   - Use REST or message queues
   - Deploy in production
    """
    print(next_steps)
    
    print("\n" + "=" * 50)
    print("💡 Remember: Context Engineering is language-agnostic!")
    print("   Use any language for your tools.")
    print("=" * 50 + "\n")


if __name__ == '__main__':
    main()
