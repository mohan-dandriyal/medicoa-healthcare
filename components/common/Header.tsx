
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
} from "framer-motion";
import {
    ChevronDown,
    Menu,
    X,
} from "lucide-react";

import { headerData } from "@/type/template.type";

const { brand, navigation, settings } = headerData;

type NavItem = {
    id: string;
    label: string;
    href: string;
    children?: { label: string; href: string }[];
};

const navItems: NavItem[] = navigation;

const ease = [0.22, 1, 0.36, 1] as const;

function isActive(pathname: string, href: string) {
    if (href === "/") return pathname === "/";

    return (
        pathname === href ||
        pathname.startsWith(`${href}/`)
    );
}

export default function Header() {
    const pathname = usePathname();

    // Reset navigation state when the route changes, without a state-setting effect.
    return <HeaderContent key={pathname} pathname={pathname} />;
}

function HeaderContent({ pathname }: { pathname: string }) {
    const reduceMotion = useReducedMotion();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);

    const headerRef = useRef<HTMLElement>(null);
    const mobileToggleRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        onScroll();

        window.addEventListener("scroll", onScroll, {
            passive: true,
        });

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!mobileOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const onEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setMobileOpen(false);
                setMobileDropdown(null);
                mobileToggleRef.current?.focus();
            }
        };

        window.addEventListener("keydown", onEscape);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onEscape);
        };
    }, [mobileOpen]);

    useEffect(() => {
        const desktop = window.matchMedia("(min-width: 1024px)");
        const onBreakpointChange = () => {
            setMobileOpen(false);
            setMobileDropdown(null);
            setOpenDropdown(null);
        };

        desktop.addEventListener("change", onBreakpointChange);
        return () => desktop.removeEventListener("change", onBreakpointChange);
    }, []);

    useEffect(() => {
        const onOutsideClick = (event: PointerEvent) => {
            if (
                headerRef.current &&
                !headerRef.current.contains(event.target as Node)
            ) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener("pointerdown", onOutsideClick);

        return () =>
            document.removeEventListener("pointerdown", onOutsideClick);
    }, []);

    const toggleDropdown = (id: string) => {
        setOpenDropdown((current) =>
            current === id ? null : id
        );
    };

    const toggleMobileDropdown = (id: string) => {
        setMobileDropdown((current) =>
            current === id ? null : id
        );
    };

    const itemIsActive = (item: NavItem) =>
        isActive(pathname, item.href) ||
        (item.children?.some((child) => isActive(pathname, child.href)) ?? false);

    return (
        <header
            ref={headerRef}
            onKeyDown={(event) => {
                if (event.key === "Escape" && openDropdown) {
                    headerRef.current?.querySelector<HTMLButtonElement>(
                        `[aria-controls="desktop-menu-${openDropdown}"]`
                    )?.focus();
                    setOpenDropdown(null);
                }
            }}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    setOpenDropdown(null);
                    setMobileOpen(false);
                    setMobileDropdown(null);
                }
            }}
            style={{
                height: settings.headerHeight,
            }}
            className={[
                "z-50 w-full bg-white transition-shadow duration-300 shadow shadow-gray-300",
                settings.sticky ? "sticky top-0" : "relative",
                scrolled ? "shadow-lg shadow-black/5" : "",
            ].join(" ")}
        >
            {/* Decorative green corners */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
            >
                {["bottom-0 left-0", "right-0 top-0 rotate-180"].map((position) => (
                    <svg
                        key={position}
                        viewBox="0 0 100 100"
                        fill="currentColor"
                        className={`absolute h-full w-12 text-[#64ad19] sm:w-20 lg:w-24 ${position}`}
                        preserveAspectRatio="none"
                        focusable="false"
                    >
                        <path d="M0 24C14 70 43 100 100 100H0Z" />
                    </svg>
                ))}
            </div>

            <div className="relative mx-auto flex h-full max-w-[1400px] items-center justify-between gap-4 px-6 sm:px-8 lg:px-10">
                {/* LOGO */}
                <Link
                    href={brand.href}
                    onClick={() => setMobileOpen(false)}
                    className="relative z-10 flex shrink-0 items-center pr-3 xl:pr-8 "
                    aria-label={brand.name}
                >
                    <div className="a absolute right-0 w-0.5 h-[60%] bg-gray-200" />
                    <Image
                        src={brand.logo}
                        alt={brand.logoAlt}
                        width={350}
                        height={90}
                        preload
                        sizes="(min-width: 1280px) 300px, (min-width: 640px) 230px, 190px"
                        className="h-auto w-[160px] object-contain sm:w-[230px] xl:w-[300px]"
                    />
                </Link>

                {/* DESKTOP NAVIGATION */}
                <nav
                    aria-label="Main navigation"
                    className="hidden h-full items-center gap-1 lg:flex xl:gap-3 2xl:gap-6"
                >
                    {navItems.map((item) => {
                        const active = itemIsActive(item);
                        const opened = openDropdown === item.id;

                        return (
                            <div
                                key={item.id}
                                className="relative flex h-full items-center"
                            >
                                <div className="relative flex h-full items-center">
                                    <Link
                                        href={item.href}
                                        aria-current={pathname === item.href ? "page" : undefined}
                                        onClick={() => setOpenDropdown(null)}
                                        className={[
                                            "relative font-montserrat flex h-full items-center whitespace-nowrap px-2 text-[14px] font-bold transition-colors duration-200 xl:px-3 xl:text-[17px]",
                                            active
                                                ? "text-[#087a39]"
                                                : "text-[#111827] hover:text-[#087a39]",
                                        ].join(" ")}
                                    >
                                        {item.label}

                                        {active && (
                                            <motion.span
                                                layoutId="desktop-active-link"
                                                className="absolute bottom-[26px] left-2 right-2 h-1 rounded-full nav-active-link xl:left-3 xl:right-3"
                                                transition={{
                                                    duration: reduceMotion ? 0 : 0.3,
                                                    ease,
                                                }}
                                            />
                                        )}
                                    </Link>

                                    {!!item.children?.length && (
                                        <button
                                            type="button"
                                            aria-label={`Toggle ${item.label} submenu`}
                                            aria-expanded={opened}
                                            aria-controls={`desktop-menu-${item.id}`}
                                            onClick={() => toggleDropdown(item.id)}
                                            className="flex h-9 w-7 items-center justify-center rounded text-[#087a39] hover:bg-green-50"
                                        >
                                            <ChevronDown size={16} className={opened ? "rotate-180" : ""} />
                                        </button>
                                    )}
                                </div>
                                {opened && !!item.children?.length && (
                                    <div id={`desktop-menu-${item.id}`} className="absolute left-0 top-full z-50 min-w-56 rounded-b-xl border border-green-100 bg-white p-2 shadow-lg">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                aria-current={pathname === child.href ? "page" : undefined}
                                                onClick={() => setOpenDropdown(null)}
                                                className={`block rounded-lg px-4 py-3 text-sm hover:bg-green-50 ${isActive(pathname, child.href) ? "font-semibold text-[#087a39]" : "text-slate-700"}`}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* MOBILE TOGGLE */}
                <button
                    ref={mobileToggleRef}
                    type="button"
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                    aria-expanded={mobileOpen}
                    aria-controls="mobile-navigation"
                    onClick={() => {
                        setMobileOpen((value) => !value);
                        setMobileDropdown(null);
                    }}
                    className="relative z-50 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-green-100 bg-green-50 text-[#087a39] transition-colors hover:bg-green-100 lg:hidden"
                >
                    {mobileOpen ? <X size={25} /> : <Menu size={25} />}
                </button>
            </div>


            {/* MOBILE NAVIGATION */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.button
                            type="button"
                            aria-label="Close navigation"
                            tabIndex={-1}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                            transition={{ duration: reduceMotion ? 0 : 0.2 }}
                            style={{ top: settings.sticky ? settings.headerHeight : 0 }}
                            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
                        />

                        <motion.nav
                            id="mobile-navigation"
                            aria-label="Mobile navigation"
                            initial={{
                                opacity: 0,
                                x: reduceMotion ? 0 : 30,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            exit={{
                                opacity: 0,
                                x: reduceMotion ? 0 : 30,
                            }}
                            transition={{
                                duration: reduceMotion ? 0 : 0.3,
                                ease,
                            }}
                            style={{ maxHeight: `calc(100dvh - ${settings.headerHeight}px)` }}
                            className="absolute right-0 top-full z-40 w-full max-w-[420px] overflow-y-auto overscroll-contain border-t border-green-100 bg-white p-5 shadow-2xl lg:hidden"
                        >
                            <div className="space-y-2">
                                {navItems.map((item) => {
                                    const hasChildren = (item.children?.length ?? 0) > 0;
                                    const active = itemIsActive(item);
                                    const opened = mobileDropdown === item.id;

                                    return (
                                        <div key={item.id}>
                                            <div
                                                className={[
                                                    "flex items-center justify-between rounded-xl transition-colors",
                                                    active
                                                        ? "bg-green-50 text-[#087a39]"
                                                        : "text-slate-800 hover:bg-slate-50",
                                                ].join(" ")}
                                            >
                                                <Link
                                                    href={item.href}
                                                    aria-current={pathname === item.href ? "page" : undefined}
                                                    onClick={() => setMobileOpen(false)}
                                                    className="flex-1 px-4 py-3.5 text-[15px] font-semibold"
                                                >
                                                    {item.label}
                                                </Link>

                                                {hasChildren && (
                                                    <button
                                                        type="button"
                                                        aria-label={`Toggle ${item.label} submenu`}
                                                        aria-expanded={opened}
                                                        aria-controls={`mobile-menu-${item.id}`}
                                                        onClick={() =>
                                                            toggleMobileDropdown(item.id)
                                                        }
                                                        className="flex h-12 w-12 items-center justify-center"
                                                    >
                                                        <ChevronDown
                                                            size={19}
                                                            className={`transition-transform duration-200 ${opened ? "rotate-180" : ""
                                                                }`}
                                                        />
                                                    </button>
                                                )}
                                            </div>

                                            <AnimatePresence initial={false}>
                                                {hasChildren && opened && (
                                                    <motion.div
                                                        id={`mobile-menu-${item.id}`}
                                                        initial={{
                                                            height: 0,
                                                            opacity: 0,
                                                        }}
                                                        animate={{
                                                            height: "auto",
                                                            opacity: 1,
                                                        }}
                                                        exit={{
                                                            height: 0,
                                                            opacity: 0,
                                                        }}
                                                        transition={{
                                                            duration: reduceMotion ? 0 : 0.2,
                                                        }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="ml-5 space-y-1 border-l-2 border-green-100 py-2 pl-4">
                                                            {item.children?.map((child) => (
                                                                <Link
                                                                    key={child.href}
                                                                    href={child.href}
                                                                    aria-current={pathname === child.href ? "page" : undefined}
                                                                    onClick={() => setMobileOpen(false)}
                                                                    className={[
                                                                        "block rounded-lg px-3 py-2.5 text-sm transition-colors",
                                                                        isActive(pathname, child.href)
                                                                            ? "bg-green-50 font-semibold text-[#087a39]"
                                                                            : "text-slate-600 hover:bg-green-50 hover:text-[#087a39]",
                                                                    ].join(" ")}
                                                                >
                                                                    {child.label}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-6 border-t border-slate-100 pt-5">
                                <p className="text-center text-sm font-semibold text-[#087a39]">
                                    {brand.name}
                                </p>
                                <p className="mt-1 text-center text-xs text-slate-500">
                                    {brand.tagline}
                                </p>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
