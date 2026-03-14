import { useEffect, useState } from "react";
import { createDishPlaceholder, getDishImage } from "../utils/menuImages";

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

    const modalImage = getDishImage(dish);

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
            className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(60,18,24,0.42)] px-4 py-6 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="menu-shell w-full max-w-xl overflow-hidden rounded-[28px] animate-pop-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="border-b border-[rgba(122,45,54,0.12)] px-5 py-4 sm:px-6">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a7449]">
                                {dish.category}
                            </p>
                            <h2 className="mt-1 text-2xl font-bold text-[var(--wine-800)]">
                                {dish.name}
                            </h2>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="menu-btn-secondary rounded-full px-3 py-1 text-sm font-medium transition"
                        >
                            Close
                        </button>
                    </div>
                </div>

                <div className="space-y-6 px-5 py-5 sm:px-6">
                    <div className="overflow-hidden rounded-[24px] border border-[rgba(199,154,82,0.22)] bg-[#f8ecdf] shadow-sm">
                        <img
                            src={modalImage}
                            alt={dish.name}
                            onError={(e) => {
                                e.currentTarget.src = createDishPlaceholder(dish);
                            }}
                            className="h-64 w-full object-cover sm:h-72"
                        />
                    </div>

                    <div>
                        <p className="text-sm leading-7 text-[var(--ink-700)]">
                            {dish.description}
                        </p>
                    </div>

                    <div>
                        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--wine-700)]">
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
                                                ? "border-[var(--wine-700)] bg-[var(--wine-700)] text-white shadow-lg"
                                                : "border-[rgba(199,154,82,0.28)] bg-[#fff8f1] text-[var(--ink-900)] hover:bg-[#fcf0e5]"
                                            }`}
                                    >
                                        <p className="text-sm font-semibold">{priceOption.label}</p>
                                        <p className="mt-1 text-lg font-bold">₹{priceOption.price}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="rounded-2xl bg-[rgba(199,154,82,0.1)] p-4">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--wine-700)]">
                                    Quantity
                                </p>

                                <div className="mt-3 flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={handleDecrease}
                                        className="menu-btn-secondary flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold transition"
                                    >
                                        −
                                    </button>

                                    <span className="min-w-[36px] text-center text-lg font-bold text-[var(--ink-900)]">
                                        {quantity}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={handleIncrease}
                                        className="menu-btn-secondary flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold transition"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="sm:text-right">
                                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--wine-700)]">
                                    Total
                                </p>
                                <p className="mt-2 text-3xl font-bold text-[var(--wine-800)]">
                                    ₹{(selectedPrice?.price || 0) * quantity}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-[rgba(122,45,54,0.12)] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="menu-btn-secondary rounded-full px-5 py-3 text-sm font-semibold transition"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="menu-btn-primary rounded-full px-6 py-3 text-sm font-semibold transition"
                    >
                        Add to Bill • ₹{(selectedPrice?.price || 0) * quantity}
                    </button>
                </div>
            </div>
        </div>
    );
}