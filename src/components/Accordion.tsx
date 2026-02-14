"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export default function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      if (allowMultiple) {
        setOpenIndexes([...openIndexes, index]);
      } else {
        setOpenIndexes([index]);
      }
    }
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between gap-4 bg-gray-100 px-5 py-4 text-left hover:bg-gray-200 transition-colors"
            >
              <span className="font-semibold text-primary">
                Q. {item.question}
              </span>
              <span
                className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              >
                <ChevronDown className="w-5 h-5 text-primary" />
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <div className="px-5 py-4 bg-white border-l-4 border-primary">
                  <p className="text-text-muted leading-relaxed">
                    A. {item.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
