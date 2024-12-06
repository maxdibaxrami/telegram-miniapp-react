import { Image } from "@nextui-org/react";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useSwiper } from "swiper/react";

const SwiperImages = () => {

    const lp = useLaunchParams()

    
    const swiper = useSwiper();
    
    const NextSlide = ()=> {
        swiper.slideNext()
        console.log(swiper.activeIndex)
    };

    return <>
        <Image
            alt="Profile hero Image"
            className="w-full h-full"
            classNames={{
                wrapper: "w-full maxcontentimportant",
            }}
            onClick={NextSlide}
            loading="lazy"
            src={"https://nextui.org/images/hero-card-complete.jpeg"} // dynamic image URL
            style={{
                objectFit: "cover",
                padding: "0px 0px 5px 0px",
                height:'calc(100vh - 267px)'
            }}
        />
    </>
}
export default SwiperImages