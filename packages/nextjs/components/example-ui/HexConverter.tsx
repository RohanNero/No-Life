import { useState } from "react";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export const HexConverter = () => {
  const [hexValue, setHexValue] = useState("");
  const [showInput, setShowInput] = useState(false);

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
  const [inputs, setInputs] = useState([{ id: 1, value: "", type: "text" }]);

  const handleInputChange = () => {
    if (inputs.length === 1) {
      setInputs([...inputs, { id: inputs.length + 1, value: "", type: "text" }]);
      setShowInput(true); // set state to true when input is added
    } else {
      setInputs(inputs.slice(0, -1));
      setShowInput(false); // set state to false when input is removed
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
          <div>
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
            </div>
            {showInput && (
              <div>
                {inputs.map(input => (
                  <div key={input.id} className={`flex mt-2 ${input.id > 1 && "hidden"}`}>
                    <input
                      className="input italic font-bai-jamjuree w-1/3 px-5 bg-red-600 bg-[length:100%_100%] border border-primary text-lg sm:text-2xl placeholder-white"
                      type={input.type}
                      placeholder={`Enter input ${input.id}`}
                      value={input.value}
                      onChange={() => handleInputChange()}
                    />
                  </div>
                ))}
              </div>
            )}
            <button
              className={` ml-auto text-white rounded-md px-4 py-2 mt-2 ${showInput ? "bg-red-500" : "bg-green-500"} `}
              onClick={() => (showInput ? setShowInput(false) : setShowInput(true))}
            >
              {showInput ? "Remove Input" : "Add Input"}
            </button>
          </div>
          {/* <div className="mt-4 flex gap-2 items-start">
            <span className="text-sm leading-tight">Price:</span>
            <div className="badge badge-warning">0.01 ETH + Gas</div>
          </div> */}
          <div className="mt-4 flex gap-2 items-start">
            <span className="text-2xl justify-center leading-tight">Hex value:</span>
            <span className="text-lg justify-center leading-tight bg-gray-100 rounded-md border border-black p-1">
              {hexValue == "" ? "" : currentData}{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
