"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { products } from "@/data";
import {
  decrementQuantity,
  incrementQuantity,
} from "@/features/cart/cartSlice";
import { useSelector } from "@/store/store";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";

const Page = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const sum = cart.items.reduce((total, item) => {
    const product = products.find((p) => p.id === item.id);
    if (!product) {
      throw new Error("Product not found");
    }
    return total + product.price * item.quantity;
  }, 0);
  const sortedItems = cart.items
    .toSorted((a, b) => a.id - b.id)
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) {
        throw new Error("Product not found");
      }
      return {
        ...item,
        name: product.name,
        price: product.price,
      };
    });
  return (
    <div>
      <h1>カート</h1>
      <p>合計金額: {sum}円</p>
      <ul>
        {sortedItems.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </ul>
      <Link href="/">商品一覧に戻る</Link>
    </div>
  );
};

export default Page;

const ProductCard = ({
  product,
}: {
  product: { id: number; name: string; price: number; quantity: number };
}) => {
  const dispatch = useDispatch();
  return (
    <Card className="w-1/4 p-4">
      <h2>{product.name}</h2>
      <p>{product.price}円</p>
      <div className="flex items-center justify-center gap-2">
        <Button onClick={() => dispatch(decrementQuantity({ id: product.id }))}>
          <Minus />
        </Button>
        <p>{product.quantity}個</p>
        <Button onClick={() => dispatch(incrementQuantity({ id: product.id }))}>
          <Plus />
        </Button>
      </div>
    </Card>
  );
};
