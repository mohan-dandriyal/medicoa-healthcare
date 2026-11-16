

"use client";

import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from "framer-motion";

import {
    KeyboardArrowDownRounded,
    QuestionAnswerOutlined,
} from "@mui/icons-material";

import { FaqsSectionData } from "@/type/template.type";

import {
    MainContainer,
    Section,
    SectionTitle,
    SectionHighlight,
    Paragraph,
} from "@/components/layout/layout";
import { DecorativebackgroundBottomLeft, DecorativebackgroundBottomRight, DecorativebackgroundTopLeft, DecorativebackgroundTopRight } from "../common/Decorativebackground";

const faq = FaqsSectionData;

const EASE = [0.22, 1, 0.36, 1] as const;

type FAQItem = (typeof faq.questions)[number];

// ==========================================
// FAQ ACCORDION ITEM
// ==========================================

function AccordionItem({
    item,
    isOpen,
    onToggle,
}: {
    item: FAQItem;
    isOpen: boolean;
    onToggle: () => void;
}) {
    const reduceMotion = useReducedMotion();
    const uniqueId = useId();
    const panelId = `faq-panel-${uniqueId}`;
    const buttonId = `faq-button-${uniqueId}`;

    return (
        <div
            className={`
        overflow-hidden rounded-[18px] border
        transition-colors duration-300
        ${isOpen
                    ? "border-[#31AD69] bg-[#F2FBF5]"
                    : "border-[#D3DEE2] bg-white hover:border-[#9BCFB4]"
                }
      `}
        >
            <h3>
                <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={onToggle}
                    className="flex w-full items-center gap-4 px-5 py-3 text-left sm:gap-5 sm:px-6"
                >
                    {/* Q icon */}
                    <span
                        className={`
                                flex h-[38px] w-[38px] shrink-0 items-center
                                justify-center rounded-full font-montserrat
                                text-[22px] font-bold transition-colors
                                ${isOpen
                                ? "bg-[#07964D] text-white"
                                : "bg-[#DFF5E7] text-[#008B47]"
                            }
            `}
                    >
                        Q
                    </span>

                    {/* Question */}
                    <span className="flex-1 font-montserrat text-base font-bold leading-snug text-[#082A36] sm:text-[19px] lg:text-lg">
                        {item.question}
                    </span>

                    {/* Arrow */}
                    <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{
                            duration: reduceMotion ? 0 : 0.25,
                        }}
                        className="shrink-0 text-[#102D38]"
                    >
                        <KeyboardArrowDownRounded sx={{ fontSize: 29 }} />
                    </motion.span>
                </button>
            </h3>

            {/* Answer */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            duration: reduceMotion ? 0 : 0.3,
                            ease: EASE,
                        }}
                        className="overflow-hidden"
                    >
                        <p className="pb-5 pl-[84px] pr-6 font-poppins text-sm leading-[1.8] text-[#4F606B] sm:pl-[89px] sm:text-base">
                            {item.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ==========================================
// FAQ SECTION
// ==========================================

export default function FAQSection() {
    const [openId, setOpenId] = useState<number | null>(
        faq.questions[0]?.id ?? null
    );

    const reduceMotion = useReducedMotion();

    return (
        <Section className="relative isolate overflow-hidden bg-[#FBFFFD] py-14 my-10">
            {/* Decorative background shapes */}
            <DecorativebackgroundTopLeft className="w-[400px] h-[400px] -top-84" />
            <DecorativebackgroundTopRight className="w-[400px] h-[400px] -top-84" />
            <DecorativebackgroundBottomLeft className="" />
            <DecorativebackgroundBottomRight className="" />

            <MainContainer>
                <div id={faq.id} className="relative">
                    {/* ==================================
                            SECTION HEADING
                        ================================== */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: reduceMotion ? 0 : 25,
                        }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: reduceMotion ? 0 : 0.7,
                            ease: EASE,
                        }}
                        className="mx-auto mb-12 max-w-[1000px] text-center"
                    >
                        <SectionTitle className="">
                            {faq.title.primary}{" "}
                            <SectionHighlight>
                                {faq.title.highlight}
                            </SectionHighlight>
                        </SectionTitle>

                        <Paragraph className="max-w-[750px] mx-auto">
                            {faq.description}
                        </Paragraph>
                    </motion.div>

                    {/* ==================================
                            IMAGE + FAQ GRID
                        ================================== */}
                    <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.85fr] lg:gap-12">
                        {/* LEFT IMAGE */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                x: reduceMotion ? 0 : -45,
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                            }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                duration: reduceMotion ? 0 : 0.8,
                                ease: EASE,
                            }}
                            className="relative mx-auto w-full max-w-[500px] pb-12 lg:pb-10"
                        >


                            {/* Pharmacist image */}
                            <div className="relative ml-3 mt-7 aspect-[0.82] overflow-hidden rounded-[75px_85px_65px_85px] border-[5px] border-white bg-[#E9F5F0]">
                                <Image
                                    src={faq.image.src}
                                    alt={faq.image.alt}
                                    fill
                                    sizes="(max-width: 1024px) 90vw, 35vw"
                                    className="object-cover object-center"
                                />
                            </div>

                            {/* Overlapping contact card */}
                            <Link
                                href={faq.contactCard.link}
                                className="absolute bottom-0 left-[7%] right-[7%] flex items-center gap-4 rounded-[24px] bg-white px-5 py-5 shadow-[0_15px_45px_rgba(0,80,50,0.13)] transition-transform duration-300 hover:-translate-y-1 sm:px-7"
                            >
                                <span className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-[18px] bg-[#E7F8EE] text-[#008B4B]">
                                    <QuestionAnswerOutlined sx={{ fontSize: 34 }} />
                                </span>

                                <div>
                                    <h3 className="font-montserrat text-base font-bold card-title sm:text-lg">
                                        {faq.contactCard.title}
                                    </h3>

                                    <p className="mt-1 font-poppins text-xs text-[#65727C] sm:text-sm">
                                        {faq.contactCard.description}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>

                        {/* RIGHT ACCORDION */}
                        <motion.div
                            initial={{
                                opacity: 0,
                                x: reduceMotion ? 0 : 45,
                            }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                            }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{
                                duration: reduceMotion ? 0 : 0.8,
                                ease: EASE,
                            }}
                            className="flex flex-col gap-3"
                        >
                            {faq.questions.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    item={item}
                                    isOpen={openId === item.id}
                                    onToggle={() =>
                                        setOpenId((current) =>
                                            current === item.id ? null : item.id
                                        )
                                    }
                                />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </MainContainer>
        </Section>
    );
}
