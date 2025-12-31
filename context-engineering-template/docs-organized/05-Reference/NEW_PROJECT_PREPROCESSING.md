# New Project Preprocessing Guide

Use this guide to prepare your new project for agent handoff. Feed this entire document to your AI agent when setting up a new project from scratch.

---

## Project Setup Checklist

Before handing off to the agent, prepare your project with the following structure and documentation:

### 1. Project Scaffolding

Ensure your project includes:

```
your-project/
├── docs/
│   ├── ARCHITECTURE.md
│   ├── SETUP.md
│   └── GUIDELINES.md
├── src/
│   └── [language-specific structure]
├── tests/
├── config/
├── package.json (or requirements.txt, CMakeLists.txt, etc.)
├── .gitignore
├── README.md
└── LICENSE
```

### 2. Dependency Management

**For Python Projects:**
- Create `requirements.txt` with all dependencies and versions
- Consider using `pyproject.toml` for modern Python projects
- Document Python version requirements (e.g., Python 3.9+)

**For Java Projects:**
- Set up `pom.xml` (Maven) or `build.gradle` (Gradle)
- Document JDK version requirements (e.g., JDK 11+)
- Configure dependency management repository

**For C++ & Qt Projects:**
- Create `CMakeLists.txt` with all dependencies
- Document Qt version (e.g., Qt 6.x) and compiler requirements
- List system dependencies (e.g., OpenGL, boost libraries)

**For Node.js/TypeScript Projects:**
- Set up `package.json` with all dependencies
- Use `npm` or `yarn` lock files
- Document Node version requirements

### 3. Environment Setup Documentation

Create a `SETUP.md` file documenting:

```markdown
## Environment Setup

### Prerequisites
- [Runtime/Language]: Version X.X+
- [Build Tool]: Version X.X+
- [Package Manager]: Version X.X+

### Installation Steps

1. **Install dependencies**
   - [Command for your language]
   
2. **Configure IDE/Editor**
   - Recommended extensions/plugins
   - Linter/formatter configuration
   - Code style settings

3. **Build/Run Instructions**
   - How to build the project
   - How to run tests
   - How to start the application

4. **Development Workflow**
   - How to set up pre-commit hooks
   - How to run code quality checks
   - How to debug

### Environment Variables
- Document required `.env` variables
- Provide `.env.example` template
```

### 4. Build Configuration

**Create appropriate configuration files:**

- **Python**: `setup.py`, `pyproject.toml`, `tox.ini`
- **Java**: `pom.xml` or `build.gradle`
- **C++/Qt**: `CMakeLists.txt`, `.pro` file (if using qmake)
- **Node.js**: `package.json`, `webpack.config.js` (if needed)

**Include build targets for:**
- Development builds
- Release/production builds
- Test execution
- Documentation generation

### 5. Code Guidelines Integration

Copy the relevant code guidelines to your project:

```
your-project/
└── docs/
    └── CODE_GUIDELINES/
        ├── README.md (general standards)
        └── languages/
            └── [YOUR_LANGUAGE].md
```

**Or link to the master guidelines:**
```markdown
# Code Guidelines

See [Code Guidelines](../context-engineering-template/docs-organized/05-Reference/CODE_GUIDELINES/)

Key standards for this project:
- Max 110 character line length
- Max 3 levels of nesting
- Max 80 lines per function/method
- Use language-specific naming conventions
- Follow provided pre-approval checklist
```

### 6. CI/CD Configuration

Create configuration files for:

- **Testing**: `pytest.ini`, Jest config, JUnit setup
- **Linting**: `.eslintrc`, `pylintrc`, checkstyle config
- **Formatting**: `.prettierrc`, `black` config, `clang-format` config
- **Build Pipeline**: `.github/workflows/`, `.gitlab-ci.yml`, or equivalent

Example structure:
```
your-project/
├── .github/workflows/
│   ├── test.yml (run tests)
│   ├── lint.yml (run linters)
│   └── build.yml (build project)
└── .gitlab-ci.yml (or equivalent)
```

### 7. Testing Framework Setup

**Document and configure:**

- Test framework for your language (pytest, JUnit, Google Test, Jest)
- Test structure (`tests/`, `src/__tests__/`, etc.)
- How to run tests (`npm test`, `pytest`, `gradle test`)
- Code coverage requirements and how to measure
- Sample test files for reference

