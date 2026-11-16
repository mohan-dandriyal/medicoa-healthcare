


"use client";

import { useEffect, useRef, useState } from "react";
import {
    motion,
    useInView,
    useReducedMotion,
} from "framer-motion";

import {
    GroupsOutlined,
    HandshakeOutlined,
    EventAvailableOutlined,
    WorkspacePremiumOutlined,
} from "@mui/icons-material";

import type { SvgIconComponent } from "@mui/icons-material";

import { StatisticsData } from "@/type/template.type";
import { MainContainer, Paragraph, Section } from "../layout/layout";
import { DecorativebackgroundTopLeft, DecorativebackgroundTopRight } from "../common/Decorativebackground";


const statistics = StatisticsData;

const ICONS: Record<string, SvgIconComponent> = {
    groups: GroupsOutlined,
    handshake: HandshakeOutlined,
    calendar: EventAvailableOutlined,
    award: WorkspacePremiumOutlined,
};

const EASE = [0.22, 1, 0.36, 1] as const;

// ========================================
// ANIMATED COUNTER
// ========================================

function AnimatedCounter({
    value,
    suffix,
}: {
    value: number;
    suffix: string;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, {
        once: true,
        amount: 0.5,
    });

    const reduceMotion = useReducedMotion();
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView || reduceMotion) return;

        let animationFrame = 0;
        const duration = 1800;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            const eased = 1 - Math.pow(1 - progress, 3);

            setCount(Math.round(value * eased));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, value, reduceMotion]);

    return (
        <span ref={ref} className="tabular-nums">
            {reduceMotion ? value : count}
            {suffix}
        </span>
    );
}

// ========================================
// STATISTICS SECTION
// ========================================

export default function StatisticsSection() {
    const reduceMotion = useReducedMotion();

    return (
        <Section
            className="isolate overflow-hidden bg-[#f3f9f9] py-14 my-10"
        >
            {/* Decorative background circles */}
            {/* Decorative background shapes */}
            <DecorativebackgroundTopLeft className="" />
            <DecorativebackgroundTopRight className="" />

            <MainContainer>
                <motion.div
                    id={statistics.id}
                    initial={{
                        opacity: 0,
                        y: reduceMotion ? 0 : 35,
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
                        duration: reduceMotion ? 0 : 0.8,
                        ease: EASE,
                    }}
                    className="relative overflow-hidden rounded-[30px] border border-[#E0EEE7] bg-white px-5 py-8 shadow-[0_18px_45px_rgba(0,110,65,0.08)] sm:px-8 lg:rounded-[40px] lg:px-10 lg:py-12"
                >
                    {/* Statistics grid */}
                    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
                        {statistics.items.map((item, index) => {
                            const Icon =
                                ICONS[item.icon] ?? GroupsOutlined;

                            return (
                                <motion.div
                                    key={item.id}
                                    initial={{
                                        opacity: 0,
                                        y: reduceMotion ? 0 : 25,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: reduceMotion ? 0 : 0.6,
                                        delay: reduceMotion ? 0 : index * 0.12,
                                    }}
                                    className={`
                                        relative flex flex-col items-center px-5 text-center
                                        ${index % 2 !== 0 ? "sm:border-l sm:border-[#DDE8E4]" : ""}
                                        ${index !== 0 ? "lg:border-l lg:border-[#DDE8E4]" : "lg:border-l-0"}
                                        ${index === 2 ? "sm:border-l-0" : ""}
                                    `}
                                >
                                    {/* Icon circle */}
                                    <div className="mb-4 flex h-[70px] w-[70px] items-center justify-center rounded-full border border-[#C8EED7] bg-[#E9F9EF] text-[#008C43]">
                                        <Icon sx={{ fontSize: 38 }} />
                                    </div>

                                    {/* Animated number */}
                                    <h3 className="font-poppins text-[clamp(32px,4vw,40px)] font-semibold leading-none tracking-[-0.04em] text-[#008B4A]">
                                        <AnimatedCounter
                                            value={item.value}
                                            suffix={item.suffix}
                                        />
                                    </h3>

                                    {/* Title */}
                                    <h4 className="mt-3 font-montserrat font-bold leading-[1.3] card-title sm:text-lg text-base lg:text-[20px]">
                                        {item.title}
                                    </h4>

                                    {/* Description */}
                                    <Paragraph className="mt-4 max-w-[320px] font-poppins text-sm leading-[1.8] sm:text-[15px]">
                                        {item.description}
                                    </Paragraph>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </MainContainer>
        </Section>
    );
}
