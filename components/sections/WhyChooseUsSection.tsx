


"use client";

import Image from "next/image";
import {
    motion,
    useReducedMotion,
    type Variants,
} from "framer-motion";

import {
    LocalHospitalOutlined,
    GroupsOutlined,
    ScienceOutlined,
    VerifiedUserOutlined,
} from "@mui/icons-material";

import type { SvgIconComponent } from "@mui/icons-material";

import { WhyChooseSectionData } from "@/type/template.type";

import {
    Section,
    SectionTitle,
    SectionHighlight,
    SectionEyebrow,
    Paragraph,
    MainContainer,
} from "@/components/layout/layout";
import { DecorativebackgroundTopLeft, DecorativebackgroundTopRight } from "../common/Decorativebackground";

const whyChooseUs = WhyChooseSectionData;

const ICONS: Record<string, SvgIconComponent> = {
    groups: GroupsOutlined,
    science: ScienceOutlined,
    verified: VerifiedUserOutlined,
};

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.15,
        },
    },
};

const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.65,
            ease: EASE,
        },
    },
};

export default function WhyChooseUsSection() {
    const reduceMotion = useReducedMotion();

    return (
        <Section
            className="isolate overflow-hidden bg-white py-16"
        >
            {/* Decorative circles */}
        {/* Decorative background shapes */}
            <DecorativebackgroundTopLeft className="h-[400px] -top-84" />
            <DecorativebackgroundTopRight className=" h-[430px] -top-84" />

            <MainContainer>
                <div
                    id={whyChooseUs.id}
                    className="relative grid items-center gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)_minmax(0,1.35fr)] lg:gap-7 xl:gap-10"
                >
                    {/* LEFT CONTENT */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: reduceMotion ? 0 : -40,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            duration: 0.8,
                            ease: EASE,
                        }}
                        className="relative z-10"
                    >
                        <SectionEyebrow>
                            <LocalHospitalOutlined
                                sx={{ fontSize: 23 }}
                            />
                            {whyChooseUs.eyebrow}
                        </SectionEyebrow>

                        <div className="mt-6">
                            <SectionTitle className="text-[clamp(34px,3.7vw,65px)] leading-[1.14]">
                                {whyChooseUs.title.primary}{" "}
                                <SectionHighlight className="block">
                                    {whyChooseUs.title.highlight}
                                </SectionHighlight>
                            </SectionTitle>
                        </div>

                        <Paragraph className="mt-7 sm:max-w-[430px] leading-[1.85] ">
                            {whyChooseUs.description}
                        </Paragraph>

                        {/* Green underline */}
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 95 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: reduceMotion ? 0 : 0.8,
                                delay: 0.4,
                            }}
                            className="mt-7 h-[4px] rounded-full bg-[#0CAF57]"
                        />
                    </motion.div>

                    {/* CENTER IMAGE */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: reduceMotion ? 1 : 0.94,
                        }}
                        whileInView={{
                            opacity: 1,
                            scale: 1,
                        }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{
                            duration: 0.9,
                            ease: EASE,
                        }}
                        className="relative mx-auto w-full max-w-[510px] px-3 py-3"
                    >
                        {/* Green background shape */}
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 rotate-[3deg] rounded-[85px_35px_95px_45px] bg-gradient-to-br from-[#00A83C] via-[#008E45] to-[#006F3C]"
                        />

                        {/* White border */}
                        <div className="relative overflow-hidden rounded-[85px_35px_95px_45px] border-[7px] border-white bg-white shadow-[0_18px_45px_rgba(0,80,45,0.14)]">
                            <div className="relative aspect-[0.78] w-full overflow-hidden">
                                <Image
                                    src={whyChooseUs.image.src}
                                    alt={whyChooseUs.image.alt}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 32vw"
                                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT FEATURE CARDS */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            amount: 0.15,
                        }}
                        className="flex flex-col gap-5"
                    >
                        {whyChooseUs.features.map((feature) => {
                            const Icon =
                                ICONS[feature.icon] ?? VerifiedUserOutlined;

                            return (
                                <motion.div
                                    key={feature.id}
                                    variants={
                                        reduceMotion
                                            ? undefined
                                            : cardVariants
                                    }
                                    className="group flex min-h-[145px] items-center gap-3 sm:gap-5 rounded-[25px] border border-[#EDF2EF] bg-white p-5 shadow-[0_10px_30px_rgba(0,50,30,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#BDE8D0] hover:shadow-[0_18px_40px_rgba(0,90,50,0.12)] sm:p-6"
                                >
                                    {/* Icon */}
                                    <div className="flex h-14 w-14 sm:h-[88px] sm:w-[88px] shrink-0 items-center justify-center rounded-[22px] bg-[#EAF8EF] text-[#00943D] transition-colors duration-300 group-hover:bg-[#008D48] group-hover:text-white">
                                        <Icon
                                            sx={{ fontSize: 46 }}
                                        />
                                    </div>

                                    {/* Vertical divider */}
                                    <div className="h-[85px] w-[2px] shrink-0 bg-[#AAB8B5]" />

                                    {/* Text */}
                                    <div>
                                        <h3 className="font-montserrat  font-bold leading-[1.3] card-title sm:text-lg text-base lg:text-[20px]">
                                            {feature.title}
                                        </h3>

                                        <Paragraph className="mt-2 font-poppins font-normal sm:text-[15px]">
                                            {feature.description}
                                        </Paragraph>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </MainContainer>
        </Section>
    );
}
