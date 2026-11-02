import { ogImage } from "@/lib/og";

export const alt = "Projects | taachii";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return ogImage(
    "Projects",
    "Websites, web apps and automation built to ship.",
  );
}
