

"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";

import {
    motion,
    useReducedMotion,
} from "framer-motion";

import {
    EmailOutlined,
    PersonOutlineRounded,
    PhoneOutlined,
    AppsRounded,
    ChatBubbleOutlineRounded,
    LocationOnRounded,
    SendRounded,
} from "@mui/icons-material";

import type { SvgIconComponent } from "@mui/icons-material";

import { ContactSectionData } from "@/type/template.type";

import {
    MainContainer,
    Section,
    SectionTitle,
    SectionHighlight,
    SectionEyebrow,
    Paragraph,
} from "@/components/layout/layout";
import { DecorativebackgroundBottomLeft, DecorativebackgroundBottomRight, DecorativebackgroundTopLeft, DecorativebackgroundTopRight } from "../common/Decorativebackground";

const contact = ContactSectionData;

const ICONS: Record<string, SvgIconComponent> = {
    person: PersonOutlineRounded,
    email: EmailOutlined,
    phone: PhoneOutlined,
    subject: AppsRounded,
    location: LocationOnRounded,
};

const EASE = [0.22, 1, 0.36, 1] as const;

type FormValues = {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
};

const initialValues: FormValues = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
};

export default function ContactSection() {
    const reduceMotion = useReducedMotion();

    const [form, setForm] = useState<FormValues>(initialValues);
    const [status, setStatus] = useState("");

    const updateField = (name: keyof FormValues, value: string) => {
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        setStatus("");
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        setStatus(
            "The form is ready, but message delivery has not been configured yet."
        );
    };

    return (
        <Section className="relative isolate overflow-hidden bg-[#FAFFFC] mb-10 mt-4 pb-14 pt-8 sm:mt-10 sm:pt-14">


            {/* Decorative background */}
            <DecorativebackgroundTopLeft className="" />
            <DecorativebackgroundTopRight className="" />
            <DecorativebackgroundBottomLeft className="" />
            <DecorativebackgroundBottomRight className="" />



            <MainContainer>
                <div id={contact.id} className="relative">
                    {/* SECTION HEADING */}
                    <motion.div
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: reduceMotion ? 0 : 0.7,
                            ease: EASE,
                        }}
                        className="mx-auto mb-8 sm:mb-10 max-w-[900px] text-center"
                    >
                        <SectionEyebrow>
                            <EmailOutlined sx={{ fontSize: 20 }} />
                            {contact.eyebrow}
                        </SectionEyebrow>

                        <div>
                        <SectionTitle>
                                {contact.title.primary}{" "}
                                <SectionHighlight>
                                    {contact.title.highlight}
                                </SectionHighlight>
                            </SectionTitle>
                        </div>

                        <Paragraph className="mx-auto mt-4 max-w-[680px] text-center">
                            {contact.description}
                        </Paragraph>
                    </motion.div>

                    {/* CONTACT GRID */}
                    <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]">
                        {/* LEFT CONTACT FORM */}
                        <motion.div
                            initial={false}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: reduceMotion ? 0 : 0.7,
                                ease: EASE,
                            }}
                            className="min-w-0 rounded-[26px] border border-[#E8EEEA] bg-white p-6 shadow-[0_12px_35px_rgba(0,60,40,0.07)] sm:p-8"
                        >
                            <form onSubmit={handleSubmit}>
                                {/* DYNAMIC INPUT FIELDS */}
                                <div className="grid gap-5 sm:grid-cols-2">
                                    {contact.form.fields.map((field) => {
                                        const Icon = ICONS[field.icon] ?? AppsRounded;
                                        const name = field.name as keyof FormValues;

                                        return (
                                            <label
                                                key={field.name}
                                                className="flex h-[56px] items-center gap-3 rounded-[10px] border border-[#D7DEE1] px-4 transition-colors focus-within:border-[#009B55]"
                                            >
                                                <Icon
                                                    sx={{ fontSize: 22 }}
                                                    className="shrink-0 text-[#008F4D]"
                                                />

                                                <input
                                                    type={field.type}
                                                    name={field.name}
                                                    value={form[name]}
                                                    onChange={(event) =>
                                                        updateField(name, event.target.value)
                                                    }
                                                    placeholder={field.placeholder}
                                                    aria-label={field.placeholder}
                                                    required={field.required}
                                                    className="w-full min-w-0 bg-transparent font-poppins text-sm text-[#18333A] outline-none placeholder:text-[#69747B]"
                                                />
                                            </label>
                                        );
                                    })}
                                </div>

                                {/* MESSAGE FIELD */}
                                <label className="mt-5 flex min-h-[150px] items-start gap-3 rounded-[10px] border border-[#D7DEE1] px-4 py-4 focus-within:border-[#009B55]">
                                    <ChatBubbleOutlineRounded
                                        sx={{ fontSize: 22 }}
                                        className="mt-0.5 shrink-0 text-[#008F4D]"
                                    />

                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={(event) =>
                                            updateField("message", event.target.value)
                                        }
                                        placeholder={contact.form.messagePlaceholder}
                                        aria-label={contact.form.messagePlaceholder}
                                        required
                                        rows={5}
                                        className="min-w-0 w-full resize-y bg-transparent font-poppins text-sm text-[#18333A] outline-none placeholder:text-[#69747B]"
                                    />
                                </label>

                                {/* SUBMIT BUTTON */}
                                <button
                                    type="submit"
                                    className="mt-6 font-montserrat inline-flex items-center justify-center gap-3 rounded-[10px] bg-gradient-to-r from-[#007D40] to-[#009D51] px-7 py-4 font-poppins text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,120,65,0.25)]"
                                >
                                    <SendRounded sx={{ fontSize: 20 }} />
                                    {contact.form.submitText}
                                </button>

                                {status && (
                                    <p role="status" className="mt-4 text-sm text-[#5B6770]">
                                        {status}
                                    </p>
                                )}
                            </form>
                        </motion.div>

                        {/* RIGHT CONTACT INFORMATION */}
                        <motion.div
                            initial={false}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: reduceMotion ? 0 : 0.7,
                                ease: EASE,
                            }}
                            className="min-w-0 overflow-hidden relative rounded-[26px] border border-[#E8EEEA] bg-white shadow-[0_12px_35px_rgba(0,60,40,0.07)]"
                        >
                            {/* Curved green accent */}


                            {/* TOP IMAGE */}
                            <div className="sm:h-[210px] h-[180px] bg-[#FFFFFF] relative">
                                <div
                                    aria-hidden="true"
                                    className="absolute -left-2 -top-6 h-full w-full rounded-tl-full  border-t-[16px] border-[#008D4B]"
                                />

                                <div className="relative h-full rounded-tl-full overflow-hidden ">
                                    <Image
                                        src={contact.info.image}
                                        alt={contact.info.imageAlt}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 40vw"
                                        className="object-cover"
                                    />


                                </div>
                            </div>

                            {/* CONTACT ITEMS */}
                            <div className="px-6 py-2 sm:px-8">
                                {contact.info.items.map((item, index) => {
                                    const Icon = ICONS[item.icon] ?? EmailOutlined;

                                    const content = (
                                        <div className="flex items-center gap-5 py-5">
                                            <span className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[10px] bg-[#E7F7ED] text-[#008F4D]">
                                                <Icon sx={{ fontSize: 29 }} />
                                            </span>

                                            <div className="min-w-0">
                                                <h3 className="font-montserrat text-base font-bold card-title">
                                                    {item.title}
                                                </h3>

                                                <Paragraph className="mt-1 break-words font-poppins font-normal text-sm sm:text-[15px] leading-relaxed text-[#65727A]">
                                                    {item.value}
                                                </Paragraph>
                                            </div>
                                        </div>
                                    );

                                    return (
                                        <div
                                            key={index}
                                            className={
                                                index !== contact.info.items.length - 1
                                                    ? "border-b border-[#E8ECEA]"
                                                    : ""
                                            }
                                        >
                                            {item.href ? (
                                                <Link href={item.href} className="block hover:opacity-80">
                                                    {content}
                                                </Link>
                                            ) : (
                                                content
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </MainContainer>
        </Section>
    );
}
