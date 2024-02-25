
import {
  getDefaultConfig,
  Chain,
} from '@rainbow-me/rainbowkit';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  zora,
  goerli,
} from 'wagmi/chains';

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

// Local avax custom chain


// Create wagmiConfig
export const config = getDefaultConfig({
  appName: "App",
  chains: [ mainnet, goerli, polygon, optimism, arbitrum, base, zora],
  ssr: true,
  projectId,
})