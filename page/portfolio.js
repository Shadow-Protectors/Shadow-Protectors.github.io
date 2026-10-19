'use strict';
const data = window.portfolio;
const publishedProjects = data.projects.filter(project => project.published === true);
for (const [id, value] of [['hero-title',data.heroTitle],['hero-subtitle',data.heroSubtitle],['profile-name',data.name],['profile-role',data.role],['profile-greeting',data.greeting]]) {
 const node=document.getElementById(id); if(node && value) node.textContent=value;
}
const total=document.getElementById('project-total'); if(total) total.textContent='01 \u2014 '+String(publishedProjects.length).padStart(2,'0');
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
if (grid) grid.innerHTML = publishedProjects.map((p, i) => {
  const number = String(i + 1).padStart(2, '0');
  return '<a class="ticket project-card" href="project.html?id=' + encodeURIComponent(p.id) + '"><div class="ticket-head"><span>PROJECT / ' + number + '</span><span>ANDROID</span></div><div class="ticket-body">' + projectLogo(p) + '<p class="eyebrow">' + escapeHTML(p.category || 'PROJECT ' + number) + '</p><h3>' + escapeHTML(p.name || 'Project ' + number) + '</h3><p class="card-description ' + (!p.summary ? 'blank-lines' : '') + '">' + escapeHTML(p.summary) + '</p></div>' + cut + '<div class="ticket-stub">' + barcode('HMG / ' + number) + '<span class="card-open">View project &rarr;</span><span class="download-count" data-count="' + escapeHTML(p.id) + '"></span></div></a>';
}).join('');
const content = document.getElementById('project-content');
if (content) {
  const p = publishedProjects.find(p => p.id === (content.dataset.project || new URLSearchParams(location.search).get('id')));
  if (!p) { document.title = 'Project not found | HMG'; content.innerHTML = '<h1 class="about-main-title">Project not found</h1><p>This project is not available. Visit the WayPoint homepage.</p>'; }
  else {
    const name = p.name; document.title = name + ' ? Destination travel alarm';
    document.querySelector('meta[name="description"]')?.setAttribute('content', p.description || p.summary || name);
    if (p.logo) { const icon=document.createElement('link'); icon.rel='icon'; icon.href=safeLink(p.logo); document.head.appendChild(icon); }
    const apk = safeLink(releaseDownload(p) || p.apk); const repo = safeLink(p.repository); const website = safeLink(p.website);
    const preview = p.preview === 'journey' ? '<div class="journey-preview"><p class="eyebrow">PROGRESSIVE ALERTS / BUS &amp; CAR</p><ol class="journey-stages"><li><strong>5 km</strong><span>Heads-up</span></li><li><strong>2 km</strong><span>Proximity</span></li><li><strong>1 km</strong><span>Voice</span></li><li><strong>0.5 km</strong><span>Wake-up</span></li></ol><p class="journey-note">Straight-line distance estimates, not remaining road distance.</p></div>' : p.preview === 'otp' ? '<div class="otp-kiosk-display"><div class="kiosk-screen-header"><span>PRINT RELEASE OTP</span><span>PREVIEW</span></div><div class="otp-digits" aria-label="Example code: 841905"><span>8</span><span>4</span><span>1</span><span>9</span><span>0</span><span>5</span></div></div>' : '';
    const meta = [p.buildNote, p.version && 'Version ' + p.version, p.size, p.android && 'Android ' + p.android].filter(Boolean).map(escapeHTML).join(' &middot; ');
    content.innerHTML = '<section class="ticket-hero-section"><div class="ticket-container"><article class="ticket"><div class="ticket-head"><span>' + escapeHTML(p.category || name) + '</span><span>ANDROID APP</span></div><div class="ticket-body">' + projectLogo(p, true) + '<h1 class="ticket-title">' + escapeHTML(p.headline || name) + '</h1><p class="ticket-desc ' + (!p.description ? 'blank-lines' : '') + '">' + escapeHTML(p.description) + '</p>' + preview + '<div id="download" class="ticket-actions">' + (apk ? '<a data-download="' + escapeHTML(p.id) + '" class="ticket-btn-primary" href="' + escapeHTML(apk) + '" download><span class="btn-text"><strong>DOWNLOAD APK</strong><small>' + meta + '</small></span></a>' : '<button class="ticket-btn-primary" disabled>APK not available yet</button>') + '</div><p class="download-count" data-count="' + escapeHTML(p.id) + '"></p></div>' + cut + '<div class="ticket-stub">' + barcode(p.id.toUpperCase()) + '<span class="stub-meta">' + escapeHTML(name) + '</span></div></article></div></section>' + (p.features.length ? '<section id="features" class="workflow-section" aria-label="How it works"><div class="pipeline-grid">' + p.features.map((f, i) => '<div class="pipe-card"><div class="pipe-index">0' + (i + 1) + '</div><h2>' + escapeHTML(f.title) + '</h2><p>' + escapeHTML(f.text) + '</p></div>').join('') + '</div></section>' : '') + (repo ? '<p class="repository-row"><a class="nav-text-link" href="' + escapeHTML(repo) + '" rel="noopener noreferrer">View on GitHub &nearr;</a></p>' : '') + (website ? '<p class="repository-row"><a class="nav-download-btn" href="' + escapeHTML(website) + '" rel="noopener noreferrer">Visit launch website &nearr;</a></p>' : '');
    content.insertAdjacentHTML('beforeend', projectHelp(p));
  }
}

// Counts come from the exact GitHub Release asset, not browser clicks.
function validRelease(p) {
 const r=p.release;
 return r && /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(r.repository) && typeof r.tag==='string' && r.tag.length>0 && typeof r.asset==='string' && r.asset.endsWith('.apk');
}
function releaseDownload(p) {
 if(!validRelease(p)) return '';
 const r=p.release;
 return 'https://github.com/'+r.repository+'/releases/download/'+encodeURIComponent(r.tag)+'/'+encodeURIComponent(r.asset);
}
async function showReleaseCount(p) {
 const nodes=[...document.querySelectorAll('[data-count]')].filter(node=>node.dataset.count===p.id);
 if(!nodes.length)return;
 if(!validRelease(p)){nodes.forEach(node=>node.hidden=true);return;}
 const label=text=>nodes.forEach(node=>{node.hidden=false;node.textContent=text;});
 label('Checking downloads?');
 const r=p.release;const key='release-downloads:'+r.repository+':'+r.tag+':'+r.asset;
 const format=count=>new Intl.NumberFormat().format(count)+' APK downloads ? this version';
 try {
  let cached;try{cached=JSON.parse(sessionStorage.getItem(key));}catch{}
  if(cached && Number.isSafeInteger(cached.count) && cached.count>=0 && Date.now()-cached.at>=0 && Date.now()-cached.at<300000){label(format(cached.count));return;}
  const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),8000);
  let response;try{response=await fetch('https://api.github.com/repos/'+r.repository+'/releases/tags/'+encodeURIComponent(r.tag),{headers:{Accept:'application/vnd.github+json'},signal:controller.signal});}finally{clearTimeout(timeout);}
  if(!response.ok)throw new Error('Release unavailable');
  const release=await response.json();
  const asset=release.assets?.find(asset=>asset.name===r.asset && asset.state==='uploaded');
  if(release.draft || !asset || !Number.isSafeInteger(asset.download_count) || asset.download_count<0)throw new Error('Asset unavailable');
  label(format(asset.download_count));
  try{sessionStorage.setItem(key,JSON.stringify({count:asset.download_count,at:Date.now()}));}catch{}
 }catch{label('Download count unavailable');}
}
publishedProjects.forEach(showReleaseCount);
