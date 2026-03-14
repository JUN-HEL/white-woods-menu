import { useMemo, useState } from "react";
import Header from "../components/Header";
import CategorySection from "../components/CategorySection";
import DishModal from "../components/DishModal";
import CartBill from "../components/CartBill";
import { menuData } from "../data/menuData";
import { calculateBill } from "../utils/billing";

export default function HomePage() {
    const [selectedDish, setSelectedDish] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    const gstPercent = 5;

    const handleOpenDish = (dish, category) => {
        setSelectedDish({
            ...dish,
            category,
        });
    };

    const handleCloseDish = () => {
        setSelectedDish(null);
    };

    const handleAddToCart = ({ dish, selectedPrice, quantity }) => {
        if (!dish || !selectedPrice || quantity < 1) return;

        const cartKey = `${dish.id}-${selectedPrice.label}`;

        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.cartKey === cartKey);

            if (existingItem) {
                return prev.map((item) =>
                    item.cartKey === cartKey
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [
                ...prev,
                {
                    cartKey,
                    id: dish.id,
                    name: dish.name,
                    category: dish.category,
                    description: dish.description,
                    variant: selectedPrice.label,
                    price: selectedPrice.price,
                    quantity,
                },
            ];
        });

        setSelectedDish(null);
    };

    const handleIncreaseQty = (cartKey) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.cartKey === cartKey
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const handleDecreaseQty = (cartKey) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.cartKey === cartKey
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const handleRemoveItem = (cartKey) => {
        setCartItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
    };

    const handleClearCart = () => {
        setCartItems([]);
    };

    const billSummary = useMemo(() => {
        return calculateBill(cartItems, gstPercent);
    }, [cartItems]);

    return (
        <div className="min-h-screen bg-[#f8f1e7] text-[#4b1e24]">
            <Header />

            <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[1fr_360px] lg:px-6">
                <section className="space-y-6">
                    {menuData.map((section) => (
                        <CategorySection
                            key={section.category}
                            category={section.category}
                            items={section.items}
                            onDishClick={(dish) => handleOpenDish(dish, section.category)}
                        />
                    ))}
                </section>

                <aside className="lg:sticky lg:top-6 h-fit">
                    <CartBill
                        cartItems={cartItems}
                        billSummary={billSummary}
                        gstPercent={gstPercent}
                        onIncreaseQty={handleIncreaseQty}
                        onDecreaseQty={handleDecreaseQty}
                        onRemoveItem={handleRemoveItem}
                        onClearCart={handleClearCart}
                    />
                </aside>
            </main>

            {selectedDish && (
                <DishModal
                    dish={selectedDish}
                    onClose={handleCloseDish}
                    onAddToCart={handleAddToCart}
                />
            )}
        </div>
    );
}