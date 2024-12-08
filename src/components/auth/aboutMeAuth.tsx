import { SelectItem, Select, Input } from "@nextui-org/react";

const AboutMeAuth = () => {
  return (
    <div className="flex  justify-between flex-col px-6 pt-8 pb-4">
      <form className="flex w-full flex-col gap-4">
        <p className="mb-1 text-left">More about you : </p>
        <Select
          className="w-full"
          items={KidStatus}
          label="Kids"
          placeholder="Kids"
        >
          {(KidStatus) => (
            <SelectItem key={KidStatus.label}>
              {KidStatus.label}
            </SelectItem>
          )}
        </Select>

        <Select
          className="w-full"
          items={HeightOptions}
          label="Height"
          placeholder="Height"
        >
          {(HeightOptions) => (
            <SelectItem key={HeightOptions.label}>
              {HeightOptions.label}
            </SelectItem>
          )}
        </Select>

        <Select
          className="w-full"
          items={RealationStatus}
          label="Realation status"
          placeholder="Realation status"
        >
          {(RealationStatus) => (
            <SelectItem key={RealationStatus.label}>{RealationStatus.label}</SelectItem>
          )}
        </Select>

        <Select
          className="w-full"
          label="Languages"
          placeholder="Languages"
          selectionMode="multiple"
        >
          {languages.map((languages) => (
            <SelectItem key={languages.key}>{languages.label}</SelectItem>
          ))}
        </Select>

        <Select
          className="w-full"
          items={SexualityStatus}
          label="Sexuality"
          placeholder="Sexuality"
        >
          {(SexualityStatus) => (
            <SelectItem key={SexualityStatus.label}>
              {SexualityStatus.label}
            </SelectItem>
          )}
        </Select>
      </form>
    </div>
  );
};

export default AboutMeAuth;

export const RealationStatus = [
  { key: "Single", label: "Single" },
  { key: "Taken", label: "Taken" },
  { key: "open", label: "open" },
  { key: "ratthernotsay", label: "I’d rather not say" },
];

export const KidStatus = [
  { key: "some day", label: "Some day" },
  { key: "i have already", label: "i have already" },
  { key: "I don’t want kids", label: "I don’t want kids" },
  { key: "I’d rather not say", label: "I’d rather not say" },
];

const HeightOptions = [
  { key: "145", label: "4'9\" (145 cm)" },
  { key: "150", label: "4'11\" (150 cm)" },
  { key: "155", label: "5'1\" (155 cm)" },
  { key: "160", label: "5'3\" (160 cm)" },
  { key: "165", label: "5'5\" (165 cm)" },
  { key: "170", label: "5'7\" (170 cm)" },
  { key: "175", label: "5'9\" (175 cm)" },
  { key: "180", label: "5'11\" (180 cm)" },
  { key: "185", label: "6'1\" (185 cm)" },
  { key: "190", label: "6'3\" (190 cm)" },
  { key: "195", label: "6'5\" (195 cm)" },
  { key: "200", label: "6'7\" (200 cm)" },
  { key: "205", label: "6'9\" (205 cm)" },
  { key: "210", label: "6'11\" (210 cm)" },
  { key: "215", label: "7'1\" (215 cm)" }
];



const SexualityStatus = [
  { key: "straight", label: "Straight" },
  { key: "gay", label: "Gay" },
  { key: "lesbian", label: "Lesbian" },
  { key: "bisexual", label: "Bisexual" },
  { key: "asexual", label: "Asexual" },
  { key: "pansexual", label: "Pansexual" },
  { key: "queer", label: "Queer" },
  { key: "questioning", label: "Questioning" },
];
const languages = [
  { key: "en", label: "English" },
  { key: "zh", label: "Chinese" },
  { key: "es", label: "Spanish" },
  { key: "hi", label: "Hindi" },
  { key: "ar", label: "Arabic" },
  { key: "bn", label: "Bengali" },
  { key: "fr", label: "French" },
  { key: "ru", label: "Russian" },
  { key: "pt", label: "Portuguese" },
  { key: "id", label: "Indonesian" },
  { key: "ja", label: "Japanese" },
  { key: "de", label: "German" },
  { key: "pa", label: "Punjabi" },
  { key: "ur", label: "Urdu" },
  { key: "ko", label: "Korean" },
  { key: "vi", label: "Vietnamese" },
  { key: "fa", label: "Persian" },
  { key: "tr", label: "Turkish" },
  { key: "ta", label: "Tamil" },
  { key: "it", label: "Italian" },
];

