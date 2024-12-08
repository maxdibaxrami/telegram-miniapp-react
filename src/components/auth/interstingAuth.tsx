import React from "react";
import InterestingList from "../core/InterstingList";

const InterestingAuth = () => {

  return (
    <div className="flex  justify-between flex-col px-6 pt-8 pb-4">
      <form className="flex w-full flex-col gap-4">
        <p className="mb-1 text-left">Interesting : </p>
        <InterestingList/>
      </form>
    </div>
  );
};

export default InterestingAuth;

