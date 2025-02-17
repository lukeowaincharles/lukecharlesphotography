import { Content, isFilled } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import global from "../../global/index.module.css";
import { Container } from "react-bootstrap";
import { PrismicNextImage } from "@prismicio/next";
import "./photodisplay.css";
/**
 * Props for `PhotoDisplayGrid`.
 */
export type PhotoDisplayGridProps =
  SliceComponentProps<Content.PhotoDisplayGridSlice>;

/**
 * Component for "PhotoDisplayGrid" Slices.
 */
const PhotoDisplayGrid = ({ slice }: PhotoDisplayGridProps): JSX.Element => {
  const photoDisplayContent = slice.primary.display_group.map((item, i) => {
    const content = () => {
      return (
        <>
          <div className="photo-display-grid__item-content">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
          <PrismicNextImage
            field={item.image}
            imgixParams={{ auto: undefined }}
          />
        </>
      );
    };

    return (
      <div className={`photo-display-grid__item`} key={i}>
        {isFilled.link(item.link_to_project) ? (
          <a href={item.link_to_project.url}>
            <span className={global["visually-hidden"]}>
              Link to {item.link_to_project.text}
            </span>
            {content()}
          </a>
        ) : (
          content()
        )}
      </div>
    );
  });
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`${global.section__dark} photo-display-grid`}
    >
      <Container>
        <div className="photo-display-grid__content">{photoDisplayContent}</div>
      </Container>
    </section>
  );
};

export default PhotoDisplayGrid;
