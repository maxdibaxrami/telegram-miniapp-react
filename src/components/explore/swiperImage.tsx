import { BASEURL } from "@/constant";
import { Image } from "@nextui-org/react";
import { useSwiper } from "swiper/react";

const SwiperImages = ({url}) => {

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
            src={`${BASEURL}${url}`}
            radius="none"
            style={{
                objectFit: "cover",
                padding: "0px 0px 5px 0px",
                height:`calc(100vh - 250px`
            }}
        />
    </>
}
export default SwiperImages