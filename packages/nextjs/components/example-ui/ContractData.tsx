import { useEffect, useRef, useState } from "react";
import { dialogue } from "../../utils/scaffold-eth/dialogue";
//import { BigNumber } from "ethers";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";

export const ContractData = () => {
  //const [transitionEnabled] = useState(true);
  const [currentText, setCurrentText] = useState([dialogue[0]]);
  //const [currentDialogue, setCurrentDialogue] = useState(1);
  const { address } = useAccount();

  const containerRef = useRef<HTMLDivElement>(null);
  //const greetingRef = useRef<HTMLDivElement>(null);

  // GET CURRENT LEVEL  (currently not implemented)
  const { data: currentLevel } = useScaffoldContractRead({
    contractName: "CodingRay",
    functionName: "currentData",
  });

  // RESETS THE PLAYER'S SCORE
  const { writeAsync: reStart0 } = useScaffoldContractWrite({
    contractName: "Level00",
    functionName: "reStart",
  });
  // const { writeAsync: reStart1 } = useScaffoldContractWrite({
  //   contractName: "Level01",
  //   functionName: "reStart",
  // });

  // Listen for direct hit to add dialogue to the UI
  useScaffoldEventSubscriber({
    contractName: "CodingRay",
    eventName: "CodingRay__DirectHit",
    listener: () => {
      // setCurrentDialogue(currentDialogue + 1);
      // setCurrentText(prevState => [...prevState, dialogue[currentDialogue]]);
      //alert(currentDialogue);
    },
  });

  // VIEW THE PLAYER'S SCORE
  const { data: totalCounter } = useScaffoldContractRead({
    contractName: "Level00",
    functionName: "countMap",
    args: [address],
  });

  // This useEffect() handles resetting the game for players when the page refreshes
  console.log("length: ", currentText.length);
  console.log("totalCount:", totalCounter);
  // useEffect(() => {
  //   const total = totalCounter ? totalCounter : 0;
  //   if (currentText.length === 1 && total > BigNumber.from(0)) {
  //     reStart0();
  //     console.log("Score reset for Level 00");
  //   }
  // }, [currentText, totalCounter]);

  const setCurrentTextBasedOnProgress = (progress: number) => {
    setCurrentText([dialogue[0], ...dialogue.slice(1, progress + 1)]);
  };

  useEffect(() => {
    const total = totalCounter ? totalCounter : 0;
    setCurrentTextBasedOnProgress(Number(total));
  }, [totalCounter]);

  return (
    <div className={`flex flex-col max-w-2lg bg-gray-400 shadow-lg px-5 py-4 h-full w-full `}>
      <div className="flex justify-between w-full">
        <div className="flex items-center bg-secondary border-primary rounded-xl">
          <div className="  p-2 py-1 border-r border-primary flex items-end">Current Level</div>
          <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
            {currentLevel?.toString() || "0"}
          </div>
        </div>
        <button
          className="p-2 py-1 border-r bg-secondary border-primary rounded-xl flex items-end text-lg text-center font-semibold hover:bg-orange-700 hover:scale-110 ml-auto"
          onClick={() => reStart0()}
        >
          RESTART
        </button>
      </div>

      <div className="mt-3 border border-primary bg-neutral rounded-3xl text-secondary whitespace-nowrap w-full h-full tracking-tighter font-bai-jamjuree leading-tight">
        <div className="relative overflow-x-hidden" ref={containerRef}>
          {currentText.map((text, index) => (
            <div
              className={`px-4 pt-1 break-words whitespace-pre-wrap ${
                index % 2 === 0 ? "text-gray-900" : "text-gray-400"
              }`}
              key={index}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
