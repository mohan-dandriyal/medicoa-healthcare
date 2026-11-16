


"use client";

import { useRef, useState } from "react";
import Image from "next/image";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  FormatQuoteRounded,
  StarRounded,
  StarBorderRounded,
  ChevronLeftRounded,
  ChevronRightRounded,
  ChatOutlined,
} from "@mui/icons-material";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import {
  Autoplay,
  Navigation,
  Pagination,
  A11y,
} from "swiper/modules";

import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { TestimonialsSectionData } from "@/type/template.type";
import { MainContainer, Paragraph, Section, SectionEyebrow, SectionHighlight, SectionTitle } from "@/components/layout/layout";
import { DecorativebackgroundBottomLeft, DecorativebackgroundBottomRight, DecorativebackgroundTopRight } from "../common/Decorativebackground";


const testimonials = TestimonialsSectionData;

const EASE = [0.22, 1, 0.36, 1] as const;

// ========================================
// STAR RATING
// ========================================

function StarRating({ rating }: { rating: number }) {
  const safeRating = Math.max(0, Math.min(5, rating));

  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${safeRating} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) =>
        index < safeRating ? (
          <StarRounded
            key={index}
            sx={{ fontSize: 25 }}
            className="text-[#FFB900]"
          />
        ) : (
          <StarBorderRounded
            key={index}
            sx={{ fontSize: 25 }}
            className="text-[#D6DADF]"
          />
        )
      )}
    </div>
  );
}

// ========================================
// TESTIMONIAL CARD
// ========================================

type Review = (typeof testimonials.reviews)[number];

