// REFERENCE ONLY — Skiper76 feature carousel component
// Adapt this for the Feature Highlights section (Section 2)
// Source: User-provided component

"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Plus,
} from "lucide-react";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";

// Custom Navigation Buttons Component
const CustomCarouselNavigation = () => {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useCarousel();

  return (
    <>
      <button
        className={cn(
          "absolute left-0 top-1/2 flex size-10 -translate-x-full -translate-y-1/2 cursor-pointer justify-end active:scale-95",
          !canScrollPrev && "opacity-0",
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
      >
        <ChevronLeft className="size-5" />
        <span className="sr-only">Previous slide</span>
      </button>

      <button
        className={cn(
          "absolute -right-0 top-1/2 flex size-10 -translate-y-1/2 translate-x-full cursor-pointer active:scale-95",
          !canScrollNext && "opacity-0",
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
      >
        <ChevronRight className="size-5" />
        <span className="sr-only">Next slide</span>
      </button>
    </>
  );
};

// Carousel component that syncs with isActive state
const CarouselWithActiveSync = ({
  isActive,
  setIsActive,
  FEATURES,
  colors,
  activeColor,
  setActiveColor,
}: {
  isActive: number | null;
  setIsActive: (index: number | null) => void;
  FEATURES: {
    id: number;
    name: string;
    desc: string;
    src: string;
  }[];
  colors: {
    id: number;
    color: string;
    src: string;
  }[];
  activeColor: number | null;
  setActiveColor: (index: number) => void;
}) => {
  const [api, setApi] = useState<CarouselApi | null>(null);

  // Listen to carousel slide changes and update isActive
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const currentIndex = api.selectedScrollSnap();
      setIsActive(currentIndex);
    };

    api.on("select", onSelect);
    onSelect(); // Set initial state

    return () => {
      api.off("select", onSelect);
    };
  }, [api, setIsActive]);

  // Scroll to active slide when isActive changes externally
  useEffect(() => {
    if (!api || isActive === null) return;

    const currentIndex = api.selectedScrollSnap();
    if (currentIndex !== isActive) {
      api.scrollTo(isActive);
    }
  }, [api, isActive]);

  return (
    <>
      {isActive === null ? (
        <ul className="no-scroll z-1 relative flex gap-3 overflow-scroll px-5 lg:hidden lg:flex-col lg:items-start">
          {FEATURES.map((feature, index) => (
            <motion.li
              key={index}
              layout
              transition={{
                type: "spring",
                duration: 0.7,
                bounce: 0.3,
              }}
              style={{
                borderRadius: "25px",
              }}
              className="hover:bg-foreground/14 bg-foreground/10 flex h-fit w-fit items-center justify-center backdrop-blur-sm"
            >
              <motion.button
                key="btn"
                initial={{ opacity: 0, filter: "blur(2px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(2px)" }}
                transition={{ duration: 0.3, delay: 0.25 }}
                onClick={() => setIsActive(index)}
                className="flex h-[56px] cursor-pointer items-center justify-center gap-[14px] rounded-full pl-[14px] pr-8"
              >
                {!index ? (
                  <div
                    style={{
                      backgroundColor: activeColor
                        ? colors[activeColor].color
                        : "white",
                    }}
                    className="size-6 rounded-full border-b border-white"
                  />
                ) : (
                  <PlusAdd />
                )}
                <span className="whitespace-nowrap text-lg font-semibold capitalize">
                  {feature.name}
                </span>
              </motion.button>
            </motion.li>
          ))}
        </ul>
      ) : (
        <Carousel className="w-full" setApi={setApi}>
          <CarouselContent className="-ml-1 flex items-end">
            {FEATURES.map((feature, index) => (
              <CarouselItem
                key={index}
                className="w-full basis-[85%] pl-2 first:ml-10 last:mr-10"
              >
                <motion.div
                  layout
                  transition={{
                    type: "spring",
                    duration: 0.7,
                    bounce: 0.3,
                  }}
                  style={{
                    borderRadius: "25px",
                  }}
                  className={cn(
                    "hover:bg-foreground/14 bg-foreground/10 flex h-fit w-full items-center justify-center backdrop-blur-sm",
                  )}
                >
                  {isActive === index ? (
                    <motion.div
                      key="name"
                      initial={{ opacity: 0, filter: "blur(2px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      transition={{
                        duration: 0.5,
                        delay: 0.25,
                        y: {
                          duration: 0.5,
                          delay: 0.25,
                        },
                      }}
                      className="p-6 text-lg"
                    >
                      <div>
                        <b className="capitalize">{feature.name}.</b>{" "}
                        {feature.desc}
                      </div>
                      {!index && (
                        <div className="mt-4 flex items-center justify-center gap-2">
                          {colors.map((color, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveColor(color.id)}
                              style={{ backgroundColor: color.color }}
                              className="size-6 cursor-pointer rounded-full border-b border-white"
                            />
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.button
                      key="btn"
                      initial={{ opacity: 0, filter: "blur(2px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(2px)" }}
                      transition={{ duration: 0.3, delay: 0.25 }}
                      onClick={() => setIsActive(index)}
                      className={cn(
                        "flex h-[56px] w-full cursor-pointer items-center justify-start gap-[14px] rounded-full",
                        index > isActive
                          ? "justify-start pl-3 lg:justify-center"
                          : "justify-end pr-3 lg:justify-center",
                      )}
                    >
                      {index > isActive ? <ChevronRight /> : <ChevronLeft />}
                    </motion.button>
                  )}
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CustomCarouselNavigation />
        </Carousel>
      )}
    </>
  );
};

const Skiper76 = () => {
  const FEATURES = [
    {
      id: 1,
      name: "colors",
      desc: "Choose from three bold finishes. iPhone 17 Pro shown in Cosmic Orange",
      src: "/images/oct25Coll/iphone17pro/1a.jpg",
    },
    {
      id: 2,
      name: "aluminum unibody",
      desc: "Optimized for performance and battery.",
      src: "/images/oct25Coll/iphone17pro/2.jpg",
    },
  ];

  const [isActive, setIsActive] = useState<number | null>(null);

  const colors = [
    { id: 0, color: "#fff", src: "/images/oct25Coll/iphone17pro/1a.jpg" },
    { id: 1, color: "#F77313", src: "/images/oct25Coll/iphone17pro/1c.jpg" },
    { id: 2, color: "#2B3145", src: "/images/oct25Coll/iphone17pro/1b.jpg" },
  ];

  const [activeColor, setActiveColor] = useState<number | null>(null);

  return (
    <MotionConfig transition={{ type: "spring", stiffness: 200, damping: 30 }}>
      <div className="dark flex h-full w-screen items-center justify-center p-4">
        <div className="rounded-4xl relative flex h-[745px] w-full max-w-[90rem] flex-col justify-end overflow-hidden bg-black pb-5 shadow md:justify-center">
          {/* Feature pills + carousel + background image swap */}
        </div>
      </div>
    </MotionConfig>
  );
};

export { Skiper76 };

const PlusAdd = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      version="1.1"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="11.3" fill="none" stroke="var(--foreground)" />
      <g transform="translate(7 7)" fill="var(--foreground)" stroke="none">
        <path d="m9 4h-3v-3c0-0.553-0.447-1-1-1s-1 0.447-1 1v3h-3c-0.553 0-1 0.447-1 1s0.447 1 1 1h3v3c0 0.553 0.447 1 1 1s1-0.447 1-1v-3h3c0.553 0 1-0.447 1-1s-0.447-1-1-1" />
      </g>
    </svg>
  );
};
