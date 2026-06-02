/**
 * Returns the best available image URL (WebP with PNG fallback).
 * Products have both .png and .webp versions; WebP is ~85% smaller.
 */
export function getImageSrc(path: string | undefined | null): string {
  if (!path) return "/images/placeholder.jpg";
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  // If it's a PNG from the products folder, try WebP first
  if (normalized.includes("/images/products/") && normalized.endsWith(".png")) {
    return normalized.replace(".png", ".webp");
  }
  return normalized;
}
