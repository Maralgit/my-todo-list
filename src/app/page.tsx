'use client';
import { useState } from 'react';
import useTodoStore from '../store/todoStore';
import { useSearchParams } from 'next/navigation';


export default function Home() {
  const [text, setText] = useState('');
  const {
    todos,
    addTodo,
    removeTodo,
    selectedCategory,
    setCategory,
  } = useTodoStore();

  const handleAdd = () => {
    if (!text.trim()) return;
    addTodo({ text, category: selectedCategory });
    setText('');
  };
  const searchParams = useSearchParams();
  const categories = searchParams.get('category');
  const filteredTodos = categories
    ? todos.filter((todo) => todo.category === categories)
    : todos;

  return (
    <main className='flex items-center align-center flex-col gap-5 pt-50'>
      <div>
        <h1 className='text-2xl font-bold mb-4'>My ToDo List</h1>
        <div className='flex gap-3'>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Todo бичих..."
          />
          <select
          value={selectedCategory}
          onChange={(e) =>
            setCategory(e.target.value as 'work' | 'school' | 'freetime')
          }
        >
            <option className='text-black' value="work">Work</option>
            <option className='text-black' value="school">School</option>
            <option className='text-black' value="free-time">Free Time</option>
          </select>
          <button className='pl-5' onClick={handleAdd}>Add</button>

          <ul className='space-y-3 w-100'>
            {todos.map((todo, i) => (
              <li key={i} className='flex flex-col-3 border p-3 rounded'>
                <div className='w-60'>
                  {todo.text} 
                </div>
                <div className={`w-20 ${todo.category === "work" ? "bg-red-500 rounded-lg" : todo.category === "school" ? "bg-blue-500 rounded-lg" : "bg-green-500 rounded-lg"} text-center`}>
                  {todo.category} 
                </div>
                <div className='w-15 text-center'>
                  <button onClick={() => removeTodo(i)}>❌</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1 className="text-2xl mb-4">Todos (Filtered by: {categories || 'All'})</h1>
          <ul className="space-y-2">
            {filteredTodos.map((todo, i) => (
              <li key={i} className="border rounded p-3 flex justify-between">
                <span>{todo.text}</span>
                <span className="px-2 py-1 text-white rounded bg-gray-600">{todo.category}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
