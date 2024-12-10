import {
  Modal,
  ModalContent,
  ModalFooter,
  Input,
  ModalHeader,
  Button,
  useDisclosure,
  ModalBody,
} from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

import { PenIcon } from "@/Icons/index";
import { useTranslation } from "react-i18next";

const EditMoreAboutMe = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t, i18n } = useTranslation();

  const handleOpen = () => {
    onOpen();
  };

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

  const SexualityStatus = [
    { key: "straight", label: t("straight") },
    { key: "gay", label: t("gay") },
    { key: "lesbian", label: t("lesbian") },
    { key: "bisexual", label: t("bisexual") },
    { key: "asexual", label: t("asexual") },
    { key: "pansexual", label: t("pansexual") },
    { key: "queer", label: t("queer") },
    { key: "questioning", label: t("questioning") },
  ];

  const RealationStatus = [
    { key: "Single", label: t("Single") },
    { key: "Taken", label: t("Taken") },
    { key: "open", label: t("open") },
    { key: "ratthernotsay", label: t("Irathernotsay") },
  ];
  

  return (
    <>
      <Button
        isIconOnly
        aria-label="Like"
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
          {t("Editmoreaboutme")}
          </ModalHeader>

          <ModalBody>
            <form className="flex flex-col gap-4">
              <Input label={t("Height")} type="number" />

              <Select
                className="w-full"
                items={RealationStatus}
                label={t("RealationStatus")}
                placeholder={t("RealationStatus")}
              >
                {(RealationStatus) => <SelectItem key={RealationStatus.label}>{RealationStatus.label}</SelectItem>}
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

              <Select
                className="w-full"
                items={SexualityStatus}
                label={t("SexualityStatus")}
                placeholder={t("SexualityStatus")}
              >
                {(SexualityStatus) => (
                  <SelectItem key={SexualityStatus.label}>{SexualityStatus.label}</SelectItem>
                )}
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
    </>
  );
};

export default EditMoreAboutMe;


export const KidStatus = [
  { key: "cat", label: "Some day" },
  { key: "dog", label: "i have already" },
  { key: "elephant", label: "I don’t want kids" },
  { key: "lion", label: "I’d rather not say" },
];
