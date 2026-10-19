# Shared app launch website

Public website, releases and issue tracker: Shadow-Protectors/Shadow-Protectors.github.io.
App source repositories may remain private.

## Current WayPoint preview

- Tag: waypoint-v1.1.0-preview.1
- Asset: WayPoint-v1.1.0-debug.apk
- App version: 1.1.0 (build 2); debug preview, not a signed production release.
- Both the homepage and project page link directly to this public release asset.
- The no-JavaScript homepage link uses the same asset.

## Mapping and future apps

Edit page/projects.js. Each project has a stable id, a published flag and its own release object with repository, tag and exact asset filename. Prefix shared release tags with the app name. Never use the repository-wide latest release for individual apps.

Only published projects render. The homepage currently presents WayPoint directly; restore a collection/navigation when introducing another published app. Private source repository links must not be used as public support links.

For each update: publish the new asset, update the project's release mapping, apk fallback URL, version, size and build note. Update the index.html no-JavaScript fallback if the featured app changes. Then commit and push.

## Issue forms

.github/ISSUE_TEMPLATE/waypoint-bug.yml and waypoint-feature.yml apply app:waypoint plus bug or enhancement. These labels must already exist in GitHub. For a new app, add its label and separate forms, then point its supportLinks to those template filenames. Blank issues remain available for general website feedback.

## Counts

The website reads download_count for the exact release asset from GitHub's public REST API. It caches counts in sessionStorage for five minutes. Counts represent downloads of this version, not unique users or installations. API failures display an unavailable message without disabling downloads. No API token is stored in the website.

Old files served from downloads/ do not contribute to release counts. The former WayPoint APK remains locally but is excluded from new commits. Historical Git copies are not removed.

## Hosting

Settings > Pages > Deploy from a branch > main > /(root). Keep .nojekyll. Site: https://shadow-protectors.github.io/.

## Release readiness

Production signing, real-device testing, current screenshots and published legal/support information remain release tasks. The current download is explicitly a debug preview.
