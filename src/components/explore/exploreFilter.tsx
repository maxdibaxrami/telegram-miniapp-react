import { forwardRef, useImperativeHandle  } from "react";
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
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

const ExploreFilter = forwardRef((props,ref) => { {
  const { t } = useTranslation();

  const languages = [
    { key: "en", label: t("en") },
    { key: "zh", label: t("zh") },
    { key: "es", label: t("es") },
    { key: "hi", label: t("hi") },
    { key: "ar", label: t("ar") },
    { key: "bn", label: t("bn") },
    { key: "fr", label: t("fr") },
    { key: "ru", label: t("ru") },
    { key: "pt", label: t("pt") },
    { key: "id", label: t("id") },
    { key: "ja", label: t("ja") },
    { key: "de", label: t("de") },
    { key: "pa", label: t("pa") },
    { key: "ur", label: t("ur") },
    { key: "ko", label: t("ko") },
    { key: "vi", label: t("vi") },
    { key: "fa", label: t("fa") },
    { key: "tr", label: t("tr") },
    { key: "ta", label: t("ta") },
    { key: "it", label: t("it") },
  ];
  

  const Gender = [
    { key: "Male", label: t('Male') },
    { key: "Female", label: t('Female') },
  ];

  
  const { isOpen, onOpen, onClose } = useDisclosure();

  useImperativeHandle(ref, () => ({
    openModal: onOpen,
    closeModal: onClose
  }));
  if(false){
    console.log(props);
  }
  return (
      <Modal
        backdrop="blur"
        classNames={{
          base: "absolute z-50	",
        }}
        isOpen={isOpen}
        size={"5xl"}
        style={{ zIndex: "1000" }}
        onClose={onClose}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">{t("Setfilters")}</ModalHeader>
          <ModalBody>
            <form className="flex flex-col gap-4">
              <ButtonGroup className="w-full flex">
                <Button className="grow">{t("cityButton")}</Button>
                <Button className="grow">{t("countryButton")}</Button>
                <Button className="grow">{t("globalButton")}</Button>
            
              </ButtonGroup>

              <Slider
                className="w-full"
                defaultValue={[18, 28]}
                label={t("age")}
                maxValue={100}
                minValue={18}
                step={1}
              />
              <Select
                className="w-full"
                items={Gender}
                label={t("Lookingfor")}
                placeholder={t("Lookingfor")}
              >
                {(LookingForItems) => (
                  <SelectItem key={LookingForItems.label}>{LookingForItems.label}</SelectItem>
                )}
              </Select>

              <Select
                className="w-full"
                label={t("Languages")}
                placeholder={t("Languages")}
                selectionMode="multiple"
              >
                {languages.map((languages) => (
                  <SelectItem key={languages.key}>{languages.label}</SelectItem>
                ))}
              </Select>
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
  );
}});

ExploreFilter.displayName = "ExploreFilter";


export default ExploreFilter;

