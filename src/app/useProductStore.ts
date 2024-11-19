// External dependencies
import { create } from "zustand";

// Internal modules
import productsData from "@/components/ProductsDashboard/productsData";

// Types
import { Product } from "@/components/ProductsDashboard/columns";

interface ProductState {
  allProducts: Product[];
  isLoading: boolean;
  setAllProcuts: (allProducts: Product[]) => void;
  loadProducts: () => Promise<void>;
  addProduct: (product: Product) => Promise<{ success: boolean }>;
}

export const useProductStore = create<ProductState>((set) => ({
  allProducts: [],
  isLoading: false,
  setAllProcuts: (allProducts) => {
    set({ allProducts: allProducts });
  },
  loadProducts: async () => {
    const fetchedProducts = await fetchProducts();
    set({ allProducts: fetchedProducts });
  },
  addProduct: async (product: Product) => {
    set({ isLoading: true });

    try {
      await new Promise((resolve) => setTimeout(resolve, 789));
      set((state) => ({ allProducts: [...state.allProducts, product] }));

      return { success: true };
    } finally {
      set({ isLoading: false });
    }
  },
}));

function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productsData);
    }, 1200);
  });
}
