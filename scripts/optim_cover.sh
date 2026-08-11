#!/usr/bin/env bash
# Usage: optim_cover.sh <input> <output.webp|output.jpg>
# Proportionally downscale a publication cover. No cropping.
# Default target width: 1080px (4x of the 270px CSS width).
set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "Usage: $0 <input> <output.webp|output.jpg>" >&2
  exit 1
fi

input=$1
output=$2
target_width=1080
quality=82

if [[ ! -f "$input" ]]; then
  echo "Input not found: $input" >&2
  exit 1
fi

case "$output" in
  *.webp|*.jpg|*.jpeg) ;;
  *)
    echo "Output must end with .webp, .jpg, or .jpeg" >&2
    exit 1
    ;;
esac

tmp=$(mktemp -t cover).png
trap 'rm -f "$tmp"' EXIT

read -r src_w src_h < <(sips -g pixelWidth -g pixelHeight "$input" | awk '/pixelWidth/{w=$2} /pixelHeight/{h=$2} END{print w, h}')

# Only shrink; never upscale.
if (( src_w > target_width )); then
  sips --resampleWidth "$target_width" "$input" --out "$tmp" >/dev/null
else
  sips -s format png "$input" --out "$tmp" >/dev/null
fi

mkdir -p "$(dirname "$output")"

case "$output" in
  *.webp)
    cwebp -quiet -q "$quality" "$tmp" -o "$output"
    ;;
  *.jpg|*.jpeg)
    sips -s format jpeg -s formatOptions "$quality" "$tmp" --out "$output" >/dev/null
    ;;
esac

echo "$input -> $output ($(sips -g pixelWidth -g pixelHeight "$output" | awk '/pixelWidth/{w=$2} /pixelHeight/{h=$2} END{printf "%sx%s", w, h}'), $(wc -c < "$output" | tr -d ' ') bytes)"
