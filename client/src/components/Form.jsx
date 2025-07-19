import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import List from './List';
import { default as api } from '../store/apiSlice';

export default function Form() {
  const { register, handleSubmit, resetField, formState: { errors } } = useForm();
  const [addTransaction] = api.useAddTransactionMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit = async (data) => {
    if (!data) return;
    setIsSubmitting(true);
    try {
      await addTransaction(data).unwrap();
      setSuccessMessage('Transaction added successfully!');
      resetField('name');
      resetField('amount');
      resetField('type');
      setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3s
    } catch (error) {
      setSuccessMessage('Error adding transaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    resetField('name');
    resetField('amount');
    resetField('type');
  };

  return (
    <div className="max-w-md mx-auto w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-shadow hover:shadow-lg">
      <h2 className="font-bold text-xl text-gray-800 dark:text-white mb-4">
        Add New Transaction
      </h2>

      {successMessage && (
        <p
          className={`text-sm mb-4 ${
            successMessage.includes('Error')
              ? 'text-red-500'
              : 'text-teal-500'
          }`}
          role="alert"
        >
          {successMessage}
        </p>
      )}

      <form id="form" onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="input-group">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Transaction Name
          </label>
          <input
            type="text"
            {...register('name', { required: 'Transaction name is required' })}
            placeholder="e.g., Salary, Rent, Savings"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-describedby="name-error"
          />
          {errors.name && (
            <p id="name-error" className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="input-group">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Transaction Type
          </label>
          <select
            {...register('type', { required: 'Transaction type is required' })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            aria-describedby="type-error"
          >
            <option value="Investment">Investment</option>
            <option value="Expense">Expense</option>
            <option value="Savings">Savings</option>
          </select>
          {errors.type && (
            <p id="type-error" className="text-red-500 text-sm mt-1">
              {errors.type.message}
            </p>
          )}
        </div>

        <div className="input-group">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Amount
          </label>
          <input
            type="number"
            {...register('amount', {
              required: 'Amount is required',
              min: { value: 0, message: 'Amount must be positive' },
            })}
            placeholder="e.g., 1000"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
              errors.amount ? 'border-red-500' : 'border-gray-300'
            }`}
            aria-describedby="amount-error"
          />
          {errors.amount && (
            <p id="amount-error" className="text-red-500 text-sm mt-1">
              {errors.amount.message}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 py-3 px-4 rounded-lg text-white font-semibold transition-colors ${
              isSubmitting
                ? 'bg-teal-300 cursor-not-allowed'
                : 'bg-teal-500 hover:bg-teal-600'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              'Add Transaction'
            )}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 py-3 px-4 rounded-lg text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Clear Form
          </button>
        </div>
      </form>

      <List />
    </div>
  );
}