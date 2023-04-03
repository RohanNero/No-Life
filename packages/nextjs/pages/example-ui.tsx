import Head from "next/head";
import type { NextPage } from "next";
import { ContractData } from "~~/components/example-ui/ContractData";
import { ContractInteraction } from "~~/components/example-ui/ContractInteraction";

const ExampleUI: NextPage = () => {
  return (
    <>
      <Head>
        <title>Scaffold-eth Example Ui</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </Head>
      <div className="grid lg:grid-cols-2 flex-grow" data-theme="exampleUi">
        <ContractData />

        <div>
          <ContractInteraction />
          <button
            onClick={() => {
              alert("hello world");
            }}
          >
            1
          </button>
          <button
            onClick={() => {
              console.log("hello world");
            }}
          >
            2
          </button>
          <button>3</button>
        </div>
      </div>
    </>
  );
};

export default ExampleUI;
