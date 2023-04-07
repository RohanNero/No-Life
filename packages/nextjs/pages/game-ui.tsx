import { useState } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { CodingRay } from "~~/components/example-ui/CodingRay";
import { ContractData } from "~~/components/example-ui/ContractData";
import { HUDisplay } from "~~/components/example-ui/HUDisplay";
import { HexConverter } from "~~/components/example-ui/HexConverter";

const GameUI: NextPage = () => {
  const [displayConverter, setDisplayConverter] = useState(false);
  const [codingRay, setCodingRay] = useState(true);

  return (
    <>
      <Head>
        <title>No-Life UI</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </Head>
      <div className="grid lg:grid-cols-2 flex-grow" data-theme="exampleUi">
        <ContractData />

        <div>
          {codingRay && <CodingRay />}
          {displayConverter && <HexConverter />}
          <HUDisplay setCodingRay={setCodingRay} setDisplayConverter={setDisplayConverter} />
        </div>
      </div>
    </>
  );
};

export default GameUI;
