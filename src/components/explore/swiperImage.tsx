import { Image } from "@nextui-org/react";
import { useSwiper } from "swiper/react";

const SwiperImages = (props) => {

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
                borderRadius: "20px",
                objectFit: "cover",
                padding: "0px 0px 5px 0px",
            }}
        />
    </>
}
export default SwiperImages