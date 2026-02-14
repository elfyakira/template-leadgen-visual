"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import FadeInUp from "./animations/FadeInUp";

interface Region {
  name: string;
  isMain: boolean;
  worksCount: number;
  districts?: string[];
}

interface AreaMapProps {
  regions: Region[];
  mainArea: string;
  onAreaClick?: (area: string) => void;
  scrollToAreaOnClick?: boolean;
  highlightColor?: string;
  className?: string;
}

// 愛知県西三河エリアの市町村パス定義
// 実際の地図に基づいた簡略化されたSVGパス
const areaPaths: Record<string, string> = {
  岡崎市:
    "M 180 120 L 220 100 L 260 110 L 280 150 L 270 190 L 240 220 L 200 210 L 170 180 L 160 150 Z",
  豊田市:
    "M 220 50 L 280 40 L 320 60 L 340 100 L 320 140 L 280 150 L 260 110 L 220 100 L 200 70 Z",
  安城市:
    "M 120 150 L 160 150 L 170 180 L 160 210 L 130 220 L 100 200 L 100 170 Z",
  刈谷市:
    "M 80 130 L 120 120 L 120 150 L 100 170 L 70 160 L 60 140 Z",
  西尾市:
    "M 160 210 L 200 210 L 220 250 L 200 290 L 150 300 L 120 270 L 130 230 Z",
  幸田町:
    "M 240 220 L 270 190 L 300 200 L 310 240 L 280 260 L 240 250 Z",
};

// 各エリアのラベル位置
const areaLabelPositions: Record<string, { x: number; y: number }> = {
  岡崎市: { x: 220, y: 160 },
  豊田市: { x: 270, y: 90 },
  安城市: { x: 135, y: 180 },
  刈谷市: { x: 90, y: 145 },
  西尾市: { x: 170, y: 255 },
  幸田町: { x: 270, y: 230 },
};

export default function AreaMap({
  regions,
  mainArea,
  onAreaClick,
  scrollToAreaOnClick = false,
  highlightColor = "#1a2744",
  className = "",
}: AreaMapProps) {
  const handleAreaClick = useCallback(
    (areaName: string) => {
      if (scrollToAreaOnClick) {
        const element = document.getElementById(`area-${areaName}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
      onAreaClick?.(areaName);
    },
    [scrollToAreaOnClick, onAreaClick]
  );
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGElement>, areaName: string) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const svgRect = (
        e.currentTarget.closest("svg") as SVGSVGElement
      )?.getBoundingClientRect();
      if (svgRect) {
        setTooltipPosition({
          x: rect.left - svgRect.left + rect.width / 2,
          y: rect.top - svgRect.top - 10,
        });
      }
      setHoveredArea(areaName);
    },
    []
  );

  const getRegionInfo = useCallback(
    (areaName: string) => {
      return regions.find((r) => r.name === areaName);
    },
    [regions]
  );

  const getAreaColor = useCallback(
    (areaName: string) => {
      const region = getRegionInfo(areaName);
      if (!region) return "#e5e7eb"; // 対応外エリア（グレー）

      if (hoveredArea === areaName) {
        return region.isMain ? "#2d4a73" : "#4a6a93"; // ホバー時は明るく
      }

      if (region.isMain) {
        return highlightColor; // メインエリア
      }

      return "#4a6a93"; // サブエリア（薄いメインカラー）
    },
    [hoveredArea, highlightColor, getRegionInfo]
  );

  return (
    <FadeInUp>
      <div ref={mapRef} className={`relative w-full max-w-xl mx-auto ${className}`}>
        <svg
          viewBox="0 0 400 340"
          className="w-full h-auto"
          style={{ maxHeight: "400px" }}
        >
          {/* 背景 */}
          <rect x="0" y="0" width="400" height="340" fill="#f8f9fa" rx="8" />

          {/* 各エリアのパス */}
          {Object.entries(areaPaths).map(([areaName, path]) => {
            const region = getRegionInfo(areaName);
            const isClickable = !!region;

            return (
              <path
                key={areaName}
                d={path}
                fill={getAreaColor(areaName)}
                stroke="#ffffff"
                strokeWidth="2"
                className={`transition-all duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
                style={{
                  cursor: isClickable ? "pointer" : "default",
                  transitionDelay: "100ms",
                }}
                onMouseMove={(e) => isClickable && handleMouseMove(e, areaName)}
                onMouseLeave={() => setHoveredArea(null)}
                onClick={() => isClickable && handleAreaClick(areaName)}
              />
            );
          })}

          {/* エリアラベル */}
          {Object.entries(areaLabelPositions).map(([areaName, pos]) => {
            const region = getRegionInfo(areaName);
            if (!region) return null;

            return (
              <g
                key={`label-${areaName}`}
                className={`transition-all duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
                style={{ transitionDelay: "300ms" }}
              >
                <text
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize={region.isMain ? "14" : "11"}
                  fontWeight={region.isMain ? "700" : "600"}
                  style={{ pointerEvents: "none" }}
                >
                  {areaName}
                </text>
                {region.isMain && (
                  <text
                    x={pos.x}
                    y={pos.y + 16}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.8)"
                    fontSize="9"
                    style={{ pointerEvents: "none" }}
                  >
                    (メインエリア)
                  </text>
                )}
              </g>
            );
          })}

          {/* 本社マーカー */}
          <g
            className={`transition-all duration-500 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
            style={{ transitionDelay: "500ms", transformOrigin: "220px 160px" }}
          >
            <circle cx="220" cy="160" r="8" fill="#f39c12" stroke="#fff" strokeWidth="2" />
            <circle cx="220" cy="160" r="3" fill="#fff" />
          </g>

          {/* 凡例 */}
          <g transform="translate(20, 290)">
            <rect x="0" y="0" width="12" height="12" fill={highlightColor} rx="2" />
            <text x="18" y="10" fill="#1a2744" fontSize="10">
              メインエリア
            </text>

            <rect x="90" y="0" width="12" height="12" fill="#4a6a93" rx="2" />
            <text x="108" y="10" fill="#1a2744" fontSize="10">
              対応エリア
            </text>

            <circle cx="186" cy="6" r="5" fill="#f39c12" stroke="#fff" strokeWidth="1" />
            <text x="196" y="10" fill="#1a2744" fontSize="10">
              本社
            </text>
          </g>
        </svg>

        {/* ツールチップ */}
        {hoveredArea && (
          <div
            className="absolute pointer-events-none bg-white shadow-lg rounded-lg px-3 py-2 text-sm z-10 transition-opacity duration-200"
            style={{
              left: tooltipPosition.x,
              top: tooltipPosition.y,
              transform: "translate(-50%, -100%)",
            }}
          >
            <p className="font-bold text-primary">{hoveredArea}</p>
            {getRegionInfo(hoveredArea) && (
              <p className="text-text-muted text-xs">
                施工実績{" "}
                <span className="text-accent font-semibold">
                  {getRegionInfo(hoveredArea)?.worksCount}件
                </span>
                以上
              </p>
            )}
          </div>
        )}
      </div>
    </FadeInUp>
  );
}
