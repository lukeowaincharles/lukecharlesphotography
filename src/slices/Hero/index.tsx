import ContainerWrap from "@/components/container";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";
import typography from "../../global/typography.module.css";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const backgroundImage = slice.primary.background_image;
  // setup mobile bg image
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.hero}
      style={{ backgroundImage: `url(${backgroundImage.url})` }}
    >
      {/* <PrismicNextImage field={slice.primary.background_image}  /> */}

      <ContainerWrap>
        <div className={styles.hero__content}>
          <h1 className={typography.h1}>{slice.primary.title}</h1>
        </div>
      </ContainerWrap>
    </section>
  );
};

export default Hero;
