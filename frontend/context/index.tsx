"use client";
import React, { ReactNode } from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  State,
  WagmiProvider,
  useAccount,
  usePublicClient,
  useWalletClient,
} from "wagmi";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { bscTestnet } from "wagmi/chains";
import { ABI, CONTRACT_ADDRESS } from "../constants";
import { parseEther } from "viem";
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

const { wallets } = getDefaultWallets();

// Create wagmiConfig
export const config = getDefaultConfig({
  appName: "App",
  wallets: [
    ...wallets,
    {
      groupName: "Other",
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
            accentColor:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 24%, rgba(0,212,255,1) 100%)",
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
        >
          <ContractProvider>{children}</ContractProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
export const ContractContext = React.createContext(
  {} as {
    contract: (params: ContractFunctionParams) => Promise<any>;
    address: string;
    provider: any;
  }
);
interface ContractFunctionParams {
  functionName: string;
  methodType: string;
  args: any;
  values?: BigInt;
}
export const ContractProvider = ({ children }: { children: ReactNode }) => {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();

  const contractFunctions = async ({
    functionName,
    methodType,
    args,
    values,
  }: ContractFunctionParams) => {
    if (!address) {
      return;
    }
    let contract;
    if (methodType === "read") {
      contract = await publicClient?.readContract({
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: functionName,
        args: args,
      });
    } else {
      console.log(address);

      contract = await walletClient?.writeContract({
        abi: ABI,
        address: CONTRACT_ADDRESS,
        functionName: functionName,
        args: args,
        account: address,
        // @ts-expect-error ts-migrate(2345)
        value: values,
      });
    }
    return contract;
  };
  return (
    <ContractContext.Provider
      value={{
        contract: contractFunctions,
        address: CONTRACT_ADDRESS,
        provider: publicClient,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
