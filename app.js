// Renders window.SLIDES. Navigation: ←/→, Space, PageUp/Down, Home/End, "o" for contents.
(() => {
  const slides = window.SLIDES;
  const sections = window.SECTIONS;
  const total = slides.length;
  const $ = (id) => document.getElementById(id);
  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text) node.textContent = text;
    return node;
  };

  let current = 0;

  // ── Builders ────────────────────────────────────────────
  const buildPrompt = ({ label, text }) => {
    const box = el("figure", "prompt");
    const head = el("figcaption", "prompt-head");
    head.append(el("span", "prompt-label", label || "Prompt"));
    const btn = el("button", "btn copy", "Copy");
    btn.type = "button";
    btn.setAttribute("aria-label", `Copy ${label || "prompt"} to clipboard`);
    btn.addEventListener("click", () => copy(text, btn));
    head.append(btn);
    const pre = el("pre");
    pre.append(el("code", null, text));
    box.append(head, pre);
    return box;
  };

  const buildImages = (images) => {
    const grid = el("div", `images count-${Math.min(images.length, 4)}`);
    images.forEach((im, i) => {
      const btn = el("button", "img-btn");
      btn.type = "button";
      btn.setAttribute("aria-label", `Enlarge image: ${im.alt}`);
      if (images.length > 1) btn.append(el("span", "badge", String(i + 1)));
      const pic = el("img");
      pic.src = im.src;
      pic.alt = im.alt;
      pic.loading = "lazy";
      btn.append(pic);
      btn.addEventListener("click", () => openLightbox(im));
      grid.append(btn);
    });
    return grid;
  };

  // Tiny inline markup: `code` and **bold**. Builds DOM nodes, never innerHTML.
  const rich = (tag, cls, text) => {
    const node = el(tag, cls);
    text.split(/(`[^`]+`|\*\*[^*]+\*\*)/).filter(Boolean).forEach((part) => {
      if (part.startsWith("`")) node.append(el("code", null, part.slice(1, -1)));
      else if (part.startsWith("**")) node.append(el("strong", null, part.slice(2, -2)));
      else node.append(part);
    });
    return node;
  };

  const buildCard = ({ heading, items }) => {
    const card = el("section", "card");
    card.append(el("h3", "card-heading", heading));
    const ul = el("ul", "card-list");
    items.forEach((item) => ul.append(rich("li", null, item)));
    card.append(ul);
    return card;
  };

  const buildFlow = ({ heading, steps, note }) => {
    const wrap = el("section", "flow");
    wrap.append(el("h3", "flow-heading", heading));
    const body = el("div", "flow-body");
    const ol = el("ol", "flow-steps");
    steps.forEach(({ label, tone }) => ol.append(el("li", `flow-step tone-${tone}`, label)));
    body.append(ol);
    if (note) body.append(rich("p", "flow-note", note));
    wrap.append(body);
    return wrap;
  };

  const buildLinks = (links) => {
    const wrap = el("p", "links");
    // Each link is either a URL string or { label, url } for a caption above it.
    links.forEach((link) => {
      const { label, url } = typeof link === "string" ? { url: link } : link;
      if (label) wrap.append(el("span", "link-label", label));
      const a = el("a", "link", url);
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
      wrap.append(a);
    });
    return wrap;
  };

  const render = () => {
    const s = slides[current];
    const root = $("slide");
    root.replaceChildren();
    root.className = `slide layout-${s.layout || "default"}`;

    const text = el("div", "slide-text");
    text.append(el("p", "eyebrow", s.layout === "divider" ? s.lead : sections[s.section]));
    text.append(el(current === 0 ? "h1" : "h2", "title", s.title));
    if (s.lead && s.layout !== "divider") text.append(el("p", "lead", s.lead));
    if (s.links) text.append(buildLinks(s.links));
    (s.prompts || []).forEach((p) => text.append(buildPrompt(p)));
    root.append(text);
    if (s.card) root.append(buildCard(s.card));
    if (s.flow) root.append(buildFlow(s.flow));
    if (s.images?.length) root.append(buildImages(s.images));
    root.append(el("span", "slide-num", `${current + 1}`));

    $("counter").textContent = `Slide ${current + 1} of ${total}`;
    $("progressFill").style.width = `${((current + 1) / total) * 100}%`;
    document.querySelector(".progress").setAttribute("aria-valuenow", current + 1);
    document.querySelector(".progress").setAttribute("aria-valuemax", total);
    $("prev").disabled = current === 0;
    $("next").disabled = current === total - 1;
    document.querySelectorAll("#tocList a").forEach((a, i) =>
      a.toggleAttribute("aria-current", i === current));
    document.title = `${current + 1}. ${s.title} · Copilot App Workshop`;
  };

  const go = (n, focus = false) => {
    current = Math.max(0, Math.min(total - 1, n));
    history.replaceState(null, "", `#${current + 1}`);
    render();
    if (focus) $("slide").focus();
  };

  // ── Clipboard (with fallback for file:// in older browsers) ──
  const copy = async (text, btn) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = Object.assign(document.createElement("textarea"), { value: text });
      document.body.append(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    btn.textContent = "Copied \u2713";
    btn.classList.add("done");
    setTimeout(() => { btn.textContent = "Copy"; btn.classList.remove("done"); }, 1600);
  };

  // ── Lightbox ────────────────────────────────────────────
  const lightbox = $("lightbox");
  const openLightbox = ({ src, alt }) => {
    $("lightboxImg").src = src;
    $("lightboxImg").alt = alt;
    lightbox.showModal();
  };
  $("lightboxClose").addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.close(); });

  // ── Table of contents ───────────────────────────────────
  const toc = $("toc");
  const toggleToc = (open = toc.hidden) => {
    toc.hidden = !open;
    $("tocToggle").setAttribute("aria-expanded", String(open));
    if (open) toc.querySelector("[aria-current]")?.focus();
  };
  const buildToc = () => {
    let lastSection = -1;
    slides.forEach((s, i) => {
      if (s.section !== lastSection) {
        lastSection = s.section;
        $("tocList").append(el("li", "toc-section", sections[s.section]));
      }
      const li = el("li");
      const a = el("a", null);
      a.href = `#${i + 1}`;
      a.append(el("span", "toc-num", String(i + 1)), document.createTextNode(s.title));
      a.addEventListener("click", (e) => { e.preventDefault(); go(i, true); toggleToc(false); });
      li.append(a);
      $("tocList").append(li);
    });
  };

  // ── Events ──────────────────────────────────────────────
  $("prev").addEventListener("click", () => go(current - 1));
  $("next").addEventListener("click", () => go(current + 1));
  $("tocToggle").addEventListener("click", () => toggleToc());

  document.addEventListener("keydown", (e) => {
    if (lightbox.open || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.target.closest("button, a") && (e.key === " " || e.key === "Enter")) return;
    const keys = {
      ArrowRight: () => go(current + 1), PageDown: () => go(current + 1), " ": () => go(current + 1),
      ArrowLeft: () => go(current - 1), PageUp: () => go(current - 1),
      Home: () => go(0), End: () => go(total - 1),
      o: () => toggleToc(), Escape: () => toggleToc(false),
    };
    if (keys[e.key]) { e.preventDefault(); keys[e.key](); }
  });

  // Basic swipe support for tablets/phones.
  let touchX = null;
  $("slide").addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  $("slide").addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 60) go(current + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  window.addEventListener("hashchange", () => go(parseInt(location.hash.slice(1), 10) - 1 || 0));

  buildToc();
  go((parseInt(location.hash.slice(1), 10) || 1) - 1);
})();
