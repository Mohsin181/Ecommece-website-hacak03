"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Product } from "../../../types/products";
import { allProducts } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";

const SHOP = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProduct() {
      const fetchedProduct: Product[] = await client.fetch(allProducts);
      setProduct(fetchedProduct);
    }
    fetchProduct();
  }, []);

  const addToCart = (item: Product) => {
    setCart([...cart, item]);
    alert(`${item.title} added to cart!`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {product.map((product) => (
          <div className="p-2 border-slate-200 border" key={product._id}>
            <Image src={product.productImage || ""} alt={product.title} height={300} width={300} />
            <h1 className="text-lg font-bold text-gray-800">{product.title}</h1>
            <p className="text-sm text-gray-600">{product.tags?.[0]}</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-lg font-semibold">{product.price}</p>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SHOP;
