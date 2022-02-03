import { GridItem, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const [currentUrl, setCurrentUrl] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function setImageModalOpen(
    // eslint-disable-next-line no-shadow
    onOpen: () => void,
    imgUrl: string
  ) {
    setCurrentUrl(imgUrl);
    onOpen();
  }

  return (
    <>
      <SimpleGrid maxW="864px" gap="40px" templateColumns="repeat(3, 1fr)">
        {cards?.map(card => (
          <GridItem key={card.id} w="288px" h="293px">
            <Card
              data={card}
              viewImage={() => setImageModalOpen(() => onOpen(), card.url)}
            />
          </GridItem>
        ))}
      </SimpleGrid>
      {isOpen && (
        <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={currentUrl} />
      )}
    </>
  );
}
