/*
 * Morrow Plots Assistant -- loaded on every page by Open WebUI (/static/loader.js).
 *
 * Open WebUI remembers the sidebar open/closed state per browser
 * (localStorage.sidebar) and restores it on the next visit. To make every
 * login start with the sidebar collapsed, reset that flag whenever the login
 * page is on screen. After signing in, the app reads the flag when it loads
 * and starts closed; the toggle (or Ctrl+Shift+S) still opens it for that
 * session.
 *
 * Someone who is already signed in and just opens a new tab is left alone.
 */
(function () {
  function collapseSidebarOnLoginPage() {
    if (document.getElementById('auth-page')) {
      try {
        if (localStorage.getItem('sidebar') !== 'false') {
          localStorage.setItem('sidebar', 'false');
        }
      } catch (e) {
        /* storage blocked (private mode, etc.): nothing to do */
      }
    }
  }

  // The login page is rendered client-side, so it can appear after this script
  // runs (e.g. when a signed-out visitor is redirected to /auth). Watch for it.
  collapseSidebarOnLoginPage();
  new MutationObserver(collapseSidebarOnLoginPage).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
