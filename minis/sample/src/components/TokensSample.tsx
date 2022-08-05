import type { Tokens } from "@snapchat/minis-sdk";
import React, { useState } from "react";

export const TokensSample = ({ tokens }: { tokens: Tokens }) => {
  const [result, setResult] = useState<string>("");
  const [skus, setSKUs] = useState<string[]>([]);
  const [sku, setSKU] = useState<string>("");
  const [txnId, setTxnId] = useState<string>("");

  return (
    <div className="card">
      <div className="cell">
        <p className="textstyle-body">Result</p>
        <p className="textstyle-subheader">{result}</p>
      </div>
      <div className="cell">
        <div className="stack">
          <button
            className="btn btn-md btn-primary"
            onClick={() => {
              tokens
                .isSupported()
                .then((res) => setResult(`isSupported: ${JSON.stringify(res)}`))
                .catch((err) =>
                  setResult(`isSupported error: ${JSON.stringify(err)}`)
                );
            }}
          >
            isSupported
          </button>
          <button
            className="btn btn-md btn-primary"
            onClick={() => {
              tokens
                .getAllProducts()
                .then((res) => {
                  setResult(`getAllProducts: ${JSON.stringify(res)}`);
                  setSKU(res.products[0]?.sku ?? "");
                  setSKUs(res.products[0]?.sku ? [res.products[0]?.sku] : []);
                  return;
                })
                .catch((err) =>
                  setResult(`getAllProducts error: ${JSON.stringify(err)}`)
                );
            }}
          >
            getAllProducts
          </button>
        </div>
      </div>
      <div className="cell">
        <div className="stack">
          <form>
            <label htmlFor="skus">SKUs</label>
            <input
              type="text"
              id="skus"
              name="skus"
              value={skus.join(",")}
              onChange={(e) => setSKUs(e.target.value.split(","))}
            />
          </form>
          <button
            className="btn btn-md btn-primary"
            onClick={() => {
              tokens
                .getProducts(skus)
                .then((res) => {
                  setResult(`getProducts: ${JSON.stringify(res)}`);
                  setSKU(res.products[0]?.sku ?? "");
                  setSKUs(res.products[0]?.sku ? [res.products[0]?.sku] : []);
                  return;
                })
                .catch((err) =>
                  setResult(`getProducts error: ${JSON.stringify(err)}`)
                );
            }}
          >
            getProducts
          </button>
        </div>
      </div>
      <div className="cell">
        <div className="stack">
          <form>
            <label htmlFor="purchaseSku">Purchase SKU</label>
            <input
              type="text"
              id="purchaseSku"
              name="purchaseSku"
              value={sku}
              onChange={(e) => setSKU(e.target.value)}
            />
          </form>
          <button
            className="btn btn-md btn-primary"
            onClick={() => {
              tokens
                .purchase(sku)
                .then((res) => {
                  setResult(`purchase: ${JSON.stringify(res)}`);
                  setTxnId(res.purchase.transactionId);
                  return;
                })
                .catch((err) =>
                  setResult(`purchase error: ${JSON.stringify(err)}`)
                );
            }}
          >
            purchase
          </button>
          <button
            className="btn btn-md btn-primary"
            onClick={() => {
              tokens
                .getUnconsumedPurchases()
                .then((res) => {
                  setResult(`getUnconsumedPurchases: ${JSON.stringify(res)}`);
                  setTxnId(res.unconsumedPurchases[0]?.transactionId ?? "");
                  return;
                })
                .catch((err) =>
                  setResult(
                    `getUnconsumedPurchases error: ${JSON.stringify(err)}`
                  )
                );
            }}
          >
            getUnconsumedPurchases
          </button>
        </div>
      </div>
      <div className="cell">
        <div className="stack">
          <form>
            <label htmlFor="transactionId">Transaction ID</label>
            <input
              type="text"
              id="transactionId"
              name="transactionId"
              value={txnId}
              onChange={(e) => setTxnId(e.target.value)}
            />
          </form>
          <button
            className="btn btn-md btn-primary"
            onClick={() => {
              tokens
                .consumePurchase(txnId)
                .then(() => {
                  setResult("consumePurchase success");
                  setTxnId("");
                  return;
                })
                .catch((err) =>
                  setResult(`consumePurchase error: ${JSON.stringify(err)}`)
                );
            }}
          >
            consumePurchase
          </button>
        </div>
      </div>
    </div>
  );
};
