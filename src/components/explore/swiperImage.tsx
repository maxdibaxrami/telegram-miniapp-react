import { BASEURL } from "@/constant";
import { Image } from "@nextui-org/react";
import { useSwiper } from "swiper/react";

const SwiperImages = ({ url, status=true }) => {
  const swiper = useSwiper();

  const NextSlide = () => {
    swiper.slideNext();
    console.log(swiper.activeIndex);
  };

  return (
    <Image
      alt="Profile hero Image"
      className="w-full h-full"
      classNames={{
        wrapper: "w-full maxcontentimportant",
      }}
      onClick={NextSlide}
      src={`${BASEURL}${url}`}
      radius="none"
      style={{
        objectFit: "cover",
        padding: "0px 0px 5px 0px",
        height: status ? "calc(100vh - 300px)" : "93px", // Dynamic height based on status
        transition: "height ease", // Smooth transition for height change
      }}
    />
  );
};

export default SwiperImages;
