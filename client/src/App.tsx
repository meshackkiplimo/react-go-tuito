import Navbar from './components/Navbar'

import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

export const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";

function App() {
  return (
  
      <div className="min-h-screen">
        <Navbar />
        <div className="container">
          <TodoForm />
          <TodoList />
        </div>
      </div>
  
  )
}

export default App
