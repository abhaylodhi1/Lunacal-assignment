import React from "react";
import { FiTrash2 } from "react-icons/fi";

export default function GalleryCard({ image, onRemove }) {
  return (
    <div className="min-w-[180px] max-w-[220px] bg-[#0f1113] rounded-xl overflow-hidden shadow-sm relative hover:-translate-y-1 hover:shadow-lg transition-transform duration-200">

      <img
        src={image.src}
        alt={image.name || "gallery"}
        className="w-full h-40 object-cover block"
        onError={(e) => {
          // fallback on broken images
          e.currentTarget.src =
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='%23212124' width='100%25' height='100%25'/%3E%3Ctext x='50%25' y='50%25' fill='%23aaa' font-size='14' dominant-baseline='middle' text-anchor='middle'%3EImage not found%3C/text%3E%3C/svg%3E";
        }}
      />

      <div className="p-3 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent absolute bottom-0 left-0 right-0">
        <div className="text-xs truncate max-w-[120px]">{image.name}</div>
        <button
          type="button"
          onClick={onRemove}
          className="p-1 rounded bg-black/40 hover:bg-red-600 transition"
          title="Remove image"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
}
