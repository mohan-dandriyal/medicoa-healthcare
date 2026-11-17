


"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { SvgIconComponent } from "@mui/icons-material";

import {
    ScienceOutlined,
    MedicationOutlined,
    LocationOnRounded,
    PhoneRounded,
    WorkspacePremiumOutlined,
    GroupsOutlined,
    Inventory2Outlined,
    LocalHospitalRounded,
} from "@mui/icons-material";

import { AboutSectionData } from "@/type/template.type";
import { MainContainer, Paragraph, SectionEyebrow, SectionHighlight, SectionTitle } from "../layout/layout";

const about = AboutSectionData;

const ICONS: Record<string, SvgIconComponent> = {
    science: ScienceOutlined,
    medication: MedicationOutlined,
    workspace_premium: WorkspacePremiumOutlined,
    groups: GroupsOutlined,
    inventory_2: Inventory2Outlined,
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AboutSection() {
    const reduceMotion = useReducedMotion();

    const animation = {
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
            id={about.id}
            className="relative isolate overflow-hidden bg-[#FAFFFC] py-14 my-10"
            style={{
                backgroundImage : `url(/other/about-bg.png)`,
                backgroundRepeat : "no-repeat",
                backgroundSize : "100% 100%",
                backgroundPosition : "center"
            }}
        >
            
            <div />

            <MainContainer>
                {/* SECTION HEADING */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={animation}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="mx-auto mb-8 sm:mb-10 max-w-[500px] lg:max-w-[800px] text-center"
                >
                    <SectionEyebrow>
                        <LocalHospitalRounded sx={{ fontSize: 22 }} />

                        <span className="font-poppins text-sm font-semibold sm:text-base">
                            {about.eyebrow}
                        </span>
                    </SectionEyebrow>

                    {/* Title */}
                    <div>
                        <SectionTitle>
                            {about.title.primary} {" "}
                            <SectionHighlight>
                                {about.title.highlight}
                            </SectionHighlight>
                        </SectionTitle>
                    </div>

                    {/* Description */}
                    <Paragraph className="mx-auto max-w-[850px]">
                        {about.description}
                    </Paragraph>

                </motion.div>

                {/* MAIN GRID */}
                <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,42fr)_minmax(0,58fr)]">
                    {/* LEFT VISION MISSION CARD */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: reduceMotion ? 0 : -50,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: EASE }}
                        className="relative flex flex-col justify-between overflow-hidden rounded-[28px] bg-[#006342] p-6 text-white sm:p-9 lg:p-6"
                    >
                        {/* Background effects */}
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(255,255,255,0.12),transparent_50%),linear-gradient(135deg,#08784D,#004B36)]"
                        />

                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-20 -bottom-24 h-[350px] w-[350px] rounded-full border-[65px] border-white/5"
                        />

                        {/* Vision and Mission */}
                        <div className="relative z-10 space-y-6">
                            {about.visionMission.map((item, index) => {
                                const Icon = ICONS[item.icon] ?? ScienceOutlined;

                                return (
                                    <motion.div
                                        key={item.id}
                                        initial={{
                                            opacity: 0,
                                            y: reduceMotion ? 0 : 20,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.6,
                                            delay: index * 0.15,
                                        }}
                                        className="flex items-start gap-5"
                                    >
                                        {/* Icon */}
                                        <div className="flex h-[55px] w-[55px] shrink-0 items-center justify-center rounded-full bg-white text-[#00864B] shadow-lg sm:h-[65px] sm:w-[65px]">
                                            <Icon sx={{ fontSize: 38 }} />
                                        </div>

                                        {/* Content */}
                                        <div>
                                            <h3 className="font-montserrat text-lg sm:text-xl font-bold lg:text-[22px]">
                                                {item.title}
                                            </h3>

                                            <Paragraph className="mt-2 max-w-[480px] font-normal lg:text-[16px] leading-[1.8] text-white/90">
                                                {item.description}
                                            </Paragraph>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Contact information */}
                        <div className="relative z-10 border-t border-white/60 pt-6 mt-7">
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                                <div className="flex items-center gap-2">
                                    <LocationOnRounded sx={{ fontSize: 24 }} />

                                    <span className="font-poppins text-sm font-medium">
                                        {about.contact.address}
                                    </span>
                                </div>

                                <span className="hidden h-7 w-px bg-white/50 xl:block" />

                                <a
                                    href={`tel:${about.contact.phone.replace(/[^\d+]/g, "")}`}
                                    className="flex items-center gap-2 transition-colors hover:text-green-200"
                                >
                                    <PhoneRounded sx={{ fontSize: 23 }} />

                                    <span className="font-poppins text-sm font-medium">
                                        {about.contact.phone}
                                    </span>
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT LABORATORY IMAGE */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: reduceMotion ? 0 : 50,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.1,
                            ease: EASE,
                        }}
                        className="relative min-h-[430px] overflow-hidden rounded-[28px] sm:min-h-[400px] lg:min-h-[430px]"
                    >
                        <Image
                            src={about.image.src}
                            alt={about.image.alt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 58vw"
                            className="object-cover object-center"
                        />

                        {/* Soft image overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />

                        {/* STATISTICS */}
                        <div className="absolute bottom-5 left-4 right-4 z-10 rounded-[22px] bg-white/95 p-2 shadow-[0_12px_35px_rgba(0,0,0,0.12)] backdrop-blur-md sm:bottom-6 sm:left-8 sm:right-8 sm:p-2">
                            <div className="grid grid-cols-3 divide-x divide-slate-200">
                                {about.statistics.map((stat) => {
                                    const Icon =
                                        ICONS[stat.icon] ?? WorkspacePremiumOutlined;

                                    return (
                                        <div
                                            key={stat.id}
                                            className="flex flex-col items-center justify-center gap-2 px-2 text-center xl:flex-row sm:gap-2 sm:px-3 xl:text-left"
                                        >
                                            <Icon
                                                sx={{ fontSize: { xs: 27, sm: 38 } }}
                                                className="shrink-0 text-[#008C4D]"
                                            />

                                            <div>
                                                <p className="font-poppins text-xl font-semibold leading-tight text-[#005238] sm:text-2xl lg:text-[26px]">
                                                    {stat.value}
                                                </p>

                                                <Paragraph className="mt-1 font-poppins text-[10px] leading-snug sm:text-xs lg:text-sm">
                                                    {stat.label}
                                                </Paragraph>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </MainContainer>
        </section>
    );
}
