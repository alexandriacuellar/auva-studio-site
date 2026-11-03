// "Send me a message": a short contact form that slides up over the card AR (or any page),
// so people can reach Alexandria without leaving the camera view. Sends through Web3Forms,
// the same service and inbox as the contact forms on auvastudio.com.
const KEY = 'ba9485ce-3d10-468e-943f-00ffc9224cd4';
const CSS = `
.mf { position: fixed; inset: 0; z-index: 30; display: grid; align-items: end; justify-items: center; background: rgba(5, 10, 35, 0.55); font-family: 'DM Sans', Arial, sans-serif; }
.mf[hidden], .mf [hidden] { display: none !important; }
.mf-sheet { width: min(480px, 100%); max-height: 92vh; overflow: auto; background: #fff; color: #12235e; border-radius: 24px 24px 0 0;
  padding: 22px 20px max(22px, env(safe-area-inset-bottom)); box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.35); animation: mf-up .28s ease-out; }
@media (min-width: 640px) { .mf { align-items: center; } .mf-sheet { border-radius: 24px; } }
@keyframes mf-up { from { transform: translateY(40px); opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .mf-sheet { animation: none; } }
.mf-head { display: flex; align-items: start; justify-content: space-between; gap: 12px; margin-bottom: 14px; }
.mf h2 { font: 300 1.45rem/1.2 'Montserrat', Arial, sans-serif; margin: 0; }
.mf h2 b { font-weight: 600; }
.mf p { margin: 4px 0 0; color: #4a5680; font-size: .95rem; line-height: 1.45; }
.mf-x { flex: 0 0 auto; width: 44px; height: 44px; border-radius: 50%; border: 1px solid #d5dcf0; background: #fff; color: #12235e; cursor: pointer; display: grid; place-items: center; }
.mf form { display: grid; gap: 12px; }
.mf label { display: grid; gap: 6px; font-weight: 600; font-size: .92rem; }
.mf .opt { font-weight: 400; color: #6b769a; }
.mf input, .mf textarea { font: 400 1rem 'DM Sans', Arial, sans-serif; color: #12235e; padding: 12px 14px; border: 1px solid #c9d2ec; border-radius: 12px; background: #f7f9ff; width: 100%; box-sizing: border-box; }
.mf input:focus, .mf textarea:focus { outline: 3px solid #9fb6ff; outline-offset: 1px; border-color: #2c50d6; }
.mf .hp { display: none; }
.mf-send { min-height: 52px; border: 0; border-radius: 999px; background: #f39a3b; color: #0a1440; font: 700 1.02rem 'DM Sans', Arial, sans-serif; cursor: pointer; margin-top: 4px; }
.mf-send:disabled { opacity: .6; }
.mf-status { min-height: 1.2em; font-size: .92rem; color: #12235e; margin: 0; }
.mf-done { text-align: center; padding: 10px 0 4px; }
.mf-done .mf-send { width: 100%; margin-top: 16px; }
`;

let root = null, lastFocus = null;

function build() {
  const style = document.createElement('style'); style.textContent = CSS; document.head.appendChild(style);
  root = document.createElement('div');
  root.className = 'mf'; root.hidden = true;
  root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-labelledby', 'mf-title');
  root.innerHTML = `
    <div class="mf-sheet">
      <div class="mf-head">
        <div class="mf-intro"><h2 id="mf-title">Send me <b>a message</b></h2><p>Tell me what you're working on. I'll reply within 24–48 hours.</p></div>
        <button class="mf-x" type="button" aria-label="Close"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
      </div>
      <form>
        <input type="hidden" name="access_key" value="${KEY}">
        <input type="hidden" name="subject" value="New message from the AR business card">
        <input type="hidden" name="from_name" value="Auva Studio AR card">
        <input type="hidden" name="source" value="">
        <input type="checkbox" name="botcheck" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
        <label>Name<input name="name" autocomplete="name" required></label>
        <label>Email<input type="email" name="email" autocomplete="email" required></label>
        <label><span>Phone <span class="opt">(optional)</span></span><input type="tel" name="phone" autocomplete="tel"></label>
        <label><span>Message <span class="opt">(optional)</span></span><textarea name="message" rows="3"></textarea></label>
        <button class="mf-send" type="submit">Send message</button>
        <p class="mf-status" aria-live="polite"></p>
      </form>
      <div class="mf-done" hidden>
        <h2>Thanks! <b>It's on its way.</b></h2>
        <p>You'll hear back within 24–48 hours.</p>
        <button class="mf-send" type="button" data-close>Back</button>
      </div>
    </div>`;
  document.body.appendChild(root);
  const intro = root.querySelector('.mf-intro'), form = root.querySelector('form'), status = root.querySelector('.mf-status'), done = root.querySelector('.mf-done');
  root.querySelector('.mf-x').addEventListener('click', closeMessageForm);
  root.querySelector('[data-close]').addEventListener('click', closeMessageForm);
  root.addEventListener('click', (e) => { if (e.target === root) closeMessageForm(); });
  root.addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.stopPropagation(); closeMessageForm(); } });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.mf-send'); btn.disabled = true; status.textContent = 'Sending…';
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      form.reset(); status.textContent = '';
      form.hidden = true; intro.hidden = true; done.hidden = false; done.querySelector('[data-close]').focus();
    } catch {
      status.innerHTML = 'Something went wrong. Please email me at <a href="mailto:hello@auvastudio.com">hello@auvastudio.com</a>.';
    } finally { btn.disabled = false; }
  });
}

export function openMessageForm(source = location.pathname) {
  if (!root) build();
  lastFocus = document.activeElement;
  root.querySelector('[name="source"]').value = source;
  root.querySelector('form').hidden = false; root.querySelector('.mf-intro').hidden = false; root.querySelector('.mf-done').hidden = true;
  root.hidden = false;
  root.querySelector('.mf-x').focus({ preventScroll: true }); // not the name field, so the phone keyboard doesn't jump up
}

export function closeMessageForm() {
  if (!root) return;
  root.hidden = true;
  lastFocus?.focus?.();
}
