import {
  Modal,
  ModalContent,
  SelectItem,
  Select,
  ModalFooter,
  DatePicker,
  Input,
  Autocomplete,
  ModalHeader,
  AutocompleteItem,
  Avatar,
  Button,
  useDisclosure,
  ModalBody,
  Textarea,
} from "@nextui-org/react";

import { ChatIcon, FireIcon, HeartIcon, PenIcon } from "@/Icons/index";
import { useTranslation } from "react-i18next";

const EditProfile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();

  const LookingforItems = [
    {
      id: 1,
      title: t("Heretodate"),
      description: t("IwanttogoondatesandhaveagoodtimeNolabels"),
      icon: <FireIcon />,
      color: "success" // Valid color
    },
    {
      id: 2,
      title: t("Opentochat"),
      description: t("ImheretochatandseewhereitgoesNopressure"),
      icon: <ChatIcon />,
      color: "warning" // Valid color
    },
    {
      id: 3,
      title: t("Readyforarelationship"),
      description: t("ImlookingforsomethingthatlastsNogames"),
      icon: <HeartIcon fill="#FFF" />,
      color: "danger" // Valid color
    },
  ];

  const handleOpen = () => {
    onOpen();
  };

  return (
    <>
      <Button
        isIconOnly
        aria-label="Like"
        className="absolute bottom-1 right-2 z-10"
        color="default"
        size="sm"
        onPress={() => handleOpen()}
      >
        <PenIcon />
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} size={"5xl"} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Edit profile
          </ModalHeader>

          <ModalBody>
            <form className="flex flex-col gap-4">
              <Input label="Name" type="text" />
              <DatePicker className="w-full" label="Birth date" />
              <Textarea
                className="w-full"
                label="About me"
                placeholder="Enter your description"
              />

              <Select className="w-full" label="Why you are here">
                {whyYouAreHere.map((item) => (
                  <SelectItem key={item.key}>{item.label}</SelectItem>
                ))}
              </Select>

              <Autocomplete className="w-full" label="Select country">
                <AutocompleteItem
                  key="argentina"
                  startContent={
                    <Avatar
                      alt="Argentina"
                      className="w-6 h-6"
                      src="https://flagcdn.com/ar.svg"
                    />
                  }
                >
                  Argentina
                </AutocompleteItem>
                <AutocompleteItem
                  key="venezuela"
                  startContent={
                    <Avatar
                      alt="Venezuela"
                      className="w-6 h-6"
                      src="https://flagcdn.com/ve.svg"
                    />
                  }
                >
                  Venezuela
                </AutocompleteItem>
                <AutocompleteItem
                  key="brazil"
                  startContent={
                    <Avatar
                      alt="Brazil"
                      className="w-6 h-6"
                      src="https://flagcdn.com/br.svg"
                    />
                  }
                >
                  Brazil
                </AutocompleteItem>
                <AutocompleteItem
                  key="switzerland"
                  startContent={
                    <Avatar
                      alt="Switzerland"
                      className="w-6 h-6"
                      src="https://flagcdn.com/ch.svg"
                    />
                  }
                >
                  Switzerland
                </AutocompleteItem>
                <AutocompleteItem
                  key="germany"
                  startContent={
                    <Avatar
                      alt="Germany"
                      className="w-6 h-6"
                      src="https://flagcdn.com/de.svg"
                    />
                  }
                >
                  Germany
                </AutocompleteItem>
                <AutocompleteItem
                  key="spain"
                  startContent={
                    <Avatar
                      alt="Spain"
                      className="w-6 h-6"
                      src="https://flagcdn.com/es.svg"
                    />
                  }
                >
                  Spain
                </AutocompleteItem>
                <AutocompleteItem
                  key="france"
                  startContent={
                    <Avatar
                      alt="France"
                      className="w-6 h-6"
                      src="https://flagcdn.com/fr.svg"
                    />
                  }
                >
                  France
                </AutocompleteItem>
                <AutocompleteItem
                  key="italy"
                  startContent={
                    <Avatar
                      alt="Italy"
                      className="w-6 h-6"
                      src="https://flagcdn.com/it.svg"
                    />
                  }
                >
                  Italy
                </AutocompleteItem>
                <AutocompleteItem
                  key="mexico"
                  startContent={
                    <Avatar
                      alt="Mexico"
                      className="w-6 h-6"
                      src="https://flagcdn.com/mx.svg"
                    />
                  }
                >
                  Mexico
                </AutocompleteItem>
              </Autocomplete>

              <Select
                className="w-full"
                items={LookingforItems}
                label="Looking for"
                placeholder="Looking for"
              >
                {(LookingforItems) => (
                  <SelectItem key={LookingforItems.title}>{LookingforItems.title}</SelectItem>
                )}
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
    </>
  );
};

export default EditProfile;

const whyYouAreHere = [
  { key: "cat", label: "Cat" },
  { key: "dog", label: "Dog" },
  { key: "elephant", label: "Elephant" },
  { key: "lion", label: "Lion" },
];
