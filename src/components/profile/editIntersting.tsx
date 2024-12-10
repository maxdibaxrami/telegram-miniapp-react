// @ts-ignore
import React from "react";
import {
  Modal,
  ModalContent,
  SelectItem,
  Select,
  ModalFooter,
  ModalHeader,
  Button,
  useDisclosure,
  ModalBody,
} from "@nextui-org/react";

import { PenIcon } from "@/Icons/index";
import { useTranslation } from "react-i18next";

const EditIntersting = () => {
  const { t, i18n } = useTranslation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [values, setValues] = React.useState<any>(
    new Set(["cat", "dog"]),
  );

  const handleOpen = () => {
    onOpen();
  };

  return (
    <>
      <Button
        isIconOnly
        aria-label={t("like")}
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
            {t("edit_interesting")}
          </ModalHeader>

          <ModalBody>
            <form className="flex flex-col gap-4">
              <Select
                className="w-full"
                label={t("interesting")}
                placeholder={t("select_interesting")}
                selectedKeys={values}
                selectionMode="multiple"
                onSelectionChange={setValues}
              >
                {Intersting.map((item) => (
                  <SelectItem key={item.key}>{t(item.label)}</SelectItem>
                ))}
              </Select>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button color="default" variant="solid" onPress={onClose}>
              {t("close")}
            </Button>
            <Button color="success" onPress={onClose}>
              {t("save")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditIntersting;

export const Intersting = [
  { key: "cat", label: "cat" },
  { key: "dog", label: "dog" },
  { key: "elephant", label: "elephant" },
  { key: "lion", label: "lion" },
  { key: "tiger", label: "tiger" },
  { key: "giraffe", label: "giraffe" },
  { key: "dolphin", label: "dolphin" },
  { key: "penguin", label: "penguin" },
  { key: "zebra", label: "zebra" },
  { key: "shark", label: "shark" },
  { key: "whale", label: "whale" },
  { key: "otter", label: "otter" },
  { key: "crocodile", label: "crocodile" },
];
