"use client";
import { cn } from "@/lib/utils";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconX } from "@tabler/icons-react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import {MdFilterList} from "react-icons/md";


interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};




export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-full  py-4 hidden  md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[300px] shrink-0 ",
          className
        )}
        animate={{
          width: animate ? (open ? "300px" : "60px") : "300px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={cn(
            "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between md:hidden",
            className
          )}
          {...props}
        >
          <div
            className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
            onClick={() => setOpen(!open)}
          >
            <IconX />
          </div>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export const SidebarLink = ({
  link,
  className,
  equipmentOptions = [],
  ...props
}: {
  link: Links;
  className?: string;
  equipmentOptions?: Array<{ label: string; icon: React.ReactNode }>;
}) => {
  const { open, animate } = useSidebar();

  const [location, setLocation] = useState("");
  const [capacityFrom, setCapacityFrom] = useState("");
  const [capacityTo, setCapacityTo] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [showAllEquipment, setShowAllEquipment] = useState(false); 
  const visibleEquipmentCount = 2; 
  const isLocation = link.label === "Lokalizacja";
  const isCapacity = link.label === "Pojemność";
  const isPrice = link.label === "Cena";
  const isEquipment = link.label === "Wyposażenie";

  const handleEquipmentToggle = (label: string) => {
    setSelectedEquipment(prev =>
      prev.includes(label)
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const toggleShowAllEquipment = () => {
    setShowAllEquipment(!showAllEquipment);
  };

  const visibleEquipment = showAllEquipment 
    ? equipmentOptions 
    : equipmentOptions.slice(0, visibleEquipmentCount);

  return (
    <div className="w-full" {...props}>
      {open && (isLocation || isCapacity || isPrice || isEquipment) && (
        <div className="flex items-center gap-2 mb-1 px-1 text-xs font-semibold text-neutral-500 uppercase">
          {link.icon}
          {link.label}
        </div>
      )}

      {(isLocation || isCapacity || isPrice || isEquipment) && open ? (
        <motion.div
          animate={{
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          className={cn("w-full", className)}
        >
          {isLocation ? (
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Wpisz lokalizację"
              className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-black focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            />
          ) : isEquipment ? (
  <div className="flex flex-col gap-2">
    <div className="grid grid-cols-2 gap-2">
      {visibleEquipment.map((option, index) => (
        <div key={index} className="relative group">
          <button
            onClick={() => handleEquipmentToggle(option.label)}
            className={cn(
              "flex items-center gap-2 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm shadow-sm hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-700",
              selectedEquipment.includes(option.label) 
                ? "bg-neutral-100 border-black dark:bg-neutral-700 dark:border-white"
                : ""
            )}
          >
            {option.icon}
            <span className="text-neutral-700 dark:text-neutral-200 text-xs truncate">
              {option.label}
            </span>
          </button>
          {/* Tooltip */}
          <div className="absolute z-10 hidden group-hover:block bottom-full mb-2 left-1/2 transform -translate-x-1/2">
            <div className="bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap">
              {option.label}
            </div>
            <div className="absolute w-2 h-2 bg-black transform rotate-45 -translate-x-1/2 left-1/2 -bottom-1"></div>
          </div>
        </div>
      ))}
    </div>

    {equipmentOptions.length > visibleEquipmentCount && (
      <button
        onClick={toggleShowAllEquipment}
        className="flex items-center justify-center gap-1 w-full text-xs text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 mt-1"
      >
        {showAllEquipment ? (
          <>
            <RiArrowUpSLine className="h-4 w-4" />
            Zwiń
          </>
        ) : (
          <>
            <RiArrowDownSLine className="h-4 w-4" />
            Rozwiń ({equipmentOptions.length - visibleEquipmentCount} więcej)
          </>
        )}
      </button>
    )}
  </div>
) : (
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                value={isCapacity ? capacityFrom : priceFrom}
                onChange={(e) =>
                  isCapacity
                    ? setCapacityFrom(e.target.value)
                    : setPriceFrom(e.target.value)
                }
                placeholder="Od"
                className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-black focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              />
              <input
                type="number"
                min="0"
                value={isCapacity ? capacityTo : priceTo}
                onChange={(e) =>
                  isCapacity
                    ? setCapacityTo(e.target.value)
                    : setPriceTo(e.target.value)
                }
                placeholder="Do"
                className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-black focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
              />
            </div>
          )}
        </motion.div>
      ) : (
        <div className={cn("flex items-center gap-2 py-2 w-full", className)}>
          {link.icon}
          <motion.span
            animate={{
              display: animate ? (open ? "inline-block" : "none") : "inline-block",
              opacity: animate ? (open ? 1 : 0) : 1,
            }}
            className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
          >
            {link.label}
          </motion.span>
        </div>
      )}
    </div>
  );
};


export const SidebarFilterButton = ({
  className,
  ...props
}: React.ComponentProps<"button">) => {
  const { open, animate } = useSidebar();

  return (
    <motion.div
      animate={{
        opacity: open ? 1 : 0,
        display: open ? 'block' : 'none'
      }}
      transition={{ duration: 0.2 }}
      className={cn("mt-4", className)}
    >
      <button
        className={cn(
          "flex items-center justify-center rounded-md bg-black px-4 py-2 w-full text-sm text-white shadow hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 cursor-pointer"
        )}
        {...props}
      >
        <MdFilterList className="w-4 h-4 mr-2" />
        <span>Filtruj</span>
      </button>
    </motion.div>
  );
};