function TestimonialCard({
  review,
  active,
}: {
  review: Review;
  active: boolean;
}) {
  return (
    <article
      className={`
        group flex h-full min-h-[375px] flex-col
        rounded-[26px] border bg-white p-6 shadow-md
        shadow-[0_12px_35px_rgba(0,50,35,0.055)]
        transition-all duration-300
        sm:p-7
        ${active
          ? "border-[#009A53] shadow-[0_15px_40px_rgba(0,120,70,0.12)]"
          : "border-[#E9EEEC] hover:border-[#A8DCC0]"
        }
      `}
    >
      {/* Quote icon */}
      <FormatQuoteRounded
        sx={{ fontSize: 56 }}
        className="-ml-2 -mt-3 text-[#008D50]"
      />

      {/* Stars */}
      <div className="mt-1">
        <StarRating rating={review.rating} />
      </div>

      {/* Review */}
      <Paragraph className="mt-4 flex-1 font-poppins font-normal text-[14px] leading-[1.85] sm:text-[15px]">
        “{review.review}”
      </Paragraph>

      {/* Divider */}
      <div className="my-5 h-px w-full bg-[#E5E9E7]" />

      {/* Customer */}
      <div className="flex items-center gap-4">
        <div className="relative h-[62px] w-[62px] shrink-0 overflow-hidden rounded-full bg-[#E9F8EF]">
          <span aria-hidden="true" className="flex h-full w-full items-center justify-center font-semibold text-[#005238]">{review.name.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>
        </div>

        <div className="min-w-0">
          <h3 className="font-montserrat text-[15px] font-extrabold text-[#00432F] sm:text-base">
            {review.name}
          </h3>

          <p className="mt-1 font-poppins text-sm text-[#65717B]">
            {review.location}
          </p>
        </div>
      </div>
    </article>
  );
}

// ========================================
// TESTIMONIALS SECTION
// ========================================

export default function TestimonialsSection() {
  const swiperRef = useRef<SwiperType | null>(null);
  const reduceMotion = useReducedMotion();

  const [activeIndex, setActiveIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const updateSwiperState = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);

    const total = testimonials.reviews.length;
    const perView =
      typeof swiper.params.slidesPerView === "number"
        ? swiper.params.slidesPerView
        : 1;

    const visible = Math.max(1, Math.floor(perView));
    const pages = Math.max(1, total - visible + 1);

    setTotalPages(pages);
    setCurrentPage(Math.min(swiper.realIndex, pages - 1));
  };

  const autoplayEnabled =
    testimonials.settings.autoplay &&
    !reduceMotion &&
    testimonials.reviews.length > 1;

  return (
    <Section
      className="isolate overflow-hidden bg-[#FAFFFC] py-14 my-10"
    >

      {/* Decorative background shapes */}
      {/* <DecorativebackgroundTopLeft className=" -top-40" /> */}
      <DecorativebackgroundTopRight className="-top-40 h-[340px]" />
      <DecorativebackgroundBottomLeft className="h-[330px]" />
      <DecorativebackgroundBottomRight className="h-[330px]" />

      <MainContainer>
        <div
          id={testimonials.id}
          className="relative grid items-center gap-8 lg:grid-cols-[0.8fr_2fr] lg:gap-10"
        >
          {/* ===================================
              LEFT DOCTOR IMAGE
          =================================== */}
          <motion.div
            initial={{
              opacity: 0,
              x: reduceMotion ? 0 : -50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              ease: EASE,
            }}
            className="relative mx-auto w-full max-w-[450px] lg:self-end"
          >


            {/* Doctor portrait */}
            <div className="relative aspect-[0.78] w-full overflow-hidden rounded-[80px_100px_70px_100px]">
              <Image
                src={testimonials.image.src}
                alt={testimonials.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 30vw"
                className="object-cover object-center"
              />
            </div>
          </motion.div>

          {/* ===================================
              RIGHT CONTENT
          =================================== */}
          <div className="min-w-0 overflow-hidden">
            {/* Section header */}
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
            >
              <SectionEyebrow>
                <ChatOutlined sx={{ fontSize: 23 }} />
                {testimonials.eyebrow}
              </SectionEyebrow>

              <div className="mt-5">
                <SectionTitle className="text-[clamp(30px,3.2vw,52px)]">
                  {testimonials.title.primary}{" "}
                  <SectionHighlight>
                    {testimonials.title.highlight}
                  </SectionHighlight>
                </SectionTitle>
              </div>

              <Paragraph className="mt-4 text-base text-[#66717C]">
                {testimonials.description}
              </Paragraph>
            </motion.div>

            {/* ===================================
                SWIPER CAROUSEL
            =================================== */}
            <motion.div
              initial={{
                opacity: 0,
                y: reduceMotion ? 0 : 35,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: reduceMotion ? 0 : 0.8,
                delay: 0.15,
                ease: EASE,
              }}
              className="mt-10 min-w-0"
            >
              <Swiper
                modules={[
                  Autoplay,
                  Navigation,
                  Pagination,
                  A11y,
                ]}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                  updateSwiperState(swiper);
                }}
                onSlideChange={updateSwiperState}
                onBreakpoint={updateSwiperState}
                slidesPerView={1}
                spaceBetween={18}
                speed={testimonials.settings.speed}
                loop={
                  testimonials.settings.loop &&
                  testimonials.reviews.length > 3
                }
                autoplay={
                  autoplayEnabled
                    ? {
                      delay: testimonials.settings.delay,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
                    : false
                }
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 18,
                  },
                  1280: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                }}
                className="!overflow-visible"
              >
                {testimonials.reviews.map((review, index) => (
                  <SwiperSlide
                    key={review.id}
                    className="!h-auto"
                  >
                    <TestimonialCard
                      review={review}
                      active={index === activeIndex}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* ===================================
                  CUSTOM NAVIGATION
              =================================== */}
              <div className="mt-10 flex items-center justify-center gap-9">
                {/* Previous */}
                <button
                  type="button"
                  onClick={() => swiperRef.current?.slidePrev()}
                  aria-label="Previous testimonial"
                  className="flex h-[48px] w-[48px] items-center justify-center rounded-full border-2 border-[#008D4B] text-[#008D4B] transition-all duration-300 hover:bg-[#008D4B] hover:text-white"
                >
                  <ChevronLeftRounded sx={{ fontSize: 29 }} />
                </button>

                {/* Pagination dots */}
                <div
                  className="flex items-center gap-3"
                  aria-label="Testimonial pagination"
                >
                  {Array.from(
                    { length: totalPages },
                    (_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          if (swiperRef.current?.params.loop) {
                            swiperRef.current.slideToLoop(index);
                          } else {
                            swiperRef.current?.slideTo(index);
                          }
                        }}
                        aria-label={`Go to testimonial ${index + 1}`}
                        aria-current={
                          currentPage === index ? "true" : undefined
                        }
                        className={`h-[12px] w-[12px] rounded-full transition-all duration-300 ${currentPage === index
                            ? "bg-[#008D4B]"
                            : "bg-[#D9DEDD] hover:bg-[#9BCDB1]"
                          }`}
                      />
                    )
                  )}
                </div>

                {/* Next */}
                <button
                  type="button"
                  onClick={() => swiperRef.current?.slideNext()}
                  aria-label="Next testimonial"
                  className="flex h-[48px] w-[48px] items-center justify-center rounded-full border-2 border-[#008D4B] text-[#008D4B] transition-all duration-300 hover:bg-[#008D4B] hover:text-white"
                >
                  <ChevronRightRounded sx={{ fontSize: 29 }} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </MainContainer>

      
    </Section>
  );
}
