import { create } from 'zustand';

// Filter types for type safety
type FilterType = "all" | "completed" | "pending";

// store interface with proper types
interface TodoStore {
  page: number;
  setPage: (page: number) => void;
  
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  
  newTodo: string;
  setNewTodo: (todo: string) => void;
  
  showAddModal: boolean;
  setShowAddModal: (show: boolean) => void;
  
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  
  editingText: string;
  setEditingText: (text: string) => void;
  
  modalInput: string;
  setModalInput: (input: string) => void;
  
  showSkeleton: boolean;
  setShowSkeleton: (show: boolean) => void;
  
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  
  editingDescription: string;
  setEditingDescription: (desc: string) => void;
  
  status: boolean;
  setStatus: (val: boolean) => void;
  
  loading: boolean;
  setLoading: (val: boolean) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  page: 1,
  setPage: (page) => set({ page }),

  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),

  newTodo: "",
  setNewTodo: (todo) => set({ newTodo: todo }),

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

  editingDescription: "",
  setEditingDescription: (desc) => set({ editingDescription: desc }),

  status: false,
  setStatus: (val) => set({ status: val }),

  loading: true,
  setLoading: (val) => set({ loading: val }),
}));