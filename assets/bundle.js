/* @ds-bundle: {"format":4,"namespace":"PortfolioUX","components":[{"name":"Button"},{"name":"Tag"},{"name":"PanelLabel"},{"name":"Readout"},{"name":"Metric"},{"name":"CaseCard"},{"name":"NavBar"}]} */
(function () {
  var R = window.React, h = R.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }
  function pad(n) { return n == null ? null : (n < 10 ? "0" + n : String(n)); }

  function Button(p) {
    var variant = p.variant || "primary", rest = Object.assign({}, p);
    delete rest.variant; delete rest.arrow; delete rest.className; delete rest.children; delete rest.href;
    var kids = [p.children, p.arrow !== false && variant !== "secondary" ? h("span", { key: "a", className: "pux-btn-arrow", "aria-hidden": true }, "→") : null];
    if (variant === "terminal") kids.unshift(h("span", { key: "p", className: "pux-btn-prompt", "aria-hidden": true }, ">"));
    var props = Object.assign(rest, { className: cx("pux-btn", "pux-btn-" + variant, p.className) });
    if (p.href) { props.href = p.href; return h.apply(null, ["a", props].concat(kids)); }
    if (!props.type) props.type = "button";
    return h.apply(null, ["button", props].concat(kids));
  }

  function Tag(p) {
    return h("span", { className: cx("pux-tag", "pux-tag-" + (p.tone || "neutral")) }, p.children);
  }

  function PanelLabel(p) {
    return h("div", { className: "pux-plabel" },
      p.index != null ? h("span", { className: "pux-plabel-idx" }, "[ " + pad(p.index) + " ]") : h("span", { className: "pux-plabel-idx" }, "//"),
      h("span", { className: "pux-plabel-txt" }, p.children),
      h("span", { className: "pux-plabel-rule", "aria-hidden": true }));
  }

  function Readout(p) {
    var rows = p.rows || [];
    return h("section", { className: "pux-readout", "aria-label": p.title },
      h("header", { className: "pux-readout-bar" },
        h("span", { className: "pux-readout-title" }, p.title),
        p.status ? h("span", { className: "pux-readout-status" }, h("i", { "aria-hidden": true }), p.status) : null),
      h("dl", { className: "pux-readout-rows" }, rows.map(function (r, i) {
        return h("div", { key: i, className: "pux-readout-row" },
          h("dt", null, r.k), h("dd", { className: r.highlight ? "is-signal" : null }, r.v));
      })),
      p.cursor !== false ? h("div", { className: "pux-readout-prompt", "aria-hidden": true }, "$ ", h("span", { className: "pux-cursor" })) : null);
  }

  function Metric(p) {
    return h("div", { className: cx("pux-metric", p.onConsole && "pux-metric-console") },
      h("div", { className: "pux-metric-value" }, p.value),
      h("div", { className: "pux-metric-label" }, p.label),
      p.detail ? h("div", { className: "pux-metric-detail" }, p.detail) : null);
  }

  function CaseCard(p) {
    var shape = p.shape || "square", tone = p.tone || "red", tags = p.tags || [];
    var inner = [
      h("div", { key: "t", className: "pux-case-thumb" },
        p.image ? h("img", { src: p.image, alt: "" }) : h("span", { className: cx("pux-shape", "pux-shape-" + shape, "pux-fill-" + tone) }),
        p.index != null ? h("span", { className: "pux-case-idx" }, "CASE_" + pad(p.index)) : null),
      h("div", { key: "b", className: "pux-case-body" },
        p.meta ? h("div", { className: "pux-case-meta" }, p.meta) : null,
        h("h3", { className: "pux-case-title" }, p.title, h("span", { className: "pux-case-arrow", "aria-hidden": true }, " →")),
        p.summary ? h("p", { className: "pux-case-summary" }, p.summary) : null,
        tags.length ? h("div", { className: "pux-case-tags" }, tags.map(function (t, i) { return h(Tag, { key: i }, t); })) : null)
    ];
    return p.href ? h.apply(null, ["a", { className: "pux-case", href: p.href }].concat(inner))
                  : h.apply(null, ["article", { className: "pux-case" }].concat(inner));
  }

  function NavBar(p) {
    var links = p.links || [];
    var extra = p.extra || p.children;
    return h("nav", { className: "pux-nav", "aria-label": p.navLabel || "Principal" },
      h("a", { className: "pux-nav-name", href: p.homeHref || "#" }, p.brand || p.name),
      h("ul", { className: "pux-nav-links" }, links.map(function (l, i) {
        return h("li", { key: i }, h("a", { href: l.href || "#", "aria-current": l.current ? "page" : null }, l.label));
      })),
      extra ? h("div", { className: "pux-nav-extra" }, extra) : null,
      p.status ? h("span", { className: "pux-nav-status" }, h("i", { "aria-hidden": true }), p.status) : null);
  }

  window.PortfolioUX = Object.assign(window.PortfolioUX || {}, {
    Button: Button, Tag: Tag, PanelLabel: PanelLabel, Readout: Readout, Metric: Metric, CaseCard: CaseCard, NavBar: NavBar
  });
})();
