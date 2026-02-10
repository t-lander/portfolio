import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
    return new ImageResponse(
        <div
            style={{
                background: "#171717",
                width: "100%",
                height: "100%",
                borderRadius: "4px",
                color: "#ffffff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            T
        </div>,
        {
            ...size,
        }
    );
}
