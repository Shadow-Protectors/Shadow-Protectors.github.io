# HMG project portfolio

HTML, CSS and JavaScript only. Open index.html to preview; no build required.

## Content and APK updates
Edit page/projects.js manually. It contains profile text, project details, repository links, launch website links, and APK paths. Keep project IDs stable because URLs and browser click counts use them.

Copy replacement APKs into downloads/, then update the project's apk, version, size and buildNote fields. Prefer a new filename per version to avoid stale browser caches. All paths are relative, so the site supports GitHub Pages repository subpaths.

Included files:
- WayPoint: downloads/WayPoint-1.1.0-debug.apk (rebuilt debug preview with updated branding).
- VulnSpace: downloads/VulnSpace-v1.0.apk.
- Achuppori: downloads/Achuppori.apk (copied from D:/Autonomous-Printer/downloads/autonomous-printer.apk).

Achuppori links to https://achuppori.vercel.app/ as its separate launch website. No admin page or credentials are included.

## Download counts
The visible counts measure download-link clicks in the current browser using localStorage. They are not completed downloads, unique users, or shared totals. Clearing browser data resets them; different devices have separate counts. A static GitHub Pages website cannot maintain a shared mutable counter without an external API/service. Downloads work even if storage is blocked.

## GitHub Pages hosting plan
1. Create a public repository under Shadow-Protectors, for example product-launch. For an organization homepage instead, use shadow-protectors.github.io (only if that repository is not already used).
2. Publish index.html, about.html, project.html, .nojekyll, page/, assets/, and downloads/ to the main branch. Include .gitignore. Do not include local backup folders. Use GitHub Desktop or Git; browser uploads have a smaller per-file limit.
3. In repository Settings > Pages, choose Deploy from a branch, main, /(root), then Save.
4. Wait for the Pages deployment to finish. A product-launch repository will use https://shadow-protectors.github.io/product-launch/. An organization homepage uses https://shadow-protectors.github.io/.
5. Verify all three cards, APK downloads, About links and the printer launch link on the published site.
6. For updates, edit page/projects.js and replace/add APKs locally, review the changed files, then commit and push them. Pages republishes the branch. Nothing has been committed, pushed or deployed by this task.

GitHub blocks Git files over 100 MiB. Published Pages sites are limited to 1 GB and have a soft bandwidth limit of 100 GB/month. These APKs currently total about 52 MiB. Frequent APK replacements grow repository history; use Releases or external storage later if distribution outgrows Pages. Git LFS is not a direct-download solution for Pages.

Official references:
- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits
- https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github

Project descriptions: https://github.com/Shadow-Protectors/WayPoint and https://github.com/Shadow-Protectors/VulnSpace. Printer content was retained from the original local website.

## WayPoint branding update
The supplied logo is in assets/waypoint/logo.png and appears on the project card, detail page and favicon. The project page includes version 1.1.0, offline and permission FAQs, and GitHub bug/feature links. The download remains a debug preview; replace it with an owner-signed production build before launch. See D:/WayPoint/LAUNCH_CHECKLIST.md for outstanding release work.
