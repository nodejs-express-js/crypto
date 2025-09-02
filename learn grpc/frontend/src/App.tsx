import { useRef, useState } from 'react'

import './App.css'

import { createClient } from "@connectrpc/connect";
import { ElizaService } from "./gen/eliza_pb";
// import { VishalService } from './gen/vishal_pb';
import { createConnectTransport } from "@connectrpc/connect-web";



function App() {

  const [sendMessage,setSendMessage]=useState("");
  const [reciveMessage,setReciveMessage]=useState("");
  const [streamvalue,setStreamValue]=useState("");
  const [arr,setArr]=useState(["hello","world","great","amazing"])
  const transport = createConnectTransport({
    baseUrl: "http://localhost:8080",
  });

  const controllerRef = useRef<AbortController | null>(null); // keep track of the current stream

  const message=async()=>{
    try{
      setReciveMessage("")
      setArr((arr)=>[...arr,sendMessage])
      const Elizaclient = createClient(ElizaService, transport);
      // const vishalClient=createClient(VishalService,transport);
      const res =Elizaclient.streamPrices({ sentence: sendMessage });    
      // const res1=await vishalClient.say({sentence:sendMessage});
      // const stream =Elizaclient.streamResponses({ sentence: "Hello world from ChatGPT" });

      if (controllerRef.current) {
        controllerRef.current.abort();
      }
      const controller = new AbortController();
      controllerRef.current = controller;

      console.log([...arr,sendMessage])
      // const res2=Elizaclient.streamArrays({sentences:[...arr,sendMessage]});
      // const res2 = Elizaclient.streamArrays(
      //   { sentences: [...arr, sendMessage] },
      //   { signal: controller.signal }
      // );

      // for await (const msg of stream) {
      //   setStreamValue(msg.sentence)
      // }
      // for await (const msg of res2) {
      //   setArr(msg.sentences)
      // }
      
    for await (const msg of res) {
    setReciveMessage(msg.sentence);
    }
      setSendMessage("")
    }
    catch(err){
      console.log(err)
      setReciveMessage("server caused error")
    }
  }

  return (
    <>
      <div>
        <input type='text' onChange={(e)=>{setSendMessage(e.target.value)}}></input>
        <button onClick={message}>get message</button> 
        <div>{reciveMessage}</div> 
        <div>{streamvalue}</div>
        <>
        {arr.map((x,key)=>{
          return <div key={key}>{x}</div>
        })}
        </>
      </div> 
    </>
  )
}

export default App
