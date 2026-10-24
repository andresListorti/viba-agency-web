import { ogSize, renderOg } from "@/lib/og";

export const alt = "VIBA Agency: No es instinto. Es método.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ title: "No es instinto. Es método.", kicker: "we feel what we do" });
}
