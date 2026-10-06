/* blurssism v1.3.1 · © caffeinecat · MIT · https://github.com/leeuc10/blurssism */
/* Tailwind 프리셋 — tailwind.config.js: presets: [require("@caffeinecatkr/blurssism/tailwind")]
   dist/tokens.css를 함께 불러와야 var(--…) 값이 채워집니다. 브레이크포인트 sm/md/lg/xl은 blurssism과 같습니다. */
module.exports = {
  "theme": {
    "extend": {
      "colors": {
        "paper": "var(--paper)",
        "paper-raised": "var(--paper-raised)",
        "paper-sunken": "var(--paper-sunken)",
        "ink": "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        "ink-subtle": "var(--ink-subtle)",
        "line": "var(--line)",
        "line-strong": "var(--line-strong)",
        "accent": "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        "on-accent": "var(--on-accent)",
        "accent-ink": "var(--accent-ink)",
        "positive": "var(--positive)",
        "positive-soft": "var(--positive-soft)",
        "warning": "var(--warning)",
        "warning-soft": "var(--warning-soft)",
        "deco": "var(--deco)",
        "apricot": "var(--apricot)",
        "danger": "var(--danger)",
        "danger-soft": "var(--danger-soft)",
        "info": "var(--info)",
        "focus-ring": "var(--focus-ring)",
        "glass-fill": "var(--glass-fill)",
        "glass-fill-strong": "var(--glass-fill-strong)",
        "glass-stroke": "var(--glass-stroke)",
        "glass-tint-accent": "var(--glass-tint-accent)",
        "scrim": "var(--scrim)"
      },
      "spacing": {
        "1": "var(--space-1)",
        "2": "var(--space-2)",
        "3": "var(--space-3)",
        "4": "var(--space-4)",
        "5": "var(--space-5)",
        "6": "var(--space-6)",
        "8": "var(--space-8)",
        "12": "var(--space-12)",
        "16": "var(--space-16)",
        "24": "var(--space-24)"
      },
      "borderRadius": {
        "sm": "var(--radius-sm)",
        "md": "var(--radius-md)",
        "lg": "var(--radius-lg)",
        "xl": "var(--radius-xl)",
        "full": "var(--radius-full)"
      },
      "boxShadow": {
        "card": "var(--shadow-card)",
        "glass": "var(--shadow-glass)",
        "sheet": "var(--shadow-sheet)"
      },
      "backdropBlur": {
        "sm": "var(--blur-sm)",
        "md": "var(--blur-md)",
        "lg": "var(--blur-lg)"
      },
      "fontFamily": {
        "sans": [
          "var(--font-sans)"
        ],
        "serif": [
          "var(--font-serif)"
        ]
      },
      "fontSize": {
        "display": [
          "40px",
          {
            "lineHeight": "48px",
            "fontWeight": "700",
            "letterSpacing": "-0.02em"
          }
        ],
        "title-1": [
          "30px",
          {
            "lineHeight": "38px",
            "fontWeight": "700",
            "letterSpacing": "-0.015em"
          }
        ],
        "quote": [
          "22px",
          {
            "lineHeight": "32px",
            "fontWeight": "400"
          }
        ],
        "title-2": [
          "22px",
          {
            "lineHeight": "30px",
            "fontWeight": "700",
            "letterSpacing": "-0.01em"
          }
        ],
        "title-3": [
          "18px",
          {
            "lineHeight": "26px",
            "fontWeight": "600"
          }
        ],
        "body": [
          "16px",
          {
            "lineHeight": "26px",
            "fontWeight": "400"
          }
        ],
        "body-strong": [
          "16px",
          {
            "lineHeight": "26px",
            "fontWeight": "600"
          }
        ],
        "body-sm": [
          "14px",
          {
            "lineHeight": "22px",
            "fontWeight": "400"
          }
        ],
        "label": [
          "15px",
          {
            "lineHeight": "20px",
            "fontWeight": "600"
          }
        ],
        "caption": [
          "12px",
          {
            "lineHeight": "16px",
            "fontWeight": "500",
            "letterSpacing": "0.01em"
          }
        ]
      },
      "screens": {
        "sm": "600px",
        "md": "768px",
        "lg": "1120px",
        "xl": "1440px"
      },
      "maxWidth": {
        "content": "var(--content-max)",
        "prose": "var(--prose-max)"
      }
    }
  }
};
