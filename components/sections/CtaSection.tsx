



"use client";

import Image from "next/image";
import {
    motion,
    useReducedMotion,
} from "framer-motion";

import { CtaSectionData } from "@/type/template.type";
import { MainContainer, Paragraph } from "../layout/layout";


const cta = CtaSectionData;

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CtaSection() {
    const reduceMotion = useReducedMotion();

    return (
        <section
            id={cta.id}
            className="relative isolate overflow-hidden bg-[#FFFFFF] sm:py-14 sm:my-10"
        >

            <MainContainer>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: reduceMotion ? 0 : 35,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                        duration: reduceMotion ? 0 : 0.7,
                        ease: EASE,
                    }}
                    className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#005E43] via-[#007B52] to-[#006A47] shadow-[0_12px_35px_rgba(0,90,60,0.08)]"
                >
                    <div className="grid min-h-[290px] grid-cols-1 md:grid-cols-[38%_62%]">

                        {/* LEFT BANNER IMAGE */}
                        <div className="relative h-[240px] overflow-hidden bg-white md:h-auto md:min-h-[290px] md:rounded-r-[50%] md:border-r-[8px] md:border-white">
                            <div className="absolute inset-0 overflow-hidden  border-white ">
                                <Image
                                    src={cta.image}
                                    alt={cta.imageAlt}
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, 40vw"
                                    className="object-cover object-center"
                                />
                            </div>

                            {/* <div className="absolute top-0 -right-16 border-r-4  w-full h-full scale-110 rounded-full "></div> */}
                        </div>

                        {/* RIGHT BANNER CONTENT */}
                        <div className="flex flex-col justify-center px-7 py-10 sm:px-10 lg:px-14">
                            <h2 className="font-montserrat text-[28px] font-extrabold leading-[1.2] tracking-tight text-white sm:text-4xl lg:text-[46px]">
                                {cta.title}{" "}
                                <span className="text-[#D9F37A]">
                                    {cta.highlight}
                                </span>
                            </h2>

                            <Paragraph className="mt-5 max-w-[850px] font-poppins font-normal text-base leading-[1.7] text-white/95 sm:text-lg lg:text-[21px]">
                                {cta.description}
                            </Paragraph>
                        </div>
                    </div>
                </motion.div>
            </MainContainer>

        </section>
    );
}
