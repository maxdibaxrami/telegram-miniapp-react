import { useTranslation } from "react-i18next";
import InterestingList from "../core/InterstingList";

const InterestingAuth = ({setSlideAvailable, setSlideUnAvailable, user}) => {
  const { t } = useTranslation();

  const onChangeValue = (value) => {

    if(value.size !== 0 ){
      setSlideAvailable("interests", value)
    }else{
      setSlideUnAvailable("interests", value)
    }
  }
  
  return (
    <div className="flex  justify-between flex-col px-6 pt-8 pb-4">
      <form className="flex w-full flex-col gap-4">
        <p className="mb-1 font-medium">{t("Interesting")} </p>
        <InterestingList user={user} onChangeValue={onChangeValue}/>
      </form>
    </div>
  );
};

export default InterestingAuth;

