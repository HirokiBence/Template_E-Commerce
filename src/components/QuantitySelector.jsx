'use client'

import { useState } from "react";

const QuantitySelector = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity)
  const max = Array.from({length: item.max - item.stock}, (_, idx) => idx + 1);

  return (
    <select className="w-fit" name="quantity" value={quantity} onChange={e => setQuantity(e.target.value)}>
      {max.map(num => (
        <option key={num} value={num}>{num}</option>
      ))}
    </select>
  );
}

export default QuantitySelector;