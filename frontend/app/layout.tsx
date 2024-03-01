import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { ContextProvider } from '@/context'

import { Inter as FontSans } from "next/font/google"
import { SoonerTransaction } from "@/components/soonerTransaction";
import { Toaster } from "sonner";
 

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
		apple: "/coffee.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	return (
		<html lang="en" suppressHydrationWarning>
			
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			> <ContextProvider>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<div className="relative flex flex-col h-max">
						<Navbar />
						<main className="container mx-auto max-w-7xl  px-6 flex-grow">
							{children}
						
						</main>
						<footer className="w-full flex items-center justify-center py-3">
							<Link
								isExternal
								className="flex items-center gap-1 text-current "
								href="https://mehmetalicakmak.org"
								title="Mehmet Ali Çakmak's website"
							>
								<span className="text-default-600 underline-offset-[20px]">Powered by</span>
								<p style={{textDecoration: "underline"}} className="text-blue-500 hover:text-blue-600">Mehmet Ali Çakmak</p>
							</Link>
						</footer>
					</div>
					<Toaster />
				</Providers>
			</ContextProvider>
			</body>
		</html>
	);
}
