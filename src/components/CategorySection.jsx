import DishCard from "./DishCard";

export default function CategorySection({ category, items = [], onDishClick }) {
    return (
        <section className="rounded-[28px] border border-[#c9a77a]/25 bg-[#fffaf5] p-4 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a46b4d]">
                        Menu Category
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-[#4b1e24] sm:text-3xl">
                        {category}
                    </h2>
                </div>

                <div className="rounded-full bg-[#f5e7d8] px-3 py-1 text-sm font-semibold text-[#8b3a46]">
                    {items.length} {items.length === 1 ? "item" : "items"}
                </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((dish) => (
                    <DishCard
                        key={dish.id}
                        dish={dish}
                        onClick={onDishClick}
                    />
                ))}
            </div>
        </section>
    );
}