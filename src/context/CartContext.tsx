"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string; // product_id
  variantId: string;
  name: string;
  slug: string;
  price: number;
  size: string;
  color: string;
  image: string;
  qty: number;
}

export interface WishlistItem {
  id: string; // product_id
  name: string;
  slug: string;
  price: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: WishlistItem[];
  isCartOpen: boolean;
  isWishlistOpen: boolean;
  isSearchOpen: boolean;
  searchQuery: string;
  addToCart: (item: Omit<CartItem, "qty">, qty: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateCartQty: (productId: string, size: string, change: number) => void;
  clearCart: () => void;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (item: WishlistItem) => void;
  setCartOpen: (open: boolean) => void;
  setWishlistOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isWishlistOpen, setWishlistOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("ruven_cart");
    const storedWishlist = localStorage.getItem("ruven_wishlist");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {
        console.error(e);
      }
    }
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist));
      } catch (e) {
        console.error(e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when cart changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ruven_cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // Save to localStorage when wishlist changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("ruven_wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, isLoaded]);

  const addToCart = (item: Omit<CartItem, "qty">, qty: number) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.id === item.id && i.size === item.size
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].qty += qty;
        return updated;
      }
      return [...prev, { ...item, qty }];
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === productId && item.size === size)));
  };

  const updateCartQty = (productId: string, size: string, change: number) => {
    setCart((prev) => {
      const idx = prev.findIndex((item) => item.id === productId && item.size === size);
      if (idx === -1) return prev;
      const updated = [...prev];
      updated[idx].qty += change;
      if (updated[idx].qty <= 0) {
        return updated.filter((item) => !(item.id === productId && item.size === size));
      }
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  const toggleWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.filter((i) => i.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        isWishlistOpen,
        isSearchOpen,
        searchQuery,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        setCartOpen,
        setWishlistOpen,
        setSearchOpen,
        setSearchQuery,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
