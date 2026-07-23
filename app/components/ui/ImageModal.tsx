"use client";
import { useEffect } from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  alt: string;
}

export default function ImageModal({ isOpen, onClose, imageSrc, alt }: ImageModalProps) {
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleReset = () => {
    setScale(1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-background/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-7xl w-full max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-zinc-300 transition-colors p-2"
          aria-label="بستن"
        >
          <X size={28} />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-background/60 backdrop-blur-sm rounded-full px-4 py-2">
          <button
            onClick={handleZoomOut}
            className="text-white hover:text-zinc-300 transition-colors p-1"
            aria-label="کوچکنمایی"
          >
            <ZoomOut size={20} />
          </button>
          <span className="text-white text-sm min-w-[40px] text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="text-white hover:text-zinc-300 transition-colors p-1"
            aria-label="بزرگنمایی"
          >
            <ZoomIn size={20} />
          </button>
          <button
            onClick={handleReset}
            className="text-white text-sm hover:text-zinc-300 transition-colors px-2"
          >
            بازنشانی
          </button>
        </div>

        <img
          src={imageSrc}
          alt={alt}
          className="w-full h-auto max-h-[80vh] object-contain rounded-lg cursor-zoom-out"
          style={{ 
            transform: `scale(${scale})`,
            transition: 'transform 0.2s ease'
          }}
          onClick={onClose}
        />

        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white text-center bg-background/50 backdrop-blur-sm px-4 py-2 rounded-lg">
          <p className="text-sm">{alt}</p>
        </div>
      </div>
    </div>
  );
}
