import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import styles from "./index.module.css";
import typography from "../../global/typography.module.css";
import button from "../../global/button.module.css";

/**
 * Props for `Contact`.
 */
export type ContactProps = SliceComponentProps<Content.ContactSlice>;

/**
 * Component for "Contact" Slices.
 */
const Contact = ({ slice }: ContactProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={styles.contact}
    >
      <div>
        <h2 className={typography.h2}>{slice.primary.title}</h2>
        <PrismicRichText field={slice.primary.content} />
        <PrismicNextLink
          className={button.button}
          field={slice.primary.button}
        />
        <div>
          {slice.primary.socials.map((item, i) => (
            <PrismicRichText field={item.link_and_svg} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
