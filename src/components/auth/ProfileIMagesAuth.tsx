import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { PhotoIcon } from "@/Icons/index";
import { useTranslation } from "react-i18next";
import SelectedProfileImageCard from "./selectedProfileImageCard";
import { useLaunchParams } from "@telegram-apps/sdk-react";

const ImageDataAuth = ({ setSlideAvailable, setSlideUnAvailable, setUserPhoto, userPhoto }) => {
  const { t } = useTranslation();
  const [selectedImages, setSelectedImages] = useState(userPhoto);
  const lp = useLaunchParams();

  const getPaddingForPlatform = () => {
    if (['ios'].includes(lp.platform)) {
      // iOS/macOS specific padding (e.g., accounting for notches)
      return 'image/*, .heic'  // Adjust as needed for iOS notch
    } else {
      // Android/base padding
      return'image/*'  // Default padding
    }
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length + selectedImages.length > 6) {
      alert("You can only upload a maximum of 6 images.");
      return;
    }
    
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImages((prevImages) => [...prevImages, e.target.result]);
      };
              // @ts-ignore
      reader.readAsDataURL(file);
    });
  };

  // Handle image deletion
  const handleDeleteImage = (imageUrl) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((img) => img !== imageUrl)
    );
  };

  useEffect(()=> {
    if(selectedImages.length >= 1){
      setSlideAvailable() 
      setUserPhoto(selectedImages)
    }else{
      setSlideUnAvailable()
      setUserPhoto(selectedImages)

    } 

  },[selectedImages])

  return (
    <div className="flex justify-between flex-col px-6 pt-8 pb-4">
      <form className="flex w-full flex-col gap-4">
        <p className="mb-1">{t("UploadprofileImage")}</p>

        <div>
        <input
          type="file"
          id="file-upload"
          accept={getPaddingForPlatform()}  // Include HEIC format along with image types
          multiple
          hidden
          onChange={handleFileChange}
        />
          <Button
            size="lg"
            className="w-full mb-2 font-bold"
            color="success"
            isDisabled={selectedImages.length >= 6}
            endContent={<PhotoIcon />}
            onPress={() => document.getElementById("file-upload").click()}
          >
            
            {t("addPhoto")}
          </Button>

          <div className="w-full h-full pb-4 gap-2 grid grid-cols-2 sm:grid-cols-3">
            {selectedImages.map((imageUrl, index) => (
              <SelectedProfileImageCard
                key={index}
                imageUrl={imageUrl}
                onDelete={() => handleDeleteImage(imageUrl)}
              />
            ))}
          </div>

          <p className="mb-1 text-small">{t("youshoulduploadminimum3photoandmaximum6photo")}</p>

        </div>
      </form>
    </div>
  );
};

export default ImageDataAuth;
