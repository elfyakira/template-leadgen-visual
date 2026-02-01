import { ImageResponse } from "next/og";
import { company, localVisual, stats } from "@/lib/site";

export const runtime = "nodejs";
export const alt = company.name;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a2744",
          padding: 60,
        }}
      >
        {/* Region Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontSize: 32,
              color: "#f39c12",
              fontWeight: 700,
            }}
          >
            {localVisual.mainRegion}
          </span>
          <span
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.8)",
              marginLeft: 12,
            }}
          >
            の外壁塗装・リフォーム
          </span>
        </div>

        {/* Company Name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#ffffff",
            marginBottom: 32,
          }}
        >
          {company.nameShort || company.name}
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: 48,
            marginTop: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 56,
                fontWeight: 900,
                color: "#ffffff",
              }}
            >
              {stats.yearsInBusiness}
            </span>
            <span
              style={{
                fontSize: 20,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              創業{stats.yearsInBusinessUnit}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 56,
                fontWeight: 900,
                color: "#ffffff",
              }}
            >
              {stats.projectsCompleted}
            </span>
            <span
              style={{
                fontSize: 20,
                color: "rgba(255,255,255,0.7)",
              }}
            >
              施工実績{stats.projectsCompletedUnit}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
