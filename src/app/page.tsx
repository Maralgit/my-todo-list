'use client';
import { useState } from 'react';
import useTodoStore from '../store/todoStore';

//const categories:{work, school, freetime};

export default function Home() {
  const [text, setText] = useState<string>('');
  const {category, setCategory} =useTodoStore();
  const { todos, addTodo, removeTodo } = useTodoStore();

  const handleAdd = () => {
    addTodo(text);
    setText('');
    setCategory(category);
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
          <select className='pl-5 text-white' value={category} onChange={(e) => setCategory(e.target.value)}>
            <option className='text-black' value="work">Work</option>
            <option className='text-black' value="school">School</option>
            <option className='text-black' value="free-time">Free Time</option>
          </select>
          <button className='pl-5' onClick={handleAdd}>Add</button>

          <ul className='space-y-3 w-100'>
            {todos.map((todo, i) => (
              <li key={i} className='flex flex-col-3 border p-3 rounded'>
                <div className='w-60'>
                  {todo} 
                </div>
                <div className={`w-20 ${category === "work" ? "bg-red-500 rounded-lg" : category === "school" ? "bg-blue-500 rounded-lg" : "bg-green-500 rounded-lg"} text-center`}>
                  {category} 
                </div>
                <div className='w-15 text-center'>
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
