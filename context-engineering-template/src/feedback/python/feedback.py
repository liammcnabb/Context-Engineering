"""
Python Feedback Analyzer - Language Agnostic Implementation

Universal feedback metrics and analysis that work across all languages.
"""

from dataclasses import dataclass, field
from datetime import datetime
from typing import List, Literal
from statistics import mean, stdev


@dataclass
class ExecutionMetrics:
    """Standard metrics for any tool execution."""
    tool_name: str
    timestamp: float  # milliseconds since epoch
    success: bool
    execution_time: float  # milliseconds
    context_tokens_used: int
    output_quality: Literal['excellent', 'good', 'fair', 'poor']
    feedback: str = None


@dataclass
class ContextAdjustment:
    """Recommended context adjustment."""
    metric: str
    change: str
    reason: str
    impact: Literal['high', 'medium', 'low']


class FeedbackAnalyzer:
    """Analyzes execution metrics and provides recommendations."""
    
    def __init__(self, success_threshold: float = 0.8):
        """
        Initialize feedback analyzer.
        
        Args:
            success_threshold: Target success rate (0-1)
        """
        self.metrics: List[ExecutionMetrics] = []
        self.success_threshold = success_threshold
    
    def record(self, metrics: ExecutionMetrics) -> None:
        """Record execution metrics."""
        if metrics.timestamp is None:
            metrics.timestamp = datetime.now().timestamp() * 1000
        self.metrics.append(metrics)
        print(f"✅ Recorded: {metrics.tool_name} "
              f"({metrics.execution_time}ms, "
              f"Quality: {metrics.output_quality})")
    
    def analyze(self) -> dict:
        """Analyze all recorded metrics."""
        if not self.metrics:
            return {
                'success_rate': 0,
                'avg_execution_time': 0,
                'recommendations': []
            }
        
        # Calculate success rate
        successes = sum(1 for m in self.metrics if m.success)
        success_rate = successes / len(self.metrics)
        
        # Calculate execution time
        times = [m.execution_time for m in self.metrics]
        avg_time = mean(times)
        
        # Generate recommendations
        recommendations = self._generate_recommendations(success_rate, avg_time)
        
        return {
            'success_rate': success_rate,
            'avg_execution_time': avg_time,
            'recommendations': recommendations,
            'total_executions': len(self.metrics)
        }
    
    def _generate_recommendations(self, 
                                  success_rate: float,
                                  avg_time: float) -> List[ContextAdjustment]:
        """Generate optimization recommendations."""
        recommendations = []
        
        # Low success rate
        if success_rate < self.success_threshold:
            recommendations.append(ContextAdjustment(
                metric='success_rate',
                change='Increase tool parameter validation',
                reason=f'Success rate ({success_rate:.1%}) below target '
                       f'({self.success_threshold:.1%})',
                impact='high'
            ))
            recommendations.append(ContextAdjustment(
                metric='context_clarity',
                change='Add more detailed tool descriptions',
                reason='Tools may not be receiving clear instructions',
                impact='high'
            ))
        
        # High execution time
        if avg_time > 1000:
            recommendations.append(ContextAdjustment(
                metric='performance',
                change='Break complex tasks into smaller steps',
                reason=f'Avg time ({avg_time:.0f}ms) exceeds optimal threshold',
                impact='medium'
            ))
        
        return recommendations
    
    def report(self) -> str:
        """Generate analysis report."""
        analysis = self.analyze()
        
        report = "# Feedback Analysis Report\n\n"
        report += "## Performance Metrics\n"
        report += f"- Success Rate: {analysis['success_rate']:.1%}\n"
        report += f"- Avg Execution Time: {analysis['avg_execution_time']:.0f}ms\n"
        report += f"- Total Executions: {analysis['total_executions']}\n\n"
        
        report += "## Recommendations\n"
        if not analysis['recommendations']:
            report += "✅ Performance is optimal!\n"
        else:
            for rec in analysis['recommendations']:
                report += f"\n### {rec.metric.upper()} ({rec.impact} impact)\n"
                report += f"- **Change**: {rec.change}\n"
                report += f"- **Reason**: {rec.reason}\n"
        
        return report
    
    def reset(self) -> None:
        """Clear all metrics."""
        self.metrics = []
        print("🔄 Feedback analyzer reset")


# Example usage
if __name__ == '__main__':
    analyzer = FeedbackAnalyzer()
    
    # Simulate some executions
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
    
    for exec_metrics in executions:
        analyzer.record(exec_metrics)
    
    print("\n" + analyzer.report())
