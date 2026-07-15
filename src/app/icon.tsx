import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#111111",
        borderRadius: "50%",
        color: "#ffffff",
        display: "flex",
        fontFamily: "Arial, sans-serif",
        fontSize: 17,
        fontWeight: 700,
        height: "100%",
        justifyContent: "center",
        width: "100%",
      }}
    >
      A
    </div>,
    size,
  );
}
