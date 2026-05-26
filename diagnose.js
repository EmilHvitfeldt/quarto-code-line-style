(function () {
  const blocks = document.querySelectorAll("div.sourceCode[data-code-style] pre > code");
  if (!blocks.length) return console.log("no code-style blocks on this slide");
  const codeEl = blocks[0];
  const lines = [...codeEl.querySelectorAll(":scope > span[id]")];
  const styled = lines.filter(l => [...l.classList].some(c => c.startsWith("cs-") && c !== "cs-presence-enter"));
  const target = styled[0] || lines[0];
  const prev = target.previousElementSibling;
  const next = target.nextElementSibling;

  const interesting = [
    "display","position","width","height","line-height","font-size",
    "margin-top","margin-bottom","padding-top","padding-bottom",
    "max-height","overflow","background-color","border-top","border-bottom",
    "vertical-align"
  ];
  function pick(el) {
    if (!el) return null;
    const cs = getComputedStyle(el);
    const o = { tag: el.tagName, classes: el.className, rect: el.getBoundingClientRect() };
    interesting.forEach(p => o[p] = cs.getPropertyValue(p));
    return o;
  }

  const between = [];
  let n = target.previousSibling;
  if (n && n.nodeType === Node.TEXT_NODE) between.push({pos: "before", text: JSON.stringify(n.nodeValue)});
  n = target.nextSibling;
  if (n && n.nodeType === Node.TEXT_NODE) between.push({pos: "after", text: JSON.stringify(n.nodeValue)});

  console.log("=== code element ===", pick(codeEl));
  console.log("=== prev (unstyled) ===", pick(prev));
  console.log("=== target (styled) ===", pick(target));
  console.log("=== next ===", pick(next));
  console.log("=== sibling text nodes ===", between);
  console.log("=== target classList ===", [...target.classList]);
  console.log("=== styled rects in order ===", styled.map(s => ({id: s.id, rect: s.getBoundingClientRect()})));
})();
