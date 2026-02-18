"use client"

import { useState, useEffect } from "react"

export default function Home() {

  const [tasks, setTasks] = useState<any[]>([])
  const [input, setInput] = useState("")

  // Add Task
  const addTask = () => {
    if (input.trim() === "") return

    const newTask = {
      id: Date.now(),
      text: input,
      completed: false
    }

    setTasks([...tasks, newTask])
    setInput("")
  }

  // Delete Task
  const deleteTask = (id: number) => {
    const updated = tasks.filter(task => task.id !== id)
    setTasks(updated)
  }

  // Toggle Complete
  const toggleTask = (id: number) => {
    const updated = tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    )

    setTasks(updated)
  }

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tasks")
    if (saved) {
      setTasks(JSON.parse(saved))
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  // ✅ Task Statistics
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.completed).length
  const pendingTasks = totalTasks - completedTasks

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 text-black">
      <div className="bg-white p-5 rounded shadow w-96">

        <h2 className="text-xl font-bold mb-4 text-center">
          Vedant Todo App
        </h2>

        {/* ✅ Task Stats Section */}
        <div className="mb-4 text-sm space-y-1">
          <p><strong>Total:</strong> {totalTasks}</p>
          <p><strong>Completed:</strong> {completedTasks}</p>
          <p><strong>Pending:</strong> {pendingTasks}</p>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter your task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-black px-3 py-2 rounded"
          />

          <button
            onClick={addTask}
            className="bg-black text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center border border-black p-2 rounded"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span className={task.completed ? "line-through" : ""}>
                  {task.text}
                </span>
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  )
}
