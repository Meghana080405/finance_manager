import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type Budget = {
  id: number;
  category: string;
  limit: number;
};

type BudgetContextType = {
  budgets: Budget[];
  addBudget: (budget: Budget) => void;
  editBudget: (budget: Budget) => void;
  deleteBudget: (id: number) => void;
};

const BudgetContext = createContext<BudgetContextType | null>(null);

export function BudgetProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [budgets, setBudgets] = useState<Budget[]>(() => {
    const saved = localStorage.getItem("budgets");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "budgets",
      JSON.stringify(budgets)
    );
  }, [budgets]);

  function addBudget(budget: Budget) {
    setBudgets((prev) => [...prev, budget]);
  }

  function editBudget(updatedBudget: Budget) {
    setBudgets((prev) =>
      prev.map((budget) =>
        budget.id === updatedBudget.id
          ? updatedBudget
          : budget
      )
    );
  }

  function deleteBudget(id: number) {
    setBudgets((prev) =>
      prev.filter((budget) => budget.id !== id)
    );
  }

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        addBudget,
        editBudget,
        deleteBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);

  if (!context) {
    throw new Error(
      "useBudget must be used inside BudgetProvider"
    );
  }

  return context;
}