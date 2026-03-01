"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface SpecCategory {
  title: string;
  specs: { label: string; value: string }[];
}

interface SpecsSectionProps {
  specCategories: SpecCategory[];
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="transition-transform duration-300"
      style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SpecsSection({ specCategories }: SpecsSectionProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    () => new Set()
  );
  const [allExpanded, setAllExpanded] = useState(false);

  function toggleAll() {
    if (allExpanded) {
      setExpandedCategories(new Set());
      setAllExpanded(false);
    } else {
      setExpandedCategories(new Set(specCategories.map((c) => c.title)));
      setAllExpanded(true);
    }
  }

  function toggleCategory(title: string) {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }

      setAllExpanded(next.size === specCategories.length);
      return next;
    });
  }

  return (
    <section className="py-16 sm:py-24 md:py-32 px-6 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Specifications
          </h2>
          <button
            onClick={toggleAll}
            className="text-sm text-white/50 hover:text-white cursor-pointer transition-colors"
          >
            {allExpanded ? "Hide" : "See all"}
          </button>
        </div>

        <div className="mt-8">
          {specCategories.map((category) => {
            const isExpanded = expandedCategories.has(category.title);

            return (
              <div key={category.title}>
                <button
                  onClick={() => toggleCategory(category.title)}
                  className="flex justify-between items-center w-full py-4 cursor-pointer border-b border-white/[0.08] hover:border-white/20 transition-colors"
                >
                  <span className="text-sm font-medium text-white">
                    {category.title}
                  </span>
                  <span className="text-white/40">
                    <ChevronIcon expanded={isExpanded} />
                  </span>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.25, 0.1, 0.25, 1],
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-2">
                        {category.specs.map((spec, i) => (
                          <div
                            key={spec.label}
                            className={`py-3 flex justify-between${
                              i < category.specs.length - 1
                                ? " border-b border-white/[0.05]"
                                : ""
                            }`}
                          >
                            <span className="text-sm text-white/40">
                              {spec.label}
                            </span>
                            <span className="text-sm text-white/80 font-medium text-right">
                              {spec.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
