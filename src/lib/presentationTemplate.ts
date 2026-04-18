// Builds a self-contained HTML file for the "Noir Gallery" listing presentation.
// Output is deployment-ready for GitHub Pages, Netlify, or any static host.

export interface PresentationData {
  title: string;
  price: string;
  location: string;
  heroImage: string;
  gallery: string[];
  description: string;
  sellingPoints: string[];
  agentName: string;
  agentTagline: string;
  agentLogoUrl: string;
  whatsappNumber: string; // digits only, with country code
  whatsappMessage: string;
  accentColor: string; // hex
}

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export function buildPresentationHTML(d: PresentationData): string {
  const waLink = `https://wa.me/${encodeURIComponent(d.whatsappNumber.replace(/\D/g, ""))}?text=${encodeURIComponent(
    d.whatsappMessage || `Hi ${d.agentName}, I'd like to book a private viewing for ${d.title}.`
  )}`;

  const galleryHtml = d.gallery
    .filter(Boolean)
    .map(
      (src, i) => `
      <figure class="gallery-item reveal" style="--delay:${i * 80}ms">
        <img src="${escapeHtml(src)}" alt="${escapeHtml(d.title)} — view ${i + 1}" loading="lazy" />
      </figure>`
    )
    .join("");

  const pointsHtml = d.sellingPoints
    .filter(Boolean)
    .map(
      (p, i) => `
      <li class="reveal" style="--delay:${i * 60}ms">
        <span class="bullet">✦</span>
        <span>${escapeHtml(p)}</span>
      </li>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${escapeHtml(d.title)} — Private Viewing</title>
