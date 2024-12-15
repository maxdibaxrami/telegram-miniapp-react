import { Navbar, NavbarContent, Button, Progress } from "@nextui-org/react";
import { ArrowRight, ArrowLeft } from "@/Icons/index";
import { useTranslation } from 'react-i18next';

const BottomController = ({ nextPage, prevPage, selectedTab, nextSlideAvalable, handleSignup }) => {
  const { i18n } = useTranslation();
  return (
      <Navbar isBlurred={false} className="w-full bg-transparent">
        <NavbarContent justify="start">
          <Button
            isIconOnly
            aria-label="Like"
            color="primary"
            size="lg"
            isDisabled={selectedTab === 0 }
            onClick={prevPage}
            style={{transform:`${i18n.language==="ar" || i18n.language === 'fa'?"rotate(180deg)":"rotate(0deg)"}`}}
          >
            <ArrowLeft />
            
          </Button>
          
        </NavbarContent>
        <NavbarContent className="flex w-full gap-4" justify="center">
         <Progress style={{transform:`${i18n.language==="ar" || i18n.language === 'fa'?"rotate(180deg)":"rotate(0deg)"}`}} isDisabled={selectedTab === 0 } className="w-full" color="primary" value={selectedTab * 9} />
        </NavbarContent>
        <NavbarContent justify="end">
          <Button
            isIconOnly
            aria-label="Like"
            color="primary"
            size="lg"
            style={{transform:`${i18n.language==="ar" || i18n.language === 'fa'?"rotate(180deg)":"rotate(0deg)"}`}}
            isDisabled={!nextSlideAvalable || selectedTab === 11}
            onClick={()=>{
              if(selectedTab===10){
                nextPage() 
                handleSignup()
              }else{
                 nextPage() 
              }  
            }}
          >
            <ArrowRight />
          </Button>
        </NavbarContent>
      </Navbar>
  );
};

export default BottomController;
