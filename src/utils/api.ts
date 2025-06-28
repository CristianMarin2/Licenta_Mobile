export interface ScannedProduct {
  barcode: string;
  name: string;
  price: number;
  vat: number;
  quantity: number;
}

const API_BASE = 'http://localhost:5000';

export async function fetchProduct(barcode: string): Promise<ScannedProduct | null> {
  const trimmed = barcode.trim();

  try {
    const response = await fetch(`${API_BASE}/api/products?barcode=${encodeURIComponent(trimmed)}`);

    if (!response.ok) {
      return null;
    }

    const product = await response.json();

    return {
      ...product,
      quantity: 1,
    };
  } catch {
    return null;
  }
}
