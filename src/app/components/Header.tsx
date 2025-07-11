import Image from "next/image";

type BuyModalProps = {
  toggleBuyModal: () => void; // or whatever the actual type is
};

export default function Header({ toggleBuyModal }: BuyModalProps) {
  return (
    <header className="header-section v3">
      <div className="container">
        <div className="header-inner">
          <a href="./" className="logo">
            <Image
              src={"/assets/images/icon/logo.png"}
              width={65}
              height={40}
              alt="Logo"
            />
          </a>

          <div className="header-right">
            <button
              type="button"
              className="connect-wallet-btn"
              onClick={toggleBuyModal}
            >
              Connect <span>Wallet</span>
            </button>

            <div className="mobile-menu">
              <button
                className="navbar-toggler mobile-menu-btn"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNavbar"
                aria-controls="offcanvasNavbar"
                aria-label="Toggle navigation"
              >
                <Image
                  src={"/assets/images/icon/menu-bar.svg"}
                  width={100}
                  height={30}
                  alt="Logo"
                />
              </button>

              <div
                style={{ display: "none" }}
                className="offcanvas offcanvas-start mobile-menu-content"
                data-bs-scroll="true"
                id="offcanvasNavbar"
              >
                <div className="offcanvas-header mobile-menu-top">
                  <a href="./index.html" className="logo">
                    <Image
                      src={"/assets/images/icon/logo.svg"}
                      width={100}
                      height={30}
                      alt="Logo"
                    />
                  </a>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  >
                    <Image
                      src={"/assets/images/icon/cross.svg"}
                      width={100}
                      height={30}
                      alt="Logo"
                    />
                  </button>
                </div>

                <div className="offcanvas-body">
                  <ul className="mobile-menu-list">
                    <li>
                      <a className="active" href="./index.html">
                        Demo One
                      </a>
                    </li>
                    <li>
                      <a href="./index-2.html">Demo Two</a>
                    </li>
                    <li>
                      <a href="./index-3.html">Demo Three</a>
                    </li>
                    <li>
                      <a href="./index-4.html">Demo Four</a>
                    </li>
                    <li>
                      <a href="./index-5.html">Demo Five</a>
                    </li>
                    <li>
                      <a href="./index-6.html">Demo Six</a>
                    </li>
                    <li>
                      <a href="./index-7.html">Demo Seven</a>
                    </li>
                    <li>
                      <a href="./index-8.html">Demo Eight</a>
                    </li>
                    <li>
                      <a href="./index-9.html">Demo Nine</a>
                    </li>
                    <li>
                      <a href="./index-10.html">Demo Ten</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
