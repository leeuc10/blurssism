/* blurssism Svelte 로케일(2.1) · © caffeinecat · MIT
   setLocale("en")로 바꾸면 이 값을 읽는 컴포넌트가 다시 그립니다. 컴포넌트 안에서: const L = $derived({ ...locale.current, ...override }) */
import { getLocale, onLocaleChange } from "./utils.js";
import type { Locale } from "./utils.js";

let current = $state<Locale>(getLocale());
onLocaleChange((l: Locale) => { current = l; });

export const locale = { get current(): Locale { return current; } };
