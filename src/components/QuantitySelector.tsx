'use client'

type Props = {
  quantity: number;
  min?: number;
  max: number;
  disabled: boolean;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function QuantitySelector({
  quantity,
  min = 1,
  max,
  disabled = false,
  onIncrement,
  onDecrement,
}: Props){
  return(
    <div className="flex items-center gap-2 mt-1">
      <button
        onClick={onDecrement}
        disabled={disabled || quantity <= min}
        className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer"
      >
        −
      </button>
      <span className="w-6 text-center select-none">{quantity}</span>
      <button
        onClick={onIncrement}
        disabled={disabled || quantity >= max}
        className="w-7 h-7 flex items-center justify-center rounded border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100 cursor-pointer"
      >
        +
      </button>
    </div>
  )
}