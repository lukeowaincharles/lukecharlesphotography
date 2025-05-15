import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import "./emailsignature.css";
/**
 * Props for `EmailSignature`.
 */
export type EmailSignatureProps =
  SliceComponentProps<Content.EmailSignatureSlice>;

/**
 * Component for "EmailSignature" Slices.
 */
const EmailSignature = ({ slice }: EmailSignatureProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="email-signature"
    >
      <div className="email-signature__image">
        <PrismicNextImage field={slice.primary.email_banner} imgixParams={{ auto: null }} />
      </div>
    </section>
  );
};

export default EmailSignature;
