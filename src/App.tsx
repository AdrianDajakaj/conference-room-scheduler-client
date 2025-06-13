import { useState } from "react";
import { Sidebar, SidebarBody, SidebarFilterButton, SidebarLink } from "@/components/sidebar/sidebar";
import { cn } from "@/lib/utils";
import { Logo, LogoIcon } from "./components/sidebar/logo";
import {   RiProjector2Line , RiArtboardLine, 
  RiTv2Line, RiUsbLine, RiWebcamLine, RiSnowflakeLine, RiComputerLine, RiFridgeLine, RiWaterFlashLine} from "react-icons/ri";
import { MdOutlineFastfood, MdOutlineCoffeeMaker, MdTabletMac, MdRollerShadesClosed, MdShelves,
  MdOutlinePinDrop , MdOutlinePriceChange, MdReduceCapacity, MdOutlineSettingsInputComponent, MdFilterList,
  MdLogin, MdOutlineSpeakerGroup, MdOutlineSignalWifiStatusbar4Bar, MdMic, MdOutlineSettingsInputHdmi, MdCalendarMonth 
    } from "react-icons/md";
import { BsEthernet } from "react-icons/bs";
import { LuAlarmSmoke } from "react-icons/lu";
import { FaRegLightbulb } from "react-icons/fa6";
import { PiFirstAidKit } from "react-icons/pi";
import { GiDefibrilate } from "react-icons/gi";
import { GiLiquidSoap } from "react-icons/gi";
import { GiRoundTable } from "react-icons/gi";
import { PiOfficeChair } from "react-icons/pi";
import { PiLecternLight } from "react-icons/pi";
import { ConferenceRoomComponent } from "./components/conference_room/ConferenceRoomComponent";
import 'rsuite/DateRangePicker/styles/index.css';

function App() {

const equipmentOptions = [
  // 🪑 Meble
  {
    label: "Stół konferencyjny",
    icon: <GiRoundTable className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  },
  {
    label: "Krzesła ergonomiczne",
    icon: <PiOfficeChair className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  },
  {
    label: "Mównica / pulpit",
    icon: <PiLecternLight className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  },
  {
    label: "Regały na dokumenty",
    icon: <MdShelves className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  },

  // 📽 Sprzęt audiowizualny
  {
    label: "Projektor",
    icon: <RiProjector2Line className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  },
  {
    label: "Telewizor",
    icon: <RiTv2Line className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  },
  {
    label: "Wideokonferencja",
    icon: <RiWebcamLine className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  },
  {
    label: "Nagłośnienie",
    icon: <MdOutlineSpeakerGroup className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  },
  {
    label: "Mikrofony",
    icon: <MdMic className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  },
  {
    label: "Tablica",
    icon: <RiArtboardLine className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  },

  // 💻 Sprzęt komputerowy i łączność
  {
    label: "Komputer",
    icon: <RiComputerLine className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  },
  {
    label: "Tablet / panel sterujący salą",
    icon: <MdTabletMac className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  },
  {
    label: "WiFi",
    icon: <MdOutlineSignalWifiStatusbar4Bar className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  },
  {
    label: "Gniazda i kable HDMI, VGA",
    icon: <MdOutlineSettingsInputHdmi className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  },
  {
    label: "Gniazdo Ethernet RJ45",
    icon: <BsEthernet className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  },
  {
    label: "USB",
    icon: <RiUsbLine className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  },

  // 💡 Wyposażenie dodatkowe
  {
    label: "Regulowane oświetlenie",
    icon: <FaRegLightbulb className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  },
  {
    label: "Rolety / zasłony ściemniające",
    icon: <MdRollerShadesClosed className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  },

  // 🍽 Strefa relaksu i poczęstunek
  {
    label: "Katering",
    icon: <MdOutlineFastfood className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  },
  {
    label: "Ekspres do kawy",
    icon: <MdOutlineCoffeeMaker className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  },
  {
    label: "Lodówka",
    icon: <RiFridgeLine className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  },
  {
    label: "Dystrybutor wody pitnej",
    icon: <RiWaterFlashLine className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  },

  // 🛟 Bezpieczeństwo i higiena
  {
    label: "Płyn do dezynfekcji",
    icon: <GiLiquidSoap className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  },
  {
    label: "Apteczka pierwszej pomocy",
    icon: <PiFirstAidKit className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  },
  {
    label: "Defibrylator",
    icon: <GiDefibrilate className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  },
  {
    label: "Czujnik dymu",
    icon: <LuAlarmSmoke className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  },

  // ❄️ Klimatyzacja i wentylacja
  {
    label: "Klimatyzacja / Wentylacja",
    icon: <RiSnowflakeLine className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
  }
];


  const links = [
      {
        label: "Lokalizacja",
        href: "#",
        icon: (
          <MdOutlinePinDrop  className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
      },
      {
        label: "Cena",
        href: "#",
        icon: (
          <MdOutlinePriceChange   className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
      },
      {
        label: "Pojemność",
        href: "#",
        icon: (
          <MdReduceCapacity   className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
      },
      {
        label: "Wyposażenie",
        href: "#",
        icon: (
          <MdOutlineSettingsInputComponent  className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
      },
      {
        label: "Dostępność",
        href: "#",
        icon: (
          <MdCalendarMonth  className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
      },
      
    ];
  
    const [open, setOpen] = useState(false);
    
    return (
      <div
        className={cn(
  "mx-auto flex w-full max-w-7xl flex-1 flex-col rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
  "min-h-screen" // Zmieniamy h-screen na min-h-screen
)}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto pr-2 pl-2" >
              {open ? <Logo /> : <LogoIcon />}
              
              <div className="mt-8 flex flex-col gap-2">
                  {/* <MapComponent addresses={listaAdresów}/> */}
                {links.map((link, idx) => (
                  <SidebarLink 
                    key={idx} 
                    link={link} 
                    equipmentOptions={link.label === "Wyposażenie" ? equipmentOptions : []} 
                  />
                ))}
                <SidebarFilterButton onClick={() => console.log('Filtrowanie...')} />

              </div>
            </div>
          </SidebarBody>
        </Sidebar>
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-2.5 h-full overflow-y-auto">
          <div className="w-full px-2">
            <div className="relative flex items-center justify-between gap-2">
              <div className="md:hidden flex-shrink-0 z-10 mr-2">
                <MdFilterList 
                  className="text-neutral-800 dark:text-neutral-200 w-6 h-6"
                  onClick={() => setOpen(!open)}
                />
              </div>
  
              <div className="absolute left-0 right-0 mx-auto w-[calc(100%-100px)] sm:w-[calc(100%-120px)] md:w-full md:max-w-md px-2">
                <input
                  type="text"
                  placeholder="Szukaj"
                  className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm shadow-sm focus:border-black focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
                />
              </div>
  
              <div className="ml-auto flex-shrink-0 z-10">
                <button
                  className="flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm text-white shadow hover:bg-neutral-800 dark:bg-white dark:text-black"
                  aria-label="Login / Register"
                >
                  <span className="hidden md:block cursor-pointer">Zaloguj</span>
                  <MdLogin  className="w-5 h-5 md:hidden" />
                </button>
              </div>
            </div>
          </div>
  <div className="flex-1 h-full overflow-x-hidden overflow-y-auto px-4">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <ConferenceRoomComponent/>
    <ConferenceRoomComponent/>
    <ConferenceRoomComponent/>
    <ConferenceRoomComponent/>
  </div>
</div>
        </div>
      </div>
    );
  }

export default App
