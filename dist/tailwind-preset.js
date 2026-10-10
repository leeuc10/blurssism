/* blurssism v2.1.2 · © caffeinecat · MIT · https://github.com/leeuc10/blurssism */
/* Tailwind 프리셋 — tailwind.config.js: presets: [require("@caffeinecatkr/blurssism/tailwind")]
   dist/tokens.css를 함께 불러와야 var(--…) 값이 채워집니다. 브레이크포인트 sm/md/lg/xl은 blurssism과 같습니다. */
module.exports = {
  "theme": {
    "extend": {
      "colors": {
        "paper": "rgb(var(--paper-rgb) / <alpha-value>)",
        "paper-raised": "rgb(var(--paper-raised-rgb) / <alpha-value>)",
        "paper-sunken": "rgb(var(--paper-sunken-rgb) / <alpha-value>)",
        "ink": "rgb(var(--ink-rgb) / <alpha-value>)",
        "ink-muted": "rgb(var(--ink-muted-rgb) / <alpha-value>)",
        "ink-subtle": "rgb(var(--ink-subtle-rgb) / <alpha-value>)",
        "line": "rgb(var(--line-rgb) / <alpha-value>)",
        "line-strong": "rgb(var(--line-strong-rgb) / <alpha-value>)",
        "accent": "rgb(var(--accent-rgb) / <alpha-value>)",
        "accent-soft": "rgb(var(--accent-soft-rgb) / <alpha-value>)",
        "on-accent": "rgb(var(--on-accent-rgb) / <alpha-value>)",
        "accent-ink": "rgb(var(--accent-ink-rgb) / <alpha-value>)",
        "positive": "rgb(var(--positive-rgb) / <alpha-value>)",
        "positive-soft": "rgb(var(--positive-soft-rgb) / <alpha-value>)",
        "warning": "rgb(var(--warning-rgb) / <alpha-value>)",
        "warning-soft": "rgb(var(--warning-soft-rgb) / <alpha-value>)",
        "deco": "rgb(var(--deco-rgb) / <alpha-value>)",
        "apricot": "var(--apricot)",
        "danger": "rgb(var(--danger-rgb) / <alpha-value>)",
        "danger-soft": "rgb(var(--danger-soft-rgb) / <alpha-value>)",
        "info": "rgb(var(--info-rgb) / <alpha-value>)",
        "focus-ring": "rgb(var(--focus-ring-rgb) / <alpha-value>)",
        "crema-fill": "var(--crema-fill)",
        "crema-fill-strong": "var(--crema-fill-strong)",
        "crema-ink-muted": "rgb(var(--crema-ink-muted-rgb) / <alpha-value>)",
        "crema-stroke": "var(--crema-stroke)",
        "crema-tint-accent": "var(--crema-tint-accent)",
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
        "crema": "var(--shadow-crema)",
        "sheet": "var(--shadow-sheet)",
        "crema-rich": "var(--shadow-crema-rich)",
        "crema-rich-hover": "var(--shadow-crema-rich-hover)",
        "sheet-rich": "var(--shadow-sheet-rich)"
      },
      "backdropBlur": {
        "sm": "var(--blur-sm)",
        "md": "var(--blur-md)",
        "lg": "var(--blur-lg)"
      },
      "backgroundImage": {
        "crema-band": "var(--crema-band)",
        "crema-grain": "var(--crema-grain)"
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
          "var(--text-display-size)",
          {
            "lineHeight": "var(--text-display-line)",
            "fontWeight": "var(--text-display-weight)",
            "letterSpacing": "var(--text-display-tracking)"
          }
        ],
        "title-1": [
          "var(--text-title-1-size)",
          {
            "lineHeight": "var(--text-title-1-line)",
            "fontWeight": "var(--text-title-1-weight)",
            "letterSpacing": "var(--text-title-1-tracking)"
          }
        ],
        "quote": [
          "var(--text-quote-size)",
          {
            "lineHeight": "var(--text-quote-line)",
            "fontWeight": "var(--text-quote-weight)",
            "letterSpacing": "var(--text-quote-tracking)"
          }
        ],
        "title-2": [
          "var(--text-title-2-size)",
          {
            "lineHeight": "var(--text-title-2-line)",
            "fontWeight": "var(--text-title-2-weight)",
            "letterSpacing": "var(--text-title-2-tracking)"
          }
        ],
        "title-3": [
          "var(--text-title-3-size)",
          {
            "lineHeight": "var(--text-title-3-line)",
            "fontWeight": "var(--text-title-3-weight)",
            "letterSpacing": "var(--text-title-3-tracking)"
          }
        ],
        "body": [
          "var(--text-body-size)",
          {
            "lineHeight": "var(--text-body-line)",
            "fontWeight": "var(--text-body-weight)",
            "letterSpacing": "var(--text-body-tracking)"
          }
        ],
        "body-strong": [
          "var(--text-body-strong-size)",
          {
            "lineHeight": "var(--text-body-strong-line)",
            "fontWeight": "var(--text-body-strong-weight)",
            "letterSpacing": "var(--text-body-strong-tracking)"
          }
        ],
        "body-sm": [
          "var(--text-body-sm-size)",
          {
            "lineHeight": "var(--text-body-sm-line)",
            "fontWeight": "var(--text-body-sm-weight)",
            "letterSpacing": "var(--text-body-sm-tracking)"
          }
        ],
        "label": [
          "var(--text-label-size)",
          {
            "lineHeight": "var(--text-label-line)",
            "fontWeight": "var(--text-label-weight)",
            "letterSpacing": "var(--text-label-tracking)"
          }
        ],
        "caption": [
          "var(--text-caption-size)",
          {
            "lineHeight": "var(--text-caption-line)",
            "fontWeight": "var(--text-caption-weight)",
            "letterSpacing": "var(--text-caption-tracking)"
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
