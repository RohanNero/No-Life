// import { useState } from "react";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";

// import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

type HUDProps = {
  setDisplayConverter: React.Dispatch<React.SetStateAction<boolean>>;
  setCodingRay: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayDecoder: React.Dispatch<React.SetStateAction<boolean>>;
};

export const HUDisplay = (props: HUDProps) => {
  const { setDisplayConverter, setCodingRay, setDisplayDecoder } = props;
  return (
    <div className="flex bg-gray-400 border-top p-1 border-black absolute w-1/2 bottom-0 ">
      <div className="flex-grow mt-5 mx-5 w-full sm:mx-8 2xl:mx-20">
        <div className="flex justify-center flex-col bg-black opacity-80 rounded-2xl shadow-lg border-primary">
          <span className="text-4xl sm:text-6xl text-white text-center">HUD</span>
          <div className="mx-auto mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-5">
            <div className="flex rounded-full flex-shrink-0">
              <div className="flex rounded-full border-primary p-2">
                <button
                  className={`btn btn-primary rounded-full capitalize bg-yellow-300 font-normal text-black w-24 flex items-center hover:bg-yellow-500 hover:gap-2 transition-all tracking-widest`}
                  onClick={() => {
                    setCodingRay(true);
                    setDisplayConverter(false);
                    setDisplayDecoder(false);
                  }}
                >
                  <>
                    Coding Ray
                    <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                  </>
                </button>
                <button
                  className={`mx-10 btn btn-primary rounded-full capitalize bg-yellow-300 font-normal text-black w-24 flex items-center hover:bg-yellow-500 hover:gap-2 transition-all tracking-widest}`}
                  onClick={() => {
                    setDisplayConverter(true);
                    setCodingRay(false);
                    setDisplayDecoder(false);
                  }}
                >
                  <>
                    Hex Converter
                    <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                  </>
                </button>
                <button
                  className={`btn btn-primary rounded-full capitalize bg-yellow-300 font-normal text-black w-24 flex items-center hover:bg-yellow-500 hover:gap-2 transition-all tracking-widest}`}
                  onClick={() => {
                    setDisplayDecoder(true);
                    setDisplayConverter(false);
                    setCodingRay(false);
                  }}
                >
                  <>
                    Decoder
                    <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                  </>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
