"use client";
import React, { ReactNode } from "react";
import { RainbowKitProvider, getDefaultWallets, midnightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { State, WagmiProvider } from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
 bscTestnet
} from "wagmi/chains";

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;


const { wallets } = getDefaultWallets();

// Create wagmiConfig
export const config = getDefaultConfig({
  appName: "App",
  wallets: [
    ...wallets,
    {
      groupName: 'Other',
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [bscTestnet],
  ssr: true,
  // @ts-ignore
  projectId,
});
// Setup queryClient
const queryClient = new QueryClient();



const Disclaimer = ({ Text, Link }: any) => (
  <Text>
    By connecting your wallet, you agree to the{" "}
    <Link href="#">Terms of Service</Link> and acknowledge you have read and
    understand the protocol <Link href="#">Disclaimer</Link>
  </Text>
);

export function ContextProvider({
  children,
}: {
  children: ReactNode;
  initialState?: State;
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
        coolMode
        locale="en-US"
        theme={midnightTheme({
          accentColor: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 24%, rgba(0,212,255,1) 100%)",
          accentColorForeground: "white",
          borderRadius: "medium",
          fontStack: "system",
          overlayBlur: "small",
        })}
        showRecentTransactions={true}
        appInfo={{
          appName: "Buy Me A Coffee",
          learnMoreUrl: "https://buymeacoffee.mehmetalicakmak.org",
          disclaimer: Disclaimer,
        }}
        >{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
