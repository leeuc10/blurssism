/* blurssism Svelte 토스트 저장소(2.1) · © caffeinecat · MIT
   어디서나 toast.show({ message, tone, actionLabel, onaction, duration }) → id, toast.dismiss(id). 앱 루트에 <Toaster />를 한 번 둡니다. */
export interface ToastItem {
  id: string; message: string; tone?: "neutral" | "positive" | "warning" | "danger" | "info";
  actionLabel?: string; onaction?: () => void; duration?: number; dismissible?: boolean; closing?: boolean;
}
let list = $state<ToastItem[]>([]);
const timers: Record<string, ReturnType<typeof setTimeout>> = {};
let seq = 0;
export const toastConfig = { duration: 4000, max: 3 };

function dismiss(id: string) {
  clearTimeout(timers[id]); delete timers[id];
  list = list.map((t) => (t.id === id ? { ...t, closing: true } : t));
  setTimeout(() => { list = list.filter((t) => t.id !== id); }, 200);
}
function show(opts: string | Omit<ToastItem, "id"> & { id?: string }) {
  const o = typeof opts === "string" ? { message: opts } : opts;
  const id = o.id ?? "bl-toast-" + ++seq, duration = o.duration ?? toastConfig.duration;
  const next = list.filter((t) => t.id !== id).concat([{ ...o, id }]);
  list = next.slice(Math.max(0, next.length - toastConfig.max));
  if (duration > 0) timers[id] = setTimeout(() => dismiss(id), duration);
  return id;
}
export const toast = { show, dismiss, get list() { return list; },
  /** 마우스를 올리면 멈춤 */ pause(id: string) { clearTimeout(timers[id]); },
  resume(t: ToastItem) { if (t.duration !== 0 && !t.closing) timers[t.id] = setTimeout(() => dismiss(t.id), 1500); } };
