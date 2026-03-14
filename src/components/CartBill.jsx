import BillSummary from "./BillSummary";
import { formatCurrency } from "../utils/billing";

export default function CartBill({
    cartItems = [],
    billSummary,
    gstPercent,
    onIncreaseQty,
    onDecreaseQty,
    onRemoveItem,
    onClearCart,
}) {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="rounded-[28px] border border-[#c9a77a]/25 bg-[#fffaf5] p-4 shadow-sm sm:p-5">
            <div className="flex items-start justify-between gap-4 border-b border-[#c9a77a]/20 pb-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a46b4d]">
                        Live Bill
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-[#4b1e24]">
                        Order Summary
                    </h2>
                </div>

                {cartItems.length > 0 && (
                    <button
                        type="button"
                        onClick={onClearCart}
                        className="rounded-full border border-[#c9a77a]/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#7a4b35] transition hover:bg-[#f7ede3]"
                    >
                        Clear All
                    </button>
                )}
            </div>

            <div className="mt-4">
                {cartItems.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-[#c9a77a]/35 bg-[#fcf8f3] px-4 py-8 text-center">
                        <p className="text-base font-semibold text-[#4b1e24]">
                            No items added yet
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[#6f4b4f]">
                            Tap any dish from the menu to view details and add it to the bill.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="mb-4 flex items-center justify-between rounded-2xl bg-[#f8f1e7] px-4 py-3">
                            <span className="text-sm text-[#6f4b4f]">Items in bill</span>
                            <span className="text-sm font-bold text-[#8b3a46]">
                                {totalItems}
                            </span>
                        </div>

                        <div className="space-y-3">
                            {cartItems.map((item) => (
                                <div
                                    key={item.cartKey}
                                    className="rounded-2xl border border-[#c9a77a]/20 bg-white p-4"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                            <h3 className="text-base font-semibold text-[#4b1e24]">
                                                {item.name}
                                            </h3>

                                            <div className="mt-1 flex flex-wrap gap-2 text-xs">
                                                <span className="rounded-full bg-[#f8f1e7] px-2.5 py-1 font-medium text-[#8b3a46]">
                                                    {item.variant}
                                                </span>
                                                <span className="rounded-full bg-[#fcf6f0] px-2.5 py-1 font-medium text-[#7a4b35]">
                                                    {formatCurrency(item.price)} each
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => onRemoveItem(item.cartKey)}
                                            className="shrink-0 rounded-full border border-[#c9a77a]/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#7a4b35] transition hover:bg-[#f7ede3]"
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => onDecreaseQty(item.cartKey)}
                                                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c9a77a]/35 bg-[#fffaf5] text-lg font-bold text-[#4b1e24] transition hover:bg-[#f7ede3]"
                                            >
                                                −
                                            </button>

                                            <span className="min-w-[28px] text-center text-base font-bold text-[#4b1e24]">
                                                {item.quantity}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() => onIncreaseQty(item.cartKey)}
                                                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c9a77a]/35 bg-[#fffaf5] text-lg font-bold text-[#4b1e24] transition hover:bg-[#f7ede3]"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-xs uppercase tracking-[0.15em] text-[#a46b4d]">
                                                Total
                                            </p>
                                            <p className="text-lg font-bold text-[#8b3a46]">
                                                {formatCurrency(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5">
                            <BillSummary
                                billSummary={billSummary}
                                gstPercent={gstPercent}
                            />
                        </div>

                        <button
                            type="button"
                            className="mt-5 w-full rounded-full bg-[#8b3a46] px-5 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg transition hover:bg-[#742f39]"
                        >
                            Place Order
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}