import ColWrap from "@/components/column";
import ContainerWrap from "@/components/container";
import RowWrap from "@/components/row";
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import global from "../../global/index.module.css";
import button from "../../global/button.module.css";
import styles from "./index.module.css";

/**
 * Props for `TwoColMedia`.
 */
export type TwoColMediaProps = SliceComponentProps<Content.TwoColMediaSlice>;

/**
 * Component for "TwoColMedia" Slices.
 */
const TwoColMedia = ({ slice }: TwoColMediaProps): JSX.Element => {
  const backgroundImage = slice.primary.background_image;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={global.section + " " + styles.twoColMedia}
    >
      <ContainerWrap>
        <RowWrap>
          <ColWrap cols="6" layout={slice.primary.layout}>
            <PrismicRichText field={slice.primary.text} />
            <PrismicNextLink
              className={button.button + " " + button.buttonPrimary}
              field={slice.primary.button}
            />
          </ColWrap>
          <ColWrap cols="6" layout="false">
            <div
              className={styles.twoColMedia__bgImg}
              style={{ backgroundImage: `url(${backgroundImage.url})` }}
            ></div>
          </ColWrap>
        </RowWrap>
      </ContainerWrap>
    </section>
  );
};

export default TwoColMedia;
