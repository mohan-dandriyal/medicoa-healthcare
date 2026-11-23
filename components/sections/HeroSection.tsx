


"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import { HeroSectionData } from "@/type/template.type";
import { MainContainer, Paragraph } from "../layout/layout";

const hero = HeroSectionData;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
    const reduceMotion = useReducedMotion();

    const fadeUp = {
        hidden: {
            opacity: 0,
            y: reduceMotion ? 0 : 35,
        },
        visible: {
            opacity: 1,
            y: 0,
        },
    };

    return (
        <section
            id={hero.id}
            className="relative isolate overflow-hidden bg-[#F2FFFA]"
            style={{
                backgroundColor: hero.theme.backgroundColor,
            }}
        >
            {/* Background gradient */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_25%_30%,#ffffff_0%,#f2fff9_55%,#e3f8ef_100%)]"
            />

            <div className="pointer-events-none relative mx-4 mt-6 sm:mx-6 sm:mt-8 md:mx-8 lg:absolute lg:inset-y-0 lg:right-0 lg:m-0 lg:w-1/2">
                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    animate={{
                        opacity: 1,
                    }}
                    transition={{
                        duration: 1.1,
                        ease: EASE,
                    }}
                    className="relative z-10 h-[clamp(180px,90vw,360px)] w-full overflow-hidden lg:h-full"
                >
                    {/* Green curved border */}
                    <div className="absolute inset-0 overflow-hidden lg:rounded-none lg:bg-gradient-to-br lg:from-[#00A75B] lg:to-[#006B3C] lg:[clip-path:ellipse(94%_95%_at_100%_37%)]">

                        {/* Image */}
                        <div className="relative h-full w-full overflow-hidden rounded-tl-[clamp(41px,14vw,103px)] bg-white lg:rounded-none lg:[clip-path:ellipse(93%_94%_at_100%_37%)]">
                            <Image
                                src={hero.images.main.src}
                                alt={hero.images.main.alt}
                                fill
                                preload
                                sizes="(min-width: 1024px) 60vw, (min-width: 768px) calc(100vw - 64px), (min-width: 640px) calc(100vw - 48px), calc(100vw - 32px)"
                                className="object-cover object-center"
                            />

                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Main container */}
            <MainContainer>


                <div className="relative grid items-center lg:min-h-[680px] lg:grid-cols-[minmax(0,47fr)_minmax(0,53fr)]">
                    {/* LEFT CONTENT */}
                    <div className="relative z-20 py-9 sm:py-12 lg:pb-20 lg:pr-4">

                        {/* Eyebrow */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                            transition={{ duration: 0.7, ease: EASE }}
                            className="mb-4 flex items-center gap-4 sm:mb-8"
                        >
                            <span
                                className="h-[3px] w-10 shrink-0 rounded-full sm:w-12"
                                style={{
                                    backgroundColor: hero.theme.secondaryColor,
                                }}
                            />

                            <span className="font-montserrat font-bold text-[#06452E] text-sm sm:text-base lg:text-lg">
                                {hero.eyebrow}
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                            transition={{
                                duration: 0.8,
                                delay: 0.12,
                                ease: EASE,
                            }}
                            className="font-poppins text-[clamp(28px,5.2vw,70px)] font-bold leading-[1.08] tracking-[-0.045em]"
                        >
                            <span className="block break-words text-[#003E2B]">
                                {hero.title.primary}
                            </span>

                            <span
                                className="mt-1 block break-words"
                                style={{
                                    color: hero.theme.secondaryColor,
                                }}
                            >
                                {hero.title.highlight}
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                            transition={{
                                duration: 0.8,
                                delay: 0.25,
                                ease: EASE,
                            }}
                        >
                            <Paragraph className="sm:mt-7 mt-4 max-w-[590px] text-sm sm:text-base xl:text-[19px]">
                                {hero.description}
                            </Paragraph>
                        </motion.div>

                        {/* Buttons */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                            transition={{
                                duration: 0.8,
                                delay: 0.38,
                                ease: EASE,
                            }}
                            className="mt-9 flex flex-wrap items-center gap-4"
                        >
                            {hero.buttons.map((button) => (
                                <a
                                    key={button.id}
                                    href={button.href}
                                    className="group inline-flex min-h-[58px] items-center justify-center gap-5 rounded-full bg-[#007747] px-8 font-poppins text-base font-semibold text-white shadow-[0_12px_30px_rgba(0,110,60,0.15)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#005C36] hover:shadow-[0_16px_35px_rgba(0,110,60,0.25)] sm:px-10 sm:text-lg"
                                >
                                    {button.text}

                                    {button.icon === "arrow_forward" && (
                                        <ArrowForwardRoundedIcon aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
                                    )}
                                </a>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </MainContainer>

            {/* FLOATING MEDICINE IMAGE */}
            <motion.div
                initial={{
                    opacity: 0,
                    y: reduceMotion ? 0 : 35,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    duration: 0.9,
                    delay: 0.5,
                    ease: EASE,
                }}
                className="pointer-events-none absolute bottom-5 left-[26%] z-30 hidden h-[180px] w-[300px] lg:block xl:h-[230px] xl:w-[400px]"
            >
                <Image
                    src={hero.images.products.src}
                    alt={hero.images.products.alt}
                    fill
                    sizes="(min-width: 1280px) 400px, 300px"
                    className="object-contain object-bottom"
                />
            </motion.div>

            {/* BOTTOM GREEN WAVE */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 z-10 hidden h-[110px] w-full lg:block"
            >
                <svg
                    viewBox="0 0 1440 120"
                    preserveAspectRatio="none"
                    className="h-full w-full"
                >
                    <path
                        d="M0,35 C260,160 490,125 720,115 C1050,100 1250,90 1440,30 L1440,120 L0,120 Z"
                        fill="#009B5A"
                    />
                    <path
                        d="M0,0 C300,135 500,110 720,110 C1050,95 1260,70 1440,20"
                        fill="none"
                        stroke="#D5F4E8"
                        strokeWidth="12"
                    />
                </svg>
            </div>
        </section>
    );
}
