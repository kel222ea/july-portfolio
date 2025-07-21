# Image Builder Comparison Portfolio

A portfolio project that compares implementation patterns between two image builder applications: the production-ready **image-builder-frontend** and the prototype **image-builder-UX**.

## Project Overview

This portfolio showcases side-by-side comparisons of key architectural decisions and implementation patterns:

- **Wizard vs Modal workflows**
- **Redux + RTK Query vs React useState**
- **Enterprise validation vs Basic form validation**
- **Comprehensive status handling vs Simple indicators**
- **PatternFly tables vs Custom HTML tables**

## Architecture Comparison

### image-builder-frontend (Production)
- **PatternFly 4.x** components
- **Redux + RTK Query** state management  
- **Multi-step wizard** workflows (15+ steps)
- **Comprehensive validation** system with custom hooks
- **Enterprise data tables** with sorting, filtering, pagination
- **Detailed error handling** with structured error objects

### image-builder-UX (Prototype)  
- **PatternFly 4.x** components
- **React useState** hooks for state management
- **Modal-based** workflows with tabs
- **Basic form validation** 
- **Custom HTML tables** with simple interactions
- **Streamlined error handling** with toast notifications

## Portfolio Structure

```
/src
├── app/
│   ├── App.tsx                    # Main application shell
│   ├── AppNavigation.tsx          # Sidebar navigation
│   └── AppRoutes.tsx             # Route configuration
├── components/
│   ├── Overview.tsx              # Portfolio introduction
│   ├── WizardComparison.tsx      # Wizard vs Modal patterns
│   ├── StateManagementComparison.tsx  # Redux vs useState
│   ├── FormValidationComparison.tsx   # Validation systems
│   ├── StatusIndicatorsComparison.tsx # Status handling
│   └── DataTablesComparison.tsx       # Table implementations
└── index.tsx                     # Application entry point
```

## Key Insights

### When to Use Enterprise Patterns (Frontend)
- Building production applications
- Complex state management requirements  
- Need for comprehensive error handling
- Long-term maintainability
- Team collaboration at scale

### When to Use Prototype Patterns (UX)
- Rapid prototyping and iteration
- Simple state requirements
- Demo and proof-of-concept projects
- Learning and experimentation
- Quick time-to-market

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Design System

Built with **PatternFly 5.x** components for modern design consistency and accessibility.

## Technologies Used

- **React 18** with TypeScript
- **PatternFly React** design system
- **React Router** for navigation
- **Webpack** for bundling
- **Jest** for testing

## Learning Outcomes

This portfolio demonstrates:
- Architectural trade-offs between enterprise and prototype approaches
- State management pattern comparisons
- Form validation strategy differences  
- UI/UX pattern implementations
- Code organization and maintainability considerations

---

*This portfolio project was created to showcase different implementation approaches for similar functionality, helping developers understand when to choose different architectural patterns.*