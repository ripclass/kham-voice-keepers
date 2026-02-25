const KHAM_REPORT_CSS = `
  @page { size: A4; margin: 16mm; }
  body { font-family: 'Space Grotesk', Arial, sans-serif; color:#111; line-height:1.45; font-size:12px; }
  h1,h2,h3 { font-family:'JetBrains Mono', monospace; text-transform: uppercase; letter-spacing: .06em; margin: 0 0 8px; }
  h1 { font-size: 20px; }
  h2 { font-size: 13px; margin-top: 14px; }
  h3 { font-size: 11px; margin-top: 10px; }
  .meta { font-family:'JetBrains Mono', monospace; font-size: 10px; color:#444; border:1px dashed #999; padding:8px; margin-bottom:10px; }
  .section { border:1px solid #d8d8d8; padding:10px; margin:8px 0; }
  .mono { font-family:'JetBrains Mono', monospace; }
  .small { font-size:10px; color:#555; }
  table { width:100%; border-collapse: collapse; margin-top:6px; }
  th, td { border:1px solid #ccc; padding:6px; text-align:left; vertical-align:top; }
  th { background:#f2f2f2; font-family:'JetBrains Mono', monospace; font-size:10px; text-transform:uppercase; }
  ul, ol { margin: 6px 0 0 18px; }
  .footer { margin-top:14px; border-top:1px dashed #888; padding-top:8px; font-family:'JetBrains Mono', monospace; font-size:10px; color:#555; display:flex; justify-content:space-between; }
`;

function buildHtmlDocument(title: string, bodyHtml: string) {
  return `<!doctype html><html><head><meta charset="utf-8"/><title>${title}</title><style>${KHAM_REPORT_CSS}</style></head><body>${bodyHtml}</body></html>`;
}

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function openPrintPreview(title: string, bodyHtml: string) {
  const html = buildHtmlDocument(title, bodyHtml);
  const win = window.open("", "_blank", "noopener,noreferrer,width=1024,height=768");
  if (!win) return;
  win.document.open();
  win.document.write(html);
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 250);
}

export function downloadDoc(title: string, fileName: string, bodyHtml: string) {
  const html = buildHtmlDocument(title, bodyHtml);
  const blob = new Blob([html], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function downloadTxt(fileName: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
