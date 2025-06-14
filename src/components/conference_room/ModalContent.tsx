import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { pl } from 'date-fns/locale';
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { MdCheckCircle } from "react-icons/md";

interface ModalContentProps {
  name: string;
  address: string;
  equipment: Array<{
    label: string;
    icon: React.ReactNode;
  }>;
  images: string[];
  isUserLoggedIn: boolean;
  excludedDates?: Date[];
}

export const ModalContent: React.FC<ModalContentProps> = ({
  name = "Sala konferencyjna",
  address = "Kraków, ul. S. Łojasiewicza 11",
  equipment = [],
  images = [],
  isUserLoggedIn = false,
  excludedDates = []
}) => {
  const [current, setCurrent] = useState(0);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  const isDateExcluded = (date: Date) => {
    return excludedDates.some(excludedDate => 
      date.toDateString() === excludedDate.toDateString()
    );
  };

  const handleBooking = () => {
    if (!startDate || !endDate) return;
    
    // Sprawdź czy wybrane daty nie są zajęte
    let currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      if (isDateExcluded(currentDate)) {
        alert("Wybrany zakres zawiera zajęte daty!");
        return;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setIsBookingConfirmed(true);
    setTimeout(() => setIsBookingConfirmed(false), 5000);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full w-full gap-4 md:gap-6">
      <div className="w-full lg:w-2/3 flex flex-col p-2 md:p-4 space-y-4">
        <div className="relative w-full aspect-video overflow-hidden rounded-xl group">
          {images.length > 0 ? (
            <img
              src={images[current]}
              alt={`slide-${current}`}
              className="h-full w-full object-cover transition-transform duration-1500 ease-in-out group-hover/card:scale-110"
            />
          ) : (
            <div className="h-full w-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400">Brak zdjęć</span>
            </div>
          )}

          {images.length > 1 && (
            <>
              {current > 0 && (
                <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out cursor-pointer z-10">
                  <span className="text-2xl text-gray-700 dark:text-gray-200 select-none">‹</span>
                </button>
              )}

              {current < images.length - 1 && (
                <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out cursor-pointer z-10">
                  <span className="text-2xl text-gray-700 dark:text-gray-200 select-none">›</span>
                </button>
              )}
            </>
          )}
        </div>
        
        {images.length > 1 && (
          <div className="flex space-x-2 justify-center">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full transition ${
                  idx === current ? "bg-gray-800 dark:bg-gray-200" : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        )}
        
        <div className="w-full mt-2 md:mt-4">
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={setDateRange}
            inline
            monthsShown={1}
            locale={pl}
            minDate={new Date()}
            filterDate={(date) => !isDateExcluded(date)}
            calendarClassName="!border-none !shadow-none !w-full"
            wrapperClassName="!w-full"
            dayClassName={(date) => {
              const baseClass = "!text-sm";
              if (isDateExcluded(date)) {
                return `${baseClass} !bg-red-100 !text-red-500 !line-through dark:!bg-red-900/30 dark:!text-red-400 cursor-not-allowed`;
              }
              return baseClass;
            }}
            renderCustomHeader={({
              monthDate,
              decreaseMonth,
              increaseMonth,
            }) => (
              <div className="flex items-center justify-between px-1 mb-1">
                <button
                  onClick={decreaseMonth}
                  className="p-1 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
                >
                  <RiArrowLeftSLine className="w-4 h-4" />
                </button>
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                  {monthDate.toLocaleString('pl-PL', { month: 'long' })}
                </span>
                <button
                  onClick={increaseMonth}
                  className="p-1 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded"
                >
                  <RiArrowRightSLine className="w-4 h-4" />
                </button>
              </div>
            )}
          />
        </div>

        {isUserLoggedIn && (
          <div className="mt-4 flex flex-col items-center space-y-2">
            <button 
              onClick={handleBooking}
              disabled={!startDate || !endDate}
              className="px-6 py-3 w-full bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-base font-medium disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
            >
              Zarezerwuj {startDate && endDate && `(${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()})`}
            </button>
            
            {isBookingConfirmed && (
              <div className="flex items-center text-green-600 dark:text-green-400 text-sm p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <MdCheckCircle className="mr-2" />
                Rezerwacja przebiegła pomyślnie. Szczegóły zostaną przesłane na przypisany do konta adres e-mail.
              </div>
            )}
          </div>
        )}
      </div>

      <div className="w-full lg:w-1/3 p-2 md:p-4 flex flex-col h-full border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700">
        <div className="flex-1 overflow-y-auto space-y-6 divide-y divide-gray-200 dark:divide-gray-700 pr-2">
          <div className="pb-4">
            <h2 className="text-xl md:text-2xl font-semibold">{name}</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm md:text-base">
              {address}
            </p>
          </div>
          
          {equipment.length > 0 ? (
            equipment.map((item, index) => (
              <div key={index} className="pt-3 pb-3 flex items-center gap-2">
                {item.icon}
                <p className="text-sm md:text-base">{item.label}</p>
              </div>
            ))
          ) : (
            <div className="pt-3 pb-3 text-gray-500 dark:text-gray-400">
              Brak informacji o wyposażeniu
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalContent;