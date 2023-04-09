/* eslint-disable*/
import { useEffect, useRef, useState } from "react";
import { useAccount } from "wagmi";
import { useAnimationConfig, useScaffoldContractRead, useScaffoldEventSubscriber } from "~~/hooks/scaffold-eth";

const MARQUEE_PERIOD_IN_SEC = 5;

export const ContractData = () => {
  const [transitionEnabled] = useState(true);
  //  const [isRightDirection, setIsRightDirection] = useState(false);
  const [marqueeSpeed, setMarqueeSpeed] = useState(0);
  const [currentText, setText] = useState(
    "Oh no, the Phygital Actuation has been realized! This is catastrophic! Reality as we know it has been altered, or should I say encoded! We need your help, Anon. The entire laboratory is in chaos, and many of our scientists are trapped. You're our only hope. Please, hurry and save them before it's too late!",
  );
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
      alert();
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
          <div>
            <div className="px-4 pt-1 break-words whitespace-pre-wrap">{currentText || " "}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