<meta name="description" content="${escapeHtml(d.description.slice(0, 150))}" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Karla:wght@300;400;500;600&display=swap" rel="stylesheet" />
<style>
  :root {
    --bg: #0a0a0a;
    --surface: #141414;
    --surface-2: #1a1a1a;
    --text: #f5f3ee;
    --text-muted: #9a948a;
    --accent: ${escapeHtml(d.accentColor)};
    --accent-soft: ${escapeHtml(d.accentColor)}22;
    --border: #262626;
    --serif: 'Cormorant Garamond', Georgia, serif;
    --sans: 'Karla', -apple-system, system-ui, sans-serif;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: var(--bg); color: var(--text);
    font-family: var(--sans); line-height: 1.6;
    -webkit-font-smoothing: antialiased; overflow-x: hidden;
  }
  img { max-width: 100%; display: block; }
  .container { max-width: 1280px; margin: 0 auto; padding: 0 32px; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 50;
    padding: 20px 32px; display: flex; justify-content: space-between; align-items: center;
    backdrop-filter: blur(12px); background: rgba(10,10,10,0.6);
    border-bottom: 1px solid transparent; transition: border-color .3s;
  }
  .nav.scrolled { border-bottom-color: var(--border); }
  .nav-brand { display: flex; align-items: center; gap: 12px; }
  .nav-brand img { height: 32px; width: auto; }
  .nav-brand .name { font-family: var(--serif); font-size: 20px; letter-spacing: .02em; }
  .nav-cta {
    font-size: 13px; letter-spacing: .15em; text-transform: uppercase;
    color: var(--accent); text-decoration: none; padding: 10px 18px;
    border: 1px solid var(--accent); border-radius: 2px; transition: all .3s;
  }
  .nav-cta:hover { background: var(--accent); color: var(--bg); }

  /* HERO */
  .hero {
    min-height: 100vh; position: relative; display: flex; align-items: flex-end;
    padding: 120px 32px 80px;
    background-image: linear-gradient(180deg, rgba(10,10,10,.2) 0%, rgba(10,10,10,.4) 50%, rgba(10,10,10,.95) 100%), url('${escapeHtml(d.heroImage)}');
    background-size: cover; background-position: center;
  }
  .hero-content { max-width: 1280px; margin: 0 auto; width: 100%; }
  .eyebrow {
    font-size: 11px; letter-spacing: .35em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 24px;
  }
  .hero h1 {
    font-family: var(--serif); font-weight: 400; font-size: clamp(48px, 8vw, 96px);
    line-height: 1; letter-spacing: -.02em; margin-bottom: 24px;
  }
  .hero-meta { display: flex; flex-wrap: wrap; gap: 32px; align-items: baseline; }
  .hero-price { font-family: var(--serif); font-size: clamp(32px, 4vw, 48px); color: var(--accent); }
  .hero-location { font-size: 14px; letter-spacing: .15em; text-transform: uppercase; color: var(--text-muted); }

  /* SECTIONS */
  section { padding: 120px 0; }
  .section-eyebrow {
    font-size: 11px; letter-spacing: .35em; text-transform: uppercase;
    color: var(--accent); margin-bottom: 24px;
  }
  .section-title {
    font-family: var(--serif); font-weight: 400; font-size: clamp(36px, 5vw, 56px);
    line-height: 1.1; letter-spacing: -.01em; max-width: 720px; margin-bottom: 48px;
  }

  /* DESCRIPTION */
  .description-grid { display: grid; grid-template-columns: 1fr; gap: 48px; }
  @media(min-width: 900px) { .description-grid { grid-template-columns: 1fr 1.2fr; gap: 96px; } }
  .description-text { font-size: 18px; line-height: 1.8; color: var(--text-muted); }
  .description-text p + p { margin-top: 20px; }

  /* HIGHLIGHTS */
  .highlights { background: var(--surface); }
  .highlight-list { list-style: none; display: grid; gap: 20px; }
  @media(min-width: 700px) { .highlight-list { grid-template-columns: 1fr 1fr; gap: 24px 48px; } }
  .highlight-list li {
    display: flex; gap: 16px; padding: 24px 0;
    border-bottom: 1px solid var(--border); font-size: 17px;
  }
  .highlight-list .bullet { color: var(--accent); font-size: 14px; line-height: 1.7; }

  /* GALLERY */
  .gallery { display: grid; grid-template-columns: 1fr; gap: 16px; }
  @media(min-width: 700px) { .gallery { grid-template-columns: 1fr 1fr; gap: 24px; } }
  @media(min-width: 1100px) { .gallery { grid-template-columns: repeat(3, 1fr); } }
  .gallery-item { overflow: hidden; aspect-ratio: 4/5; background: var(--surface); }
  .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 1.2s ease; }
  .gallery-item:hover img { transform: scale(1.05); }

  /* CTA */
  .cta {
    background: var(--surface); text-align: center; position: relative; overflow: hidden;
  }
  .cta::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at top, var(--accent-soft), transparent 60%);
    pointer-events: none;
  }
  .cta-content { position: relative; max-width: 640px; margin: 0 auto; }
  .cta h2 { font-family: var(--serif); font-weight: 400; font-size: clamp(40px, 5vw, 64px); line-height: 1.1; margin-bottom: 24px; }
  .cta p { color: var(--text-muted); font-size: 18px; margin-bottom: 40px; }
  .btn-primary {
    display: inline-flex; align-items: center; gap: 12px;
    padding: 20px 40px; background: var(--accent); color: var(--bg);
    font-family: var(--sans); font-weight: 500; font-size: 14px;
    letter-spacing: .2em; text-transform: uppercase; text-decoration: none;
    border: none; cursor: pointer; transition: all .3s;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 20px 40px var(--accent-soft); }

  /* AGENT FOOTER */
  footer { padding: 80px 0 40px; border-top: 1px solid var(--border); }
  .agent-card { display: flex; flex-direction: column; gap: 24px; align-items: center; text-align: center; }
  @media(min-width: 700px) { .agent-card { flex-direction: row; justify-content: space-between; text-align: left; } }
  .agent-info { display: flex; align-items: center; gap: 20px; }
  .agent-info img { height: 48px; width: auto; }
  .agent-name { font-family: var(--serif); font-size: 22px; }
  .agent-tagline { font-size: 13px; color: var(--text-muted); letter-spacing: .1em; text-transform: uppercase; }
  .footer-meta { font-size: 12px; color: var(--text-muted); margin-top: 32px; text-align: center; letter-spacing: .1em; }

  /* SCROLL ANIMATIONS */
  .reveal { opacity: 0; transform: translateY(40px); transition: opacity .9s ease, transform .9s ease; transition-delay: var(--delay, 0ms); }
  .reveal.in { opacity: 1; transform: translateY(0); }

  /* FLOATING WHATSAPP */
  .float-wa {
    position: fixed; bottom: 24px; right: 24px; z-index: 60;
    width: 56px; height: 56px; border-radius: 50%;
    background: var(--accent); color: var(--bg);
    display: flex; align-items: center; justify-content: center;
    text-decoration: none; box-shadow: 0 10px 30px rgba(0,0,0,.5);
    transition: transform .3s;
  }
  .float-wa:hover { transform: scale(1.08); }
