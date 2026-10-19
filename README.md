# Shadow Protectors Launch Hub

[![Site Status](https://img.shields.io/badge/Status-Live-09090b?style=for-the-badge&logo=githubpages&logoColor=white)](https://shadow-protectors.github.io/)
[![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20Web-09090b?style=for-the-badge&logo=android&logoColor=white)](https://shadow-protectors.github.io/)
[![License](https://img.shields.io/badge/License-MIT-09090b?style=for-the-badge)](LICENSE)

The official distribution hub and software registry for **Shadow Protectors**.

This repository hosts the static frontend for [shadow-protectors.github.io](https://shadow-protectors.github.io/), serving as the unified launchpad for all native Android applications, security utilities, and systems developed by the organization.

---

## Live Deployment

- **Production Portal:** [https://shadow-protectors.github.io/](https://shadow-protectors.github.io/)
- **Organization GitHub:** [https://github.com/Shadow-Protectors](https://github.com/Shadow-Protectors)

---

## Products Catalog

| Product | Domain | Distribution Stage | Target | Source / Artifact |
| :--- | :--- | :--- | :--- | :--- |
| **WayPoint** | Location-Aware Travel Monitor | Preview v1.1.0 | Android 7.0+ | [GitHub Release Asset](https://github.com/Shadow-Protectors/Shadow-Protectors.github.io/releases/tag/waypoint-v1.1.0-preview.1) |
| **VulnSpace** | Cybersecurity Community Platform | Active Development | Android / Web | [Repository](https://github.com/Shadow-Protectors/VulnSpace) |
| **Achuppori** | Autonomous Print Queue Terminal | Beta Deployment | Android / Web | [Web Terminal](https://achuppori.vercel.app/) |

---

## Technical Architecture

The hub is designed as a zero-dependency, high-reliability static system:

- **Zero Build Step:** Native vanilla JavaScript, semantic HTML5, and pure CSS. No frameworks, transpilations, or node runtime dependencies required.
- **Deterministic Delivery:** Hosted directly via GitHub Pages CDN with `.nojekyll` to bypass Jekyll parsing, eliminating build latency and file filtering.
- **Data-Driven Catalog:** All application metadata, changelogs, FAQs, and release binaries are defined declaratively in `page/projects.js`.
- **Direct Release Linking:** Binaries are distributed via GitHub Releases assets, keeping the repository lightweight and version-controlled.
- **Monochrome Brutalist Interface:** High-contrast industrial ticket design with offline-first client rendering and responsive mobile layouts.

---

## Repository Structure

```text
.
├── .gitignore               # Ignored environments, scratch logs, and editor caches
├── .nojekyll                # Disables Jekyll processing for raw static asset delivery
├── README.md                # Repository documentation and operations guide
├── index.html               # Main catalog grid and hero launchpad
├── about.html               # Developer and organization background
├── project.html             # Dynamic application landing page template
├── assets/
│   ├── devs/                # Developer avatars and profile media
│   └── waypoint/            # High-resolution logos and graphic assets
├── downloads/               # Local test APK binaries
└── page/
    ├── portfolio.js         # Client-side dynamic template engine and DOM builder
    ├── projects.js          # Central project registry and metadata schema
    ├── script.js            # Interactive widgets, copy triggers, and mail dispatch
    └── style.css            # Industrial ticket styling and monochrome design tokens
```

---

## Adding or Updating a Product

To publish a new application or update an existing release, modify only `page/projects.js`:

```javascript
{
  id: "your-product-id",
  name: "Product Name",
  category: "Category Description",
  summary: "Single-line summary displayed on catalog cards.",
  headline: "CAPITALIZED IMPACT HEADLINE",
  description: "Detailed overview of the product capabilities.",
  version: "1.0.0",
  android: "8.0+",
  size: "12.4 MB",
  logo: "assets/your-product/logo.png",
  published: true, // Set to true to display on the live site
  release: {
    repository: "Shadow-Protectors/Your-Repo",
    tag: "v1.0.0",
    asset: "app-release.apk"
  },
  features: [
    { title: "Capability 01", text: "Description of core feature." }
  ],
  faq: [
    { question: "How does it work?", answer: "Technical explanation." }
  ]
}
```

Once committed and pushed to `main`, the catalog updates automatically across the entire site.

---

## Local Development

Because the site uses standard browser technologies, you can preview it with any local server:

```powershell
# Python 3
python -m http.server 8000

# Node (npx)
npx serve .
```

Open `http://localhost:8000/` in your browser.

---

## Release & Security Verification

All production binaries published through this portal are hosted via signed GitHub Releases tags. Verify file integrity before installing:

```bash
sha256sum <downloaded-file>.apk
```

Compare the computed hash against the published checksum provided on the release page.

---

## Contributing & Bug Reports

For issues, feature requests, or vulnerability disclosures concerning published applications:

- Open a ticket via the [Issue Tracker](https://github.com/Shadow-Protectors/Shadow-Protectors.github.io/issues)
- Follow the organization coding and review standards when submitting pull requests.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
