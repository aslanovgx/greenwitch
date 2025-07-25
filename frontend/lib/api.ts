export async function getAllProducts() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_ALL_PRODUCTS as string);
  return res.json();
}

export async function getNewProducts() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_NEW_PRODUCTS as string);
  return res.json();
}

export async function getDiscountedProducts() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_DISCOUNTED_PRODUCTS as string);
  return res.json();
}
