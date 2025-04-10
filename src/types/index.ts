export type TransactionType = 'income' | 'expense';
export type TransactionCategory =
  | 'salary'
  | 'food'
  | 'rent'
  | 'utilities'
  | 'entertainment'
  | 'shopping'
  | 'transport'
  | 'other';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string;
  description: string;
}

export interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
}

export interface Settings {
  currency: string;
  theme: 'light' | 'dark';
}

export interface State {
  transactions: Transaction[];
  goals: Goal[];
  settings: Settings;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (updated: Transaction) => void; // <-- Add this line
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, amount: number) => void;
  deleteGoal: (id: string) => void;
  updateSettings: (settings: Partial<Settings>) => void;
}
