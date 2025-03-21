import React, { useState } from 'react'
import './index.css'

export const Todo = () => {

    const [todos, setTodos] = useState([])
    const [inputValue, setInputValue] = useState("")
    const [filter, setFilter] = useState("all")
    const [editIndex, setEditIndex] = useState(null)
    const [editValue, setEditValue] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        setTodos([...todos, { text: inputValue, completed: false }])
        setInputValue("")
    }

    const handleDelete = (index) => {
        const newTodo = [...todos]
        newTodo.splice(index, 1)
        setTodos(newTodo)
    }

    const handleEdit = (index) => {
        setEditIndex(index)
        setEditValue(todos[index].text)
    }

    const handleEditSubmit = (index) => {
        const newTodo = [...todos]
        newTodo[index].text = editValue
        setTodos(newTodo)
        setEditIndex(null)
        setEditValue("")
    }

    const filteredTasks = todos.filter((task) => {
        if (filter === "active") return !task.completed
        if (filter === "completed") return task.completed
        return true
    })

    const toggleTask = (index) => {
        setTodos(
            todos.map((task, i) =>
                i === index ? { ...task, completed: !task.completed } : task
            )
        )
    }

    return (
        <div className="w-[50%] mx-auto p-5">
            <h1 className="text-3xl font-bold text-center mb-3 text-gray-500 p-2">
                TodoMatic
            </h1>
            <p className='text-gray-400 text-center mb-4 font-semibold '>What needs to be done</p>
            <form className="mb-4">
                
                <input
                 className="border-2 p-2 w-full mb-2"
                    placeholder="Add a new task"
                    type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <button className="bg-black text-white w-full p-2 mt-2" onClick={handleSubmit}>Add</button>
            </form>
            <ul>
                <div className="flex justify-center space-x-2 mb-4">
                {["all", "active", "completed"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1 border ${filter === f ? "bg-gray-800 text-white" : "bg-white"}`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
               </div>
                <h1 className="text-lg text-gray-600 font-bold mb-2">{filteredTasks.length} Tasks Remaining</h1>
                {
                    filteredTasks.map((todo, index) => (
                        <li className="flex items-center space-x-3 mb-2 p-2 border-2 border-gray-500" key={index}>
                            <input type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTask(index)}
                                className="w-5 h-5"/>
                            {editIndex === index ? (
                                <>
                                    <input
                                        type="text"
                                         className="border-1 p-1 w-80 mb-2"
                    placeholder="Edit The Task Here"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                    />
                                    <button className='bg-green-500 px-5 py-1 text-white ml-5 mr-6' onClick={() => handleEditSubmit(index)}>Save</button>
                                </>
                            ) : (
                                <>
                                    <h1 className='text-lg font-semibold text-gray-700'>{todo.text}</h1>
                                    <button className='border px-5 py-1 text-black ml-5 mr-6' onClick={() => handleEdit(index)}>Edit</button>
                                </>
                            )}
                            <button className="bg-red-500 text-white px-3 py-1" onClick={() => handleDelete(index)}>Delete</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}