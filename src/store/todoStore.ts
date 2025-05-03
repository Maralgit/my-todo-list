import { create } from 'zustand';
import { persist } from 'zustand/middleware'


interface TodoStore {
  todos: string[];
  category: 'work'|'school'|'freetime';
  setCategory: (category: 'work'|'school'|'freetime') => void;
  addTodo: (todo: string) => void;
  removeTodo: (index: number) => void;
}

const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      category: 'work',
      setCategory: (category) => set({ category }),

      addTodo: (todo:string) => {
        if (!todo.trim()) return;
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
      partialize: (state) => ({todos: state.todos, category: state.category}),
    }
  )
);

export default useTodoStore;
