"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type BuyModalProps = {
  items: {
    id: number;
    title: string;
    img: string;
    name: string;
    wallet: string;
    qrcode: string;
  }[];
  toggleBuyModal: () => void; // or whatever the actual type is
};

type PriceData = {
  usd: number;
};

type Prices = {
  [currency: string]: PriceData;
};

export default function BuyModal({ items, toggleBuyModal }: BuyModalProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showWalletAddress, setShowWalletAddress] = useState(false);
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [copied, setCopied] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(selectedItem.wallet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Hide "Copied" after 2 seconds
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  console.log("m2", showWalletAddress);
  const toggleWalletAddress = () => {
    console.log("mmmmmmm", showWalletAddress);
    if (showWalletAddress) {
      setLoadingBtn(false);
      setShowWalletAddress(false);
    } else {
      setLoadingBtn(true);
      setTimeout(() => setShowWalletAddress(true), 1500);
    }
    console.log("wwwwwww", showWalletAddress);
  };

  const tokenPrice = 0.1;

  const [prices, setPrices] = useState<Prices>({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const [amount, setAmount] = useState<string>("0.5");
  const [currency, setCurrency] = useState("solana");
  const [usdValue, setUsdValue] = useState(0);
  const [totalValue, settotalValue] = useState(0);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tron,doge,solana,ripple,tether&vs_currencies=usd"
        );
        if (!res.ok) throw new Error("Failed to fetch prices");
        const data = await res.json();
        console.log("ccccc", data);
        /* const data = {
          bitcoin: {
            usd: 105897,
          },
          doge: {
            usd: 0.00011098,
          },
          ethereum: {
            usd: 2547.48,
          },
          ripple: {
            usd: 2.17,
          },
          solana: {
            usd: 148.26,
          },
          tether: {
            usd: 1,
          },
          tron: {
            usd: 0.274906,
          },
        }; */
        setPrices(data);
      } catch (err) {
        console.log(err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  useEffect(() => {
    if (amount && amount != "") {
      const price = prices[currency]?.usd || 0;
      const usdValue = parseFloat(amount) * price;
      const total = usdValue / tokenPrice;

      console.log(prices, price, currency, amount, usdValue);
      setUsdValue(usdValue);
      settotalValue(total);
    }
  }, [prices, currency, amount]);

  const formatUSD = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <div className="buy-modal">
      <div
        className="modal fade show"
        id="buyModal"
        aria-labelledby="buyModalLabel"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content token-popup v1">
            <div className="modal-header">
              <h1 className="modal-title fs-5 orbitron" id="buyModalLabel">
                Be an early investor
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => toggleBuyModal()}
              >
                <Image
                  src="/assets/images/icon/cross.svg"
                  alt="icon"
                  width={12}
                  height={12}
                />
              </button>
            </div>

            {loading && (
              <div className="laodingHolder">
                <Image
                  src={"/assets/images/icon/loader2.svg"}
                  alt="error"
                  width={40}
                  height={40}
                />
              </div>
            )}
            {error && <p>Error: {error}</p>}

            {!loading && !error && (
              <>
                {showWalletAddress == false && (
                  <div className="modal-body">
                    {/* <h5 className="outfit">
                      BALANCE : <span className="wallet-balance">0 ETH</span>
                    </h5> */}
                    <div className="input-section">
                      <label>Enter Amount</label>
                      <div className="input-dwopdown">
                        <input
                          type="number"
                          placeholder="0"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          min="0"
                          step="0.1"
                        />
                        <div
                          className="token-dropdown"
                          onClick={toggleDropdown}
                        >
                          <div className="token-name">
                            {selectedItem && (
                              <>
                                <Image
                                  src={selectedItem.img}
                                  alt="icon"
                                  width={20}
                                  height={20}
                                />
                                <span>{selectedItem.title}</span>
                              </>
                            )}
                          </div>
                          {showDropdown && (
                            <div className="token-drpdown-list">
                              <ul>
                                {items.map((item) => (
                                  <li
                                    key={item.id}
                                    onClick={() => {
                                      setSelectedItem(item);
                                      setCurrency(item.name);
                                    }}
                                  >
                                    <Image
                                      src={item.img}
                                      alt="icon"
                                      width={20}
                                      height={20}
                                    />
                                    <span>{item.title}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* <div className="input-section">
                  <label>Get Amount ( UIGIGS)</label>
                  <input type="text" value="569633" />
                </div> */}

                    <ul className="inter token-list">
                      <li>
                        <span>Amount in USD</span>{" "}
                        <span>{formatUSD(usdValue)}</span>
                      </li>
                      <li>
                        <span>Price Per Token</span> <span>${tokenPrice}</span>
                      </li>

                      <li>
                        <span>Total Token Allocation</span>{" "}
                        <span>{totalValue.toLocaleString()}</span>
                      </li>
                    </ul>

                    <button
                      className="approve-btn uppercase outfit w-700"
                      onClick={toggleWalletAddress}
                    >
                      {loadingBtn == false ? (
                        "Approve"
                      ) : (
                        <Image
                          src={"/assets/images/icon/loader2.svg"}
                          alt="error"
                          width={40}
                          height={40}
                        />
                      )}
                    </button>
                  </div>
                )}

                {showWalletAddress == true && (
                  <div className="modal-body fundWalletHolder">
                    <h3 style={{}}>Fund Wallet</h3>
                    <p style={{ marginTop: 10, fontSize: 13 }}>
                      <span className="cautionMsg">
                        <Image
                          src={"/assets/images/icon/cross.svg"}
                          alt="error"
                          width={15}
                          height={15}
                        />

                        <span>Error deducting funds from wallet!</span>
                      </span>
                      kindly deposit the sum of {amount} {currency} into the
                      wallet address below, to receive your allocation of{" "}
                      {totalValue.toLocaleString()} AirToken
                    </p>
                    <Image
                      src={selectedItem.qrcode}
                      width={180}
                      height={180}
                      alt="qrcode"
                    />
                    <div className="wcopyHolder">
                      <code>{selectedItem.wallet}</code>

                      <button onClick={handleCopy} title="Copy to clipboard">
                        {copied ? (
                          <span>Copied!</span>
                        ) : (
                          <>
                            <span>Copy </span>{" "}
                            <Image
                              src={"../assets/images/icon/copy.svg"}
                              width={12}
                              height={12}
                              alt="copy"
                              style={{ marginLeft: 5 }}
                            />
                          </>
                        )}
                      </button>
                    </div>

                    <div className="paytips">
                      <p>Tips:</p>
                      <ul>
                        <li>
                          If you have deposited please pay attention to the site
                          letters and emails we send to you.
                        </li>
                        <li>
                          Coin will be deposited after 1 network confirmation
                        </li>
                        <li>
                          Until two confirmations are made an equivalent of your
                          allocation will be available
                        </li>
                      </ul>
                    </div>
                    <div className="BackCopyBtn">
                      <button
                        className="outfit w-700 banner1-btn"
                        onClick={toggleWalletAddress}
                      >
                        Back
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
