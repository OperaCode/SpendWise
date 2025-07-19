import './App.css';
import Graph from './components/graph';
import Form from './components/Form';

function App() {
  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto max-w-5xl px-4 py-8 text-center">
        {/* Header with Tagline and Animation */}
        <header className="mb-8">
          <h1
            className="text-4xl font-bold py-8 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-lg shadow-lg animate-fade-in"
            aria-label="Expense Tracker Application"
          >
            SpendWise
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Track your expenses effortlessly
          </p>
        </header>

        {/* Summary Section */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Overview
          </h2>
          {/* <p className="text-gray-600 dark:text-gray-300">
            Total Expenses: $1,234.56 | This Month: $456.78
          </p> */}
        </section>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
          {/* Graph Card */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Expense Trends
            </h2>
            <Graph />
          </div>

          {/* Form Card */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Add Expense
            </h2>
            <Form />
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;