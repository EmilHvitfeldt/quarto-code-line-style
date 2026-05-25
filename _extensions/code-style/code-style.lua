-- code-style filter: inject the JS payload and stylesheet into the document.
-- Users opt in via `filters: [code-style]` on any HTML-family format.

function Meta(meta)
  if not quarto.doc.is_format("html:js") then
    return meta
  end
  quarto.doc.include_file("after-body", "code-style.html")
  quarto.doc.add_html_dependency({
    name = "code-style",
    version = "0.1.0",
    stylesheets = { "code-style.css" }
  })
  return meta
end
