
"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  GroupsRounded,
  MedicalServicesOutlined,
  MedicationOutlined,
  ScienceOutlined,
  FavoriteBorderRounded,
  ChevronLeftRounded,
  ChevronRightRounded,
} from "@mui/icons-material";

import type { SvgIconComponent } from "@mui/icons-material";
import type { Swiper as SwiperType } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y } from "swiper/modules";

import "swiper/css";

import { TeamSectionData } from "@/type/template.type";

import {
  MainContainer,
  Section,
  SectionTitle,
  SectionHighlight,
  SectionEyebrow,
  Paragraph,
} from "@/components/layout/layout";
import { DecorativebackgroundBottomLeft, DecorativebackgroundBottomRight, DecorativebackgroundTopLeft, DecorativebackgroundTopRight } from "../common/Decorativebackground";

const  team  = TeamSectionData;

const ICONS: Record<string, SvgIconComponent> = {
  medical: MedicalServicesOutlined,
  medication: MedicationOutlined,
  science: ScienceOutlined,
  favorite: FavoriteBorderRounded,
};

const EASE = [0.22, 1, 0.36, 1] as const;

type Member = (typeof team.members)[number];

// ========================================
// TEAM CARD
// ========================================

function TeamCard({ member }: { member: Member }) {
  const Icon = ICONS[member.icon] ?? MedicalServicesOutlined;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border-3 border-[#ffffff] bg-white shadow-[0_12px_30px_rgba(0,75,40,0.03)]  transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(0,55,30,0.10)]">
      {/* Portrait */}
      <div className="relative aspect-[1.12] w-full overflow-hidden bg-[#EAF6F1]">
        <Image
          src={member.image}
          alt={member.alt}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, (max-width: 1280px) 32vw, 25vw"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Information panel */}
      <div className="relative -top-5 flex flex-1 flex-col items-center rounded-t-[24px] bg-[white] px-4 pb-3 pt-8 text-center ">
        {/* Specialty icon */}
        <div className="absolute -top-10 right-5 flex h-[70px] w-[70px] items-center justify-center rounded-full border-[7px] border-white bg-[#29BD78] text-white shadow-sm">
          <Icon sx={{ fontSize: 29 }} />
        </div>

        <h3 className="font-montserrat text-base sm:text-lg font-bold leading-[1.35] text-[#003E2D]">
          {member.name}
        </h3>

        <Paragraph className="mt-2 font-poppins text-sm sm:text-[15px]">
          {member.designation}
        </Paragraph>

        <div className="mt-auto pt-3">
          <span className="block h-[4px] w-[60px] rounded-full bg-[#0AAA62]" />
        </div>
      </div>
    </article>
  );
}

// ========================================
// TEAM SECTION
// ========================================

export default function TeamSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const reduceMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(1);

  const total = team.members.length;
  const canNavigate = total > visibleSlides;
  const pageCount = Math.max(1, total - visibleSlides + 1);

  const currentPage = team.settings.loop && canNavigate
    ? activeIndex % pageCount
    : Math.min(activeIndex, pageCount - 1);

  const syncSwiper = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);

    const perView = swiper.params.slidesPerView;
    setVisibleSlides(
      typeof perView === "number" ? Math.floor(perView) : 1
    );
  };

  return (
    <Section className="isolate overflow-hidden bg-[#FAFFFC] py-14 my-10">
      {/* Background shapes */}
       {/* Decorative background shapes */}
                  <DecorativebackgroundTopLeft className="" />
                  <DecorativebackgroundTopRight className="" />
                  <DecorativebackgroundBottomLeft className="w-[480px] h-[400px] -bottom-84" />
                  <DecorativebackgroundBottomRight className="w-[480px] h-[400px] -bottom-84" />

      <MainContainer>
        <div id={team.id} className="relative">
          {/* Section heading */}
          <motion.div
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 25,
            }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              ease: EASE,
            }}
            className="mx-auto mb-12 max-w-[1000px] text-center"
          >
            <SectionEyebrow>
              <GroupsRounded sx={{ fontSize: 23 }} />
              {team.eyebrow}
            </SectionEyebrow>

            <div className="mt-5 ">
              <SectionTitle>
                {team.title.primary}{" "}
                <SectionHighlight>
                  {team.title.highlight}
                </SectionHighlight>
              </SectionTitle>
            </div>

            <Paragraph className="mx-auto mt-5 max-w-[850px] text-base text-[#64727A] sm:text-lg">
              {team.description}
            </Paragraph>
          </motion.div>

          {/* Team carousel */}
          <motion.div
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 30,
            }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              duration: reduceMotion ? 0 : 0.8,
              ease: EASE,
            }}
          >
            <Swiper
              modules={[Autoplay, A11y]}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                syncSwiper(swiper);
              }}
              onSlideChange={syncSwiper}
              onBreakpoint={syncSwiper}
              slidesPerView={1}
              spaceBetween={20}
              speed={team.settings.speed}
              loop={team.settings.loop && total > 4}
              autoplay={
                team.settings.autoplay && !reduceMotion && total > 1
                  ? {
                      delay: team.settings.delay,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
                  : false
              }
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 22,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 25,
                },
              }}
              className="!pb-3"
            >
              {team.members.map((member) => (
                <SwiperSlide key={member.id} className="!h-auto py-4 px-1">
                  <TeamCard member={member} />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

          {/* Carousel controls */}
          <div className="mt-4 flex items-center justify-center gap-8">
            <button
              type="button"
              aria-label="Previous team members"
              disabled={!canNavigate}
              onClick={() => swiperRef.current?.slidePrev()}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#008D4B] text-[#008D4B] transition-colors hover:bg-[#008D4B] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeftRounded sx={{ fontSize: 28 }} />
            </button>

            <div className="flex items-center gap-3">
              {Array.from({ length: pageCount }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to team slide ${index + 1}`}
                  aria-current={currentPage === index ? "true" : undefined}
                  onClick={() => {
                    const swiper = swiperRef.current;
                    if (!swiper) return;

                    if (swiper.params.loop) {
                      swiper.slideToLoop(index);
                    } else {
                      swiper.slideTo(index);
                    }
                  }}
                  className={`h-3 w-3 rounded-full transition-colors ${
                    currentPage === index
                      ? "bg-[#008D4B]"
                      : "bg-[#DFE5E2] hover:bg-[#A3D9BB]"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next team members"
              disabled={!canNavigate}
              onClick={() => swiperRef.current?.slideNext()}
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#008D4B] text-[#008D4B] transition-colors hover:bg-[#008D4B] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRightRounded sx={{ fontSize: 28 }} />
            </button>
          </div>
        </div>
      </MainContainer>
    </Section>
  );
}
