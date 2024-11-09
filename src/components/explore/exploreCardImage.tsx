import {Image} from "@nextui-org/react";
import { useSwiper } from "swiper/react";

const ExploreCardImage = (props) => {
    
    const swiper = useSwiper();

    return <Image onClick={() => swiper.slideNext() } {...props} />
}

export default ExploreCardImage