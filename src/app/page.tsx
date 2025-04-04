"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product, products } from "@/data";
import { addItem } from "@/features/cart/cartSlice";
import { useSelector } from "@/store/store";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function ProductListPage() {
  const cart = useSelector((state) => state.cart);
  const cartItemCount = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return (
    <div>
      <h1>商品リスト</h1>
      <p>カートに入っている商品数: {cartItemCount}</p>
      <div className="flex gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Link href="/cart">カートを見る</Link>
    </div>
  );
}

const ProductCard = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const handleClick = () => {
    dispatch(addItem({ id: product.id, quantity: count }));
    setCount(0);
  };
  return (
    <Card className="w-1/4 p-4">
      <h2>{product.name}</h2>
      <p>{product.price}円</p>
      <div className="flex items-center justify-center gap-2">
        <Button onClick={() => setCount(count - 1)} disabled={count <= 0}>
          <Minus />
        </Button>
        <p>{count}個</p>
        <Button onClick={() => setCount(count + 1)}>
          <Plus />
        </Button>
      </div>
      <Button onClick={handleClick}>カートに入れる</Button>
    </Card>
  );
};
