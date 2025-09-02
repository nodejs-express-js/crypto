"use client";

import styles from "./page.module.css";

import { createClient } from "@connectrpc/connect";
import { CryptoService } from "./gen/crypto_pb";
import { createConnectTransport } from "@connectrpc/connect-web";
import { useRef, useState } from "react";

export default function Home() {
  const [sendMessage, setSendMessage] = useState("");
  const controllerRef = useRef<AbortController | null>(null);
  const transport = createConnectTransport({
    baseUrl: "http://localhost:8080",
  });

  const [reqArr, setReqArr] = useState<string[]>([]);
  const [dispArr, setDispArr] = useState<string[]>([]);
  const [loading,setLoading]=useState(false);

  const addCoin = async () => {
    try {
      // Abort previous request if it exists
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      setLoading((prev)=>true)
      let firstResponse = false;

      const controller = new AbortController();
      controllerRef.current = controller;

      // Add sendMessage to reqArr and sort alphabetically
      const updatedReqArr = [...reqArr, sendMessage].sort((a, b) =>
        a.localeCompare(b)
      );
      
      setSendMessage("")
      const CryptoClient = createClient(CryptoService, transport);
      // Make the RPC call
      const stream = CryptoClient.say(
        { currencies: updatedReqArr },
        { signal: controller.signal } 
      );


      for await (const res of stream) { 
        if (!firstResponse) {
          setLoading(false);
          firstResponse = true;
        }
        setReqArr(updatedReqArr);
        console.log( [...res.prices])
        setDispArr((prev) => [...res.prices]);
        
      }
    } catch (err) {
    
      if ((err as any).name === "AbortError") {
        console.log("Previous request aborted");
      } else {
        console.log(err);
      }
    }
    
  };

  const remove =async (index: number) => {
    try {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      let firstResponse = false;
      setLoading((prev)=>true)
      const controller = new AbortController();
      controllerRef.current = controller;

      const updatedReqArr = reqArr.filter((_, i) => i !== index);
      setSendMessage("")
      const CryptoClient = createClient(CryptoService, transport);
      
      const stream = CryptoClient.say(
        { currencies: updatedReqArr },
        { signal: controller.signal } 
      );
      if(updatedReqArr.length===0){
        setReqArr([])
        setDispArr([])
        setLoading(false);
      }

      for await (const res of stream) { 
        setReqArr((req)=>updatedReqArr);
        console.log( [...res.prices])
        setDispArr((prev) => [...res.prices]);
        if (!firstResponse) {
          setLoading(false);
          firstResponse = true;
        }
      }

    } catch (err) {
      if ((err as any).name === "AbortError") {
        console.log("Previous request aborted");
      } else {
        console.log(err);
      }
    }
    
  };
  
  return (
<div className={styles.container}>
  <div className={styles.inputContainer}>
    <input
      className={styles.input}
      type="text"
      placeholder="Ticker"
      onChange={(e) => setSendMessage(e.target.value)}
      value={sendMessage}
    />
    <button
      className={styles.addButton}
      onClick={addCoin}
      disabled={loading}
    >
      Add
    </button>
  </div>

  {loading && <div className={styles.loading}>Loading...</div>}

  <div className={styles.list}>
    {reqArr.map((req, index) => (
      <div key={index} className={styles.listItem}>
        <div className={styles.ticker}>{req}</div>
        <div className={styles.price}>{dispArr[index]}</div>
        <button
          className={styles.removeButton}
          onClick={() => remove(index)}
          disabled={loading}
        >
          x
        </button>
      </div>
    ))}
  </div>
</div>

  );
}
