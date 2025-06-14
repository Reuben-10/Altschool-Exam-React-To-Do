import { create } from 'zustand';

export const useTodoStore = create((set) => ({
  page: 1,
  setPage: (page) => set({ page }),

  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),

  newTodo: "",
  setNewTodo: (todo) => set({ newTodo: todo }),
  addTodo: (newTodo) =>
    set((state) => {
      const updated = [newTodo, ...state.todos];
      localStorage.setItem('todos', JSON.stringify(updated));
      return { todos: updated };
    }),

  showAddModal: false,
  setShowAddModal: (show) => set({ showAddModal: show }),

  filter: "all",
  setFilter: (filter) => set({ filter }),

  editingId: null,
  setEditingId: (id) => set({ editingId: id }),

  editingText: "",
  setEditingText: (text) => set({ editingText: text }),

  modalInput: "",
  setModalInput: (input) => set({ modalInput: input }),

  showSkeleton: true,
  setShowSkeleton: (show) => set({ showSkeleton: show }),

  isEditing: false,
  setIsEditing: (val) => set({ isEditing: val }),

  // editingText: "",
  // setEditingText: (text) => set({ editingText: text }),

  editingDescription: "",
  setEditingDescription: (desc) => set({ editingDescription: desc }),

  status: false,
  setStatus: (val) => set({ status: val }),

  loading: true,
  setLoading: (val) => set({ loading: val }),

}));
