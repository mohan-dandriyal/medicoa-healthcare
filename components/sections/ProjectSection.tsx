


"use client";

import Image from "next/image";
import {
    motion,
    useReducedMotion,
} from "framer-motion";

import {
    MedicationOutlined,
    MonitorHeartOutlined,
    HealthAndSafetyOutlined,
} from "@mui/icons-material";

import type { SvgIconComponent } from "@mui/icons-material";

import { ProjectSectionData } from "@/type/template.type";
import { MainContainer, Paragraph, SectionEyebrow, SectionHighlight, SectionTitle } from "../layout/layout";
import { DecorativebackgroundBottomLeft, DecorativebackgroundBottomRight, DecorativebackgroundTopLeft, DecorativebackgroundTopRight } from "../common/Decorativebackground";

const products = ProjectSectionData;

const ICONS: Record<string, SvgIconComponent> = {
    medication: MedicationOutlined,
    monitoring: MonitorHeartOutlined,
    health: HealthAndSafetyOutlined,
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ProductsSection() {
    const reduceMotion = useReducedMotion();

    return (
        <section
            id={products.id}
            className="relative isolate overflow-hidden bg-[#F9FFFC] py-14 my-10"
        >

            {/* Decorative background */}
            <DecorativebackgroundTopLeft className="" />
            <DecorativebackgroundTopRight className="" />
            <DecorativebackgroundBottomLeft className="" />
            <DecorativebackgroundBottomRight className="" />

            <MainContainer>

                <motion.div
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
                        duration: reduceMotion ? 0 : 0.7,
                        ease: EASE,
                    }}
                    className="mx-auto mb-12 max-w-[950px] text-center"
                >


                    <SectionEyebrow>
                        <MedicationOutlined sx={{ fontSize: 27 }} />

                        <span className="font-poppins text-base font-bold">
                            {products.eyebrow}
                        </span>
                    </SectionEyebrow>


                    <SectionTitle>
                        {products.title}{" "}
                        <SectionHighlight>
                            {products.highlight}
                        </SectionHighlight>
                    </SectionTitle>

                    {/* DESCRIPTION */}

                    <Paragraph className="mx-auto max-w-[750px] ">
                        {products.description}
                    </Paragraph>
                </motion.div>

                {/* ========================= */}
                {/* PRODUCTS GRID */}
                {/* ========================= */}

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {products.items.map((item, index) => {
                        const Icon = ICONS[item.icon] ?? MedicationOutlined;

                        return (
                            <motion.article
                                key={item.id}
                                initial={{
                                    opacity: 0,
                                    y: reduceMotion ? 0 : 40,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                    amount: 0.15,
                                }}
                                transition={{
                                    duration: reduceMotion ? 0 : 0.65,
                                    delay: reduceMotion ? 0 : index * 0.1,
                                    ease: EASE,
                                }}
                                whileHover={
                                    reduceMotion
                                        ? undefined
                                        : { y: -8 }
                                }
                                className="group relative overflow-hidden rounded-[26px] border border-[#E5EEEA] bg-white shadow-[0_12px_30px_rgba(0,75,55,0.07)] transition-shadow duration-300 hover:shadow-[0_20px_45px_rgba(0,90,60,0.13)]"
                            >
                                {/* PRODUCT IMAGE */}
                                <div className="relative h-[240px] overflow-hidden bg-[#EFF9F4] sm:h-[260px]">
                                    <Image
                                        src={item.image}
                                        alt={item.imageAlt}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>

                                {/* PRODUCT CONTENT */}
                                <div className="relative px-5 pb-7 pt-12 text-center">

                                    {/* FLOATING ICON */}
                                    <div className="absolute -top-9 left-1/2 flex h-[76px] w-[76px] -translate-x-1/2 items-center justify-center rounded-full border-[8px] border-white bg-[#E6F8EE] text-[#008F4D] shadow-sm">
                                        <Icon sx={{ fontSize: 34 }} />
                                    </div>

                                    <h3 className="font-montserrat text-[19px] font-bold leading-[1.4] card-title lg:text-lg">
                                        {item.title}
                                    </h3>

                                    <Paragraph className="mx-auto mt-3 max-w-[260px] font-poppins text-sm leading-[1.7]  sm:text-[15px]">
                                        {item.description}
                                    </Paragraph>

                                    {/* BOTTOM LINE */}
                                    <div className="mx-auto mt-3 h-[3px] w-[65px] rounded-full bg-gradient-to-r from-[#00B45D] to-[#007D45] transition-all duration-300 group-hover:w-[100px]" />
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </MainContainer>
        </section>
    );
}
