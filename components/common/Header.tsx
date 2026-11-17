
"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
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
import { MainContainer } from "../layout/layout";

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
    const [activeSectionHref, setActiveSectionHref] = useState<string | null>(null);

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
        const targets = navItems.flatMap((item) => [item, ...(item.children ?? [])]).flatMap((link) => {
            const url = new URL(link.href, window.location.href);
            if (url.origin !== location.origin || url.pathname !== pathname || !url.hash) return [];
            try {
                const element = document.getElementById(decodeURIComponent(url.hash.slice(1)));
                return element ? [{ href: link.href, element }] : [];
            } catch {
                return [];
            }
        });
        if (!targets.length) return;
        let frame = 0;
        const update = () => {
            frame = 0;
            const offset = (headerRef.current?.getBoundingClientRect().height ?? 0) + 24;
            const ordered = targets.map((target) => ({ ...target, top: target.element.getBoundingClientRect().top }))
                .sort((a, b) => a.top - b.top);
            let active = ordered[0];
            for (const target of ordered) {
                if (target.top <= offset) active = target;
            }
            if (scrollY + innerHeight >= document.documentElement.scrollHeight - 2) active = ordered[ordered.length - 1];
            setActiveSectionHref(active.href);
        };
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        schedule();
        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);
        const observer = new ResizeObserver(schedule);
        const main = document.querySelector("main");
        if (main) observer.observe(main);
        if (headerRef.current) observer.observe(headerRef.current);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
            observer.disconnect();
        };
    }, [pathname]);

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

    // Handle every same-page anchor click, including the hash already in the URL.
    const handleSectionClick = (event: MouseEvent<HTMLElement>) => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
            event.ctrlKey || event.shiftKey || event.altKey) return;

        const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
        if (!link || link.hasAttribute("download") ||
            (link.target && link.target !== "_self")) return;

        const url = new URL(link.href, window.location.href);
        if (url.origin !== window.location.origin ||
            url.pathname !== window.location.pathname ||
            url.search !== window.location.search || !url.hash) return;

        let id: string;
        try {
            id = decodeURIComponent(url.hash.slice(1));
        } catch {
            return;
        }
        const section = document.getElementById(id);
        if (!section) return;

        event.preventDefault();
        setMobileOpen(false);
        setMobileDropdown(null);
        setOpenDropdown(null);

        if (window.location.hash !== url.hash) {
            window.history.pushState(null, "", url.pathname + url.search + url.hash);
        }

        // Let the mobile menu release its body scroll lock before scrolling.
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                section.scrollIntoView({
                    behavior: reduceMotion ? "instant" : "smooth",
                    block: "start",
                });
            });
        });
    };

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

    const linkIsActive = (href: string) =>
        href.includes("#") ? activeSectionHref === href : isActive(pathname, href);

    const itemIsActive = (item: NavItem) =>
        linkIsActive(item.href) ||
        (item.children?.some((child) => linkIsActive(child.href)) ?? false);

    return (
        <header
            ref={headerRef}
            onClickCapture={handleSectionClick}
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
            // style={{
            //     height: settings.headerHeight,
            // }}
            className={[
                "z-50 h-[var(--header-height)] [--header-height:72px] sm:[--header-height:80px] lg:[--header-height:96px] w-full shrink-0 bg-white transition-shadow duration-300 shadow shadow-gray-300",
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

            <MainContainer>
                <div className="relative mx-auto flex h-[var(--header-height)] min-w-0 items-center justify-between gap-3">
                    {/* LOGO */}
                    <Link
                        href={brand.href}
                        onClick={() => setMobileOpen(false)}
                        className="relative z-10 flex min-w-0 shrink-0 items-center pr-3 xl:pr-8"
                        aria-label={brand.name}
                    >
                        <div aria-hidden="true" className="absolute right-0 hidden h-[60%] w-0.5 bg-gray-200 lg:block" />
                        <Image
                            src={brand.logo}
                            alt={brand.logoAlt}
                            width={350}
                            height={90}
                            preload
                            sizes="(min-width: 1280px) 260px, (min-width: 640px) 230px, 160px"
                            className="h-auto max-w-full rounded-xl w-[160px] object-contain sm:w-[230px] xl:w-[260px]"
                        />
                    </Link>

                    {/* DESKTOP NAVIGATION */}
                    <nav
                        aria-label="Main navigation"
                        className="hidden h-full shrink-0 items-center gap-1 lg:flex xl:gap-2"
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
                                            aria-current={active ? (item.href.includes("#") ? "location" : "page") : undefined}
                                            onClick={() => setOpenDropdown(null)}
                                            className={[
                                                "relative font-montserrat flex h-full items-center whitespace-nowrap px-1 text-[14px] font-semibold transition-colors duration-200 xl:px-3 xl:text-[15px]",
                                                active
                                                    ? "text-[#087a39]"
                                                    : "text-[#111827] hover:text-[#087a39]",
                                            ].join(" ")}
                                        >
                                            {item.label}

                                            {active && (
                                                <motion.span
                                                    layoutId="desktop-active-link"
                                                    className="absolute bottom-5 left-2 right-2 h-[2px] rounded-full nav-active-link xl:left-3 xl:right-3"
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
                                        <div id={`desktop-menu-${item.id}`} className="absolute right-0 top-full z-50 min-w-56 rounded-b-xl border border-green-100 bg-white p-2 shadow-lg">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    aria-current={linkIsActive(child.href) ? (child.href.includes("#") ? "location" : "page") : undefined}
                                                    onClick={() => setOpenDropdown(null)}
                                                    className={`block rounded-lg px-4 py-3 text-sm hover:bg-green-50 ${linkIsActive(child.href) ? "font-semibold text-[#087a39]" : "text-slate-700"}`}
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
            </MainContainer>


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
                            style={{ top: "var(--header-height)" }}
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
                            style={{ maxHeight: "min-h-[50vh]" }}
                            className="absolute right-0 top-full z-40 w-full max-w-[420px] overflow-y-auto border-t border-green-100 bg-white p-5 shadow-2xl lg:hidden"
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
                                                    aria-current={active ? (item.href.includes("#") ? "location" : "page") : undefined}
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
                                                                    aria-current={linkIsActive(child.href) ? (child.href.includes("#") ? "location" : "page") : undefined}
                                                                    onClick={() => setMobileOpen(false)}
                                                                    className={[
                                                                        "block rounded-lg px-3 py-2.5 text-sm transition-colors",
                                                                        linkIsActive(child.href)
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
