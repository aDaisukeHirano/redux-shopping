"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  decrementQuantity,
  incrementQuantity,
} from "@/features/cart/cartSlice";
import {
  selectCartSortedItems,
  selectCartTotalPrice,
} from "@/features/cart/cartSelectors";
import { useSelector } from "@/store/store";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";

const Page = () => {
  const sum = useSelector(selectCartTotalPrice);
  const sortedItems = useSelector(selectCartSortedItems);
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
