const escapeXml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

function getDishEmoji(dish = {}) {
  const name = `${dish.name || ""}`.toLowerCase();
  const category = `${dish.category || ""}`.toLowerCase();

  if (name.includes("chicken lollipop")) return "🍗";
  if (name.includes("biryani")) return "🍛";
  if (name.includes("rice")) return "🍚";
  if (name.includes("soup")) return "🥣";
  if (name.includes("roti") || name.includes("paratha")) return "🫓";
  if (name.includes("raita") || name.includes("curd")) return "🥛";
  if (name.includes("cake") || name.includes("pastry")) return "🎂";
  if (name.includes("gulab jamun")) return "🍮";
  if (name.includes("chicken")) return "🍗";

  if (category.includes("rice")) return "🍚";
  if (category.includes("soup")) return "🥣";
  if (category.includes("bread")) return "🫓";
  if (category.includes("raita")) return "🥛";
  if (category.includes("cake") || category.includes("pastry")) return "🎂";
  if (category.includes("dessert")) return "🍮";
  if (category.includes("non-veg")) return "🍗";

  return "🍽️";
}

export function createDishPlaceholder(dish = {}) {
  const name = escapeXml(dish.name || "Dish");
  const category = escapeXml(dish.category || "The White Woods");
  const emoji = getDishEmoji(dish);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f9efe3"/>
          <stop offset="100%" stop-color="#ead8c6"/>
        </linearGradient>
        <linearGradient id="wine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#5a1d25"/>
          <stop offset="50%" stop-color="#7a2d36"/>
          <stop offset="100%" stop-color="#5a1d25"/>
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.75)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
        </radialGradient>
      </defs>

      <rect width="1200" height="800" fill="url(#bg)"/>
      <rect x="24" y="24" width="1152" height="752" rx="28" fill="none" stroke="#7a2d36" stroke-width="10"/>
      <rect x="60" y="60" width="1080" height="88" rx="18" fill="url(#wine)"/>
      <circle cx="600" cy="330" r="170" fill="#f6eadc" stroke="#d8b075" stroke-width="8"/>
      <circle cx="600" cy="330" r="200" fill="url(#glow)"/>

      <text x="600" y="125" text-anchor="middle" font-size="34" font-family="Georgia, serif" fill="#fff4ea" letter-spacing="5">
        THE WHITE WOODS
      </text>

      <text x="600" y="355" text-anchor="middle" font-size="118">${emoji}</text>

      <text x="600" y="535" text-anchor="middle" font-size="56" font-weight="700" font-family="Georgia, serif" fill="#5a1d25">
        ${name}
      </text>

      <text x="600" y="590" text-anchor="middle" font-size="26" font-family="Arial, sans-serif" fill="#8a6558" letter-spacing="3">
        ${category.toUpperCase()}
      </text>

      <rect x="390" y="632" width="420" height="54" rx="27" fill="#7a2d36"/>
      <text x="600" y="667" text-anchor="middle" font-size="22" font-weight="700" font-family="Arial, sans-serif" fill="#fff4ea" letter-spacing="2">
        FRESH • TASTY • MADE TO ORDER
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function getDishImage(dish = {}) {
  return dish.image || createDishPlaceholder(dish);
}