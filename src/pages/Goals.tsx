import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useStore } from "../store/useStore";
import { formatCurrency } from "../utils/format";
import type { Goal } from "../types";

export function Goals() {
  const { goals, addGoal, updateGoal, deleteGoal, editGoal, settings } = useStore();
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newGoal, setNewGoal] = useState<Omit<Goal, "id"> & { id?: string }>({
    title: "",
    targetAmount: 0,
    currentAmount: 0,
    deadline: undefined,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGoalId) {
      editGoal(editingGoalId, newGoal);
      setEditingGoalId(null);
    } else {
      addGoal(newGoal);
    }
    setShowForm(false);
    setNewGoal({ title: "", targetAmount: 0, currentAmount: 0, deadline: undefined });
  };

  return (
    <div className="space-y-8 p-4 md:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">🎯 Savings Goals</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setNewGoal({ title: "", targetAmount: 0, currentAmount: 0, deadline: undefined });
            setEditingGoalId(null);
          }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition"
        >
          <Plus className="h-4 w-4" />
          Add Goal
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white border rounded-2xl shadow-lg p-6 space-y-6 transition-all"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Goal Title</label>
              <input
                type="text"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Target Amount</label>
              <input
                type="number"
                value={newGoal.targetAmount}
                onChange={(e) => setNewGoal({ ...newGoal, targetAmount: parseFloat(e.target.value) })}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Amount</label>
              <input
                type="number"
                value={newGoal.currentAmount}
                onChange={(e) => setNewGoal({ ...newGoal, currentAmount: parseFloat(e.target.value) })}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Target Date (Optional)</label>
              <input
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingGoalId(null);
              }}
              className="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
            >
              {editingGoalId ? "Update Goal" : "Save Goal"}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);

          return (
            <div
              key={goal.id}
              className="bg-white rounded-2xl shadow-lg p-6 space-y-5 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-gray-900">{goal.title}</h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setNewGoal({
                        title: goal.title,
                        targetAmount: goal.targetAmount,
                        currentAmount: goal.currentAmount,
                        deadline: goal.deadline,
                      });
                      setEditingGoalId(goal.id);
                      setShowForm(true);
                    }}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="text-sm text-gray-700 space-y-1">
                <div className="flex justify-between">
                  <span>Current</span>
                  <span className="font-medium">
                    {formatCurrency(goal.currentAmount, settings.currency)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Target</span>
                  <span className="font-medium">
                    {formatCurrency(goal.targetAmount, settings.currency)}
                  </span>
                </div>
                {goal.deadline && (
                  <div className="flex justify-between">
                    <span>Deadline</span>
                    <span className="font-medium">
                      {new Date(goal.deadline).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Update Progress
                </label>
                <input
                  type="number"
                  value={goal.currentAmount}
                  onChange={(e) => updateGoal(goal.id, parseFloat(e.target.value))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
