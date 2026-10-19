# WayPoint launch website

The homepage presents WayPoint. Other project records are retained in page/projects.js with published: false, so they do not appear in listings or render at their old detail URLs. Their APKs are excluded from the current Git tree; local copies remain available. Previously committed copies may still be accessible through Git history.

## GitHub Pages

Repository: Shadow-Protectors/Shadow-Protectors.github.io

In repository Settings > Pages > Build and deployment:
- Source: Deploy from a branch
- Branch: main
- Folder: /(root)
- Save and check the Pages deployment in Actions.

Expected address: https://shadow-protectors.github.io/

This site is plain HTML, CSS and JavaScript. No build command, environment variables, database or API token is required. Keep .nojekyll in the root. Enable Enforce HTTPS when available.

## APK distribution with GitHub Releases

Use the application repository Shadow-Protectors/WayPoint for releases. The website repository only hosts the website.

1. Prepare and test an owner-signed release APK. Keep the signing key private and use the same key for future app updates. The current local download is a debug preview; the generated release APK is unsigned.
2. In WayPoint > Releases > Draft a new release, create a version tag matching the app, for example v1.1.0 if that version has not already been released.
3. Target the tested commit, add a title and release notes, and attach the signed APK as WayPoint.apk. Include a SHA-256 checksum if desired.
4. For testing, use a pre-release and label the website accordingly. Publish as a stable release only when ready.
5. In page/projects.js, set WayPoint's release.tag to the published tag and release.asset to the exact uploaded filename. repository is already Shadow-Protectors/WayPoint.
6. Update version, size, buildNote and the final-release FAQ to match the actual artifact. Update the index.html noscript fallback download URL and status too.
7. Commit/push the website changes and verify the download on the live site.

Example release configuration (only after the matching asset exists):

    "release": {
      "repository": "Shadow-Protectors/WayPoint",
      "tag": "v1.1.0",
      "asset": "WayPoint.apk"
    }

Leave tag empty while using the local debug preview. The website then hides the release counter and keeps the existing local download link.

## Download counts

GitHub automatically tracks download_count for each uploaded release asset. No counting service or GitHub configuration switch is needed. The site reads the exact release/tag asset using GitHub's public REST API, and displays “APK downloads · this version”.

- Counts are shared across visitors, not stored as click totals on each device.
- They are asset downloads, not unique people, installations or active users.
- Counts are cached in the browser session for five minutes.
- If GitHub is unavailable, rate-limited, or the asset does not exist, the count says unavailable; the download link remains usable.
- Public unauthenticated GitHub API requests are limited to 60 per hour per originating IP. No token belongs in frontend JavaScript. At larger traffic volumes, generate a cached count JSON using a scheduled backend/Actions job.
- A new release has its own asset counter. An all-version total would need to sum matching APK assets across every release, with pagination. Do not include ZIP/source assets, checksums, or duplicate APK variants.
- Retain historical release assets to retain their historical counts. Do not delete/re-upload an asset merely to update its binary; publish a new version instead.
- APKs served from this site's downloads folder are not included in GitHub Release counts.

## Launch checks still required

Real-device testing, production signing, current app screenshots, published privacy/terms/license notices, and confirmation of a support contact remain outstanding. No production release or Pages setting was changed by this website code update.

References:
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository
- https://docs.github.com/en/rest/releases/releases
- https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api
