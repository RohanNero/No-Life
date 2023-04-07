/* eslint-disable*/
import { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import { useAnimationConfig, useScaffoldContractRead, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";

const MARQUEE_PERIOD_IN_SEC = 5;

export const ContractData = () => {
  const [transitionEnabled] = useState(true);
  const [isRightDirection, setIsRightDirection] = useState(false);
  const [marqueeSpeed, setMarqueeSpeed] = useState(0);
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

  useScaffoldEventSubscriber({
    contractName: "YourContract",
    eventName: "GreetingChange",
    listener: (greetingSetter, newGreeting, premium, value) => {
      alert(greetingSetter);
    },
  });
  const uint = 7;
  const currentGreeting = () => {
    if (uint == 7) {
      console.log("bla blah blah");
    }
  };

  const { showAnimation } = useAnimationConfig(totalCounter);

  const showTransition = transitionEnabled && !!currentGreeting && !isGreetingLoading;

  // useEffect(() => {
  //   if (transitionEnabled && containerRef.current && greetingRef.current) {
  //     setMarqueeSpeed(
  //       Math.max(greetingRef.current.clientWidth, containerRef.current.clientWidth) / MARQUEE_PERIOD_IN_SEC,
  //     );
  //   }
  // }, [transitionEnabled, containerRef, greetingRef]);

  return (
    <div
      className={`flex flex-col max-w-2lg bg-blue-200 bg-opacity-70 rounded-2xl shadow-lg px-5 py-4 w-full ${
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
          <div>
            <div className="px-4 pt-1">{currentLevel || " "}</div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <button
          className={`btn btn-circle btn-ghost border border-primary hover:border-primary w-12 h-12 p-1 bg-neutral flex items-center ${
            isRightDirection ? "justify-start" : "justify-end"
          }`}
        >
          <div className="border border-primary rounded-full bg-secondary w-2 h-2" />
        </button>
        <div className="w-44 p-0.5 flex items-center bg-neutral border border-primary rounded-full"></div>
      </div>
    </div>
  );
};
