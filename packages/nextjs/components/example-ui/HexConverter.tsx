import { useState } from "react";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export const HexConverter = () => {
  const [hexValue, setHexValue] = useState("");

  const { data: currentData } = useScaffoldContractRead({
    contractName: "HexConverter",
    functionName: "getSelector",
    args: [hexValue],
  });

  const hexInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col h-full w-full p-1 bg-gray-400 relative pb-10">
      <div className="flex-1 flex-col h-full mx-5 sm:mx-8 mx-20">
        <div className="flex flex-col mt-6 px-7 py-8 bg-white opacity-90 rounded shadow-lg border-2 border-primary">
          <span className="text-4xl sm:text-6xl text-black text-center">Hex Converter</span>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-1">
            <span className="text-gray-500 text-2xl italic">0x</span>
            <input
              type="text"
              placeholder="Enter Here For Conversion"
              className="input italic font-bai-jamjuree w-full px-5 bg-black text-white bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white"
              onChange={e => setHexValue(e.target.value)}
              onKeyPress={hexInput}
            />
          </div>
          <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-1">
            <input
              type="text"
              placeholder="# of Strings"
              className="input italic font-bai-jamjuree w-1/3 px-5 bg-red-600 bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white"
            />
            <input
              type="text"
              placeholder="# of Uints"
              className="input italic ml-auto font-bai-jamjuree w-1/3 px-5 bg-red-600 bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white"
            />
            <div className="flex rounded-full p-1 flex-shrink-0">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className={`btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest`}
                  //onClick={fetch}
                >
                  <>
                    Send <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                  </>
                </button>
              </div>
              <button
                onClick={() => {
                  console.log(currentData);
                }}
              />
            </div>
          </div>
          {/* <div className="mt-4 flex gap-2 items-start">
            <span className="text-sm leading-tight">Price:</span>
            <div className="badge badge-warning">0.01 ETH + Gas</div>
          </div> */}
          <div className="mt-4 flex gap-2 items-start">
            <span className="text-sm leading-tight">Hex value:</span>
            <span className="text-sm leading-tight">{hexValue == "" ? "" : currentData}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
