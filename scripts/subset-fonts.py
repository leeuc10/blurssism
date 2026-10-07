# blurssism 2350자 글꼴 만들기 · © caffeinecat · MIT
# Pretendard Variable과 Gowun Batang에서 KS X 1001 한글 2350자 + 영문·숫자·자주 쓰는 기호만 남긴 woff2를 만듭니다.
# 글꼴 버전을 올릴 때만 실행합니다. 원본을 받아 dist/fonts/blurssism-sans/, dist/fonts/blurssism-serif/에 씁니다.
#   python3 -m pip install fonttools brotli
#   python3 scripts/subset-fonts.py
# 원본: npm pretendard (dist/web/variable/woff2/), github.com/google/fonts ofl/gowunbatang/
# Pretendard는 OFL의 예약 글꼴 이름(Reserved Font Name)이 있어서, 고친 글꼴은 이름을 바꿔야 합니다.
# 그래서 Blurssism Sans·Blurssism Serif로 내보내고, 원저작권 표기와 OFL 라이선스는 그대로 둡니다.
import shutil
import subprocess
import tarfile
import tempfile
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
VERSION = "1.6.0"
PRETENDARD = "pretendard@1.3.9"
GOWUN = "https://github.com/google/fonts/raw/main/ofl/gowunbatang/"

KEEP = [
    *range(0x20, 0x7F),      # 영문·숫자·ASCII 기호
    *range(0xA0, 0x100),     # Latin-1 (·, ©, × 등)
    *range(0x2010, 0x2028),  # – — ‘ ’ “ ” • …
    *range(0x2030, 0x203B),  # ‰ ′ ″ ‹ › ※
    0x20A9, 0x20AC, 0x2122, *range(0x2190, 0x2194),  # ₩ € ™ ← ↑ → ↓
    *range(0x3000, 0x3019),  # 　、。〈〉《》「」『』【】
    *range(0x3131, 0x318F),  # 호환 자모 ㄱ~ㆎ
]


def hangul_2350():
    out = []
    for hi in range(0xB0, 0xC9):
        for lo in range(0xA1, 0xFF):
            ch = bytes([hi, lo]).decode("euc_kr", errors="ignore")
            if ch and "가" <= ch <= "힣":
                out.append(ord(ch))
    assert len(out) == 2350, len(out)
    return out


def rename(font, family, style, ps):
    """원래 이름(예약 이름 포함)을 지우고 새 이름을 씁니다. 저작권·라이선스 항목은 남깁니다."""
    name = font["name"]
    keep = {0, 7, 8, 9, 11, 12, 13, 14}  # 저작권, 상표, 제작사, 디자이너, URL, 라이선스
    name.names = [n for n in name.names if n.nameID in keep or n.nameID >= 256]  # 256 이상: 가변 축·인스턴스 이름
    for n in name.names:
        if n.nameID >= 256 and "Pretendard" in n.toUnicode():
            n.string = n.toUnicode().replace("PretendardVariable", ps.split("-")[0]).replace("Pretendard", family)
    full = f"{family} {style}" if style != "Regular" else family
    for nid, val in {1: family, 2: style, 3: f"{ps};{VERSION}", 4: full, 5: f"Version {VERSION}; subset of the original by caffeinecat",
                     6: ps, 16: family, 17: style}.items():
        name.setName(val, nid, 3, 1, 0x409)
    font["name"].setName(
        name.getDebugName(0) + " Modified (subset) by caffeinecat, 2026.", 0, 3, 1, 0x409)
    if "CFF " in font:
        font["CFF "].cff.fontNames = [ps]


def make(src, dst, family, style, ps, codepoints):
    opts = subset.Options()
    opts.layout_features = ["*"]
    opts.name_IDs = ["*"]
    opts.name_languages = ["*"]
    opts.notdef_outline = True
    opts.flavor = "woff2"
    font = subset.load_font(src, opts)
    s = subset.Subsetter(opts)
    s.populate(unicodes=codepoints)
    s.subset(font)
    rename(font, family, style, ps)
    dst.parent.mkdir(parents=True, exist_ok=True)
    subset.save_font(font, dst, opts)
    got = font.getBestCmap()
    missing = [c for c in codepoints if c not in got and 0xAC00 <= c <= 0xD7A3]
    print(f"{dst.relative_to(ROOT)}: {len(got)}자, {dst.stat().st_size // 1024}KB" + (f", 한글 빠짐 {len(missing)}" if missing else ""))


def fetch(tmp):
    """원본 글꼴과 라이선스를 받아 둡니다."""
    tgz = subprocess.run(["npm", "pack", PRETENDARD, "--silent"], cwd=tmp, check=True, capture_output=True, text=True).stdout.split()[-1]
    with tarfile.open(tmp / tgz) as t:
        t.extractall(tmp, filter="data")
    for f in ("GowunBatang-Regular.ttf", "GowunBatang-Bold.ttf", "OFL.txt"):
        subprocess.run(["curl", "-sfL", GOWUN + f, "-o", str(tmp / f)], check=True)
    return tmp / "package/dist/web/variable/woff2/PretendardVariable.woff2", tmp / "package/dist/LICENSE.txt"


if __name__ == "__main__":
    with tempfile.TemporaryDirectory() as d:
        tmp = Path(d)
        pre, pre_license = fetch(tmp)
        cps = KEEP + hangul_2350()
        sans, serif = ROOT / "dist/fonts/blurssism-sans", ROOT / "dist/fonts/blurssism-serif"
        for out in (sans, serif):
            shutil.rmtree(out, ignore_errors=True)
        make(pre, sans / "BlurssismSans-Variable.woff2", "Blurssism Sans", "Regular", "BlurssismSans-Variable", cps)
        make(tmp / "GowunBatang-Regular.ttf", serif / "BlurssismSerif-Regular.woff2", "Blurssism Serif", "Regular", "BlurssismSerif-Regular", cps)
        make(tmp / "GowunBatang-Bold.ttf", serif / "BlurssismSerif-Bold.woff2", "Blurssism Serif", "Bold", "BlurssismSerif-Bold", cps)
        # 원본 라이선스(SIL OFL 1.1)를 함께 둡니다.
        shutil.copy(pre_license, sans / "LICENSE.txt")
        shutil.copy(tmp / "OFL.txt", serif / "LICENSE.txt")
