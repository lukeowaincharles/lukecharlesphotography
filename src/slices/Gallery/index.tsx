"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Button, Carousel, Container, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { PrismicNextImage } from "@prismicio/next";
import global from "../../global/index.module.css";
import "./gallery.css";

/**
 * Props for `Gallery`.
 */
export type GalleryProps = SliceComponentProps<Content.GallerySlice>;

/**
 * Component for "Gallery" Slices.
 */
const Gallery = ({ slice }: GalleryProps): JSX.Element => {
  const [modalShow, setModalShow] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleClose = () => setModalShow(false);

  const handleShow = (id: any) => {
    // used to pass the correct id to the modal and show it
    setActiveImageIndex(id);
    setModalShow(true);
  };

  const handleSelect = (id: any) => {
    // used to pass the correct id to the carousel and show the selected image
    setActiveImageIndex(id);
  };

  const MASONRYIMAGES = slice.primary.gallery_images.map((item, i) => {
    return (
      <div className="photo-gallery__grid-image" key={i}>
        <Button
          onClick={() => handleShow(i)}
        >
          <PrismicNextImage
            field={item.image}
            imgixParams={{ auto: undefined }}
          />
        </Button>
      </div>
    );
  });
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={global.section__dark + " " + "photo-gallery"}
    >
      <Container>
        <div className="photo-gallery__content">
          <h2>{slice.primary.title}</h2>
        </div>
        <div className="photo-gallery__grid">{MASONRYIMAGES}</div>

        <Modal show={modalShow} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton closeVariant="white"></Modal.Header>
          <Modal.Body>
            <Carousel activeIndex={activeImageIndex} onSelect={handleSelect}>
              {slice.primary.gallery_images.map((item, id) => {
                return (
                  <Carousel.Item key={id}>
                    <figure>
                      <div
                        className="photo-gallery__bg-image"
                        key={id}
                        style={{ backgroundImage: `url(${item.image.url})` }}
                      ></div>
                    </figure>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </Modal.Body>
        </Modal>
      </Container>
    </section>
  );
};

export default Gallery;
