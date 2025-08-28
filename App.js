OneMargin Collateral Management UI
Overview
OneMargin Collateral Management UI is a Micro Frontend (MFE) application built with React and Webpack Module Federation. It provides a modular frontend architecture for managing various aspects of the Collateral management system, including dashboard views, call management, and movements tracking.

Architecture
Micro Frontend Approach
The application follows a Micro Frontend architecture where each feature is developed as an independent React application that can be:

Developed independently
Deployed independently
Composed together at runtime
Key Components
Common: Acts as the shell application that consumes and orchestrates other micro frontends
Dashboard: Provides analytics and overview visualizations
Call Management: Handles call-related workflows and interfaces
Movements: Manages fund movement operations and tracking
Technical Stack
React: v19.1.1
Webpack: v5.88.0 with Module Federation
Maven: For building and packaging the application
Spring Boot: Backend framework serving the application
Development Setup
Prerequisites
Node.js (v20+)
npm (v10+)
Java 21
Maven
Getting Started
Clone the repository
Install dependencies:
cd src/main/coll-mgmt-ui
npm run install-all
Start development servers:
npm run start-mfe
This will start all micro frontends:

Common: http://localhost:3000
Dashboard: http://localhost:3001
Call Management: http://localhost:3002
Development Workflow
Each package can be developed independently:

# Start only the dashboard
cd packages/dashboard
npm run start:mf

# Start only the call management
cd packages/callmanagement
npm run start:mf

# Start only the common shell
cd packages/common
npm run start:mf
Build Process
Local Build
To build all packages:

npm run build-mfe
For individual packages:

cd packages/[package-name]
npm run build
Maven Build
The project includes Maven profiles to streamline the build process:

# Build all packages
mvn clean package -P all

# Build only specific packages
mvn clean package -P dashboard,callmanagement

# Build using MFE architecture
mvn clean package -P mfe
Module Federation Details
The application uses Webpack Module Federation to share components between packages:

Dashboard: Exposes DashboardApp component
Call Management: Exposes CallManagementApp component
Common: Consumes the exposed components and combines them into a unified application
Production Deployment
The build process generates static assets that are copied to the target/classes/static/ directory, organized by component:

/static/common/ - Common shell application
/static/dashboard/ - Dashboard micro frontend
/static/callmanagement/ - Call management micro frontend
/static/movements/ - Movements micro frontend
Customization
Each micro frontend can be customized and extended independently without affecting other parts of the application. The Module Federation setup ensures that all applications share the same React context, enabling seamless integration.

Troubleshooting
Common Issues
Webpack Version Compatibility: If you see errors about webpack configuration, ensure the versions of webpack, webpack-cli, and webpack-dev-server are compatible.

Module Federation Remote Loading: If remote modules fail to load, check network connectivity and ensure the remote entry points are accessible.

React Version Mismatch: All packages must use the same React version to avoid duplicate React instances.
