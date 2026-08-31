import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/", disallow: ["/api/"] }, sitemap: "https://baselens-git-main-fawaz-ibrahims-projects.vercel.app/sitemap.xml" };
}
