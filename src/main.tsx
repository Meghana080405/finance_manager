import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { FinanceProvider } from "./context/financecontext";
import { BudgetProvider } from "./context/budgetcontext";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <FinanceProvider>
        <BudgetProvider>
          <App />
        </BudgetProvider>
      </FinanceProvider>
    </BrowserRouter>
  </React.StrictMode>
);