#!/usr/bin/env python3
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter


OUTLINE_COLOR = (255, 198, 44, 255)
FILL_COLOR = (255, 255, 255, 255)


def build_line_mask(image: Image.Image) -> Image.Image:
  rgb = image.convert("RGB")
  mask = Image.new("L", rgb.size, 0)
  source = rgb.load()
  target = mask.load()

  for y in range(rgb.height):
    for x in range(rgb.width):
      red, green, blue = source[x, y]
      is_outline = red > 155 and green > 105 and blue < 150 and (red + green) > 300
      if is_outline:
        target[x, y] = 255

  # Thicken and close small anti-aliased gaps in the traced border.
  for size in (3, 5, 5):
    mask = mask.filter(ImageFilter.MaxFilter(size))

  return mask.point(lambda value: 255 if value > 0 else 0, mode="L")


def build_fill_mask(line_mask: Image.Image) -> Image.Image:
  barrier = line_mask.copy()
  flood = barrier.copy()

  # Use the outline as a flood-fill barrier. Whatever remains unflooded is the landmass.
  ImageDraw.floodfill(flood, (0, 0), 128, border=255)
  fill = flood.point(lambda value: 255 if value == 0 else 0, mode="L")

  # Soften tiny voids and reinforce the interior up to the outline edge.
  fill = fill.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MinFilter(3))
  return fill.point(lambda value: 255 if value > 0 else 0, mode="L")


def colorize(mask: Image.Image, color: tuple[int, int, int, int]) -> Image.Image:
  rgba = Image.new("RGBA", mask.size, (0, 0, 0, 0))
  rgba.paste(color, mask=mask)
  return rgba


def main() -> int:
  if len(sys.argv) != 3:
    print("Usage: derive_continent_assets.py <source_png> <output_prefix>", file=sys.stderr)
    return 1

  source_path = Path(sys.argv[1]).expanduser()
  output_prefix = Path(sys.argv[2])
  output_prefix.parent.mkdir(parents=True, exist_ok=True)

  image = Image.open(source_path)
  line_mask = build_line_mask(image)
  fill_mask = build_fill_mask(line_mask)

  combined_bbox = ImageChops.lighter(line_mask, fill_mask).getbbox()
  if combined_bbox is None:
    print("Could not detect any outline pixels in the source image.", file=sys.stderr)
    return 1

  margin = 28
  left, top, right, bottom = combined_bbox
  crop_box = (
    max(0, left - margin),
    max(0, top - margin),
    min(image.width, right + margin),
    min(image.height, bottom + margin),
  )

  outline_image = colorize(line_mask.crop(crop_box), OUTLINE_COLOR)
  fill_image = colorize(fill_mask.crop(crop_box), FILL_COLOR)

  outline_path = output_prefix.with_name(f"{output_prefix.name}-outline.png")
  fill_path = output_prefix.with_name(f"{output_prefix.name}-fill.png")

  outline_image.save(outline_path)
  fill_image.save(fill_path)

  print(outline_path)
  print(fill_path)
  return 0


if __name__ == "__main__":
  raise SystemExit(main())
