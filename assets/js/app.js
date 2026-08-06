/* ==========================================================================
   Cyber Range Orchestrator — Static Demo shell
   Builds the banner / sidebar / topbar chrome shared by every page and
   wires up the small bits of interactivity (nav highlight, theme toggle,
   sidebar expand/collapse) needed to make the walkthrough feel real.
   This is 100% static: no network calls, no auth, nothing persists
   beyond localStorage for the theme/sidebar preference.
   ========================================================================== */

const CRO_NAV = [
  { key: "home", label: "Home", icon: "pi-home", href: "home.html" },
  { key: "projects", label: "Projects", icon: "pi-folder", href: "projects.html" },
  { key: "devices", label: "Devices", icon: "pi-desktop", href: "devices.html" },
  {
    key: "libraries", label: "Libraries", icon: "pi-book",
    children: [
      { label: "Media", href: "libraries.html?tab=media" },
      { label: "Lookup", href: "libraries.html?tab=lookup" },
      { label: "Configuration", href: "libraries.html?tab=config" },
      { label: "Tags", href: "libraries.html?tab=tags" },
    ],
  },
  {
    key: "logins", label: "Logins", icon: "pi-key",
    children: [
      { label: "Connection Profiles", href: "logins.html?tab=connections" },
      { label: "Login Profiles", href: "logins.html?tab=logins" },
      { label: "SSH Keys", href: "logins.html?tab=ssh" },
    ],
  },
  { key: "tasks", label: "Tasks", icon: "pi-clock", href: "tasks.html" },
  {
    key: "automation", label: "Automation", icon: "pi-cog",
    children: [{ label: "Ansible", href: "automation.html" }],
  },
  { key: "history", label: "History", icon: "pi-history", href: "history.html" },
];

const CRO_BOTTOM_NAV = [
  { key: "administration", label: "Users", icon: "pi-users", href: "administration.html" },
  { key: "settings", label: "Settings", icon: "pi-cog", href: "settings.html" },
  { key: "help", label: "Help", icon: "pi-question-circle", href: "https://github.com/", external: true },
];

function croIcon(name) {
  return `<i class="pi ${name}" aria-hidden="true"></i>`;
}

function croRenderNavItem(item, activeKey) {
  const isActive = item.key === activeKey;
  if (item.children) {
    const openNow = item.children.some(c => (c.href || "").split("?")[0] === (window.CRO_PAGE || ""));
    const sub = item.children.map(c => {
      const childActive = window.location.search.includes((c.href.split("?")[1] || "~none~"));
      return `<a href="${c.href}" class="${childActive ? "active" : ""}">${c.label}</a>`;
    }).join("");
    return `
      <div>
        <button type="button" class="nav-btn ${isActive ? "active" : ""}" data-toggle="${item.key}">
          ${croIcon(item.icon)}<span class="label">${item.label}</span>
          <i class="pi pi-angle-down label" style="margin-left:auto;font-size:.7rem;"></i>
        </button>
        <div class="submenu ${isActive || openNow ? "open" : ""}" id="submenu-${item.key}">${sub}</div>
      </div>`;
  }
  return `<a href="${item.href}" class="nav-btn ${isActive ? "active" : ""}" style="text-decoration:none;">
      ${croIcon(item.icon)}<span class="label">${item.label}</span>
    </a>`;
}

