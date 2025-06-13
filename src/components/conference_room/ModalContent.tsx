// components/ProductModalContent.tsx
import React, { useState } from "react";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
import { MdOutlineSignalWifiStatusbar4Bar } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa6";
import { RiProjector2Line, RiSnowflakeLine } from "react-icons/ri";

const images = [img1, img2, img3];

export const ModalContent: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const prev = () =>
    setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="flex flex-col sm:flex-row h-full w-full">
      <div className="w-full sm:w-1/2 flex flex-col items-center p-4">
        <div className="relative w-full h-70 overflow-hidden rounded-xl group">
            
          <img
            src={images[current]}
            alt={`slide-${current}`}
            className="h-full w-full object-cover transition-transform duration-1500 ease-in-out group-hover/card:scale-110"
          />

          {current > 0 && (
            <button
              onClick={prev}
              className="
                absolute left-3 top-1/2 -translate-y-1/2
                w-10 h-10
                bg-white/80 dark:bg-gray-800/80
                rounded-full
                flex items-center justify-center
                shadow-md
                opacity-0 group-hover:opacity-100
                transition-opacity duration-200 ease-in-out
                cursor-pointer
                z-10
              "
            >
              <span className="text-2xl text-gray-700 dark:text-gray-200 select-none">
                ‹
              </span>
            </button>
          )}

          {current < images.length - 1 && (
            <button
              onClick={next}
              className="
                absolute right-3 top-1/2 -translate-y-1/2
                w-10 h-10
                bg-white/80 dark:bg-gray-800/80
                rounded-full
                flex items-center justify-center
                shadow-md
                opacity-0 group-hover:opacity-100
                transition-opacity duration-200 ease-in-out
                cursor-pointer
                z-10
              "
            >
              <span className="text-2xl text-gray-700 dark:text-gray-200 select-none">
                ›
              </span>
            </button>
          )}
        </div>
        <div className="flex space-x-2 mt-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`
                w-3 h-3 rounded-full transition
                ${idx === current
                  ? "bg-gray-800 dark:bg-gray-200"
                  : "bg-gray-300 dark:bg-gray-600"}
              `}
            />
          ))}
        </div>
      </div>

      <div className="w-full sm:w-1/2 p-4 flex flex-col h-full">
        <div className="flex-1 overflow-y-auto space-y-6 divide-y divide-gray-200 dark:divide-gray-700 pr-2">
          <div className="pb-4">
            <h2 className="text-2xl font-semibold">Sala konferencyjna</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Kraków, ul. S. Łojasiewicza 11
            </p>
          </div>
            <div className="pt-4 pb-4 flex items-center gap-2">
                <MdOutlineSignalWifiStatusbar4Bar className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
                <p>Wi-Fi</p>
            </div>
          <div className="pt-4 pb-4 flex items-center gap-2">
                <FaRegLightbulb className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
                <p>Regulowane oświetlenie</p>
            </div>
          <div className="pt-4 pb-4 flex items-center gap-2">
                <RiProjector2Line className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
                <p>Projektor</p>
            </div>
          <div className="pt-4 pb-4 flex items-center gap-2">
                <RiSnowflakeLine className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
                <p>Klimatyzacja / wentylacja</p>
            </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
            Zarezerwuj
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalContent;
