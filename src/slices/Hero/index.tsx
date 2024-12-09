import ContainerWrap from "@/components/container";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import "./hero.css";
import typography from "../../global/typography.module.css";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero"
    >
      <ContainerWrap>
        <div className="hero__content">
          <h1 className={typography.h1}>{slice.primary.title}</h1>
        </div>
      </ContainerWrap>

      <div className="hero__image">
        <PrismicNextImage field={slice.primary.background_image} imgixParams={{ auto: null }} />
      </div>
    </section>
  );
};

export default Hero;
