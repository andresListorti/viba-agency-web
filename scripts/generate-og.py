"""Genera las imágenes para compartir (Open Graph) y los íconos de la app.

Uso:  python scripts/generate-og.py
Lee los servicios de src/lib/content.ts y las fotos de public/img.
Salida: public/og/*.jpg (1200x630, < 300 KB para que WhatsApp las muestre)
        public/icons/*.png, src/app/apple-icon.png, icon.png y favicon.ico
"""

import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parent.parent
BLACK = ROOT / "assets" / "Aileron-Black.otf"
BOLD = ROOT / "assets" / "Aileron-Bold.otf"
IMG = ROOT / "public" / "img"
OUT = ROOT / "public" / "og"
ICONS = ROOT / "public" / "icons"

INK = (5, 5, 5)
BONE = (245, 244, 240)
SMOKE = (150, 149, 146)
W, H = 1200, 630
PAD = 72

PILLARS = {"estrategia": "Estrategia", "creatividad": "Creatividad", "medios": "Medios & Producción"}


def font(path, size):
    return ImageFont.truetype(str(path), size)


def tracked(draw, xy, text, fnt, fill, tracking):
    """Texto con interletrado negativo, como en la web."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=fnt, fill=fill)
        x += draw.textlength(ch, font=fnt) + tracking
    return x


def tracked_width(draw, text, fnt, tracking):
    return sum(draw.textlength(c, font=fnt) + tracking for c in text) - tracking


def wrap(draw, text, fnt, tracking, max_w):
    lines, cur = [], ""
    for word in text.split():
        test = f"{cur} {word}".strip()
        if tracked_width(draw, test, fnt, tracking) <= max_w or not cur:
            cur = test
        else:
            lines.append(cur)
            cur = word
    lines.append(cur)
    return lines


def card(photo, size, angle):
    """Foto como tarjeta con esquinas redondeadas, borde sutil y sombra."""
    w, h = size
    im = ImageOps.fit(Image.open(photo).convert("RGB"), (w, h), Image.LANCZOS)
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, w - 1, h - 1), radius=10, fill=255)
    tile = Image.new("RGBA", (w, h))
    tile.paste(im, (0, 0), mask)
    ImageDraw.Draw(tile).rounded_rectangle((0, 0, w - 1, h - 1), radius=10, outline=(255, 255, 255, 40), width=2)

    m = 60
    shadow = Image.new("RGBA", (w + m * 2, h + m * 2), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle((m, m + 24, m + w, m + h + 24), radius=14, fill=(0, 0, 0, 200))
    shadow = shadow.filter(ImageFilter.GaussianBlur(26))
    shadow.alpha_composite(tile, (m, m))
    return shadow.rotate(angle, resample=Image.BICUBIC, expand=True)


def base():
    im = Image.new("RGBA", (W, H), INK + (255,))
    d = ImageDraw.Draw(im)
    f = font(BLACK, 46)
    x = tracked(d, (PAD, PAD - 14), "viba", f, BONE, -2.5)
    tracked(d, (x, PAD - 14), ".", f, SMOKE, -2.5)
    return im, d


def place(im, tile, cx, cy):
    im.alpha_composite(tile, (int(cx - tile.width / 2), int(cy - tile.height / 2)))


def save(im, name):
    path = OUT / f"{name}.jpg"
    im.convert("RGB").save(path, "JPEG", quality=84, optimize=True, progressive=True)
    kb = path.stat().st_size // 1024
    assert kb < 300, f"{name} pesa {kb} KB"
    print(f"  {path.relative_to(ROOT)}  {kb} KB")


def home():
    im, d = base()
    # Pila de fotos, como en el hero
    for photo, (cx, cy), size, angle in [
        ("estrategia", (815, 330), (250, 312), 9),
        ("equipo", (930, 300), (270, 338), -4),
        ("dev", (1035, 345), (250, 312), -11),
    ]:
        place(im, card(IMG / f"{photo}.webp", size, angle), cx, cy)

    f = font(BLACK, 92)
    tr = -4.5
    y = 236
    tracked(d, (PAD - 4, y), "No es", f, BONE, tr)
    y += 86
    x_end = tracked(d, (PAD - 4, y), "instinto.", f, BONE, tr)
    d.rectangle((PAD - 10, y + 52, x_end + 6, y + 59), fill=BONE)  # tachado
    y += 86
    tracked(d, (PAD - 4, y), "Es método.", f, BONE, tr)

    tracked(d, (PAD, H - PAD - 6), "Agencia de marketing  ·  Based in ARG, for the world.", font(BOLD, 22), SMOKE, -0.2)
    save(im, "home")


def service(slug, name, pillar, img):
    im, d = base()
    place(im, card(IMG / f"{img}.webp", (330, 412), -6), 960, 330)

    tracked(d, (PAD, 196), PILLARS[pillar], font(BOLD, 26), SMOKE, -0.3)
    size = 84 if len(name) < 24 else 70
    f = font(BLACK, size)
    lines = wrap(d, name, f, -3.5, 640)
    y = 240
    for line in lines:
        tracked(d, (PAD - 3, y), line, f, BONE, -3.5)
        y += int(size * 0.98)

    tracked(d, (PAD, H - PAD - 6), "VIBA Agency  ·  we feel what we do", font(BOLD, 22), SMOKE, -0.2)
    save(im, slug)


def icon(size):
    im = Image.new("RGBA", (size, size), INK + (255,))
    d = ImageDraw.Draw(im)
    f = font(BLACK, int(size * 0.62))
    text_w = d.textlength("v", font=f) + size * 0.16
    x = (size - text_w) / 2
    top = d.textbbox((0, 0), "v", font=f)
    y = (size - (top[3] - top[1])) / 2 - top[1]
    d.text((x, y), "v", font=f, fill=BONE)
    r = size * 0.075
    cx, cy = x + d.textlength("v", font=f) + size * 0.09, y + top[3] - r
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=SMOKE)
    return im


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    ICONS.mkdir(parents=True, exist_ok=True)
    print("Open Graph:")
    home()
    src = (ROOT / "src" / "lib" / "content.ts").read_text(encoding="utf-8")
    for slug, name, pillar, img in re.findall(
        r'slug: "([^"]+)",\s*name: "([^"]+)",\s*pillar: "([^"]+)",\s*img: "([^"]+)"', src
    ):
        service(slug, name, pillar, img)

    print("Íconos:")
    for s in (192, 512):
        icon(s).save(ICONS / f"icon-{s}.png", optimize=True)
        print(f"  public/icons/icon-{s}.png")
    icon(180).save(ROOT / "src" / "app" / "apple-icon.png", optimize=True)
    print("  src/app/apple-icon.png")
    icon(192).save(ROOT / "src" / "app" / "icon.png", optimize=True)
    icon(512).save(ROOT / "src" / "app" / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print("  src/app/icon.png, src/app/favicon.ico")


if __name__ == "__main__":
    main()
