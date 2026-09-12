function switchApp(app) {
  document.querySelectorAll('.app-panel').forEach(p => p.classList.remove('visible'));
  document.querySelectorAll('.app-nav-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(app + '-panel').classList.add('visible');
  const navBtn = document.getElementById('nav-' + app);
  if (navBtn) navBtn.classList.add('active');
  window.scrollTo(0, 0);
}
