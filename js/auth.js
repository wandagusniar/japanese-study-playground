// ─────────────────────────────────────────────────────────────
// Google Sign-In via Firebase Authentication
// Uses the Firebase compat SDK loaded in index.html.
// ─────────────────────────────────────────────────────────────

// TODO: replace the apiKey / appId / messagingSenderId / measurementId
// with the real values from your Firebase console:
//   Project settings ▸ General ▸ Your apps ▸ Web app ▸ SDK setup and configuration
const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "japanese-quiz-c8791.firebaseapp.com",
  projectId: "japanese-quiz-c8791",
  storageBucket: "japanese-quiz-c8791.appspot.com",
  messagingSenderId: "REPLACE_WITH_YOUR_SENDER_ID",
  appId: "REPLACE_WITH_YOUR_APP_ID"
};

(function initAuth() {
  if (typeof firebase === "undefined" || !firebase.initializeApp) {
    console.error("[auth] Firebase SDK not loaded — check the <script> tags in index.html");
    return;
  }

  // Initialize (guard against double init during hot reloads)
  if (!firebase.apps || !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  // ── UI refs ──
  const btn     = document.getElementById("google-login-btn");
  const avatar  = document.getElementById("gl-avatar");
  const label   = document.getElementById("gl-label");

  if (!btn) {
    console.error("[auth] #google-login-btn not found in DOM");
    return;
  }

  let currentUser = null;

  function renderSignedOut() {
    currentUser = null;
    if (avatar) { avatar.style.display = "none"; avatar.src = ""; }
    if (label)  { label.textContent = "Sign in"; }
    btn.title = "Sign in with Google";
  }

  function renderSignedIn(user) {
    currentUser = user;
    if (avatar) {
      if (user.photoURL) { avatar.src = user.photoURL; avatar.style.display = "block"; }
      else               { avatar.style.display = "none"; }
    }
    if (label) { label.textContent = user.displayName || user.email || "Account"; }
    btn.title = "Signed in as " + (user.email || user.displayName || "user") + " — click to sign out";
  }

  // React to auth state changes (also fires on page load / after redirect)
  auth.onAuthStateChanged(function (user) {
    if (user) renderSignedIn(user);
    else      renderSignedOut();
    // Expose for other modules that may want to sync progress later.
    window.wandaCurrentUser = user || null;
    document.dispatchEvent(new CustomEvent("wanda-auth-changed", { detail: user || null }));
  });

  async function signIn() {
    try {
      await auth.signInWithPopup(provider);
    } catch (err) {
      // Popups can be blocked (mobile, strict browsers) — fall back to redirect.
      if (err && (err.code === "auth/popup-blocked" || err.code === "auth/operation-not-supported-in-this-environment")) {
        try { await auth.signInWithRedirect(provider); return; } catch (e2) { err = e2; }
      }
      console.error("[auth] sign-in failed:", err);
      alert("Sign-in failed: " + (err && err.message ? err.message : err));
    }
  }

  async function signOut() {
    try { await auth.signOut(); }
    catch (err) { console.error("[auth] sign-out failed:", err); }
  }

  btn.addEventListener("click", function () {
    if (currentUser) signOut();
    else             signIn();
  });

  // Complete any pending redirect sign-in (mobile fallback path).
  auth.getRedirectResult().catch(function (err) {
    if (err && err.code) console.error("[auth] redirect result error:", err);
  });
})();
