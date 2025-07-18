// conference_room_component.tsx
import { CardBody, CardContainer, CardItem } from "./Card";
import { Modal } from "./Modal";
import ModalContent from "./ModalContent";
import { useState } from "react";

interface ConferenceRoomProps {
  name: string;
  offer: string;
  organization_url: string;
  address: string;
  price: string;
  equipment: Array<{
    label: string;
    icon: React.ReactNode;
  }>;
  images: string[];
  isUserLoggedIn: boolean;
  excludedDates?: Date[];
}

export function ConferenceRoomComponent({
  name = "Nazwa sali",
  offer = "Nazwa Organizacji",
  organization_url = "url organizacji",
  address = "Adres sali",
  price = "Cena zł",
  equipment = [],
  images = [],
  isUserLoggedIn = false,
  excludedDates = []
}: ConferenceRoomProps) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleProductClick = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <CardContainer className="inter-var cursor-pointer">
        <CardBody 
          className="relative group/card w-full h-auto rounded-2xl p-6 bg-white/20 dark:bg-gray-50/10 border border-white/30 dark:border-gray-300/20 backdrop-filter backdrop-blur-lg shadow-md transition"
          onClick={handleProductClick}
        >
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {name}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            {address}
          </CardItem>
          <CardItem translateZ={100} className="w-full mt-4">
            <div className="aspect-video w-full rounded-xl overflow-hidden">
              <img
                src={images[0]}
                className="h-full w-full object-cover transition-transform duration-1500 ease-in-out group-hover/card:scale-110"
                alt="thumbnail"
              />
            </div>
          </CardItem>

          <div className="flex justify-between items-center mt-20">
            <CardItem
              translateZ={20}
              as="a"
              href={organization_url}
              target="__blank"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Oferta: {offer} →
            </CardItem>
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              {price}
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
      <Modal open={isModalOpen} onClose={closeModal}>
        <ModalContent 
          name={name}
          address={address}
          equipment={equipment}
          images={images}
          isUserLoggedIn={isUserLoggedIn}
          excludedDates={excludedDates}
        />
      </Modal>    
    </>
  );
}



