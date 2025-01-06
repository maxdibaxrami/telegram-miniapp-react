import { BASEURL } from "@/constant";
import { Image } from "@nextui-org/react";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useSwiper } from "swiper/react";

const SwiperImages = ({url}) => {

    const lp = useLaunchParams();

    const swiper = useSwiper();
    
    const NextSlide = ()=> {
        swiper.slideNext()
        console.log(swiper.activeIndex)
    };

    const getPaddingForPlatform = () => {
        if (['ios'].includes(lp.platform)) {
          return '220px';
        } else {
          return '195px';
        }
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
            
            style={{
                objectFit: "cover",
                padding: "0px 0px 5px 0px",
                height:`calc(100vh - ${getPaddingForPlatform()})`
            }}
        />
    </>
}
export default SwiperImages