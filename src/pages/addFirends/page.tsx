import TopBarPages from "@/components/tobBar/index";
import { Page } from "@/components/Page";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { shareURL } from '@telegram-apps/sdk';
import { AddFirendsImage } from "@/Icons/addFirends";
import { motion } from "framer-motion";
import { Button, Spinner } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useEffect } from "react";
import { fetchReferralData } from "@/features/refralSlice";
import { AddFirendsIcon } from "@/Icons";
import { useTranslation } from "react-i18next";
import { SparklesCustomIconText } from "@/components/animate/user-sparkles";

export default function AddFirends() {

  const lp = useLaunchParams();
  
  const { t } = useTranslation();  // Initialize translation hook

  const dispatch = useDispatch<AppDispatch>();
  const { data: referral, loading } = useSelector((state: RootState) => state.referral);
  const { data: user } = useSelector((state: RootState) => state.user);

  
  const getPaddingForPlatform = () => {

    if (['ios'].includes(lp.platform)) {
      return '50px'; // iOS/macOS specific padding
    } else {
      return '25px'; // Android/base padding
    }

  };

  const AddFirendsDialog = () => {
    if (shareURL.isAvailable()) {
      shareURL(referral , t("share_link"));
    }
  }

  useEffect(() => {
    if(referral === null) {
      dispatch(fetchReferralData(user.id.toString()));
    }
  }, [dispatch]);
  
  return (
    <Page>
      <div className="container mx-auto max-w-7xl flex-grow light-background--color">
        <section className="flex flex-col items-center justify-center gap-4 text-default-600">
          <TopBarPages />
          <div style={{paddingTop:`calc(5rem + ${getPaddingForPlatform()})`}} className="w-full pb-4">  
               
               
              <motion.div
                  className="flex  items-center aspect-video justify-center"
                  animate={{
                    scale: [0.75, 0.8, 0.8, 0.8, 0.75],
                    borderRadius: ["50%", "50%", "50%", "50%", "50%"],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >       
                
                  <AddFirendsImage/>

              </motion.div>  

                {loading?
                
                    <motion.div
                      animate={{opacity: 1 }}
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0 }}
                      transition={{
                        opacity: { duration: 0.6 },
                      }}
                      className="flex items-center justify-center"
                    >
                      <Spinner size="lg" />
                    </motion.div>

                  :
                    <motion.div
                      animate={{opacity: 1 }}
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0 }}
                      className="flex items-center flex-col px-4"
                      transition={{
                        opacity: { duration: 0.6 },
                      }}
                    >
                      <p className="font-medium text-xl	font-medium	 text-center">
                        {t("Inviteyourfriendsandgetapremiumaccount")}
                      </p>

                      <SparklesCustomIconText
                        colors={{ first: "#21b6a8", second: "#ff4b61" }}
                        sparklesCount={20} // Initial number of hearts
                        text={
                          <Button className="mt-3" size="lg" onClick={AddFirendsDialog} color="primary" endContent={<AddFirendsIcon />}>
                            {t("share_link")}
                          </Button>
                        } 
                      />
                      
                    </motion.div>              
                  }  

          </div>
        </section>
      </div>
    </Page>
  );
}
