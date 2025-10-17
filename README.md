# UISP - Unified Intelligent Staffing Platform

An AI-driven healthcare staffing and credentialing system prototype built with Next.js 15 and Tailwind CSS.

## Overview

UISP is a web-based prototype that demonstrates how AI and automation can transform healthcare recruitment. The platform streamlines the entire staffing workflow from job request to onboarding, featuring credential intelligence, workflow automation, and predictive analytics.

## Key Features

### 1. Dashboard
- Real-time KPI metrics (Active Jobs, Candidates, Placement Time, Compliance Rate)
- AI predictive alerts with actionable insights
- At-risk candidate monitoring
- Recent job requests overview
- System status indicators

### 2. AI Job Matching Engine
- Intelligent candidate-to-job matching algorithm
- Multi-factor scoring based on:
  - Role and specialty alignment
  - Credential compliance status
  - Candidate availability
  - Historical dropout risk analysis
  - Location preferences
- Visual match scores (80%+ excellent, 60-79% good, <60% low)

### 3. Credential Tracker
- Auto-verification and expiration monitoring
- Status categorization (Valid, Expiring, Expired, Missing)
- Filterable credential dashboard
- Automated renewal reminders
- Verification status tracking

### 4. Candidate Management
- Comprehensive candidate profiles
- Dropout risk prediction (AI-powered)
- Compliance scoring
- Specialty and role tracking
- Real-time status updates

### 5. Workflow Timeline View
- Visual progress tracking through recruitment stages
- Stage-by-stage status (Completed, In Progress, Blocked, Pending)
- Assignee tracking
- Automated notifications and escalations
- Bottleneck detection

### 6. Analytics & Reports
- KPI trends and comparisons
- Monthly placement charts
- Credential distribution analysis
- Workflow stage distribution
- Impact metrics (50% faster placement, 47% dropout reduction, 24% compliance improvement)

### 7. Job Requests Management
- Detailed job listings with requirements
- Urgency-based prioritization
- Matched candidates tracking
- Status filters (Open, In Progress, Filled)
- Required credentials and specialties display

## Technology Stack

- **Framework:** Next.js 15.5.5 (React 19)
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript 5
- **Data:** Static JSON mock data (no database)

## Architecture

```
src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Dashboard (home page)
│   ├── candidates/        # Candidate management with AI matching
│   ├── credentials/       # Credential tracker
│   ├── jobs/             # Job requests
│   ├── workflows/        # Workflow timelines
│   ├── reports/          # Analytics and KPIs
│   └── layout.tsx        # Root layout with navigation
├── components/
│   └── Navigation.tsx    # Main navigation component
└── data/
    └── mockData.ts       # All static mock data
```

## Mock Data Structure

The prototype uses comprehensive static data including:
- 6 candidates with varying statuses and risk profiles
- 5 job requests across different urgency levels
- 4 client organizations
- Complete credential records
- 4 workflow timelines
- KPI metrics and historical trends
- 5 predictive alerts

## Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to view the application.

### Build for Production

```bash
npm run build
npm start
```

## Key Metrics Demonstrated

- **Placement Time:** Reduced from 58 to 32 days (45% improvement)
- **Dropout Rate:** Reduced from 34% to 18% (47% improvement)
- **Compliance Rate:** Increased from 76% to 94% (24% improvement)
- **Credential Processing:** Reduced from 21 to 12 days (43% improvement)

## AI & Automation Features

1. **Predictive Dropout Analytics**
   - Risk scoring based on activity patterns
   - Proactive intervention recommendations
   - Historical trend analysis

2. **Smart Credential Management**
   - Automated expiration monitoring (30, 60, 90 day alerts)
   - Auto-verification requests
   - Missing document notifications

3. **Intelligent Job Matching**
   - Multi-dimensional candidate scoring
   - Real-time compatibility analysis
   - Ranked match recommendations

4. **Workflow Automation**
   - Auto-routing to available staff
   - Stage completion triggers
   - Delay detection and escalation

## Prototype Limitations

This is a demonstration prototype with the following characteristics:
- No database connections (all data is static)
- No authentication or user management
- No real API integrations
- Mock AI logic (rule-based, not ML-based)
- Static charts (no real-time data)

## Future Production Enhancements

For a production system, consider adding:
- PostgreSQL/MongoDB database
- Real authentication (Auth0, Clerk, or NextAuth)
- REST/GraphQL API layer
- Real ML models for predictions
- Third-party credential verification APIs
- Email/SMS notification services
- Document upload and storage
- Advanced reporting with export features
- Role-based access control
- Audit logging
- Real-time updates with WebSockets

## Use Cases

UISP is designed for:
- Healthcare staffing agencies
- Hospital HR departments
- Travel nurse agencies
- Medical credentialing departments
- Recruitment workflow management

## License

This is a prototype demonstration project.

## Contact

For questions about the UISP prototype, please refer to the project documentation.
