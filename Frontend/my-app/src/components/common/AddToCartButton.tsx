import React from 'react';
import { useCart } from "../../contexts/CartContext";
import { useToast } from "./Toast";
import type { Product } from "../../types/product";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
  showIcon?: boolean;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ 
  product, 
  quantity = 1, 
  className = "",
}) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: product.id,
      title: product.title,
      price: product.price || 0,
      image: product.image,
      quantity: quantity
    });

    showToast("Added to Cart", "success");
  };

  return (
    <button 
      onClick={handleAddToCart}
      className={className || "w-full bg-[#fa8900] hover:bg-[#e87b00] text-white py-1 rounded-sm text-sm"}
    >
      Add to Cart
    </button>
  );
};
