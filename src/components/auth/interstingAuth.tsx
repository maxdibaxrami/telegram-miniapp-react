import InterestingList from "../core/InterstingList";

const InterestingAuth = ({setSlideAvailable, setSlideUnAvailable}) => {
  
  const onChangeValue = (value) => {
    if(value.length !== 0 ){
      setSlideAvailable()
    }else{
      setSlideUnAvailable()
    }
  }
  
  return (
    <div className="flex  justify-between flex-col px-6 pt-8 pb-4">
      <form className="flex w-full flex-col gap-4">
        <p className="mb-1 text-left">Interesting : </p>
        <InterestingList onChangeValue={onChangeValue}/>
      </form>
    </div>
  );
};

export default InterestingAuth;

