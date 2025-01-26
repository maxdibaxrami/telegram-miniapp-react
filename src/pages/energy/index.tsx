
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Card, CardBody, Spinner, Tab, Tabs } from "@nextui-org/react";
import { Page } from '@/components/Page.tsx';
import TopBarPages from "@/components/tobBar/index";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useState } from "react";
import { EnergyCard } from "./energyCards";
import { PerimumIcon, TonCoinIcon } from "@/Icons";



export default function EnergyViewPage() {
  const { t } = useTranslation();  // Initialize translation hook
  const { loading } = useSelector((state: RootState) => state.user);  // Assuming the like slice is in state.like
  const lp = useLaunchParams();
  const [selected, setSelected] = useState<React.Key >("stars");

  if(loading){
    return <div className="h-screen w-screen flex flex-col p-6 items-center justify-center"> 
      <Spinner size="lg" />
    </div>
  }


  const getPaddingForPlatform = () => {
    if (['ios'].includes(lp.platform)) {
      // iOS/macOS specific padding (e.g., accounting for notches)
      return '50px'  // Adjust as needed for iOS notch
    } else {
      // Android/base padding
      return '25px' // Default padding
    }
  };


  return (
    <Page>
       <div
          className="container mx-auto max-w-7xl flex-grow"
          style={{
            maxHeight: "100%",
            height:"100%",
            marginBottom:"5rem",
            
          }}
      >
        <TopBarPages />
            <section
                    className="flex flex-col items-center justify-center px-3"
                    style={{paddingTop:`calc(4rem + ${getPaddingForPlatform()})`,}}  
                >
                     <div className="flex flex-col w-full">
                        
                        <Card className="max-w-full h-full">
                            <CardBody className="overflow-hidden">
                            <Tabs
                                fullWidth
                                aria-label="Tabs form"
                                // @ts-ignore
                                selectedKey={selected}
                                size="md"
                                onSelectionChange={setSelected}
                            >
                                <Tab 
                                    key="stars" 
                                    title={
                                        <div className="flex items-center justify-center gap-1">
                                            <PerimumIcon className="size-5"/>
                                            <p className="font-medium">{t("stars")}</p>
                                        </div>
                                    }
                                >
                                    <EnergyCard 
                                        type="star" 
                                        title={t("50_Energy")} 
                                        color={"default"} 
                                        description={"Save 20%"} 
                                        price={80}
                                    />
                                    <EnergyCard 
                                        type="star" 
                                        title={t("150_Energy")} 
                                        color={"primary"} 
                                        description={"Save 30%"} 
                                        price={190}
                                    />
                                    <EnergyCard 
                                        type="star" 
                                        title={t("500_Energy")} 
                                        color={"secondary"} 
                                        description={"Save 40%"} 
                                        price={799}
                                    />
                                    <EnergyCard 
                                        type="star" 
                                        title={t("1000_Energy")} 
                                        color={"danger"} 
                                        description={"Save 50%"} 
                                        price={1299}
                                    />

                                </Tab>
                                <Tab 
                                    key="ton" 
                                    title={
                                        <div className="flex items-center justify-center gap-1">
                                            <TonCoinIcon className="size-5"/>
                                            <p className="font-medium">{t("ton")}</p>
                                        </div>
                                    }
                                >
                                    <EnergyCard 
                                            type="ton" 
                                            title={t("50_Energy")} 
                                            color={"default"} 
                                            description={"Save 0%"} 
                                            price={0.3} 
                                        />
                                        <EnergyCard 
                                            type="ton" 
                                            title={t("150_Energy")} 
                                            color={"primary"} 
                                            description={"Save 5%"} 
                                            price={0.6} 
                                        />
                                        <EnergyCard 
                                            type="ton" 
                                            title={t("500_Energy")} 
                                            color={"secondary"} 
                                            description={"Save 21%"} 
                                            price={1.3} 
                                        />
                                        <EnergyCard 
                                            type="ton" 
                                            title={t("1000_Energy")} 
                                            color={"danger"} 
                                            description={"Save 38%"} 
                                            price={2} 
                                        />
                                </Tab>
                            </Tabs>
                            </CardBody>
                        </Card>
                    </div>
            </section>
      </div>
    </Page>
  );
}
