React UI Components Assignment

This project contains two reusable React components built with TypeScript and TailwindCSS, documented and testable using Storybook.

Components
1. InputField

A flexible input component with validation states.

Features:

Text input with label, placeholder, helper text, error message

States: disabled, invalid, loading

Variants: filled, outlined, ghost

Sizes: small, medium, large

2. DataTable

A data table component for displaying tabular data.

Features:

Display tabular data

Column sorting (ascending/descending)

Row selection (single/multiple)

Loading state

Empty state

Setup Instructions
1. Clone the repository
git clone <your-repo-url>
cd <your-repo-folder>

2. Install dependencies

Make sure you have Node.js (v18+) installed.

npm install

3. Start the React app
npm start


Opens the app in development mode at http://localhost:3000

You can test InputField and DataTable directly in App.tsx.

4. Run Storybook
npm run storybook


Opens Storybook at http://localhost:6006

Allows testing all component variants and states in isolation.

5. Build for production (optional)
npm run build


Creates a production build in the build/ folder.

Project Structure
src/
├─ components/
│  ├─ InputField/
│  │  ├─ InputField.tsx
│  │  └─ InputField.stories.tsx
│  ├─ DataTable/
│  │  ├─ DataTable.tsx
│  │  └─ DataTable.stories.tsx
├─ App.tsx
├─ index.tsx