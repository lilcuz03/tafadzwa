import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://tafadzwa.site", lastModified: new Date() },
    { url: "https://tafadzwa.site/Projects", lastModified: new Date() },
    { url: "https://tafadzwa.site/Gallery", lastModified: new Date() },
  ];
}
