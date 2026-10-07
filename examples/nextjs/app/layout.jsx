import "@caffeinecatkr/blurssism/fonts.css";
import "@caffeinecatkr/blurssism/tokens.css";
import "@caffeinecatkr/blurssism/bundle.css";
export default function RootLayout({ children }) {
  return <html lang="ko"><body className="bl-root">{children}</body></html>;
}
