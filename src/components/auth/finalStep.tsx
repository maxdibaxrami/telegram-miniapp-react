import { useEffect } from "react";

const FinalStepAuth = ({setSlideAvailable, setSlideUnAvailable}) => {
  useEffect(()=>{
    setSlideUnAvailable()
  setSlideAvailable()
  },[])
  return <div className="flex  justify-between flex-col px-6 pt-8 pb-4" />;
};

export default FinalStepAuth;
