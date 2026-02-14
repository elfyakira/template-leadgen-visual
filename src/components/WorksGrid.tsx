"use client";

import Image from "next/image";
import Link from "next/link";
import FadeInUp from "./animations/FadeInUp";
import StaggerContainer from "./animations/StaggerContainer";

export interface WorkItem {
  slug: string;
  title: string;
  area: string;
  category: string;
  thumbnail: string;
  description?: string;
}

interface WorksGridProps {
  items: WorkItem[];
  showLoadMore?: boolean;
  onLoadMore?: () => void;
}

export default function WorksGrid({
  items,
  showLoadMore = false,
  onLoadMore,
}: WorksGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-text-muted">施工事例は現在準備中です</p>
      </div>
    );
  }

  return (
    <div>
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {items.map((item) => (
          <FadeInUp key={item.slug}>
            <Link
              href={`/works/${item.slug}`}
              className="block group"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={item.thumbnail}
                  alt={`${item.area} ${item.category}事例`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* 地域タグ */}
                <span className="absolute top-3 left-3 px-2 py-1 bg-black/70 text-white text-xs font-medium rounded">
                  {item.area}
                </span>
                {/* ホバーオーバーレイ */}
                <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold">詳細を見る</span>
                </div>
              </div>
              <div className="mt-3">
                <p className="font-semibold text-primary">{item.category}</p>
                {item.description && (
                  <p className="text-sm text-text-muted mt-1 line-clamp-1">
                    {item.description}
                  </p>
                )}
              </div>
            </Link>
          </FadeInUp>
        ))}
      </StaggerContainer>

      {showLoadMore && onLoadMore && (
        <div className="text-center mt-10">
          <button
            onClick={onLoadMore}
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            もっと見る
          </button>
        </div>
      )}
    </div>
  );
}
