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
  const { t, i18n } = useTranslation();

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
        aria-label={t("Like")}
        className={`absolute bottom-1 ${i18n.language==="ar" || i18n.language === 'fa'?"left-2":"right-2"} z-10`}
        color="default"
        size="sm"
        onPress={() => handleOpen()}
      >
        <PenIcon />
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} size={"5xl"} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {t("Editprofile")}
          </ModalHeader>

          <ModalBody>
            <form className="flex flex-col gap-4">
              <Input label={t("Name")} type="text" />
              <DatePicker className="w-full" label={t("Birthdate")} />
              <Textarea
                className="w-full"
                label={t("Bio")}
                placeholder={t("EnteryourBio")}
              />

              <Select
                className="w-full"
                items={LookingforItems}
                label={t("Lookingfor")}
                placeholder={t("Lookingfor")}
              >
                {(LookingforItems) => (
                  <SelectItem key={LookingforItems.title}>{LookingforItems.title}</SelectItem>
                )}
              </Select>

              <Autocomplete className="w-full" label={t("Selectcountry")}>
                <AutocompleteItem
                  key="argentina"
                  startContent={
                    <Avatar
                      alt={t("Argentina")}
                      className="w-6 h-6"
                      src="https://flagcdn.com/ar.svg"
                    />
                  }
                >
                  {t("Argentina")}
                </AutocompleteItem>
                <AutocompleteItem
                  key="venezuela"
                  startContent={
                    <Avatar
                      alt={t("Venezuela")}
                      className="w-6 h-6"
                      src="https://flagcdn.com/ve.svg"
                    />
                  }
                >
                  {t("Venezuela")}
                </AutocompleteItem>
                <AutocompleteItem
                  key="brazil"
                  startContent={
                    <Avatar
                      alt={t("Brazil")}
                      className="w-6 h-6"
                      src="https://flagcdn.com/br.svg"
                    />
                  }
                >
                  {t("Brazil")}
                </AutocompleteItem>
                <AutocompleteItem
                  key="switzerland"
                  startContent={
                    <Avatar
                      alt={t("Switzerland")}
                      className="w-6 h-6"
                      src="https://flagcdn.com/ch.svg"
                    />
                  }
                >
                  {t("Switzerland")}
                </AutocompleteItem>
                <AutocompleteItem
                  key="germany"
                  startContent={
                    <Avatar
                      alt={t("Germany")}
                      className="w-6 h-6"
                      src="https://flagcdn.com/de.svg"
                    />
                  }
                >
                  {t("Germany")}
                </AutocompleteItem>
                <AutocompleteItem
                  key="spain"
                  startContent={
                    <Avatar
                      alt={t("Spain")}
                      className="w-6 h-6"
                      src="https://flagcdn.com/es.svg"
                    />
                  }
                >
                  {t("Spain")}
                </AutocompleteItem>
                <AutocompleteItem
                  key="france"
                  startContent={
                    <Avatar
                      alt={t("France")}
                      className="w-6 h-6"
                      src="https://flagcdn.com/fr.svg"
                    />
                  }
                >
                  {t("France")}
                </AutocompleteItem>
                <AutocompleteItem
                  key="italy"
                  startContent={
                    <Avatar
                      alt={t("Italy")}
                      className="w-6 h-6"
                      src="https://flagcdn.com/it.svg"
                    />
                  }
                >
                  {t("Italy")}
                </AutocompleteItem>
                <AutocompleteItem
                  key="mexico"
                  startContent={
                    <Avatar
                      alt={t("Mexico")}
                      className="w-6 h-6"
                      src="https://flagcdn.com/mx.svg"
                    />
                  }
                >
                  {t("Mexico")}
                </AutocompleteItem>
              </Autocomplete>


            </form>
          </ModalBody>

          <ModalFooter>
            <Button color="default" variant="solid" onPress={onClose}>
              {t("Close")}
            </Button>
            <Button color="success" onPress={onClose}>
              {t("Save")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfile;
