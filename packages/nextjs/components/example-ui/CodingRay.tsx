import { useState } from "react";
import { Popup } from "./Popup";
//import { currentText } from "./ContractData";
import { BigNumber } from "ethers";
import { useAccount } from "wagmi";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractRead, useScaffoldContractWrite, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";

export const CodingRay = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  //   const [visible, setVisible] = useState(true);
  const [newGreeting, setNewGreeting] = useState("");
  const [contractAddress, setContractAddress] = useState<string | undefined>("");
  const { address } = useAccount();
  //console.log("deployer:", address);

  // const { writeAsync, isLoading } = useScaffoldContractWrite({
  //   contractName: "YourContract",
  //   functionName: "setGreeting",
  //   args: [newGreeting],
  //   value: "0.01",
  // });
  const { writeAsync: start } = useScaffoldContractWrite({
    contractName: "Level00",
    functionName: "reStart",
  });
  const { data: score0 } = useScaffoldContractRead({
    contractName: "Level00",
    functionName: "countMap",
    args: [address],
  });
  const { data: score1 } = useScaffoldContractRead({
    contractName: "Level01",
    functionName: "countMap",
    args: [address],
  });
  // const { data: score2 } = useScaffoldContractRead({
  //   contractName: "Level02",
  //   functionName: "countMap",
  //   args: [address],
  // });
  // const { data: score3 } = useScaffoldContractRead({
  //   contractName: "Level03",
  //   functionName: "countMap",
  //   args: [address],
  // });

  /** Getting level addresses */
  const { data: level00 } = useScaffoldContractRead({
    contractName: "Level00",
    functionName: "viewAddress",
  });
  const { data: level01 } = useScaffoldContractRead({
    contractName: "Level01",
    functionName: "viewAddress",
  });

  //console.log("score0:", score0Value);
  /** This if statement determines what level is interacted with */

  const handleBlast = () => {
    const score0Value = score0 ? score0 : 0;
    //console.log("score0:", score0Value);
    const score1Value = score1 ? score1 : 0;
    //console.log("score1:", score1Value);
    //console.log("bool:", score0Value < 7);
    //console.log("bool2:", score1Value < 7);
    //console.log("bool3:", score0Value.toString() == "7");
    //console.log("string:", score0Value.toString());
    // THIS CHECKS TO SEE IF PAGE WAS REFRESHED AND THEN WILL RESTART GAME FOR USER
    // console.log("length: ", currentText.length);
    // console.log("totalCount:", totalCounter);
    // if (currentText.length == 1 && totalCounter > 0) {
    //   reStart0();
    //   reStart1();
    // }
    if (score0Value < BigNumber.from(7)) {
      setContractAddress(level00);
      //console.log(contractAddress);
      blast();
      console.log(score0Value);
    } else if (score0Value.toString() == "7" && score1Value < BigNumber.from(7)) {
      setContractAddress(level01);
      blast();
      //console.log("address:", contractAddress);
    } else {
      start;
    }
  };

  const { writeAsync: blast, isLoading } = useScaffoldContractWrite({
    contractName: "CodingRay",
    functionName: "blast",
    args: [`${contractAddress}`, `0x${newGreeting}`],
  });

  // So you dont have to remove 0x
  // const handleGreeting = () => {
  //   newGreeting.slice(2);
  //   setNewGreeting(newGreeting);
  // };

  useScaffoldEventSubscriber({
    contractName: "CodingRay",
    eventName: "CodingRay__ZeroDamage",
    listener: () => {
      setMessage("Zero Damage!");
      setShowPopup(true);
      console.log("zero damage");
    },
  });

  useScaffoldEventSubscriber({
    contractName: "CodingRay",
    eventName: "CodingRay__DirectHit",
    listener: () => {
      //alert("Direct Hit!");
      setMessage("Direct Hit!");
      setShowPopup(true);
    },
  });

  return (
    <div className="flex flex-col h-full w-full p-1 bg-gray-400 relative pb-10">
      {showPopup && (
        <Popup
          message={message}
          onClose={() => {
            setShowPopup(false);
          }}
        />
      )}
      <div className="flex-1 flex-col h-full mx-5 sm:mx-8 mx-20">
        <div className="flex flex-col mt-6 px-7 py-8 bg-gray-50 bg-opacity-90 rounded shadow-lg border-2 border-primary">
          <span className="text-4xl sm:text-6xl text-black text-center">Coding Ray</span>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-2">
            <span className="text-gray-500 text-2xl italic">0x</span>
            <input
              type="text"
              placeholder="Enter Correct Conversion"
              className="input italic font-bai-jamjuree w-full px-5 bg-black bg-[length:100%_100%] text-secondary border border-primary text-lg sm:text-2xl placeholder-secondary"
              onChange={e => setNewGreeting(e.target.value)}
            />
            <div className="flex rounded-full flex-shrink-0">
              <div className="flex rounded-full border-2 border-primary p-1">
                <button
                  className={`btn btn-primary bg-secondary rounded-full capitalize font-normal text-black font-white w-24 flex items-center gap-1 hover:gap-2 transition-all tracking-widest ${
                    isLoading ? "loading" : ""
                  }`}
                  onClick={handleBlast}
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