</style>
</head>
<body>

<nav class="nav" id="nav">
  <div class="nav-brand">
    ${d.agentLogoUrl ? `<img src="${escapeHtml(d.agentLogoUrl)}" alt="${escapeHtml(d.agentName)}" />` : ""}
    <span class="name">${escapeHtml(d.agentName)}</span>
  </div>
  <a href="${waLink}" target="_blank" rel="noopener" class="nav-cta">Book Viewing</a>
</nav>

<header class="hero">
  <div class="hero-content reveal">
    <div class="eyebrow">Private Listing</div>
    <h1>${escapeHtml(d.title)}</h1>
    <div class="hero-meta">
      <span class="hero-price">${escapeHtml(d.price)}</span>
      <span class="hero-location">${escapeHtml(d.location)}</span>
    </div>
  </div>
</header>

<section>
  <div class="container">
    <div class="description-grid">
      <div class="reveal">
        <div class="section-eyebrow">The Residence</div>
        <h2 class="section-title">A rare opportunity, thoughtfully designed.</h2>
      </div>
      <div class="description-text reveal" style="--delay:120ms">
        ${d.description.split("\n").filter(Boolean).map(p => `<p>${escapeHtml(p)}</p>`).join("")}
      </div>
    </div>
  </div>
</section>

${pointsHtml ? `
<section class="highlights">
  <div class="container">
    <div class="reveal">
      <div class="section-eyebrow">Distinctive Features</div>
      <h2 class="section-title">Crafted in every detail.</h2>
    </div>
    <ul class="highlight-list">${pointsHtml}</ul>
  </div>
</section>` : ""}

${galleryHtml ? `
<section>
  <div class="container">
    <div class="reveal">
      <div class="section-eyebrow">Gallery</div>
      <h2 class="section-title">Step inside.</h2>
    </div>
    <div class="gallery">${galleryHtml}</div>
  </div>
</section>` : ""}

<section class="cta">
  <div class="container">
    <div class="cta-content reveal">
      <div class="section-eyebrow">By Appointment</div>
      <h2>Schedule a private viewing.</h2>
      <p>Serious enquiries only. Reach out directly via WhatsApp to arrange a tour at your convenience.</p>
      <a href="${waLink}" target="_blank" rel="noopener" class="btn-primary">
        Book a Private Viewing →
      </a>
    </div>
  </div>
</section>

<footer>
  <div class="container">
    <div class="agent-card">
      <div class="agent-info">
        ${d.agentLogoUrl ? `<img src="${escapeHtml(d.agentLogoUrl)}" alt="" />` : ""}
        <div>
          <div class="agent-name">${escapeHtml(d.agentName)}</div>
          <div class="agent-tagline">${escapeHtml(d.agentTagline)}</div>
        </div>
      </div>
      <a href="${waLink}" target="_blank" rel="noopener" class="nav-cta">Contact on WhatsApp</a>
    </div>
    <div class="footer-meta">© ${new Date().getFullYear()} ${escapeHtml(d.agentName)} — All rights reserved</div>
  </div>
</footer>

<a href="${waLink}" target="_blank" rel="noopener" class="float-wa" aria-label="WhatsApp">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.4-1.5-.9-.8-1.5-1.8-1.6-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2.1-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1.1 2.8 1.2 3 .2.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3M12 2C6.5 2 2 6.5 2 12c0 1.7.5 3.4 1.3 4.8L2 22l5.3-1.4c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2"/></svg>
</a>

<script>
  // Nav scroll state
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
</script>
</body>
</html>`;
}
