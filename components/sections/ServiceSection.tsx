

"use client";

import Image from "next/image";

import {
    motion,
    useReducedMotion,
    type Variants,
} from "framer-motion";

import type { SvgIconComponent } from "@mui/icons-material";

import {
    MedicalServicesOutlined,
    MedicationOutlined,
    ScienceOutlined,
    FavoriteBorderRounded,
    VerifiedUserOutlined,
    VolunteerActivismOutlined,
    AssignmentTurnedInOutlined,
} from "@mui/icons-material";

import { ServiceSectionData } from "@/type/template.type";
import { MainContainer, Paragraph, SectionEyebrow, SectionHighlight, SectionTitle } from "../layout/layout";
import { DecorativebackgroundTopLeft } from "../common/Decorativebackground";

const services = ServiceSectionData;

const ICONS: Record<string, SvgIconComponent> = {
    medication: MedicationOutlined,
    science: ScienceOutlined,
    favorite: FavoriteBorderRounded,
    verified: VerifiedUserOutlined,
    volunteer: VolunteerActivismOutlined,
    assignment: AssignmentTurnedInOutlined,
};

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.09,
            delayChildren: 0.1,
        },
    },
};

const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 25,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: EASE,
        },
    },
};

export default function ServicesSection() {
    const reduceMotion = useReducedMotion();

    return (
        <section
            id={services.id}
            className="relative isolate overflow-hidden bg-[#FAFFFC] py-14 my-10"
        >
           {/* Decorative background shapes */}
            <DecorativebackgroundTopLeft className="w-[380px] h-[500px] -top-84" />

            <MainContainer >

                {/* SECTION HEADING */}
                <motion.div
                    initial={{
                        opacity: 0,
                        y: reduceMotion ? 0 : 25,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                        duration: 0.7,
                        ease: EASE,
                    }}
                    className="mx-auto mb-8 sm:mb-10 max-w-[500px] lg:max-w-[800px] text-center"
                >

                    <SectionEyebrow>
                        <MedicalServicesOutlined
                            sx={{ fontSize: 25 }}
                        />

                        <span className="font-poppins text-sm font-semibold sm:text-base">
                            {services.eyebrow}
                        </span>
                    </SectionEyebrow>

                    {/* Title */}
                    <div className="">
                        <SectionTitle>
                            {services.title.primary} {" "}
                            <SectionHighlight>
                                {services.title.highlight}
                            </SectionHighlight>
                        </SectionTitle>
                    </div>


                    {/* Description */}
                    <Paragraph className="mx-auto max-w-[850px]">
                        {services.description}
                    </Paragraph>

                 
                </motion.div>

                {/* MAIN GRID */}
                <div className="grid items-stretch gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,3fr)]">

                    {/* FEATURED IMAGE CARD */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: reduceMotion ? 0 : -40,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{
                            duration: 0.8,
                            ease: EASE,
                        }}
                        className="group relative min-h-[430px] overflow-hidden rounded-[25px] bg-[#005B40] xl:min-h-[480px]"
                    >
                        <Image
                            src={services.featured.image}
                            alt={services.featured.alt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 28vw"
                            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Bottom gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#005D43]/95 via-[#005D43]/10 to-transparent" />

                        {/* Curved decorative overlay */}
                        <div
                            aria-hidden="true"
                            className="absolute bottom-0 left-0 right-0 h-[155px] bg-[#007F53]/75 [clip-path:ellipse(95%_100%_at_50%_100%)]"
                        />

                        {/* Featured content */}
                        <div className="absolute bottom-0 left-0 right-0 z-10 p-7 sm:p-6">
                            <div className="mb-3 h-[4px] w-[60px] rounded-full bg-[#14BF59]" />

                            <h3 className=" font-montserrat text-lg font-semibold leading-[1.3] text-white lg:text-[20px]">
                                {services.featured.title}
                            </h3>
                        </div>
                    </motion.div>

                    {/* SERVICES CARDS GRID */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{
                            once: true,
                            amount: 0.1,
                        }}
                        className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
                    >
                        {services.items.map((service) => {
                            const Icon =
                                ICONS[service.icon] ?? MedicalServicesOutlined;

                            return (
                                <motion.div
                                    key={service.id}
                                    variants={reduceMotion ? undefined : cardVariants}
                                    className="h-full"
                                >
                                    <div
                                        className="group flex h-full min-h-[225px] flex-col rounded-[24px] border border-[#E8F0EB] bg-white p-6 shadow-[0_10px_35px_rgba(0,90,55,0.045)] transition-all duration-300 hover:-translate-y-2 hover:border-[#B8E5CA] hover:shadow-[0_20px_45px_rgba(0,90,55,0.12)] sm:p-5 2xl:p-6"
                                    >
                                        {/* Icon box */}
                                        <div className="mb-3 flex h-[60px] w-[72px] items-center justify-center rounded-[20px] bg-[#E9F8EF] text-[#008C45] transition-all duration-300 group-hover:bg-[#008C45] group-hover:text-white">
                                            <Icon
                                                sx={{ fontSize: 38 }}
                                            />
                                        </div>

                                        {/* Service title */}
                                        <h3 className="font-montserrat text-[19px] font-bold leading-[1.2] tracking-[-0.025em] text-[#003D2C] 2xl:text-[21px]">
                                            {service.title}
                                        </h3>

                                        {/* Description */}
                                        <Paragraph className="mt-3 font-poppins text-sm leading-[1.65] text-[#60717A] sm:text-[15px]">
                                            {service.description}
                                        </Paragraph>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </MainContainer>
        </section>
    );
}
