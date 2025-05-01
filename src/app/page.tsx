'use client';
import { useState } from 'react';
import useTodoStore from '../store/todoStore';

//const categories:{work, school, freetime};

export default function Home() {
  const [text, setText] = useState<string>('');
  const { todos, addTodo, removeTodo } = useTodoStore();

  const handleAdd = () => {
    addTodo(text);
    setText('');
  };

  return (
    <main className='flex items-center align-center flex-col gap-5 pt-50'>
      <div>
        <h1 className='text-2xl font-bold mb-4'>✅ Zustand Todo App (TypeScript)</h1>
        <div className='space-y-4'>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Todo бичих..."
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="work">Work</option>
            <option value="school">School</option>
            <option value="free-time">Free Time</option>
          </select>
          <button onClick={handleAdd}>Add</button>

          <ul className='space-y-3 w-50'>
            {todos.map((todo, i) => (
              <li key={i} className='flex flex-col-3 border p-3 rounded'>
                <div className='w-15'>
                  {todo} 
                </div>
                <div className='w-20'>
                  {todo} 
                </div>
                <div className='w-15'>
                  <button onClick={() => removeTodo(i)}>❌</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
