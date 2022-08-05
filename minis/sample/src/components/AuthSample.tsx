import type { Auth } from "@snapchat/minis-sdk";
import React, { useState } from "react";

export const AuthSample = ({ auth }: { auth: Auth }) => {
  const [result, setResult] = useState<string>("");

  return (
    <div className="card">
      <div className="cell">
        <p className="textstyle-body">Result</p>
        <p className="textstyle-subheader">{result}</p>
      </div>
      <div className="cell">
        <div className="stack">
          <button
            type="button"
            className="btn btn-md btn-primary"
            onClick={() => {
              auth
                .fetchAuthToken()
                .then((res) => setResult(`fetchAuthToken token: ${res.token}`))
                .catch((err) =>
                  setResult(`fetchAuthToken error: ${JSON.stringify(err)}`)
                );
            }}
          >
            fetchAuthToken
          </button>
        </div>
      </div>
    </div>
  );
};
