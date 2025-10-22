import React, { useRef, useState, useEffect } from "react";
import GalleryCard from "./GalleryCard";
import { FiPlus, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { galleryData } from "../Gallery/galleryData";

export default function Gallery() {
    const [images, setImages] = useState(galleryData);
    const inputRef = useRef(null);
    const scrollRef = useRef(null);

    // add new images from file input
    function onFilesSelected(e) {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        const newItems = files.map((file) => {
            return {
                id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
                src: URL.createObjectURL(file),
                name: file.name,
                file,
            };
        });

        setImages((prev) => [...prev, ...newItems]);
        // reset input so same file can be selected again if needed
        e.target.value = "";
    }

    // remove image and revoke object URL if needed
    function removeImage(id) {
        setImages((prev) => {
            const toRemove = prev.find((p) => p.id === id);
            if (toRemove && toRemove.file) {
                URL.revokeObjectURL(toRemove.src);
            }
            return prev.filter((p) => p.id !== id);
        });
    }

    // arrow scroll helpers
    function scrollLeft() {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
    function scrollRight() {
        if (!scrollRef.current) return;
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }

    // cleanup object URLs when component unmounts
    useEffect(() => {
        return () => {
            images.forEach((img) => {
                if (img.file) URL.revokeObjectURL(img.src);
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="bg-card rounded-2xl p-6 shadow-md">
            {/* Header with Gallery title and buttons */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-300 bg-accent px-4 py-2 rounded-lg">
                    Gallery
                </h3>

                <div className="flex items-center gap-3">
                    {/* Add Image Button with Gradient */}
                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-2 rounded-full  hover:opacity-90 transition-all duration-300 shadow-lg"
                    >
                        <FiPlus className="text-sm" />
                        <span className="text-xs font-medium">Add Image</span>
                    </button>

                    {/* Navigation Buttons with Gradient */}
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={scrollLeft}
                            aria-label="scroll left"
                            className="w-8 h-8 rounded-full bg-gradient-to-r from-[#303439] to-[#161718] hover:opacity-90 transition-all duration-300 shadow-lg flex items-center justify-center"
                        >
                            <FiChevronLeft className="text-sm" />
                        </button>
                        <button
                            type="button"
                            onClick={scrollRight}
                            aria-label="scroll right"
                            className="w-8 h-8 rounded-full bg-gradient-to-r from-[#303439] to-[#161718] hover:opacity-90 transition-all duration-300 shadow-lg flex items-center justify-center"
                        >
                            <FiChevronRight className="text-sm" />
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

            {/* Gallery Content */}
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
                        <div key={img.id} className="animate-fadeIn">
                            <GalleryCard image={img} onRemove={() => removeImage(img.id)} />
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}