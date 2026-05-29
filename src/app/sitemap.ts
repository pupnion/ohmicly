import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ohmiclylearn.com";

  return [
    { url: `${base}/`, lastModified: new Date(), priority: 1 },
    { url: `${base}/tools`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/tools/rsc-checklist`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/tools/ir-test-report`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/tools/lps-risk-index`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/tools/wire-color-code`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/tools/arc-flash-ppe`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/tools/cb-selection`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/checklists`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/abc-license`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/blog`, lastModified: new Date(), priority: 0.6 },
    { url: `${base}/forum`, lastModified: new Date(), priority: 0.6 },
  ];
}
