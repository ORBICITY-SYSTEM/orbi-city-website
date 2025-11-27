import { trpc } from "@/lib/trpc";
import "./i18n";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import { getLoginUrl } from "./const";
import "./index.css";
import { registerServiceWorker } from "./lib/pwa";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Retry failed queries twice
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
      staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
      refetchOnWindowFocus: false, // Don't refetch on window focus
    },
  },
});

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  window.location.href = getLoginUrl();
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    console.error("[API Mutation Error]", error);
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      async fetch(input, init) {
        const url = typeof input === 'string' ? input : (input instanceof Request ? input.url : input.toString());
        
        try {
          const response = await globalThis.fetch(input, {
            ...(init ?? {}),
            credentials: "include",
          });
          
          // Check if response is HTML when we expect JSON
          const contentType = response.headers.get('content-type');
          if (contentType?.includes('text/html')) {
            console.error('[tRPC] Server returned HTML instead of JSON. This usually happens during HMR or server restart.');
            console.error('[tRPC] URL:', url);
            console.error('[tRPC] Status:', response.status);
            
            // Throw error to trigger retry logic
            throw new Error(`Server returned HTML instead of JSON (likely HMR/restart). Retrying...`);
          }
          
          return response;
        } catch (error) {
          // Only log non-HTML errors to avoid spam
          if (!(error instanceof Error && error.message.includes('HTML instead of JSON'))) {
            console.error('[tRPC] Fetch error:', url, error);
          }
          throw error;
        }
      },
    }),
  ],
});

createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </trpc.Provider>
);

// Register PWA Service Worker
registerServiceWorker();
