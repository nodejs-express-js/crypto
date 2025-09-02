import type { ConnectRouter } from "@connectrpc/connect";
import { VishalService } from "../gen/vishal_pb.js";

const registerVishalService=(router:ConnectRouter)=>{
    router.service(VishalService, {
        async say(req) {
          console.log(req.sentence)
          return {
            sentence: `Vishal said: ${req.sentence}`,
          };
        },
      });
}

export default registerVishalService;