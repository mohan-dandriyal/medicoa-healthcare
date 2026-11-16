
"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type ComponentProps = {
  children: ReactNode;
  className?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

// ========================================
// MAIN CONTAINER
// ========================================

export const MainContainer = ({
  children,
  className = "",
}: ComponentProps) => {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10">
      <div className={`mx-auto min-w-0 max-w-[1500px] ${className}`}>
        {children}
      </div>
    </div>
  );
};

// ========================================
// SECTION
// ========================================

export const Section = ({
  children,
  className = "",
}: ComponentProps) => {
  return (
    <section className={`relative w-full ${className}`}>
      {children}
    </section>
  );
};

// ========================================
// SECTION TITLE
// ========================================

export const SectionTitle = ({
  children,
  className = "",
}: ComponentProps) => {
  return (
    <h2
      className={`
        font-montserrat
        my-4
        text-[clamp(30px,3.8vw,56px)]
        font-extrabold
        leading-[1.17]
        tracking-[-0.035em]
        text-[#003E2B]
        ${className}
      `}
    >
      {children}
    </h2>
  );
};

// ========================================
// SECTION HIGHLIGHT TEXT
// ========================================

export const SectionHighlight = ({
  children,
  className = "",
}: ComponentProps) => {
  return (
    <span className={`text-[#079346] ${className}`}>
      {children}
    </span>
  );
};

// ========================================
// SECTION EYEBROW
// ========================================

export const SectionEyebrow = ({
  children,
  className = "",
}: ComponentProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: reduceMotion ? 0 : 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.7,
        ease: EASE,
      }}
      className={`inline-flex items-center gap-3 rounded-full border border-[#CBEAD9] bg-[#F0FBF5] px-5 py-2 text-[#087A43] ${className}`}
    >
      <span className="inline-flex flex-wrap items-center justify-center gap-2 font-poppins text-sm font-semibold sm:text-base">
        {children}
      </span>
    </motion.div>
  );
};

// ========================================
// PARAGRAPH
// ========================================

export const Paragraph = ({
  children,
  className = "",
}: ComponentProps) => {
  return (
    <p
      className={`
        font-poppins
        text-sm
        font-medium
        leading-[1.5]
        text-[#555B5A]
        sm:text-lg
        ${className}
      `}
    >
      {children}
    </p>
  );
};
