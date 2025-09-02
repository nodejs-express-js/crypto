// routes.ts
import type { ConnectRouter } from "@connectrpc/connect";
import { CryptoService } from "../gen/crypto_pb.js";
import { startPriceStream } from "./PlayWright.js";

// Keep a global reference to controllers per ticker
let activeControllers: Record<string, AbortController> = {};

const routes = (router: ConnectRouter) => {
  router.service(CryptoService, {
    async *say(req: { currencies: string[] }) {
      const { currencies } = req;
      if (!currencies || currencies.length === 0) return;

      // Abort all previously active streams
      Object.values(activeControllers).forEach((controller) => {
        controller.abort();
      });

      activeControllers={};
      // Queues, resolvers, latestPrices, and new controllers
      const queues: Record<string, string[]> = {};
      const resolvers: Record<string, ((val: string) => void) | null> = {};
      const latestPrices: Record<string, string> = {};

      currencies.forEach((ticker) => {
        queues[ticker] = [];
        resolvers[ticker] = null;
        latestPrices[ticker] = "";
        const controller = new AbortController();
        activeControllers[ticker] = controller; // update global reference
      });

      // Start Playwright streams for all tickers
      await Promise.all(
        currencies.map((ticker) =>
          startPriceStream(
            ticker,
            (price: string) => {
              latestPrices[ticker] = price;

              if (resolvers[ticker]) {
                resolvers[ticker]!(price);
                resolvers[ticker] = null;
              } else {
                queues[ticker]!.push(price);
              }
            },
            activeControllers[ticker]!.signal
          )
        )
      );

      // Yield prices continuously
      try {
        while (true) {
          const promises = currencies.map((ticker) => {
            const queue = queues[ticker]!;

            if (queue.length > 0) {
              return Promise.resolve(queue.shift()!);
            }

            return new Promise<string>((resolve) => {
              resolvers[ticker] = resolve;
            });
          });

          const results = await Promise.all(promises);
          const prices: string[] = results.map((p) => p ?? "");
          yield { prices };
        }
      } finally {
        // Cleanup: abort all streams if generator ends or client disconnects
        currencies.forEach((ticker) => activeControllers[ticker]!.abort());
      }
    },
  });
};

export default routes;
