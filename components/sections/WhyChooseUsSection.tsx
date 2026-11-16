


"use client";

import Image from "next/image";
import {
    LocalHospitalOutlined,
    GroupsOutlined,
    ScienceOutlined,
    VerifiedUserOutlined,
} from "@mui/icons-material";

import type { SvgIconComponent } from "@mui/icons-material";

import { WhyChooseSectionData } from "@/type/template.type";

import {
    SectionTitle,
    SectionHighlight,
    Paragraph,
    MainContainer,
    SectionEyebrow,
} from "@/components/layout/layout";
import { DecorativebackgroundTopLeft, DecorativebackgroundTopRight } from "../common/Decorativebackground";

const whyChooseUs = WhyChooseSectionData;

const ICONS: Record<string, SvgIconComponent> = {
    groups: GroupsOutlined,
    science: ScienceOutlined,
    verified: VerifiedUserOutlined,
};

export default function WhyChooseUsSection() {

    return (
        <section
            id={whyChooseUs.id}
            className="relative isolate overflow-hidden bg-white sm:pt-14 pt-3 sm:pb-32 pb-12 my-10"
            style={{
                backgroundImage: `url(/other/whyChooseBorder.png)`,
                backgroundPosition: "center bottom",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% auto"
            }}


        >
            {/* Decorative circles */}
            {/* Decorative background shapes */}
            <DecorativebackgroundTopLeft className="h-[400px] -top-84" />
            <DecorativebackgroundTopRight className=" h-[430px] -top-84" />

            <MainContainer>
                <div
                    id={whyChooseUs.id}
                    className="relative z-10 grid items-center gap-8 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)_minmax(0,1.35fr)] lg:gap-7 xl:gap-10"
                >
                    {/* LEFT CONTENT */}
                    <div className="relative z-10"
                    >
                        <SectionEyebrow>
                            <LocalHospitalOutlined
                                sx={{ fontSize: 23 }}
                            />
                            {whyChooseUs.eyebrow}
                        </SectionEyebrow>

                        <div className="mt-6">
                            <SectionTitle className="">
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
                        <div className="mt-7 h-[4px] w-[95px] rounded-full bg-[#0CAF57]"
                        />
                    </div>

                    {/* CENTER IMAGE */}
                    <div className="relative mx-auto w-full max-w-[510px] px-3 py-3"
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
                                    className="object-cover object-center"
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT FEATURE CARDS */}
                    <div className="flex flex-col gap-5 md:col-span-2 xl:col-span-1"
                    >
                        {whyChooseUs.features.map((feature) => {
                            const Icon =
                                ICONS[feature.icon] ?? VerifiedUserOutlined;

                            return (
                                <div key={feature.id} className="group flex min-h-[145px] items-center gap-3 sm:gap-4 rounded-[25px] border border-[#EDF2EF] bg-white p-5 shadow-[0_10px_30px_rgba(0,50,30,0.06)] sm:p-5"
                                >
                                    {/* Icon */}
                                    <div className="flex h-14 w-14 sm:h-[72px] sm:w-[72px] shrink-0 items-center justify-center rounded-[22px] bg-[#EAF8EF] text-[#00943D]">
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
                                </div>
                            );
                        })}
                    </div>
                </div>
            </MainContainer>
        </section>
    );
}
