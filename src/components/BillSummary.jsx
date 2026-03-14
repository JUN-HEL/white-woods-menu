import { useEffect, useState } from "react";

export default function DishModal({ dish, onClose, onAddToCart }) {
    const [selectedPrice, setSelectedPrice] = useState(dish?.prices?.[0] || null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        setSelectedPrice(dish?.prices?.[0] || null);
        setQuantity(1);
    }, [dish]);

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keydown", handleEsc);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "auto";
        };
    }, [onClose]);

    if (!dish) return null;

    const handleDecrease = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    const handleIncrease = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleSubmit = () => {
        if (!selectedPrice) return;

        onAddToCart({
            dish,
            selectedPrice,
            quantity,
        });
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#2a1115]/55 px-4 py-6 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-xl rounded-[28px] border border-[#c9a77a]/25 bg-[#fffaf5] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="border-b border-[#c9a77a]/20 px-5 py-4 sm:px-6">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a46b4d]">
                                {dish.category}
                            </p>
                            <h2 className="mt-1 text-2xl font-bold text-[#4b1e24]">
                                {dish.name}
                            </h2>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-full border border-[#c9a77a]/30 px-3 py-1 text-sm font-medium text-[#7a4b35] transition hover:bg-[#f7ede3]"
                        >
                            Close
                        </button>
                    </div>
                </div>

                <div className="space-y-6 px-5 py-5 sm:px-6">
                    <div>
                        <p className="text-sm leading-7 text-[#6f4b4f]">
                            {dish.description}
                        </p>
                    </div>

                    <div>
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[#8b3a46]">
                            Select Variant
                        </p>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {dish.prices?.map((priceOption) => {
                                const isActive = selectedPrice?.label === priceOption.label;

                                return (
                                    <button
                                        key={priceOption.label}
                                        type="button"
                                        onClick={() => setSelectedPrice(priceOption)}
                                        className={`rounded-2xl border px-4 py-3 text-left transition ${isActive
                                                ? "border-[#8b3a46] bg-[#8b3a46] text-white shadow-lg"
                                                : "border-[#d9b892]/40 bg-white text-[#4b1e24] hover:border-[#8b3a46]/40 hover:bg-[#fcf6f0]"
                                            }`}
                                    >
                                        <p className="text-sm font-semibold">{priceOption.label}</p>
                                        <p
                                            className={`mt-1 text-lg font-bold ${isActive ? "text-white" : "text-[#8b3a46]"
                                                }`}
                                        >
                                            ₹{priceOption.price}
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 rounded-2xl bg-[#f8f1e7] p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b3a46]">
                                Quantity
                            </p>

                            <div className="mt-3 flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={handleDecrease}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a77a]/35 bg-white text-lg font-bold text-[#4b1e24] transition hover:bg-[#f7ede3]"
                                >
                                    −
                                </button>

                                <span className="min-w-[36px] text-center text-lg font-bold text-[#4b1e24]">
                                    {quantity}
                                </span>

                                <button
                                    type="button"
                                    onClick={handleIncrease}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c9a77a]/35 bg-white text-lg font-bold text-[#4b1e24] transition hover:bg-[#f7ede3]"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="sm:text-right">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b3a46]">
                                Total
                            </p>
                            <p className="mt-2 text-3xl font-bold text-[#4b1e24]">
                                ₹{(selectedPrice?.price || 0) * quantity}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-[#c9a77a]/20 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-[#c9a77a]/35 px-5 py-3 text-sm font-semibold text-[#7a4b35] transition hover:bg-[#f7ede3]"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="rounded-full bg-[#8b3a46] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-[#742f39]"
                    >
                        Add to Bill • ₹{(selectedPrice?.price || 0) * quantity}
                    </button>
                </div>
            </div>
        </div>
    );
}