"""
Python Context Builder - Language Agnostic Implementation

Build strategic, prioritized context that works across all languages.
"""

from dataclasses import dataclass, field
from typing import Dict, List, Tuple, Literal


@dataclass
class ContextSection:
    """A section of context with priority."""
    title: str
    content: str
    priority: Literal['high', 'medium', 'low']
    
    def __str__(self) -> str:
        prefix = '⭐ ' if self.priority == 'high' else ''
        return f"{prefix}## {self.title}\n\n{self.content}"


class ContextBuilder:
    """Build strategic context with priorities and constraints."""
    
    PRIORITY_WEIGHTS = {
        'high': 100,
        'medium': 50,
        'low': 10
    }
    
    def __init__(self, max_length: int = 10000):
        """
        Initialize context builder.
        
        Args:
            max_length: Maximum context length in characters
        """
        self.max_length = max_length
        self.sections: Dict[str, ContextSection] = {}
    
    def add_section(self, 
                    title: str, 
                    content: str, 
                    priority: Literal['high', 'medium', 'low'] = 'medium') -> 'ContextBuilder':
        """Add a context section."""
        self.sections[title] = ContextSection(title, content, priority)
        return self  # Allow chaining
    
    def add_examples(self, 
                     examples: List[Dict[str, str]]) -> 'ContextBuilder':
        """Add usage examples."""
        content = "### Examples\n\n"
        for i, ex in enumerate(examples, 1):
            content += f"**Example {i}:**\n"
            content += f"Input: {ex['input']}\n"
            content += f"Output: {ex['output']}\n\n"
        
        self.add_section('Examples', content, 'medium')
        return self
    
    def add_tools(self, tools: List[Dict[str, str]]) -> 'ContextBuilder':
        """Add available tools."""
        content = "### Available Tools\n\n"
        for tool in tools:
            content += f"- **{tool['name']}**: {tool['description']}\n"
        
        self.add_section('Tools', content, 'high')
        return self
    
    def build(self) -> Tuple[str, bool]:
        """
        Build final context.
        
        Returns:
            (context_string, was_truncated)
        """
        # Sort by priority
        sorted_sections = sorted(
            self.sections.values(),
            key=lambda s: self.PRIORITY_WEIGHTS[s.priority],
            reverse=True
        )
        
        # Build context
        context = ""
        truncated = False
        
        for section in sorted_sections:
            section_str = str(section)
            if len(context) + len(section_str) <= self.max_length:
                context += section_str + "\n\n"
            else:
                truncated = True
                break
        
        return context.strip(), truncated
    
    def get_stats(self) -> dict:
        """Get builder statistics."""
        return {
            'sections': len(self.sections),
            'total_length': sum(len(str(s)) for s in self.sections.values()),
            'within_limit': all(
                len(str(s)) for s in self.sections.values()
            )
        }
    
    def clear(self) -> 'ContextBuilder':
        """Clear all sections."""
        self.sections = {}
        return self


def merge_contexts(contexts: List[Tuple[str, int]]) -> str:
    """
    Merge multiple contexts by priority.
    
    Args:
        contexts: List of (content, priority) tuples
    
    Returns:
        Merged context string
    """
    # Sort by priority
    sorted_contexts = sorted(contexts, key=lambda x: x[1], reverse=True)
    
    # Merge
    return "\n\n".join(content for content, _ in sorted_contexts)


# Example usage
if __name__ == '__main__':
    builder = ContextBuilder(max_length=5000)
    
    builder \
        .add_section(
            'System Instructions',
            'You are a helpful assistant. Follow best practices.',
            'high'
        ) \
        .add_section(
            'Current Task',
            'Analyze the provided code for issues.',
            'high'
        ) \
        .add_section(
            'Code Style',
            '- Use type hints\n- Max line length: 100 chars\n- Document public APIs',
            'medium'
        ) \
        .add_examples([
            {'input': 'def add(a, b): return a + b',
             'output': 'Simple function. Add type hints.'},
        ]) \
        .add_tools([
            {'name': 'analyze_code', 'description': 'Analyze code quality'},
            {'name': 'format_code', 'description': 'Format code'},
        ])
    
    context, truncated = builder.build()
    stats = builder.get_stats()
    
    print(f"Context built: {len(context)} chars")
    print(f"Truncated: {truncated}")
    print(f"Stats: {stats}")
    print(f"\nContext:\n{context}")
