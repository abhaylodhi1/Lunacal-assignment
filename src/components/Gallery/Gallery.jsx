import React, { useRef, useState, useEffect } from "react";
import GalleryCard from "./GalleryCard";
import { FiPlus } from "react-icons/fi";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { HelpCircle } from "lucide-react";
import { galleryData } from "../Gallery/galleryData";

export default function Gallery() {
  const [images, setImages] = useState(galleryData);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  function onFilesSelected(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newItems = files.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 9)}`,
      src: URL.createObjectURL(file),
      name: file.name,
      file,
    }));

    setImages((prev) => [...prev, ...newItems]);
    e.target.value = "";
  }

  function removeImage(id) {
    setImages((prev) => {
      const toRemove = prev.find((p) => p.id === id);
      if (toRemove && toRemove.file) URL.revokeObjectURL(toRemove.src);
      return prev.filter((p) => p.id !== id);
    });
  }

  function scrollLeft() {
    scrollRef.current?.scrollBy({ left: -175, behavior: "smooth" });
  }

  function scrollRight() {
    scrollRef.current?.scrollBy({ left: 175, behavior: "smooth" });
  }

  useEffect(() => {
    return () => {
      images.forEach((img) => {
        if (img.file) URL.revokeObjectURL(img.src);
      });
    };
  }, []);

  return (
    <section className="relative bg-card rounded-2xl p-3 pr-9 shadow-md font-poppins">

      {/* ? icon - top left */}
      <button className="absolute top-1 left-0.5 p-2 bg-muted rounded-full hover:bg-muted/80 transition">
        <HelpCircle size={24} className="text-question-icon" />
      </button>

      {/* Custom 6-box grid (left center, no border) */}
      <div
        className="absolute left-1 top-1/2 -translate-y-1/2 bg-muted rounded-[1.16px] p-1 flex flex-wrap gap-[2px]"
        style={{
          width: "24px",
          height: "24px",
          opacity: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-grid"
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "1px",
            }}
          ></div>
        ))}
      </div>

      {/* Main content shifted right to avoid overlap */}
      <div className="ml-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-300 bg-accent px-4 py-2 rounded-lg">
            Gallery
          </h3>

          <div className="flex items-center gap-3">
            {/* Add Image Button */}
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-gray-200 
                         bg-[#2A2D32] shadow-[4px_4px_8px_#1b1d21,-4px_-4px_8px_#3b3e45]
                         hover:shadow-[0_0_15px_rgba(255,255,255,0.3),inset_4px_4px_6px_#1b1d21,inset_-4px_-4px_6px_#3b3e45]
                         transition-all duration-300 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-card"></span>
              <div className="relative flex items-center gap-2 z-10">
                <FiPlus className="text-white text-sm" />
                <span className="text-xs font-family-poppins">ADD IMAGE</span>
              </div>
            </button>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={scrollLeft}
                aria-label="scroll left"
                className="w-8 h-8 rounded-full bg-[#2A2D32] flex items-center justify-center
                            text-left-rigt-button text-[22px]
                           shadow-[4px_4px_8px_#1b1d21,-4px_-4px_8px_#3b3e45]
                           hover:shadow-[0_0_12px_rgba(255,255,255,0.4),inset_4px_4px_6px_#1b1d21,inset_-4px_-4px_6px_#3b3e45]
                           transition-all duration-300"
              >
                <BsArrowLeftShort size={26} />
              </button>

              <button
                type="button"
                onClick={scrollRight}
                aria-label="scroll right"
                className="w-8 h-8 rounded-full bg-[#2A2D32] flex items-center justify-center
                           text-left-rigt-button text-[22px]
                           shadow-[4px_4px_8px_#1b1d21,-4px_-4px_8px_#3b3e45]
                           hover:shadow-[0_0_12px_rgba(255,255,255,0.4),inset_4px_4px_6px_#1b1d21,inset_-4px_-4px_6px_#3b3e45]
                           transition-all duration-300"
              >
                <BsArrowRightShort size={26} />
              </button>
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={onFilesSelected}
              className="hidden"
            />
          </div>
        </div>

        {/* Image scroller */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto py-2 hide-scrollbar"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {images.length === 0 ? (
            <div className="flex items-center justify-center w-full py-12 text-xs text-gray-400 border border-dashed border-accent/30 rounded-lg">
              No images yet — click "Add Image" to upload.
            </div>
          ) : (
            images.map((img) => (
              <div key={img.id} className="animate-fadeIn pt-3">
                <GalleryCard image={img} onRemove={() => removeImage(img.id)} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
