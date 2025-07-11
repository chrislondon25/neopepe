"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import BuyModal from "./components/BuyModal";
import Header from "./components/Header";
import CountdownTimer from "./components/CountdownTimer";
import LeaderBoardTable from "./components/LeaderBoardTable";

interface GeneralData {
  total_available: string;
  total_bought: string;
  stage: number;
  bonus: number;
  date_end: "";
  price: number;
  next_stage_price: number;
  moq: number;
}

interface LeaderBoard {
  wallet: string;
  allocation: string;
  rank: string;
  stage: number;
}

export default function Home() {
  const [data, setData] = useState<GeneralData>({
    total_available: "0",
    total_bought: "0",
    stage: 0,
    bonus: 0,
    date_end: "",
    price: 0,
    next_stage_price: 0,
    moq: 0,
  });
  const [leaderBoards, setLeaderBoards] = useState<LeaderBoard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null | unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://stareio.com/neo/get_data.php");

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const json = await res.json();
        if (json.success) {
          console.log(json.leaderboard_data[0]);

          setLeaderBoards(json.leaderboard_data);
          setData(json.general_data[0]);
        } else {
          throw new Error(json.error || "Unknown error");
        }
      } catch (err: unknown) {
        console.log(err);
        // setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /*   const data = {
    totalAvailable: 90000000,
    totalBought: 33277838.4,
    stage: 1,
    bonus: 50,
    date_end: "",
    price: 0.11,
    next_stage_price: 0.15,
    moq: 300,
  }; */

  const wallets = [
    {
      id: 0,
      title: "SOL",
      img: "/assets/images/icon/sol_logo.svg",
      name: "solana",
      wallet: "9uVNxQbTAzc9XYDNDtJTdXQpn4SgLJKknJHvNxHCWzUq",
      qrcode: "/assets/images/qrcode/sol.png",
    },

    {
      id: 1,
      title: "ETH",
      img: "/assets/images/icon/eth_logo.png",
      name: "ethereum",
      wallet: "0xd5fA87546A8E21038F611B3FF9121bC0185C72C4",
      qrcode: "/assets/images/qrcode/eth.png",
    },

    {
      id: 7,
      title: "USDT",
      img: "/assets/images/icon/usdt_logo.png",
      name: "tether",
      wallet: "TXDcbDEauzceabaVWjA9SpVosUekpxHBJn",
      qrcode: "/assets/images/qrcode/usdt.png",
    },

    {
      id: 2,
      title: "BTC",
      img: "/assets/images/icon/btc_logo.png",
      name: "bitcoin",
      wallet: "bc1qvhq9x3gmes40e922t45vsn366fr05q9xww870f",
      qrcode: "/assets/images/qrcode/btc.png",
    },

    {
      id: 3,
      title: "DOGE",
      img: "/assets/images/icon/doge_logo.png",
      name: "doge",
      wallet: "DRWRM4dV4UdBJB5L8LvvKNiyPjF4s7p9x3",
      qrcode: "/assets/images/qrcode/doge.png",
    },
    {
      id: 4,
      title: "BNB",
      img: "/assets/images/icon/bnb_logo.png",
      name: "tron",
      wallet: "0xd5fA87546A8E21038F611B3FF9121bC0185C72C4",
      qrcode: "/assets/images/qrcode/bnb.png",
    },
    {
      id: 5,
      title: "XRP",
      img: "/assets/images/icon/xrp_logo.png",
      name: "ripple",
      wallet: "rPmhMMUmZrnVnGTFvCfTnFA2zZt8CedrLF",
      qrcode: "/assets/images/qrcode/xrp.png",
    },
  ];

  const percentageBought =
    (parseFloat(data.total_bought) / parseFloat(data.total_available)) * 100;

  const [showBuyModal, setShowBuyModal] = useState(false);

  const toggleBuyModal = () => {
    setShowBuyModal(!showBuyModal);
  };

  return (
    <>
      <Header toggleBuyModal={toggleBuyModal} />
      <section className="banner1-section">
        <div className="container">
          <div className="banner1-content text-center">
            <h5 className="outfit uppercase">Pre-Sale Ends in</h5>
            <CountdownTimer date_end={data.date_end} />
            <h2 className="orbitron">NEO PEPE MATRIX</h2>
            <h5 className="outfit">
              Early Access. Infinite Potential. Your Journey Starts Here.
            </h5>
            <div className="progress-section v1">
              <div className="progress-top-text">
                <p className="orbitron">Stage {data.stage}</p>
                <p className="orbitron">
                  {data.total_bought.toLocaleString()} /{" "}
                  {data.total_available.toLocaleString()}
                </p>
              </div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar-inner"
                  style={{ width: percentageBought + "%", maxWidth: "100%" }}
                >
                  <span className="inter">{percentageBought.toFixed()}%</span>
                </div>
              </div>
            </div>

            <div className="price-text">
              <p className="orbitron wt-600">
                1 <span className="gittu-token-symbol">NPM</span> ={" "}
                {data.price} USD
              </p>
              <p className="orbitron wt-600">
                NEXT STAGE PRICE = {data.next_stage_price} USD
              </p>
              <p className="orbitron wt-600">MOQ = {data.moq} USD</p>
            </div>
            <button
              type="button"
              className="banner1-btn wt-700 uppercase outfit"
              data-bs-toggle="modal"
              data-bs-target="#buyModal"
              onClick={toggleBuyModal}
            >
              Buy Now
            </button>

            <div className="banner1-social">
              <ul>
                <li>
                  <a href="https://t.me/Zss_beckerreal" target="_blank">
                    <Image
                      width={20}
                      height={20}
                      src="./assets/images/icon/telegram.svg"
                      alt="icon"
                      style={{ marginTop: 10 }}
                    />
                  </a>
                </li>
                <li>
                  <a href="https://x.com/zsss_becke?s=21" target="_blank">
                    <Image
                      width={20}
                      height={20}
                      src="./assets/images/icon/twitter.svg"
                      alt="icon"
                      style={{ marginTop: 10 }}
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>{" "}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-10 mt-10">Leader Board</h3>
          {loading && <div className="text-gray-600">Loading...</div>}
          {/* {error && <div className="text-red-600">Error: {error}</div>} */}
          {!loading && <LeaderBoardTable leaderBoards={leaderBoards} />}
        </div>
      </section>
      {showBuyModal && (
        <BuyModal items={wallets} toggleBuyModal={toggleBuyModal} />
      )}
    </>
  );
}
