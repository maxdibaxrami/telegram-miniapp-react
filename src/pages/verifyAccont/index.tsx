import { useState, useRef } from "react";
import { RootState, AppDispatch } from "@/store";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Image, Spinner } from "@nextui-org/react";
import { Page } from "@/components/Page.tsx";
import TopBarPages from "@/components/tobBar/index";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { CameraIcon, UploadIcon, VideoCamera } from "@/Icons";
import { VerifiedAccountImage } from "@/Icons/verifyImage";
import { verifyUserPhoto } from "@/features/userSlice";
import { useNavigate } from "react-router-dom";

export default function VerifyAccontViewPage() {

  const navigate = useNavigate();

  const { t } = useTranslation(); // Initialize translation hook
  const { data, loading } = useSelector((state: RootState) => state.user);
  const lp = useLaunchParams();
  const dispatch = useDispatch<AppDispatch>(); // Initialize dispatch hook
  const [photoTaken, setPhotoTaken] = useState(false); // State to track if photo is taken
  const [photo, setPhoto] = useState<Blob | null>(null); // State to store captured photo
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [startCameraAllow, setStartCameraAllow] = useState(false);

  const getPaddingForPlatform = () => {
    if (['ios'].includes(lp.platform)) {
      return '50px'; // Adjust as needed for iOS notch
    } else {
      return '25px'; // Default padding for Android
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setStartCameraAllow(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      setStartCameraAllow(false);
    }
  };

  const takePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            setPhoto(blob);
            setPhotoTaken(true);
          }
        });
      }
    }
  };

  const uploadPhoto = async () => {
    if (photo && data) {
      try {
        // Convert the Blob to a File by providing a filename and lastModified date
        const file = new File([photo], 'photo.jpg', { type: photo.type, lastModified: Date.now() });
        navigate('/main?page=profile')
        // Dispatch the thunk to handle photo verification
        await dispatch(verifyUserPhoto({ userId: data.id.toString(), photoFile: file }));
        // Handle post-upload logic here, like success notification, redirect, etc.
      } catch (error) {
        
        console.error("Error uploading photo:", error);
        // Handle error, show message, etc.
      }
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col p-6 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <Page>
      <div
        className="container mx-auto max-w-7xl flex-grow"
        style={{
          maxHeight: "100%",
          height: "100%",
          marginBottom: "5rem",
          padding: "18px ",
        }}
      >
        <TopBarPages />
        <section
          className="flex flex-col items-center justify-center"
          style={{ paddingTop: `calc(4rem + ${getPaddingForPlatform()})` }}
        >
          <canvas ref={canvasRef} className="hidden"></canvas>
          {!photoTaken ? (
            <>
              {!startCameraAllow && <VerifiedAccountImage />}
              <video controls={false} ref={videoRef} autoPlay className={`w-full ${!startCameraAllow && "hidden"} rounded-xl`} />

              <div className="mt-2 w-full flex items-center justify-center">
                {!startCameraAllow && (
                  <Button className="w-full mt-2" onClick={startCamera} variant="shadow" color="primary">
                    <VideoCamera className="size-6" />
                    {t("start_Camera")}
                  </Button>
                )}
                {startCameraAllow && !photoTaken && (
                  <Button onClick={takePhoto} variant="shadow" className="w-full mt-2" color="secondary">
                    <CameraIcon className="size-6" />
                    {t("take_Photo")}
                  </Button>
                )}
              </div>
            </>
          ) : (
            <>
              <Image
                src={URL.createObjectURL(photo)}
                alt="Captured"
                className="w-full h-full aspect-video"
                classNames={{
                  wrapper: "w-full maxcontentimportant",
                }}
              />
              <Button onClick={uploadPhoto} variant="shadow" color="primary" className="w-full mt-2">
                <UploadIcon className="size-6" />
                {t("upload_Photo")}
              </Button>
            </>
          )}

            <div className="mt-4 text-green-500">
              <p className="text-tiny uppercase font-bold">{t("Profile_Verification_Requirements")}</p>
              <ul>
                <li>
                  <small className="text-default-500">{t("Make_sure_your_face_is_clearly_visible,_centered,_and_unobstructed.")}</small>
                </li>
                <li>
                  <small className="text-default-500">{t("Ensure_that_your_photo_is_taken_in_good_lighting_to_avoid_shadows_or_dark_areas.")}</small>
                </li>
                <li>
                  <small className="text-default-500">{t("Avoid_using_filters_or_any_image_enhancements.")}</small>
                </li>
                <li>
                  <small className="text-default-500">{t("Your_face_should_match_the_one_shown_in_your_profile_image_for_verification_purposes.")}</small>
                </li>
              </ul>
            </div>
        </section>
      </div>
    </Page>
  );
}
