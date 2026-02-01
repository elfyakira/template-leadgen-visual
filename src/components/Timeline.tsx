"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TimelineItem {
  year: string;
  content: string;
  isCurrent?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* 縦ライン */}
      <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-primary/30" />

      <div className="space-y-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex items-start gap-6 md:gap-0"
          >
            {/* PC: 左側の年号（偶数） */}
            <div className="hidden md:flex md:w-1/2 md:justify-end md:pr-8">
              {index % 2 === 0 && (
                <div className="text-right">
                  <span
                    className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-bold ${
                      item.isCurrent
                        ? "bg-accent text-white"
                        : "bg-primary text-white"
                    }`}
                  >
                    {item.isCurrent && <Star className="w-4 h-4 mr-1" />}
                    {item.year}
                  </span>
                  <p className="mt-2 text-text-muted">{item.content}</p>
                </div>
              )}
            </div>

            {/* 中央のドット */}
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-md z-10" />

            {/* PC: 右側のコンテンツ（奇数） */}
            <div className="hidden md:block md:w-1/2 md:pl-8">
              {index % 2 === 1 && (
                <div>
                  <span
                    className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-bold ${
                      item.isCurrent
                        ? "bg-accent text-white"
                        : "bg-primary text-white"
                    }`}
                  >
                    {item.isCurrent && <Star className="w-4 h-4 mr-1" />}
                    {item.year}
                  </span>
                  <p className="mt-2 text-text-muted">{item.content}</p>
                </div>
              )}
            </div>

            {/* SP: 全て右側に表示 */}
            <div className="md:hidden pl-8">
              <span
                className={`inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-bold ${
                  item.isCurrent
                    ? "bg-accent text-white"
                    : "bg-primary text-white"
                }`}
              >
                {item.isCurrent && <Star className="w-4 h-4 mr-1" />}
                {item.year}
              </span>
              <p className="mt-2 text-text-muted">{item.content}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
