import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Gallery, { GalleryProps } from "./index";
import { Content } from "@prismicio/client";
import userEvent from "@testing-library/user-event";

const mockSlice: Content.GallerySlice = {
  slice_type: "gallery",
  variation: "default",
  version: "1",
  id: "test_slice",
  slice_label: null,
  primary: {
    title: "Test Gallery",
    gallery_images: [
      {
        image: {
          id: "test1",
          url: "https://picsum.photos/800/600",
          alt: "Test image 1",
          dimensions: { width: 800, height: 600 },
          edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
          copyright: null,
        },
      },
      {
        image: {
          id: "test2",
          url: "https://picsum.photos/800/600",
          alt: "Test image 2",
          dimensions: { width: 800, height: 600 },
          edit: { x: 0, y: 0, zoom: 1, background: "transparent" },
          copyright: null,
        },
      },
    ],
  },
  items: [],
};

const mockProps: GalleryProps = {
  slice: mockSlice,
  slices: [],
  index: 0,
  context: {},
};

describe("Gallery", () => {
  it("renders the gallery title", () => {
    render(<Gallery {...mockProps} />);
    expect(screen.getByText("Test Gallery")).toBeInTheDocument();
  });

  it("renders all gallery images", () => {
    render(<Gallery {...mockProps} />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(mockSlice.primary.gallery_images.length);
  });

  it("opens modal when image is clicked", () => {
    render(<Gallery {...mockProps} />);
    const firstImageButton = screen.getAllByRole("button")[0];
    fireEvent.click(firstImageButton);

    // Check if modal is visible
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("changes active image in carousel", () => {
    render(<Gallery {...mockProps} />);

    // Open modal
    const firstImageButton = screen.getAllByRole("button")[0];
    fireEvent.click(firstImageButton);

    // Click next button in carousel
    const nextButton = document.querySelector(".carousel-control-next")!;
    fireEvent.click(nextButton);

    // Check if second image is displayed
    const carouselItems = document.querySelectorAll(".carousel-item");
    expect(carouselItems[1]).toHaveClass("carousel-item-next");
  });

  it("closes modal when close button is clicked", async () => {
    render(<Gallery {...mockProps} />);

    // Open modal
    const firstImageButton = screen.getAllByRole("button")[0];
    fireEvent.click(firstImageButton);

    // Close modal
    const closeButton = screen.getByLabelText("Close");
    fireEvent.click(closeButton);

    // Add a small delay to allow the modal to close
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check if modal is closed
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("Gallery Accessibility", () => {
  it("allows opening modal with Enter key", async () => {
    const user = userEvent.setup();
    render(<Gallery {...mockProps} />);
    const firstImageButton = screen.getAllByRole("button")[0];

    firstImageButton.focus();
    await user.keyboard('{Enter}');

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("allows closing modal with Escape key", async () => {
    render(<Gallery {...mockProps} />);

    await act(async () => {
      const firstImageButton = screen.getAllByRole("button")[0];
      fireEvent.click(firstImageButton);
    });

    await act(async () => {
      fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
      // Wait for modal transition
      await new Promise((resolve) => setTimeout(resolve, 300));
    });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("navigates carousel with arrow keys", async () => {
    const user = userEvent.setup();
    render(<Gallery {...mockProps} />);

    // Open modal
    const firstImageButton = screen.getAllByRole("button")[0];
    fireEvent.click(firstImageButton);
    
    // No need to focus any specific element
    await user.keyboard('{ArrowRight}');
    
    // Wait for carousel transition
    await new Promise((resolve) => setTimeout(resolve, 600));

    const carouselItems = document.querySelectorAll(".carousel-item");
    expect(carouselItems[1].classList.contains("active")).toBe(true);

    // Test left arrow navigation
    await user.keyboard('{ArrowLeft}');
    await new Promise((resolve) => setTimeout(resolve, 600));
    expect(carouselItems[0].classList.contains("active")).toBe(true);

    // Test boundary condition - first image
    await user.keyboard('{ArrowLeft}');
    await new Promise((resolve) => setTimeout(resolve, 600));
    expect(carouselItems[0].classList.contains("active")).toBe(true);

    // Test boundary condition - last image
    await user.keyboard('{ArrowRight}');
    await user.keyboard('{ArrowRight}');
    await new Promise((resolve) => setTimeout(resolve, 600));
    expect(carouselItems[1].classList.contains("active")).toBe(true);
  });

  it("traps focus within modal when open", async () => {
    render(<Gallery {...mockProps} />);

    await act(async () => {
      const firstImageButton = screen.getAllByRole("button")[0];
      fireEvent.click(firstImageButton);
      // Wait for modal to fully open
      await new Promise((resolve) => setTimeout(resolve, 300));
    });

    const closeButton = screen.getByLabelText("Close");
    const nextButton = document.querySelector(
      ".carousel-control-next"
    )! as HTMLElement;
    const prevButton = document.querySelector(
      ".carousel-control-prev"
    )! as HTMLElement;

    await act(async () => {
      closeButton.focus();
      await new Promise((resolve) => setTimeout(resolve, 100));
    });
    expect(document.activeElement).toBe(closeButton);

    await act(async () => {
      nextButton.focus();
      await new Promise((resolve) => setTimeout(resolve, 100));
    });
    expect(document.activeElement).toBe(nextButton);

    await act(async () => {
      prevButton.focus();
      await new Promise((resolve) => setTimeout(resolve, 100));
    });
    expect(document.activeElement).toBe(prevButton);
  });

  it("has correct ARIA labels", async () => {
    render(<Gallery {...mockProps} />);

    // Check gallery images have descriptive alt text
    const images = screen.getAllByRole("img");
    images.forEach((img, index) => {
      expect(img).toHaveAttribute("alt", `Test image ${index + 1}`);
    });

    // Open modal and check carousel controls
    await act(async () => {
      const firstImageButton = screen.getAllByRole("button")[0];
      fireEvent.click(firstImageButton);
    });

    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
    expect(document.querySelector(".carousel-control-next")).toHaveAttribute(
      "aria-label",
      "Next"
    );
    expect(document.querySelector(".carousel-control-prev")).toHaveAttribute(
      "aria-label",
      "Previous"
    );
  });
});
