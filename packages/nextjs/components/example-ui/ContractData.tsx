/* eslint-disable*/
import { useEffect, useRef, useState } from "react";
import { dialogue } from "../../utils/scaffold-eth/dialogue";
import { useAccount } from "wagmi";
import { useAnimationConfig, useScaffoldContractRead, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";

export const ContractData = () => {
  const [transitionEnabled] = useState(true);
  const [currentText, setCurrentText] = useState([dialogue[0]]);
  const [currentDialogue, setCurrentDialogue] = useState(1);
  const { address } = useAccount();

  const containerRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);

  const { data: totalCounter } = useScaffoldContractRead({
    contractName: "Level00",
    functionName: "countMap",
    args: [address],
  });

  const { data: currentLevel, isLoading: isGreetingLoading } = useScaffoldContractRead({
    contractName: "CodingRay",
    functionName: "currentData",
  });

  // useScaffoldEventSubscriber({
  //   contractName: "YourContract",
  //   eventName: "GreetingChange",
  //   listener: (greetingSetter, newGreeting, premium, value) => {
  //     alert(greetingSetter);
  //   },
  // });
  useScaffoldEventSubscriber({
    contractName: "CodingRay",
    eventName: "CodingRay__DirectHit",
    listener: () => {
      setCurrentDialogue(currentDialogue + 1);
      setCurrentText([...currentText, dialogue[currentDialogue]]);
      //alert(currentDialogue);
    },
  });
  // const uint = 7;
  // const currentGreeting = () => {
  //   if (uint == 7) {
  //     console.log("bla blah blah");
  //   }
  // };

  const { showAnimation } = useAnimationConfig(totalCounter);

  const showTransition = transitionEnabled; //&& !!currentGreeting && !isGreetingLoading;
  return (
    <div
      className={`flex flex-col max-w-2lg bg-gray-400 shadow-lg px-5 py-4 h-full w-full ${
        showAnimation ? "animate-zoom" : ""
      }`}
    >
      <div className="flex justify-between w-full">
        <div className="bg-secondary border border-primary rounded-xl flex">
          <div className="p-2 py-1 border-r border-primary flex items-end">Current Level</div>
          <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
            {currentLevel?.toString() || "0"}
          </div>
        </div>
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
