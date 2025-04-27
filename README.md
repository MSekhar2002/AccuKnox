# CNAPP Dashboard Demo

This project is a React dashboard demonstrating a customizable category and widget system using:

*   React
*   TypeScript
*   Vite
*   Redux Toolkit
*   Styled Components
*   Chart.js

**Live URL :** https://accu-knox-87i1-msekhar2002s-projects.vercel.app/

## Project Structure

```
dashboard-app/
├─ public/
│  └─ vite.svg
├─ src/
│  ├─ assets/
│  │  └─ react.svg
│  ├─ components/
│  │  ├─ widgets/
│  │  │  ├─ DonutChart.tsx
│  │  │  ├─ EmptyWidget.tsx
│  │  │  ├─ GaugeChart.tsx
│  │  │  └─ Widget.tsx
│  │  ├─ AddWidgetSidebar.tsx
│  │  ├─ Category.tsx
│  │  ├─ Dashboard.tsx
│  │  ├─ Header.tsx
│  │  └─ SearchBar.tsx
│  ├─ hooks/
│  │  └─ redux.ts
│  ├─ mockData/
│  │  └─ dashboardData.ts
│  ├─ store/
│  │  ├─ dashboardSlice.ts
│  │  ├─ hooks.ts
│  │  └─ index.ts
│  ├─ types/
│  │  └─ index.ts
│  ├─ App.css
│  ├─ App.tsx
│  ├─ index.css
│  ├─ main.tsx
│  └─ vite-env.d.ts
├─ .gitignore
├─ .postcssrc.js
├─ .postcssrc.json
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ README.md
├─ tsconfig.app.json
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts
```

## Core Flow

1.  **Initialization:** The dashboard loads initial categories and widgets from mock data (`src/mockData/dashboardData.ts`) into the Redux store (`src/store/dashboardSlice.ts`).
2.  **Rendering:**
    *   `App.tsx`: Sets up the Redux Provider and basic layout.
    *   `Header.tsx`: Displays the main application header including search.
    *   `Dashboard.tsx`: Fetches categories and widgets from the Redux store. It maps over categories and renders a `Category` component for each.
    *   `Category.tsx`: Renders the category title and maps over its assigned widget IDs, fetching the corresponding widget data from the store and rendering a `Widget` component for each.
    *   `Widget.tsx`: Displays the widget title and content. Based on the widget `type` and `data`, it renders the appropriate chart (`DonutChart`, `GaugeChart`) or placeholder (`EmptyWidget`).
3.  **Adding/Removing Widgets:**
    *   Clicking "+ Add Widget" on a category or the global "Add Widget To Category" button opens the `AddWidgetSidebar.tsx`.
    *   The sidebar's behavior changes based on how it was opened (globally, for a specific *typed* category, or for a specific *general* category).
    *   Widgets can be selected/deselected across different type tabs (CSPM, CWPP, etc.) or custom widgets created.
    *   If opened globally, a target category (existing or new) must be selected on the 'Custom' tab.
    *   Confirming changes dispatches `addWidget` or `removeWidget` actions to the Redux store.
4.  **Adding Categories:**
    *   Clicking "New Category" opens a modal.
    *   Entering a name and saving dispatches the `addCategory` action (new categories are always type 'General').
5.  **State Management:** All dashboard state (categories, widgets, search query) is managed centrally in the Redux store, ensuring components re-render when the state updates.
6.  **Interactions:**
    *   **Search:** Typing in the search bar filters categories and widgets displayed.
    *   **Reset:** Clicking the refresh icon resets the dashboard state to the initial mock data.
    *   **Time Range:** Selecting a time range updates the display (currently logs selection, no data filtering implemented).

## Setup and Running Locally

**Prerequisites:**

*   Node.js (v18 or later recommended)
*   npm or yarn

**Steps:**

1.  **Navigate to the project directory:**
    ```bash
    cd dashboard-app
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    # yarn dev
    ```
4.  **Open your browser:** Navigate to the local address provided by Vite (usually `http://localhost:5173`).

