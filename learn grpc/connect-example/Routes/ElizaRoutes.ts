import type { ConnectRouter } from "@connectrpc/connect";
import { ElizaService } from "../gen/eliza_pb.js";
import {startPriceStream} from './PlayWright.js'
const registerElizaService=(router:ConnectRouter)=>{
    router.service(ElizaService, {
        async say(req) {
          return {
            sentence: `Eliza said: ${req.sentence}`,
          };
        },
        async *streamResponses(req) {
            const words = req.sentence.split(" ");
            for(let i=0;i<100;i++){
                for (const word of words) {
                    // simulate delay
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    yield { sentence: `You said: ${word}` };
                  }
            } 
          },
          async *streamArrays(req){
            const arr=req.sentences;
            for(let i=0;i<1000;i++){
              const ret=[]
              for(let j=0;j<arr.length;j++){
                ret.push("addition"+Math.random());
              }
              await new Promise((resolve) => setTimeout(resolve, 500));
              yield {sentences:ret}
            }
          },
          async *streamPrices(req) {
            const { sentence } = req;
            console.log(sentence)
            const queue: string[] = [];
            let resolveNext: ((val: string) => void) | null = null;
          
            await startPriceStream(sentence, (price: string) => {
              if (resolveNext) {
                resolveNext(price); // immediately yield if waiting
                resolveNext = null;
              } else {
                queue.push(price); // otherwise queue it
              }
            });
          
            while (true) {
              if (queue.length > 0) {
                yield { sentence: queue.shift()! }; // yield queued value
              } else {
                // wait for the next price
                const nextPrice = await new Promise<string>((resolve) => {
                  resolveNext = resolve;
                });
                yield { sentence: nextPrice };
              }
            }
          }
          
      },
    
    );
}
export default registerElizaService;