'use strict';
const data = window.portfolio;
for (const [id, value] of [['hero-title',data.heroTitle],['hero-subtitle',data.heroSubtitle],['profile-name',data.name],['profile-role',data.role],['profile-greeting',data.greeting]]) {
 const node=document.getElementById(id); if(node && value) node.textContent=value;
}
const total=document.getElementById('project-total'); if(total) total.textContent='01 \u2014 '+String(data.projects.length).padStart(2,'0');
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function safeLink(value) {
  if (!value || /[\\]/.test(value)) return '';
  try { const url = new URL(value, location.href); return ['https:', 'http:', 'file:'].includes(url.protocol) && (!value.includes(':') || url.protocol === 'https:') ? url.href : ''; } catch { return ''; }
}
function projectLogo(p, hero = false) {
 const src = safeLink(p.logo);
 return src ? '<img class="project-logo' + (hero ? ' project-logo-hero' : '') + '" src="' + escapeHTML(src) + '" alt="' + escapeHTML(p.name) + ' logo" width="96" height="96" decoding="async">' : '';
}
function projectHelp(p) {
 if (!p.faq?.length) return '';
 return '<section class="project-help" aria-labelledby="faq-title"><h2 id="faq-title">Help &amp; FAQ</h2>' + p.faq.map(f => '<details><summary>' + escapeHTML(f.question) + '</summary><p>' + escapeHTML(f.answer) + '</p></details>').join('') + '<nav class="support-links" aria-label="Project support">' + (p.supportLinks || []).map(link => { const href=safeLink(link.url); return href ? '<a href="' + escapeHTML(href) + '" rel="noopener noreferrer">' + escapeHTML(link.label) + '</a>' : ''; }).join('') + '</nav></section>';
}
const cut = '<div class="perforation-divider" aria-hidden="true"><div class="notch left-notch"></div><div class="perf-line"></div><div class="notch right-notch"></div></div>';
const barcode = code => '<div class="barcode"><div class="bars" aria-hidden="true"></div><span class="barcode-number">' + escapeHTML(code) + '</span></div>';
const org = safeLink(data.organizationUrl);
if (org) document.querySelectorAll('.organization-link').forEach(a => { a.href = org; a.hidden = false; a.rel = 'noopener noreferrer'; });
for (const [selector, value] of [['.personal-github-link', data.githubUrl], ['.linkedin-link', data.linkedinUrl]]) {
  const href = safeLink(value);
  if (href) document.querySelectorAll(selector).forEach(a => { a.href = href; a.hidden = false; a.rel = 'noopener noreferrer'; });
}
const bio = document.getElementById('profile-bio');
if (bio) { bio.textContent = data.bio; if (!data.bio) { bio.classList.add('blank-lines'); bio.setAttribute('aria-label', 'Biography not yet added'); } }
const grid = document.getElementById('project-grid');
if (grid) grid.innerHTML = data.projects.map((p, i) => {
  const number = String(i + 1).padStart(2, '0');
  return '<a class="ticket project-card" href="project.html?id=' + encodeURIComponent(p.id) + '"><div class="ticket-head"><span>PROJECT / ' + number + '</span><span>ANDROID</span></div><div class="ticket-body">' + projectLogo(p) + '<p class="eyebrow">' + escapeHTML(p.category || 'PROJECT ' + number) + '</p><h3>' + escapeHTML(p.name || 'Project ' + number) + '</h3><p class="card-description ' + (!p.summary ? 'blank-lines' : '') + '">' + escapeHTML(p.summary) + '</p></div>' + cut + '<div class="ticket-stub">' + barcode('HMG / ' + number) + '<span class="card-open">View project &rarr;</span><span class="download-count" data-count="' + escapeHTML(p.id) + '"></span></div></a>';
}).join('');
const content = document.getElementById('project-content');
if (content) {
  const p = data.projects.find(p => p.id === new URLSearchParams(location.search).get('id'));
  if (!p) { document.title = 'Project not found | HMG'; content.innerHTML = '<h1 class="about-main-title">Project not found</h1><p>Return to all projects to choose an app.</p>'; }
  else {
    const name = p.name || 'Project 02'; document.title = name + ' | HMG';
    document.querySelector('meta[name="description"]')?.setAttribute('content', p.description || p.summary || name);
    if (p.logo) { const icon=document.createElement('link'); icon.rel='icon'; icon.href=safeLink(p.logo); document.head.appendChild(icon); }
    const apk = safeLink(p.apk); const repo = safeLink(p.repository); const website = safeLink(p.website);
    const preview = p.preview === 'journey' ? '<div class="journey-preview"><p class="eyebrow">PROGRESSIVE ALERTS / BUS &amp; CAR</p><ol class="journey-stages"><li><strong>5 km</strong><span>Heads-up</span></li><li><strong>2 km</strong><span>Proximity</span></li><li><strong>1 km</strong><span>Voice</span></li><li><strong>0.5 km</strong><span>Wake-up</span></li></ol><p class="journey-note">Straight-line distance estimates, not remaining road distance.</p></div>' : p.preview === 'otp' ? '<div class="otp-kiosk-display"><div class="kiosk-screen-header"><span>PRINT RELEASE OTP</span><span>PREVIEW</span></div><div class="otp-digits" aria-label="Example code: 841905"><span>8</span><span>4</span><span>1</span><span>9</span><span>0</span><span>5</span></div></div>' : '';
    const meta = [p.buildNote, p.version && 'Version ' + p.version, p.size, p.android && 'Android ' + p.android].filter(Boolean).map(escapeHTML).join(' &middot; ');
    content.innerHTML = '<section class="ticket-hero-section"><div class="ticket-container"><article class="ticket"><div class="ticket-head"><span>' + escapeHTML(p.category || name) + '</span><span>ANDROID APP</span></div><div class="ticket-body">' + projectLogo(p, true) + '<h1 class="ticket-title">' + escapeHTML(p.headline || name) + '</h1><p class="ticket-desc ' + (!p.description ? 'blank-lines' : '') + '">' + escapeHTML(p.description) + '</p>' + preview + '<div class="ticket-actions">' + (apk ? '<a data-download="' + escapeHTML(p.id) + '" class="ticket-btn-primary" href="' + escapeHTML(apk) + '" download><span class="btn-text"><strong>DOWNLOAD APK</strong><small>' + meta + '</small></span></a>' : '<button class="ticket-btn-primary" disabled>APK not available yet</button>') + '</div><p class="download-count" data-count="' + escapeHTML(p.id) + '"></p></div>' + cut + '<div class="ticket-stub">' + barcode(p.id.toUpperCase()) + '<span class="stub-meta">' + escapeHTML(name) + '</span></div></article></div></section>' + (p.features.length ? '<section class="workflow-section" aria-label="How it works"><div class="pipeline-grid">' + p.features.map((f, i) => '<div class="pipe-card"><div class="pipe-index">0' + (i + 1) + '</div><h2>' + escapeHTML(f.title) + '</h2><p>' + escapeHTML(f.text) + '</p></div>').join('') + '</div></section>' : '') + (repo ? '<p class="repository-row"><a class="nav-text-link" href="' + escapeHTML(repo) + '" rel="noopener noreferrer">View on GitHub &nearr;</a></p>' : '') + (website ? '<p class="repository-row"><a class="nav-download-btn" href="' + escapeHTML(website) + '" rel="noopener noreferrer">Visit launch website &nearr;</a></p>' : '');
    content.insertAdjacentHTML('beforeend', projectHelp(p));
  }
}

// Counts are local click attempts, never represented as completed or global downloads.
const countKey='hmg-download-clicks:'+new URL('.',location.href).pathname;
function readCounts(){try{const counts=JSON.parse(localStorage.getItem(countKey)||'{}');return counts && typeof counts==='object' && !Array.isArray(counts)?counts:{};}catch{return {};}}
function updateCounts(){const counts=readCounts();document.querySelectorAll('[data-count]').forEach(node=>{const n=counts[node.dataset.count];node.textContent=(Number.isSafeInteger(n)&&n>=0?n:0)+' download clicks on this browser';});}
updateCounts();
document.querySelectorAll('[data-download]').forEach(link=>link.addEventListener('click',()=>{const counts=readCounts();const id=link.dataset.download;counts[id]=(Number.isSafeInteger(counts[id])&&counts[id]>=0?counts[id]:0)+1;try{localStorage.setItem(countKey,JSON.stringify(counts));updateCounts();}catch{document.querySelectorAll('[data-count]').forEach(node=>node.textContent='Local count unavailable');}}));
window.addEventListener('storage',event=>{if(event.key===countKey)updateCounts();});
