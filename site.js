
(() => {
  const root = document.body.dataset.root || './';
  try { const theme = localStorage.getItem('obsblog-theme'); if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme; } catch {}
  document.getElementById('theme').addEventListener('click', () => {
    const dark = document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = dark ? 'light' : 'dark'; document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('obsblog-theme', theme); } catch {}
  });
  const input = document.getElementById('search'), results = document.getElementById('search-results'), status = document.getElementById('search-status');
  input.addEventListener('input', () => {
    const query = input.value.normalize('NFC').toLocaleLowerCase().trim(); results.replaceChildren(); status.textContent = '';
    if (!query) return;
    const words = query.split(/\s+/);
    const matches = (window.OBSBLOG_SEARCH || []).filter(item => {
      const text = [item.title, item.text, ...item.tags].join(' ').normalize('NFC').toLocaleLowerCase(); return words.every(word => text.includes(word));
    });
    status.textContent = matches.length + '개 결과' + (matches.length > 40 ? ' (처음 40개 표시)' : '');
    for (const item of matches.slice(0, 40)) { const li = document.createElement('li'), a = document.createElement('a'); a.href = root + item.url; a.textContent = item.title; li.append(a); results.append(li); }
  });
  if (document.querySelector('.mermaid')) {
    import('https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.esm.min.mjs').then(({ default: mermaid }) => {
      mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'neutral' }); return mermaid.run({ querySelector: '.mermaid' });
    }).catch(() => { /* Offline: preserve the readable diagram source. */ });
  }
})();
