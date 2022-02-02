import {
  Button,
  Grid,
  GridItem,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
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
  // TODO MODAL USEDISCLOSURE

  // TODO SELECTED IMAGE URL STATE

  // TODO FUNCTION HANDLE VIEW IMAGE

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function doNothing() {
    return '';
  }

  return (
    <>
      <Grid maxW="864px" gap="40px" templateColumns="repeat(3, 1fr)">
        {cards?.map(card => (
          <GridItem key={card.id} w="288px" h="293px">
            <Card data={card} viewImage={() => doNothing()} />
          </GridItem>
        ))}
      </Grid>
      {/* TODO MODALVIEWIMAGE */}
    </>
  );
}