### 8. Documentation

Create minimal documentation:

```
your-project/docs/
├── README.md           (Project overview)
├── SETUP.md           (Environment setup)
├── ARCHITECTURE.md    (System design)
├── API.md            (API documentation, if applicable)
└── CONTRIBUTING.md   (Contribution guidelines)
```

### 9. Git Configuration

- Create `.gitignore` appropriate for your language/framework
- Set up `.gitattributes` if needed for line endings
- Document git workflow (branching strategy, commit conventions)

### 10. IDE/Editor Configuration

Create configuration files for consistent development:

**For VS Code:**
- `.vscode/settings.json` (editor settings)
- `.vscode/extensions.json` (recommended extensions)
- `.vscode/launch.json` (debug configuration)

**For other IDEs:**
- IntelliJ: `.idea/` configuration
- Qt Creator: Project file with proper paths

---

## Pre-Agent Handoff Prompt Template

Use this template when giving your project to an agent for setup:

```
I have a new [PROJECT_TYPE] project called [PROJECT_NAME].

**Project Type**: [Backend Service / Desktop Application / Library / Web App / etc.]
**Primary Language**: [Python / Java / C++/Qt / TypeScript / etc.]
**Target Runtime**: [Python 3.9+ / JDK 11+ / Qt 6.x / Node 16+ / etc.]

**Already Configured:**
- [✓/✗] Folder structure created
- [✓/✗] Dependency management file (package.json / requirements.txt / CMakeLists.txt)
- [✓/✗] Code guidelines linked/copied
- [✓/✗] Build configuration files
- [✓/✗] Environment setup documentation
- [✓/✗] Testing framework set up
- [✓/✗] CI/CD pipeline configured

**Project Location**: [path/to/project]

**Next Steps for Agent**:
1. Verify all dependencies are properly declared
2. Set up initial source code structure with skeleton files
3. Create sample/placeholder implementations following code guidelines
4. Verify build process works end-to-end
5. Set up and run initial test suite
6. Validate linting and formatting checks pass
7. Document any deviations from standard guidelines
8. Provide handoff summary

**Code Guidelines**: Use [Python/Java/C++/Qt] guidelines from [path/to/guidelines]

**Project Requirements**:
[List any specific requirements, constraints, or special considerations]
```

---

## Quick Reference

### Minimum Requirements for Agent Handoff

1. ✅ Project folder structure created
2. ✅ Dependency file configured (`package.json`, `requirements.txt`, etc.)
3. ✅ README with project overview
4. ✅ SETUP.md with environment instructions
5. ✅ Code guidelines linked or copied
6. ✅ `.gitignore` created
7. ✅ Build configuration file (CMakeLists.txt, package.json, etc.)

### Optional but Recommended

- [ ] CI/CD pipeline configuration template
- [ ] Testing framework set up with sample test
- [ ] Documentation template
- [ ] IDE configuration files
- [ ] Pre-commit hooks configuration

---

## Example Handoff Scenarios

### Python Backend Service

```
Project: user-service
Type: Backend Service
Language: Python 3.10+
Location: ~/projects/user-service

Pre-configured:
✓ Folder structure (src/, tests/, docs/)
✓ requirements.txt with base dependencies
✓ README.md
✓ .gitignore
✓ setup.py
✗ Code guidelines (need to copy)
✗ CI/CD pipeline
✗ Testing framework

Agent tasks:
1. Copy Python code guidelines
2. Set up pytest framework
3. Create GitHub Actions workflow
4. Build skeleton service structure
```

### C++ Desktop Application with Qt

```
Project: image-editor
Type: Desktop Application
Language: C++ with Qt 6.5
Location: ~/projects/image-editor

Pre-configured:
✓ Folder structure (src/, ui/, tests/, cmake/)
✓ CMakeLists.txt (basic)
✓ README.md
✓ .gitignore
✗ Code guidelines (need to copy)
✗ CMakeLists.txt (need completion)
✗ Testing framework
✗ Build verification

Agent tasks:
1. Copy C++/Qt code guidelines
2. Complete CMakeLists.txt configuration
3. Set up Google Test framework
4. Create main window skeleton with Qt
5. Verify build process works
```

---

## Document Maintenance

Last updated: **2025-12-30**

Use this document as your preprocessing checklist before handing projects to agents.

