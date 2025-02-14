"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Button, Carousel, Container, Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
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

  const handleShow = (id: number) => {
    // used to pass the correct id to the modal and show it
    setActiveImageIndex(id);
    setModalShow(true);
  };

  const handleSelect = (id: number) => {
    // used to pass the correct id to the carousel and show the selected image
    setActiveImageIndex(id);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Only handle keyboard events when modal is open
    if (!modalShow) return;

    switch (event.key) {
      case "ArrowRight":
        if (activeImageIndex < slice.primary.gallery_images.length - 1) {
          handleSelect(activeImageIndex + 1);
        }
        break;
      case "ArrowLeft":
        if (activeImageIndex > 0) {
          handleSelect(activeImageIndex - 1);
        }
        break;
    }
  };

  // Add global keyboard listener
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown as any);
    return () => {
      document.removeEventListener("keydown", handleKeyDown as any);
    };
  }, [modalShow, activeImageIndex]);

  const galleryImages = slice.primary.gallery_images.map((item, i) => (
    <div className="photo-gallery__grid-image" key={i}>
      <Button onClick={() => handleShow(i)}>
        <PrismicNextImage
          field={item.image}
          imgixParams={{ auto: undefined }}
        />
      </Button>
    </div>
  ));
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`${global.section__dark} photo-gallery`}
    >
      <Container>
        <div className="photo-gallery__content">
          <h2>{slice.primary.title}</h2>
        </div>
        <div className="photo-gallery__grid">{galleryImages}</div>

        <Modal
          show={modalShow}
          onHide={handleClose}
          size="lg"
          centered
          aria-modal="true"
          aria-labelledby="gallery-modal-title"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <Modal.Header closeButton closeVariant="white"></Modal.Header>
          <Modal.Body>
            <Carousel
              activeIndex={activeImageIndex}
              onSelect={handleSelect}
              keyboard={false}
              controls={false}
            >
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
            <a
              className="carousel-control-next this-one"
              role="button"
              aria-label="Next"
              onClick={() => handleSelect(activeImageIndex + 1)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSelect(activeImageIndex + 1);
              }}
              tabIndex={0}
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
            </a>
            <a
              className="carousel-control-prev and-this"
              role="button"
              aria-label="Previous"
              onClick={() => handleSelect(activeImageIndex - 1)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSelect(activeImageIndex - 1);
              }}
              tabIndex={0}
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
            </a>
          </Modal.Body>
        </Modal>
      </Container>
    </section>
  );
};

export default Gallery;
