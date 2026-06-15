import type { Product } from "../data/products";

const API_URL = "";

function toQueryString(filters?: Record<string, string | number | undefined>): string {
  if (!filters) return "";
  const params = new URLSearchParams();
  for (const [key, val] of Object.entries(filters)) {
    if (val !== undefined && val !== "") params.set(key, String(val));
  }
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export const productService = {
  async getAll(filters?: { category?: string; minPrice?: number; maxPrice?: number; q?: string }): Promise<Product[]> {
    try {
      const res = await fetch(`${API_URL}/api/products${toQueryString(filters)}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      return await res.json();
    } catch {
      const { products: fallback } = await import("../data/products");
      return fallback.filter(Boolean);
    }
  },

  async getById(id: string): Promise<Product> {
    try {
      const res = await fetch(`${API_URL}/api/products/${id}`);
      if (!res.ok) throw new Error("Product not found");
      return await res.json();
    } catch {
      const { products: fallback } = await import("../data/products");
      const product = fallback.find(p => p.id === id);
      if (!product) throw new Error("Product not found");
      return product;
    }
  }
};
