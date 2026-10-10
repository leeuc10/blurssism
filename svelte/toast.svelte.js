let list = $state([]);
const timers = {};
let seq = 0;
export const toastConfig = { duration: 4000, max: 3 };
function dismiss(id) {
    clearTimeout(timers[id]);
    delete timers[id];
    list = list.map((t) => (t.id === id ? { ...t, closing: true } : t));
    setTimeout(() => { list = list.filter((t) => t.id !== id); }, 200);
}
function show(opts) {
    const o = typeof opts === "string" ? { message: opts } : opts;
    const id = o.id ?? "bl-toast-" + ++seq, duration = o.duration ?? toastConfig.duration;
    const next = list.filter((t) => t.id !== id).concat([{ ...o, id }]);
    list = next.slice(Math.max(0, next.length - toastConfig.max));
    if (duration > 0)
        timers[id] = setTimeout(() => dismiss(id), duration);
    return id;
}
export const toast = { show, dismiss, get list() { return list; },
    /** 마우스를 올리면 멈춤 */ pause(id) { clearTimeout(timers[id]); },
    resume(t) { if (t.duration !== 0 && !t.closing)
        timers[t.id] = setTimeout(() => dismiss(t.id), 1500); } };
