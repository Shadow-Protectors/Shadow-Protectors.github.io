# Hari's Project Launch Hub

A shared home for projects built and maintained by **Hari Muthu Ganesh**, hosted under **Shadow-Protectors**.

Explore published projects, download app releases, read release notes, and report problems through one public website. The hub currently features my projects and is structured to accommodate more as they become ready for launch.

**[Visit the website](https://shadow-protectors.github.io/)** · **[Browse releases](https://github.com/Shadow-Protectors/Shadow-Protectors.github.io/releases)** · **[Report an issue](https://github.com/Shadow-Protectors/Shadow-Protectors.github.io/issues/new/choose)**

## What lives here

| Location | Purpose |
| --- | --- |
| This repository | Public website, project descriptions, release assets, and user feedback |
| Individual project repositories | Source code and development; these can remain private |
| GitHub Pages | Hosts the website |
| GitHub Releases | Distributes versioned APKs and release notes for each app |
| GitHub Issues | Collects feedback, organized by project and issue type |

Publishing an app here does not require publishing its source code. Each app's release notes describe its version, requirements, preview or stable status, and known limitations.

## Available projects

**WayPoint** is currently featured: an Android travel alarm with progressive destination reminders. Its current download is a debug preview for testing and feedback.

Other projects remain unpublished until ready. The website only renders project records with `published: true`. This controls visibility in the interface; it is not a privacy boundary. Files and project descriptions committed to this public repository remain publicly accessible.

## Repository layout

```text
index.html                  Featured project homepage
project.html                Project detail page, selected by ?id=<project-id>
about.html                  About the maker
page/projects.js            Project catalog, release mappings, and profile content
page/portfolio.js           Rendering, visibility filtering, and release counts
page/style.css              Shared visual styles
assets/<project-id>/        Project logos, screenshots, and other website assets
.github/ISSUE_TEMPLATE/     Project-specific bug and feature forms
.nojekyll                   Static Pages hosting marker
```

The website uses plain HTML, CSS, and JavaScript. No application build step or database is required.

## Adding another project

1. Add a record to `page/projects.js` with a unique, permanent `id`. Include its name, description, features, logo, support links, and release information. Keep `published: false` while preparing it.
2. Place its public website assets under `assets/<project-id>/`. Keep unfinished private material outside this repository.
3. Create a release in this repository using a project-prefixed tag and a clearly named APK.
4. Create the project's issue label and forms, then connect its support links.
5. Verify its release asset, content, requirements, and support links before setting `published: true`.
6. When adding the second published project, update the homepage to show the project collection or add navigation to every published project. The current homepage intentionally selects WayPoint directly; setting a flag alone does not add homepage navigation.

Keep IDs stable so existing project URLs continue working. Each project's version and release schedule are independent.

## Release mapping

Each project selects an exact repository, tag, and asset. For example, the current WayPoint preview uses:

```json
{
  "id": "waypoint",
  "published": true,
  "version": "1.1.0",
  "release": {
    "repository": "Shadow-Protectors/Shadow-Protectors.github.io",
    "tag": "waypoint-v1.1.0-preview.1",
    "asset": "WayPoint-v1.1.0-debug.apk"
  }
}
```

This is the release-related portion of a project record; retain its other content fields when editing the catalog.

| Convention | Example |
| --- | --- |
| Project ID | `waypoint` |
| Preview tag | `waypoint-v1.1.0-preview.1` |
| Stable tag | `waypoint-v1.1.0` |
| APK asset | `WayPoint-v1.1.0.apk` |
| App label | `app:waypoint` |

Use exact tags instead of the repository-wide `/releases/latest` URL, which could refer to a different app. The asset filename must match the uploaded filename exactly. APKs belong in Releases; another tracked copy in the website is unnecessary.

## Publishing an app update

1. Build and test the app. Use the appropriate signing key for production updates and increment its Android version code.
2. Publish a new project-prefixed release with the APK, release notes, and accurate preview/stable status. Avoid replacing historical binaries with a different build under the same version.
3. Update the project's `release` mapping, `apk` fallback URL, `version`, `size`, `buildNote`, and any affected FAQ text.
4. Point its `repository` link to a public destination, such as the release page, if the source repository is private.
5. Update the featured app's no-JavaScript download link and status in `index.html` when applicable.
6. Commit and push the website changes. Verify the published page, APK download, and support links while signed out of GitHub.

A successful website deployment does not certify an app for production. Release readiness is assessed per project.

## Shared issue tracking

Users can select a project-specific form from the [issue chooser](https://github.com/Shadow-Protectors/Shadow-Protectors.github.io/issues/new/choose). Each form applies an app label and a type label:

- `app:<project-id>` identifies the app.
- `bug` identifies a defect.
- `enhancement` identifies a feature request.

Create these labels in GitHub before referencing them in a form. Add new forms under `.github/ISSUE_TEMPLATE/`, using names such as `<project-id>-bug.yml` and `<project-id>-feature.yml`. Connect each project's `supportLinks` to its matching forms. Blank issues remain available for general website feedback.

For a larger catalog, use saved label filters and project-prefixed milestones to organize triage and release work. Source-code discussions can remain in private app repositories; public reports stay here. Do not include secrets or personal information in public issues.

## Download counts

The website reads GitHub's `download_count` for the exact mapped APK asset and caches the result in the browser session for five minutes.

- Counts are independent for each app and release asset.
- They measure asset downloads, not unique users, installations, or active users.
- API failures display an unavailable message without disabling the download link.
- APKs served elsewhere do not contribute to this release asset's count.
- No private GitHub token belongs in frontend code.

An all-version total or a centrally cached statistics service would be a future enhancement; neither is currently implemented.

## Hosting and maintenance

GitHub Pages publishes this repository from `main` and `/(root)`. Keep `.nojekyll` in the root and use relative paths for local website assets.

For content changes, review `page/projects.js`. For shared interface changes, review `page/portfolio.js` and `page/style.css`. Before publishing, check visible and hidden project routes, download destinations, issue forms, mobile layout, and the no-JavaScript fallback.

As the catalog grows, keep the shared website and public distribution here while maintaining app source repositories independently. A future catalog index or automated release-mapping workflow can build on the existing project IDs and explicit release mappings.

---

Created and maintained by **[Hari Muthu Ganesh](https://github.com/HariMuthuGanesh)** under **[Shadow-Protectors](https://github.com/Shadow-Protectors)**.
