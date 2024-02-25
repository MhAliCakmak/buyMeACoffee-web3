"use client";

import "@rainbow-me/rainbowkit/styles.css";
import * as React from "react";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  WagmiProvider,
} from "wagmi";
import { mainnet } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet],
  ssr: true,
  
});

const queryClient = new QueryClient();

export function Providers({
  children,
  cookie,
}: {
  cookie: string;
  children: React.ReactNode;
}) {

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}