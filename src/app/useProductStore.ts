// External dependencies
import { create } from "zustand";

// Internal modules
import productsData from "@/components/ProductsDashboard/productsData";

// Types
import { Product } from "@/components/ProductsDashboard/columns";

interface ProductState {
  allProducts: Product[];
  isLoading: boolean;
  openDialog: boolean;
  setOpenDialog: (openDialog: boolean) => void;
  openProductDialog: boolean;
  setOpenProductDialog: (openProductDialog: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  setAllProcuts: (allProducts: Product[]) => void;
  loadProducts: () => Promise<void>;
  addProduct: (product: Product) => Promise<{ success: boolean }>;
  updateProduct: (updatedProduct: Product) => Promise<{ success: boolean }>;
  deleteProduct: (productId: string) => Promise<{ success: boolean }>;
}

export const useProductStore = create<ProductState>((set) => ({
  allProducts: [],
  isLoading: false,
  selectedProduct: null,
  openDialog: false,
  setOpenDialog: (openDialog) => {
    set({ openDialog: openDialog });
  },
  openProductDialog: false,
  setOpenProductDialog: (openProductDialog) => {
    set({ openProductDialog: openProductDialog });
  },
  setSelectedProduct: (product: Product | null) => {
    set({ selectedProduct: product });
  },
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
  updateProduct: async (updatedProduct: Product) => {
    set({ isLoading: true });

    try {
      // Simulate the update process with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      set((state) => ({
        allProducts: state.allProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        ),
      }));

      return { success: true };
    } finally {
      set({ isLoading: false });
      set({ openProductDialog: false });
      set({ selectedProduct: null });
    }
  },
  deleteProduct: async (productId: string) => {
    set({ isLoading: false });

    try {
      // Simulate the deletion process with a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      set((state) => ({
        allProducts: state.allProducts.filter(
          (product) => product.id !== productId
        ),
      }));

      return { success: true };
    } finally {
      set({ isLoading: false });
      set({ openDialog: false });
      set({ selectedProduct: null });
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
