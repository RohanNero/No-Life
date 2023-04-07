/* eslint-disable*/
import { useEffect, useRef, useState } from "react";
import { useAnimationConfig, useScaffoldContractRead, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";

const MARQUEE_PERIOD_IN_SEC = 5;

export const ContractData = () => {
  const [transitionEnabled] = useState(true);
  const [isRightDirection, setIsRightDirection] = useState(false);
  const [marqueeSpeed, setMarqueeSpeed] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLDivElement>(null);

  const { data: totalCounter } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "totalCounter",
  });

  const { data: currentGreeting, isLoading: isGreetingLoading } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "greeting",
  });

  useScaffoldEventSubscriber({
    contractName: "YourContract",
    eventName: "GreetingChange",
    listener: (greetingSetter, newGreeting, premium, value) => {
      console.log(greetingSetter, newGreeting, premium, value);
    },
  });

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
    //<div className="flex flex-col justify-center items-center sm:px-0 lg:py-auto max-w-screen-md ">
    <div
      className={`flex flex-col max-w-2lg bg-red-200 bg-opacity-70 rounded-2xl shadow-lg px-5 py-4 w-full ${
        showAnimation ? "animate-zoom" : ""
      }`}
    >
      <div className="flex justify-between w-full">
        <div className="bg-secondary border border-primary rounded-xl flex">
          <div className="p-2 py-1 border-r border-primary flex items-end">Current Level</div>
          <div className="text-4xl text-right min-w-[3rem] px-2 py-1 flex justify-end font-bai-jamjuree">
            {totalCounter?.toString() || "0"}
          </div>
        </div>
      </div>

      <div className="mt-3 border border-primary bg-neutral rounded-3xl text-secondary whitespace-nowrap w-full h-full tracking-tighter font-bai-jamjuree leading-tight">
        <div className="relative overflow-x-hidden" ref={containerRef}>
          <div>
            <div className="px-4 pt-1">{currentGreeting || " "}</div>
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
        <div className="w-44 p-0.5 flex items-center bg-neutral border border-primary rounded-full">
          <div
            className="h-1.5 border border-primary rounded-full bg-secondary animate-grow"
            style={{ animationPlayState: showTransition ? "running" : "paused" }}
          />
        </div>
      </div>
    </div>
    //  </div>
  );
};
