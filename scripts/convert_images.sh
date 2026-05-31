#!/bin/sh
# Convert WebP images with .jpg extension to real JPEG files
# This fixes "Image corrupt or truncated" errors in browsers

echo "[convert_images] Checking for WebP files with .jpg extension..."

find /app/public -name "*.jpg" -type f | while read -r img; do
  mime=$(head -c 12 "$img" 2>/dev/null)
  # WebP header is "RIFF....WEBP"
  if echo "$mime" | grep -q "RIFF\|WEBP"; then
    echo "[convert_images] Converting: $img"
    convert "$img" -quality 85 "$img.tmp" && mv "$img.tmp" "$img" && echo "  ✓ Converted"
  fi
done

echo "[convert_images] Done."
