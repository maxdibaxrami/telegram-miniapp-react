import { forwardRef, useImperativeHandle, useState  } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchFilteredExplore } from "@/features/exploreSlice";

import type {SliderValue} from "@nextui-org/react";
import type {Selection} from "@nextui-org/react";

const ExploreFilter = forwardRef((props,ref) => {{
  const { t } = useTranslation();
  const [locationValue, setLocationValue] = useState("")
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading } = useSelector((state: RootState) => state.user);

  const [age, setAge] = useState<SliderValue>([20, 28]);
  const [langauge, setLangauge] = useState<Selection>(new Set([]));

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
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  useImperativeHandle(ref, () => ({
    openModal: onOpen,
    closeModal: onClose
  }));

  if(false){
    console.log(props);
  }

  const onSetFilter = () => {

          dispatch(fetchFilteredExplore({
            userId:data.id.toString(),
            ageRange: `${age[0]},${age[1]}`,
            city:locationValue==="city"? data.city : null,
            country:locationValue==="country"? data.country : null,
            languages:Array.from(langauge).length!==0? Array.from(langauge).join(",") : null
          }));

          onClose()
  }

  return (
      <Modal
        backdrop="blur"
        classNames={{
          base: "absolute z-50 px-0 backdrop-saturate-150 backdrop-blur-lg bg-background/70",
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
                <Button onPress={()=> setLocationValue("city")}  color={locationValue==="city"?"primary":"default"} className="grow">{t("cityButton")}</Button>
                <Button onPress={()=> setLocationValue("country")} color={locationValue==="country"?"primary":"default"} className="grow">{t("countryButton")}</Button>
                <Button onPress={()=> setLocationValue("")} color={locationValue===""?"primary":"default"} className="grow">{t("globalButton")}</Button>
              </ButtonGroup>

              <Slider
                className="w-full"
                defaultValue={[18, 28]}
                label={t("age")}
                maxValue={100}
                minValue={18}
                step={1}
                value={age}
                onChange={setAge}
              />

              <Select
                className="w-full"
                label={t("Languages")}
                placeholder={t("Languages")}
                selectionMode="multiple"
                selectedKeys={langauge}
                onSelectionChange={setLangauge}
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
            <Button isLoading={loading} color="success" onPress={onSetFilter}>
              {t("Save")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  );
}});

ExploreFilter.displayName = "ExploreFilter";


export default ExploreFilter;

