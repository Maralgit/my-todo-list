import { create } from 'zustand';
import { persist } from 'zustand/middleware'

interface Todo {
  text: string;
  category: 'work'|'school'|'freetime';
}

interface TodoStore {
  todos: Todo[];
  selectedCategory: 'work' | 'school' | 'freetime';
  setCategory: (category: 'work'|'school'|'freetime') => void;
  addTodo: (todo: Todo) => void;
  removeTodo: (index: number) => void;
}

const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      selectedCategory: 'work',
      setCategory: (category) => {
        set(()  => ({selectedCategory: category }));
      },

      addTodo: (todo) => {
        if (!todo.text.trim()) return;
        set((state) => ({ todos: [...state.todos, todo] }));
      },
      removeTodo: (index: number) => {
        set((state) => ({
          todos: state.todos.filter((_, i) => i !== index),
        }));
      },
    }),
    {
      name: 'storage',
      partialize: (state) => ({todos: state.todos, selectedCategory: state.selectedCategory,}),
    }
  )
);

export default useTodoStore;
