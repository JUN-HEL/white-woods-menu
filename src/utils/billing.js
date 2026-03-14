export function calculateBill(cartItems = [], gstPercent = 5) {
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const gstAmount = (subtotal * gstPercent) / 100;
  const total = subtotal + gstAmount;

  return {
    subtotal,
    gstPercent,
    gstAmount,
    total,
  };
}

export function formatCurrency(amount = 0) {
  return `₹${Number(amount).toFixed(2)}`;
}