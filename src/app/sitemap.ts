import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://baselens-git-main-fawaz-ibrahims-projects.vercel.app";
  return ["", "/analyze", "/compare", "/how-it-works", "/methodology", "/privacy"].map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: path === "/analyze" ? "daily" : "weekly", priority: path === "" ? 1 : path === "/analyze" ? .9 : .6 }));
}
