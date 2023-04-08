import { useState } from "react";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const CodingRay = () => {
  //   const [visible, setVisible] = useState(true);
  const [newGreeting, setNewGreeting] = useState("");

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "setGreeting",
    args: [newGreeting],
    value: "0.01",
  });

  return (
    <div className="flex flex-col h-full w-full p-1 bg-gray-400 relative pb-10">
      <div className="flex-1 flex-col h-full mx-5 sm:mx-8 mx-20">
        <div className="flex flex-col mt-6 px-7 py-8 bg-gray-50 bg-opacity-90 rounded shadow-lg border-2 border-primary">
          <span className="text-4xl sm:text-6xl text-black text-center">Coding Ray</span>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-2">
            <span className="text-gray-500 text-2xl italic">0x</span>
            <input
              type="text"
              placeholder="Enter Correct Conversion"
              className="input italic font-bai-jamjuree w-full px-5 bg-black bg-[length:100%_100%] text-white border border-primary text-lg sm:text-2xl placeholder-white"
              onChange={e => setNewGreeting(e.target.value)}
            />
            <div className="flex rounded-full flex-shrink-0">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className={`btn btn-primary bg-red-600 rounded-full capitalize font-normal font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest ${
                    isLoading ? "loading" : ""
                  }`}
                  onClick={writeAsync}
                >
                  {!isLoading && (
                    <>
                      Blast! <ArrowSmallRightIcon className="w-3 h-3 mt-0.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
