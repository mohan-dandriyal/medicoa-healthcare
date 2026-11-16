

"use client";

import Image from "next/image";
import Link from "next/link";

import {
    FacebookRounded,
    Instagram,
    YouTube,
    Twitter,
    LocationOnRounded,
    PhoneInTalkRounded,
    EmailOutlined,
} from "@mui/icons-material";

import type { SvgIconComponent } from "@mui/icons-material";

import { FooterSectionData } from "@/type/template.type";

import { MainContainer } from "@/components/layout/layout";

const footer = FooterSectionData;

const SOCIAL_ICONS: Record<string, SvgIconComponent> = {
    facebook: FacebookRounded,
    twitter: Twitter,
    instagram: Instagram,
    youtube: YouTube,
};

export default function Footer() {
    return (
        <footer className="bg-white py-8">
            <MainContainer>
                <div className="overflow-hidden rounded-[24px] bg-gradient-to-br from-[#005E42] via-[#006B48] to-[#004C37] px-6 py-10 text-white sm:px-10 lg:px-12">
                    {/* TOP FOOTER */}
                    <div className="grid gap-10 lg:grid-cols-[1.4fr_0.65fr_0.8fr] lg:gap-12">
                        {/* BRAND */}
                        <div>
                            <Link href="/" className="inline-block">
                                <Image
                                    src={footer.logo.src}
                                    alt={footer.logo.alt}
                                    width={360}
                                    height={110}
                                    className="h-auto max-w-full w-[160px] object-contain sm:w-[230px] xl:w-[260px]"
                                />
                            </Link>

                            <p className="mt-5 max-w-[500px] font-poppins text-sm leading-[1.8] text-white sm:text-base">
                                {footer.description}
                            </p>
                        </div>

                        {/* ADDRESS */}
                        <div>
                            <h3 className="flex items-center gap-3 font-montserrat text-lg font-bold">
                                <LocationOnRounded
                                    sx={{ fontSize: 28 }}
                                    className="text-[#A8EB00]"
                                />
                                {footer.address.title}
                            </h3>

                            <div className="mt-5 flex gap-3">
                                <LocationOnRounded
                                    sx={{ fontSize: 28 }}
                                    className="shrink-0 text-[#A8EB00]"
                                />

                                <div className="font-poppins text-sm sm:text-base leading-[1.8] text-white">
                                    {footer.address.lines.map((line, index) => (
                                        <p key={index}>{line}</p>
                                    ))}
                                </div>
                            </div>

                            {/* SOCIAL LINKS */}
                            <div className="mt-8 flex flex-wrap items-center gap-3">
                                {footer.socials.map((social) => {
                                    const Icon = SOCIAL_ICONS[social.icon] ?? FacebookRounded;

                                    return (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.name}
                                            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#A8EB00] text-[#A8EB00] transition-all hover:bg-[#FFFFFF] hover:text-[#004D35]"
                                        >
                                            <Icon sx={{ fontSize: 20 }} />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* CONTACT */}
                        <div>
                            <h3 className="flex items-center gap-3 font-montserrat text-lg font-bold">
                                <PhoneInTalkRounded
                                    sx={{ fontSize: 28 }}
                                    className="text-[#A8EB00]"
                                />
                                {footer.contact.title}
                            </h3>

                            <div className="mt-5 space-y-4">
                                <a
                                    href={`tel:${footer.contact.phone.replace(/[^\d+]/g, "")}`}
                                    className="flex items-center gap-3 font-poppins text-sm sm:text-base text-white hover:text-[#B4F21A]"
                                >
                                    <PhoneInTalkRounded
                                        sx={{ fontSize: 28 }}
                                        className="text-[#A8EB00]"
                                    />
                                    {footer.contact.phone}
                                </a>

                                <a
                                    href={`mailto:${footer.contact.email}`}
                                    className="flex items-center gap-3 break-all font-poppins text-sm sm:text-base text-white hover:text-[#B4F21A]"
                                >
                                    <EmailOutlined
                                        sx={{ fontSize: 26 }}
                                        className="text-[#A8EB00]"
                                    />
                                    {footer.contact.email}
                                </a>
                            </div>
                        </div>
                    </div>


                    {/* DIVIDER */}
                    <div className="my-8 h-[2px] w-full bg-[#A8EB00]" />

                    {/* BOTTOM FOOTER */}
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <nav
                            aria-label="Footer navigation"
                            className="flex flex-wrap items-center gap-x-7 gap-y-3"
                        >
                            {footer.links.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="font-poppins text-sm font-medium text-white transition-colors hover:text-[#A8EB00]"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        <p className="font-poppins text-sm text-white">
                         {footer.copyright}
                        </p>
                    </div>
                </div>
            </MainContainer>
        </footer>
    );
}
