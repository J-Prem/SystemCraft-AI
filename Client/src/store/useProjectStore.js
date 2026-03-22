import { create } from 'zustand';

const useProjectStore = create((set) => ({
  projects: [],
  loading: false,
  error: null,
  setProjects: (projects) => set({ projects }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  addProject: (project) => set((state) => ({ projects: [project, ...state.projects] })),
}));

export default useProjectStore;
