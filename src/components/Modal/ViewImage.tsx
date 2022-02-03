import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Text,
  Link,
  Center,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal size="full" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW="900px" maxH="600px" bgColor="pGray.800">
        <ModalBody margin="0" padding="0">
          <Center w="100%" h="100%">
            <Image src={imgUrl} layout="fill" />
          </Center>
        </ModalBody>

        <ModalFooter
          bgColor="pGray.800"
          justifyContent="flex-start"
          width="100%"
        >
          <Link href={imgUrl} isExternal>
            <Text fontFamily="Roboto" fontSize="0.875rem" color="gray.50">
              Abrir original
            </Text>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
