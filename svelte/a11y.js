/* blurssism Svelte 컴포넌트가 함께 쓰는 키보드·위치 도우미 · © caffeinecat · MIT (React 쪽은 src/core.js에 같은 동작이 있습니다) */
/** 라디오 묶음 방향키: 선택을 옮기고 포커스도 따라갑니다. Home·End로 처음·끝. */
export function rovingKey(e, ids, current, pick) {
    const n = ids.length, i = current === undefined ? -1 : ids.indexOf(current);
    if (!n)
        return;
    let next = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown")
        next = (i + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
        next = i < 0 ? n - 1 : (i - 1 + n) % n;
    else if (e.key === "Home")
        next = 0;
    else if (e.key === "End")
        next = n - 1;
    if (next === null)
        return;
    e.preventDefault();
    pick(ids[next]);
    e.currentTarget.querySelectorAll('[role="radio"]')[next]?.focus();
}
export const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
/** 시각을 버리고 날짜만 */
export const dayOf = (d) => (d ? new Date(d.getFullYear(), d.getMonth(), d.getDate()) : undefined);
/** 달력 키: 방향키 ±1일·±1주, Home·End 주의 처음·끝, PageUp·PageDown 이전·다음 달(Shift는 해). */
export function calendarKey(e, d) {
    switch (e.key) {
        case "ArrowRight": return addDays(d, 1);
        case "ArrowLeft": return addDays(d, -1);
        case "ArrowDown": return addDays(d, 7);
        case "ArrowUp": return addDays(d, -7);
        case "Home": return addDays(d, -d.getDay());
        case "End": return addDays(d, 6 - d.getDay());
        case "PageUp":
        case "PageDown": {
            const dir = e.key === "PageUp" ? -1 : 1, y = d.getFullYear() + (e.shiftKey ? dir : 0), m = d.getMonth() + (e.shiftKey ? 0 : dir);
            return new Date(y, m, Math.min(d.getDate(), new Date(y, m + 1, 0).getDate()));
        }
    }
    return null;
}
/** 툴팁을 기준 요소 위 가운데에 놓고, 위가 모자라면 아래로, 좌우는 화면 안으로 */
export function placeTooltip(t, a) {
    const r = a.getBoundingClientRect(), w = t.offsetWidth, h = t.offsetHeight, gap = 8, vw = window.innerWidth;
    const below = r.top - h - gap < 4;
    t.style.left = Math.min(Math.max(r.left + r.width / 2, w / 2 + 4), vw - w / 2 - 4) + "px";
    t.style.top = (below ? r.bottom + gap : r.top - gap) + "px";
    if (below)
        t.setAttribute("data-place", "below");
    else
        t.removeAttribute("data-place");
}
/** 개발 중 한 번만 경고 */
const warned = {};
export function warnOnce(key, msg) {
    if (warned[key] || typeof console === "undefined")
        return;
    const proc = globalThis.process;
    if (proc?.env?.NODE_ENV === "production")
        return;
    warned[key] = true;
    console.warn("blurssism: " + msg);
}
/** 네이티브 <dialog> 모달 열고 닫기(2.1). $effect 안에서 부릅니다: $effect(() => openModal(box, open, { onClosing }))
    열면 showModal() + 첫 조작 요소로 포커스, 닫으면 data-closing(onClosing(true)) → 애니메이션 끝 → close() → onClosing(false), 원래 자리로 포커스. */
export function openModal(d, open, o) {
    if (!d)
        return;
    if (!open) {
        if (!d.open)
            return;
        o.onClosing(true);
        let done = false;
        const finish = () => { if (done)
            return; done = true; if (d.open)
            d.close(); o.onClosing(false); };
        d.addEventListener("animationend", (e) => { if (e.target === d)
            finish(); }, { once: true });
        const t = setTimeout(finish, 400); // 동작 줄이기 등으로 애니메이션이 없으면 바로
        return () => clearTimeout(t);
    }
    const prev = document.activeElement;
    if (d.showModal) {
        if (!d.open)
            d.showModal();
    }
    else
        d.setAttribute("open", "");
    (d.querySelector("button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex='-1'])") ?? d).focus();
    return () => { prev?.focus?.(); };
}
