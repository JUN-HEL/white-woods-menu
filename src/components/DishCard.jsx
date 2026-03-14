import { createDishPlaceholder, getDishImage } from "../utils/menuImages";

export default function DishCard({ dish, onClick }) {
    const startingPrice = dish?.prices?.[0]?.price ?? 0;
    const hasMultiplePrices = dish?.prices?.length > 1;
    const previewImage = getDishImage(dish);

    return (
        <button
            type="button"
            onClick={() => onClick(dish)}
            className="menu-card group w-full overflow-hidden rounded-2xl text-left transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
            <div className="relative h-44 w-full overflow-hidden bg-[#f3e6d7]">
                <img
                    src={previewImage}
                    alt={dish.name}
                    onError={(e) => {
                        e.currentTarget.src = createDishPlaceholder(dish);
                    }}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[rgba(76,43,36,0.7)] via-[rgba(76,43,36,0.2)] to-transparent p-4">
                    <div className="inline-flex rounded-full bg-[rgba(249,239,227,0.9)] px-3 py-1 text-sm font-semibold text-[var(--wine-700)] shadow-sm">
                        From ₹{startingPrice}
                    </div>
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-base font-semibold text-[var(--ink-900)] sm:text-lg">
                    {dish.name}
                </h3>

                <p className="mt-1 line-clamp-2 text-sm leading-6 text-[var(--ink-700)]">
                    {dish.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                    {dish.prices?.map((priceOption) => (
                        <span
                            key={priceOption.label}
                            className="rounded-full border border-[rgba(199,154,82,0.24)] bg-[#fcf4ea] px-2.5 py-1 text-xs font-medium text-[var(--ink-700)]"
                        >
                            {priceOption.label} • ₹{priceOption.price}
                        </span>
                    ))}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--wine-700)] transition group-hover:translate-x-1">
                        {hasMultiplePrices ? "View Options" : "Add Item"}
                    </span>

                    <span className="rounded-full bg-[rgba(199,154,82,0.12)] px-3 py-1 text-sm font-semibold text-[var(--wine-700)]">
                        ₹{startingPrice}
                    </span>
                </div>
            </div>
        </button>
    );
}