function croBuildShell(opts) {
  const { page, crumb, title } = opts;
  window.CRO_PAGE = page + ".html";

  const savedTheme = localStorage.getItem("cro-demo-theme");
  if (savedTheme) document.documentElement.setAttribute("data-theme", savedTheme);
  const sidebarExpanded = localStorage.getItem("cro-demo-sidebar") !== "collapsed";

  document.body.insertAdjacentHTML("afterbegin", `
    <div class="demo-banner">
      <span class="dot"></span>
      <span><strong>Static Demo</strong> — Cyber Range Orchestrator. No backend, no live data; every screen is a mock. </span>
      <a class="gh-link" href="README.html">About this demo →</a>
    </div>
    <div class="app-shell">
      <aside class="sidebar ${sidebarExpanded ? "expanded" : ""}" id="cro-sidebar">
        <button class="sidebar-toggle" id="sidebar-toggle" title="Expand / collapse" aria-label="Expand or collapse sidebar">
          <i class="pi ${sidebarExpanded ? "pi-angle-left" : "pi-angle-right"}"></i>
        </button>
        <div>
          <a href="home.html" class="brand" aria-label="Home">
            <img src="assets/img/logo-mark.svg" alt="CRO logo" />
          </a>
          <nav class="nav-group">
            ${CRO_NAV.map(i => croRenderNavItem(i, page)).join("")}
          </nav>
        </div>
        <div class="bottom-group">
          ${CRO_BOTTOM_NAV.map(i => croRenderNavItem(i, page)).join("")}
        </div>
      </aside>
      <div class="main">
        <div class="topbar">
          <div class="crumb">${crumb || ""}</div>
          <div class="flex gap-2" style="align-items:center;">
            <button class="theme-toggle" id="theme-toggle" title="Toggle theme" aria-label="Toggle light and dark theme">
              <i class="pi pi-moon"></i>
            </button>
            <div class="user-chip">
              <div class="avatar">JD</div>
              <span>jane.doe</span>
            </div>
          </div>
        </div>
        <div class="page" id="cro-page-content"></div>
      </div>
    </div>
  `);

  document.querySelectorAll("[data-toggle]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = "submenu-" + btn.getAttribute("data-toggle");
      document.getElementById(id)?.classList.toggle("open");
    });
  });

  document.getElementById("sidebar-toggle")?.addEventListener("click", () => {
    const sb = document.getElementById("cro-sidebar");
    const nowExpanded = sb.classList.toggle("expanded");
    localStorage.setItem("cro-demo-sidebar", nowExpanded ? "expanded" : "collapsed");
    document.getElementById("sidebar-toggle").innerHTML =
      `<i class="pi ${nowExpanded ? "pi-angle-left" : "pi-angle-right"}"></i>`;
  });

  const themeBtn = document.getElementById("theme-toggle");
  const applyThemeIcon = () => {
    const t = document.documentElement.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    themeBtn.innerHTML = `<i class="pi ${t === "dark" ? "pi-sun" : "pi-moon"}"></i>`;
  };
  applyThemeIcon();
  themeBtn?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("cro-demo-theme", next);
    applyThemeIcon();
  });

  if (title) {
    document.title = `${title} · Cyber Range Orchestrator (Static Demo)`;
  }
}

function croToast(message, icon) {
  let host = document.getElementById("cro-toast-host");
  if (!host) {
    host = document.createElement("div");
    host.id = "cro-toast-host";
    host.style.cssText = "position:fixed;bottom:1.2rem;left:50%;transform:translateX(-50%);z-index:500;display:flex;flex-direction:column;gap:.4rem;align-items:center;";
    document.body.appendChild(host);
  }
  const t = document.createElement("div");
  t.style.cssText = "background:var(--surface-800,#1a1b1c);color:#fff;padding:.55rem 1rem;border-radius:999px;font-size:.78rem;box-shadow:0 8px 24px rgba(0,0,0,.25);display:flex;align-items:center;gap:.5rem;opacity:0;transition:opacity .15s, transform .15s;transform:translateY(6px);";
  t.innerHTML = `${icon ? `<i class="pi ${icon}"></i>` : ""}<span>${message}</span>`;
  host.appendChild(t);
  requestAnimationFrame(() => { t.style.opacity = "1"; t.style.transform = "translateY(0)"; });
  setTimeout(() => {
    t.style.opacity = "0";
    t.style.transform = "translateY(6px)";
    setTimeout(() => t.remove(), 200);
  }, 1800);
}
window.croToast = croToast;

function croWireDemoToasts(root) {
  (root || document).querySelectorAll("[data-demo-toast]").forEach(el => {
    if (el.dataset.wired) return;
    el.dataset.wired = "1";
    el.addEventListener("click", (e) => {
      e.preventDefault();
      croToast(el.getAttribute("data-demo-toast"), el.getAttribute("data-demo-icon") || "pi-info-circle");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.CRO_PAGE_CONFIG) {
    croBuildShell(window.CRO_PAGE_CONFIG);
    const tpl = document.getElementById("cro-page-template");
    if (tpl) {
      document.getElementById("cro-page-content").innerHTML = tpl.innerHTML;
    }
    if (window.croAfterMount) window.croAfterMount();
    croWireDemoToasts(document);
  }
});
