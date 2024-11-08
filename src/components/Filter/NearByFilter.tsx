// @ts-ignore
import { useState, forwardRef, useImperativeHandle } from 'react';
import {
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
  useDisclosure,
  ModalBody,
  Slider,
  ButtonGroup,
  Switch,
} from '@nextui-org/react';
import { Select, SelectItem } from '@nextui-org/react';
import { LocationIcon } from '@/Icons/index';

// Define the ModalHandle interface for the ref
interface ModalHandle {
    openModal: () => void;
    closeModal: () => void;
}

const NearByFilter = forwardRef<ModalHandle>((ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSelected, setIsSelected] = useState(true);

  // @ts-ignore
  useImperativeHandle((ref), () => ({
    openModal: onOpen,
    closeModal: onClose
  }));

  return (
    <Modal
      backdrop="blur"
      classNames={{
        base: "absolute z-50",
      }}
      isOpen={isOpen}
      size="5xl"
      style={{ zIndex: "1000" }}
      onClose={onClose}
    >
      <ModalContent className="absolute">
        <ModalHeader className="flex flex-col gap-1">Set filters</ModalHeader>

        <ModalBody>
          <form className="flex flex-col gap-4">
            <Switch
              defaultSelected
              color="primary"
              isSelected={isSelected}
              size="md"
              thumbIcon={() => <LocationIcon />}
              onValueChange={setIsSelected}
            >
              Search by distance
            </Switch>
            {!isSelected ? (
              <ButtonGroup
                className="w-full flex py-4"
                style={{ height: "4rem" }}
              >
                <Button className="grow">My city</Button>
                <Button className="grow">My country</Button>
                <Button className="grow">Globally</Button>
              </ButtonGroup>
            ) : (
              <Slider
                className="max-w-md"
                color="secondary"
                defaultValue={150}
                label="Distance (km)"
                maxValue={500}
                minValue={50}
                showSteps={true}
                size="md"
                step={50}
                style={{ height: "4rem" }}
              />
            )}

            <Slider
              className="w-full"
              color="secondary"
              defaultValue={[18, 28]}
              label="Age"
              maxValue={100}
              minValue={18}
              step={1}
            />
            <Select
              className="w-full"
              items={LookingForItems}
              label="Looking for"
              placeholder="Looking for"
            >
              {(item) => (
                <SelectItem key={item.label}>
                  {item.label}
                </SelectItem>
              )}
            </Select>

            <Select
              className="w-full"
              label="Languages"
              placeholder="Languages"
              selectionMode="multiple"
            >
              {languages.map((language) => (
                <SelectItem key={language.key}>{language.label}</SelectItem>
              ))}
            </Select>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button color="default" variant="solid" onPress={onClose}>
            Close
          </Button>
          <Button color="success" onPress={onClose}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
});

// Set display name for easier debugging
NearByFilter.displayName = "NearByFilter";

export default NearByFilter;

// Example data for select components
export const RealationStatus = [
  { key: "cat", label: "Single" },
  { key: "dog", label: "Taken" },
  { key: "elephant", label: "open" },
  { key: "lion", label: "I’d rather not say" },
];

export const KidStatus = [
  { key: "cat", label: "Some day" },
  { key: "dog", label: "I have already" },
  { key: "elephant", label: "I don’t want kids" },
  { key: "lion", label: "I’d rather not say" },
];

const languages = [
  { key: "en", label: "English" },
  { key: "es", label: "Spanish" },
  { key: "fr", label: "French" },
  { key: "de", label: "German" },
  { key: "it", label: "Italian" },
  { key: "zh", label: "Chinese" },
  { key: "ja", label: "Japanese" },
  { key: "ko", label: "Korean" },
  { key: "ru", label: "Russian" },
  { key: "ar", label: "Arabic" },
  { key: "pt", label: "Portuguese" },
  { key: "hi", label: "Hindi" },
  { key: "bn", label: "Bengali" },
  { key: "pa", label: "Punjabi" },
  { key: "vi", label: "Vietnamese" },
  { key: "ur", label: "Urdu" },
  { key: "fa", label: "Persian" },
  { key: "tr", label: "Turkish" },
  { key: "id", label: "Indonesian" },
  { key: "th", label: "Thai" },
  { key: "ms", label: "Malay" },
  { key: "pl", label: "Polish" },
  { key: "nl", label: "Dutch" },
  { key: "sv", label: "Swedish" },
  { key: "no", label: "Norwegian" },
  { key: "fi", label: "Finnish" },
  { key: "da", label: "Danish" },
  { key: "he", label: "Hebrew" },
  { key: "el", label: "Greek" },
  { key: "hu", label: "Hungarian" },
  { key: "cs", label: "Czech" },
  { key: "ro", label: "Romanian" },
  { key: "bg", label: "Bulgarian" },
  { key: "uk", label: "Ukrainian" },
  { key: "sr", label: "Serbian" },
  { key: "sk", label: "Slovak" },
  { key: "hr", label: "Croatian" },
  { key: "lt", label: "Lithuanian" },
  { key: "lv", label: "Latvian" },
  { key: "et", label: "Estonian" },
];

const LookingForItems = [
  { key: "b", label: "Boys" },
  { key: "G", label: "Girls" },
  { key: "b2", label: "Both" },
];