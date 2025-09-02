import type { ConnectRouter } from "@connectrpc/connect";
import registerElizaService from "./ElizaRoutes.js";
import registerVishalService from "./VishalRoutes.js";



const routes=(router:ConnectRouter)=>{
  registerElizaService(router);
  registerVishalService(router);
}




export default routes;