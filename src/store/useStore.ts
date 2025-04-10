import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Transaction, Goal, Settings } from '../types';

interface State {
  transactions: Transaction[];
  goals: Goal[];
  settings: Settings;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateTransaction: (updated: Transaction) => void; 
  updateGoal: (id: string, amount: number) => void;
  deleteGoal: (id: string) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  editGoal: (id: string, updatedGoal: Omit<Goal, 'id'>) => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      editGoal: (id: string, updatedGoal: Omit<Goal, 'id'>) =>
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id ? { ...goal, ...updatedGoal } : goal
          ),
        })),

        
      updateTransaction: (updated) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === updated.id ? updated : t
          ),
        })),
      
      transactions: [],
      goals: [],
      settings: {
        currency: 'USD',
        theme: 'light',
      },
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            ...state.transactions,
            { ...transaction, id: crypto.randomUUID() },
          ],
        })),
      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
      addGoal: (goal) =>
        set((state) => ({
          goals: [...state.goals, { ...goal, id: crypto.randomUUID() }],
        })),
      updateGoal: (id, amount) =>
  set((state) => ({
    goals: state.goals.map((g) =>
      g.id === id ? { ...g, currentAmount: amount } : g
    ),
  })),

      deleteGoal: (id) =>
        set((state) => ({
          goals: state.goals.filter((g) => g.id !== id),
        })),
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: 'finance-store',
    }
  )
);