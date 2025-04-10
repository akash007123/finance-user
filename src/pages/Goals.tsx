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
    setNewGoal({
      title: "",
      targetAmount: 0,
      currentAmount: 0,
      deadline: undefined,
    });
  };

  

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Savings Goals</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setNewGoal({
              title: "",
              targetAmount: 0,
              currentAmount: 0,
              deadline: undefined,
            });
            setEditingGoalId(null); // reset edit state
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Goal Title
              </label>
              <input
                type="text"
                value={newGoal.title}
                onChange={(e) =>
                  setNewGoal({
                    ...newGoal,
                    title: e.target.value,
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Target Amount
              </label>
              <input
                type="number"
                value={newGoal.targetAmount}
                onChange={(e) =>
                  setNewGoal({
                    ...newGoal,
                    targetAmount: parseFloat(e.target.value),
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Amount
              </label>
              <input
                type="number"
                value={newGoal.currentAmount}
                onChange={(e) =>
                  setNewGoal({
                    ...newGoal,
                    currentAmount: parseFloat(e.target.value),
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Target Date (Optional)
              </label>
              <input
                type="date"
                value={newGoal.deadline}
                onChange={(e) =>
                  setNewGoal({
                    ...newGoal,
                    deadline: e.target.value,
                  })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingGoalId(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {editingGoalId ? "Update Goal" : "Save"}
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          return (
            <div
              key={goal.id}
              className="bg-white p-6 rounded-xl shadow-sm space-y-4"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900">
                  {goal.title}
                </h3>
                <div className="flex space-x-2">
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
                    className="text-blue-600 hover:text-blue-900 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-600 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Current</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(goal.currentAmount, settings.currency)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Target</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(goal.targetAmount, settings.currency)}
                  </span>
                </div>
                {goal.deadline && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Deadline</span>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(goal.deadline).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Update Progress
                </label>
                <input
                  type="number"
                  value={goal.currentAmount}
                  onChange={(e) =>
                    updateGoal(goal.id, parseFloat(e.target.value))
                  }
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
