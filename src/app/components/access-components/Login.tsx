"use client";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    alert(`Email: ${email}, Password: ${password}`);
  };

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
                Login
              </h1>
            </div>

            <>
              <form onSubmit={handleLogin}>
                <div className="modal-body">
                  <div className="input-section">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-section">
                    <label>Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="approve-btn uppercase outfit w-700"
                  >
                    Log in
                  </button>
                </div>
              </form>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
