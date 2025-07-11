import Countdown from "./Countdown";

export default function Hero() {
  return (
    <section className="h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-purple-700 to-indigo-900 text-white">
      <h1 className="text-6xl font-extrabold mb-6">Token Presale</h1>
      <p className="text-xl mb-4">Be part of the next big thing in Web3</p>
      <Countdown />
      <button className="mt-8 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 rounded text-black font-semibold">
        Connect Wallet
      </button>
    </section>
  );
}
