"use client";

import React, { useLayoutEffect } from "react";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Col, Container, Row } from "react-bootstrap";
import Glide, {
  Controls,
  Breakpoints,
} from "@glidejs/glide/dist/glide.modular.esm";
// Required Core Stylesheet Glidejs
import "@glidejs/glide/dist/css/glide.core.min.css";
// Optional Theme Stylesheet
import "@glidejs/glide/dist/css/glide.theme.min.css";
import "./carousel.css";

/**
 * Props for `ShowcaseCarousel`.
 */
export type ShowcaseCarouselProps =
  SliceComponentProps<Content.ShowcaseCarouselSlice>;

/**
 * Component for "ShowcaseCarousel" Slices.
 */
const ShowcaseCarousel = ({ slice }: ShowcaseCarouselProps): JSX.Element => {
  useLayoutEffect(() => {
    let sliders: any = document.querySelectorAll(".glide");
    for (let i = 0; i < sliders.length; i++) {
      let glide = new Glide(sliders[i], {
        gap: 24,
        // eslint-disable-next-line no-undef
        startAt: 0,
        perView: 1.5,
        type: "slider",
        breakpoints: {
          1200: {
            perView: 1.5,
          },
          768: {
            perView: 1,
            gap: 16,
          },
        },
      });
      glide.mount({ Controls, Breakpoints });
    }
  }, []);
  const CarouselContent = slice.primary.carousel.map((item, i) => (
    <li className="glide__slide" key={i}>
      <PrismicNextImage field={item.carousel_image} imgixParams={{ auto: undefined }} />
    </li>
  ));
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel-block"
    >
      <Container>
        <Row>
          <Col xl="4">
            <div className="">
              <p>{slice.primary.eyeborw}</p>
              <h2>{slice.primary.title}</h2>
              <PrismicRichText field={slice.primary.description} />
            </div>
          </Col>
        </Row>
      </Container>
      <div className="glide-container">
        <div className="glide">
          <div className="glide__track" data-glide-el="track">
            <ul className="glide__slides">{CarouselContent}</ul>
          </div>
          <div className="glide__arrows" data-glide-el="controls">
            <button
              className="glide__arrow glide__arrow--prev"
              data-glide-dir="<"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                />
              </svg>
              <span className="visually-hidden">prev</span>
            </button>
            <button
              className="glide__arrow glide__arrow--next"
              data-glide-dir=">"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-right"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                />
              </svg>
              <span className="visually-hidden">next</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowcaseCarousel;
