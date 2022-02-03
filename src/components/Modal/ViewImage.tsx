import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Text,
  Link,
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
      <ModalContent
        w="auto"
        h="auto"
        maxW="900px"
        maxH="600px"
        bgColor="pGray.800"
      >
        <ModalBody overflow="hidden" align="center" margin="0" padding="0">
          <Image src={imgUrl} maxW="900px" maxH="600px" />
        </ModalBody>

        <ModalFooter bgColor="pGray.800" justifyContent="flex-start">
          <Link href={imgUrl} isExternal>
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
