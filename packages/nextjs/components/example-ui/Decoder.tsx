import { useState } from "react";
import { BigNumber } from "ethers";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";

export const Decoder = () => {
  const [hexValue, setHexValue] = useState("");
  const [numOfStrings, setNumOfStrings] = useState("");
  const [numOfUints, setNumOfUints] = useState("");
  console.log("hexvalue: ", hexValue);

  const { writeAsync: decodeString } = useScaffoldContractWrite({
    contractName: "HexConverter",
    functionName: "decodeString",
    args: [`0x${hexValue}`, BigNumber.from(numOfStrings)],
  });

  const { writeAsync: decodeStringUint } = useScaffoldContractWrite({
    contractName: "HexConverter",
    functionName: "decodeStringUint",
    args: [`0x${hexValue}`, BigNumber.from(numOfStrings), BigNumber.from(numOfUints)],
  });

  useScaffoldEventSubscriber({
    contractName: "HexConverter",
    eventName: "StringDecoded",
    listener: data => {
      alert(data);
    },
  });

  const hexInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const handleCall = () => {
    if (numOfUints) {
      decodeString;
    } else {
      decodeStringUint;
    }
  };

  return (
    <div className="flex flex-col h-full w-full mb-1 p-1 bg-red-300 relative">
      <div className="flex-grow mx-5 h-full sm:mx-8 mx-20 mb-1">
        <div className="flex flex-col mt-6 px-7 py-8 bg-base-200 opacity-80 rounded shadow-lg border-2 border-primary">
          <span className="text-4xl sm:text-6xl text-black text-center">Decoder</span>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-5">
            <input
              type="text"
              placeholder="Enter Here For Conversion"
              className="input italic font-bai-jamjuree w-full px-5 bg-red-600 bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white"
              onChange={e => setHexValue(e.target.value)}
              onKeyPress={hexInput}
            />
          </div>
          <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-1">
            <input
              type="text"
              placeholder="# of Strings"
              className="input italic font-bai-jamjuree w-1/3 px-5 bg-red-600 bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white"
              onChange={e => setNumOfStrings(e.target.value)}
              onKeyPress={hexInput}
            />
            <input
              type="text"
              placeholder="# of Uints"
              className="input italic ml-auto font-bai-jamjuree w-1/3 px-5 bg-red-600 bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white"
              onChange={e => setNumOfUints(e.target.value)}
              onKeyPress={hexInput}
            />
            <div className="flex rounded-full border border-primary p-1 flex-shrink-0">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className={`btn btn-primary rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest`}
                  onClick={handleCall}
                >
                  <>
                    Send <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                  </>
                </button>
              </div>
              <button
                onClick={() => {
                  console.log("button click");
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
            {/* <span className="text-sm leading-tight">{hexValue == "" ? "" : currentData}</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};
