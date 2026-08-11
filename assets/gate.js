(function(){
  var PASS = "fjqRqGvtukLcpG9T";
  var KEY = "aigenda_gate_ok";
  try {
    if (sessionStorage.getItem(KEY) === "1") return;
  } catch(e) {}

  document.documentElement.style.visibility = "hidden";

  function showGate(){
    document.documentElement.style.visibility = "visible";
    var overlay = document.createElement("div");
    overlay.id = "aigenda-gate-overlay";
    overlay.style.cssText = "position:fixed;inset:0;z-index:2147483647;background:#0A0A0B;color:#F5F5F7;display:flex;align-items:center;justify-content:center;font-family:Inter,system-ui,sans-serif;";
    overlay.innerHTML =
      '<div style="max-width:360px;width:90%;text-align:center;padding:32px;background:#111114;border:1px solid #26262b;border-radius:12px;">' +
        '<h1 style="font-size:20px;margin-bottom:8px;">Aigenda</h1>' +
        '<p style="color:#A1A1A6;font-size:14px;margin-bottom:20px;">This site is currently private. Enter the password to continue.</p>' +
        '<input id="aigenda-gate-input" type="password" placeholder="Password" style="width:100%;padding:10px 12px;border-radius:6px;border:1px solid #333;background:#1a1a1e;color:#F5F5F7;font-size:14px;margin-bottom:12px;box-sizing:border-box;">' +
        '<button id="aigenda-gate-submit" style="width:100%;padding:10px 12px;border-radius:6px;border:none;background:#3B82F6;color:#fff;font-size:14px;font-weight:600;cursor:pointer;">Enter</button>' +
        '<p id="aigenda-gate-error" style="color:#f87171;font-size:13px;margin-top:10px;display:none;">Incorrect password.</p>' +
      '</div>';
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";

    var input = document.getElementById("aigenda-gate-input");
    var btn = document.getElementById("aigenda-gate-submit");
    var err = document.getElementById("aigenda-gate-error");

    function tryUnlock(){
      if (input.value === PASS) {
        try { sessionStorage.setItem(KEY, "1"); } catch(e) {}
        overlay.remove();
        document.body.style.overflow = "";
      } else {
        err.style.display = "block";
        input.value = "";
        input.focus();
      }
    }
    btn.addEventListener("click", tryUnlock);
    input.addEventListener("keydown", function(ev){ if (ev.key === "Enter") tryUnlock(); });
    setTimeout(function(){ input.focus(); }, 50);
  }

  if (document.body) {
    showGate();
  } else {
    document.addEventListener("DOMContentLoaded", showGate);
  }
})();
