import React, { useRef, useState, useEffect } from "react";
import GalleryCard from "./GalleryCard";
import { FiPlus } from "react-icons/fi";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { HelpCircle } from "lucide-react";
import { galleryData } from "../Gallery/galleryData";

export default function Gallery() {
  const [images, setImages] = useState(galleryData);
  const [hoveredImage, setHoveredImage] = useState(null);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  function onFilesSelected(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newItems = files.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
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
 
      <button className="absolute top-1 left-0.5 p-2 bg-muted rounded-full hover:bg-muted/80 transition">
        <HelpCircle size={24} className="text-question-icon" />
      </button>

      <div
        className="absolute left-1 top-1/2 -translate-y-1/2 bg-muted rounded-[1.16px] p-1 flex flex-wrap gap-0.5"
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

     
      <div className="ml-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-300 bg-accent px-4 py-2 rounded-lg">
            Gallery
          </h3>

          <div className="flex items-center gap-3">
          
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="relative flex items-center gap-2 px-5 py-2 rounded-full text-gray-100
                         bg-grid
                         shadow-[6px_6px_8px_#1C1E22,-2px_-2px_4px_#969696]
                         hover:shadow-[inset_2px_2px_4px_#1C1E22,inset_-2px_-2px_4px_#171717]
                         active:shadow-[inset_4px_4px_8px_#1C1E22,inset_-4px_-4px_8px_#171717]
                         transition-all duration-300 ease-out overflow-hidden"
            >
              <span
                className="absolute top-0 left-0 w-full h-[50%] rounded-t-full opacity-40 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0))",
                }}
              ></span>

              <div className="relative flex items-center gap-2 z-10">
                <FiPlus className="text-white text-sm" />
                <span className="text-xs font-sans tracking-wide">ADD IMAGE</span>
              </div>
            </button>

          
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={scrollLeft}
                aria-label="scroll left"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#2C2F34]
                           text-left-rigt-button
            shadow-[-4px_-4px_8px_#96BEE722,-4px_-4px_8px_#96BEE722]
                           hover:shadow-[inset_2px_2px_4px_#1C1E22,inset_-2px_-2px_4px_#3A3D43]
                           active:shadow-[inset_4px_4px_8px_#1C1E22,inset_-4px_-4px_8px_#3A3D43]
                           transition-all duration-300"
              >
                <BsArrowLeftShort size={24} />
              </button>

             <button
  type="button"
  onClick={scrollRight}
  aria-label="scroll right"
  className="w-9 h-9 flex items-center justify-center rounded-full bg-[#2C2F34]
             text-left-rigt-button
             shadow-[-4px_-4px_8px_#96BEE722,-4px_-4px_8px_#96BEE722]
             hover:shadow-[inset_2px_2px_4px_#1C1E22,inset_-2px_-2px_4px_#3A3D43]
             active:shadow-[inset_4px_4px_8px_#1C1E22,inset_-4px_-4px_8px_#3A3D43]
             transition-all duration-300"
>
  <BsArrowRightShort size={24} />
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

        <div
  ref={scrollRef}
  className="flex gap-4 overflow-x-auto py-2 scrollbar-hide"
  style={{ WebkitOverflowScrolling: "touch" }}
>
          {images.length === 0 ? (
            <div className="flex items-center justify-center w-full py-12 text-xs text-gray-400 border border-dashed border-accent/30 rounded-lg">
              No images yet — click "Add Image" to upload.
            </div>
          ) : (
            images.map((img) => (
              <div 
                key={img.id} 
                className="animate-fadeIn pt-3 transition-all duration-300 ease-out"
                onMouseEnter={() => setHoveredImage(img.id)}
                onMouseLeave={() => setHoveredImage(null)}
                style={{
                  transform: hoveredImage === img.id 
                    ? 'translateY(-8px) rotate(-2deg) scale(1.05)' 
                    : 'none',
                  filter: hoveredImage === img.id 
                    ? 'none' 
                    : 'grayscale(100%) brightness(0.7) opacity(0.8)',
                  transition: 'all 0.3s ease-out',
                  zIndex: hoveredImage === img.id ? 10 : 1,
                }}
              >
                <GalleryCard image={img} onRemove={() => removeImage(img.id)} />
              </div>
            ))
          )}
        </div>
      </div>

      <style>
        {`
          .animate-fadeIn {
            transition: all 0.3s ease-out;
          }
        `}
      </style>
    </section>
  );
}