import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CardCoffee } from "@/components/cards/cardCoffee";
import { DrawerCoffee } from "@/components/cards/drawerCoffee";
import { CarouselOrientation } from "@/components/corouselTransaction";

export default function Home() {
  const chooseColor = [
    "violet",
    "yellow",
    "blue",
    "cyan",
    "green",
    "pink",
    "foreground",
  ];
  const randomColor: any =
    chooseColor[Math.floor(Math.random() * chooseColor.length)];

  return (
    <section className="flex sm:flex-row flex-col items-center justify-around gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-start justify-center">
        <h1 className={title()}>Buy Me A&nbsp;</h1>
        <h1 className={title({ color: randomColor })}>Coffee !&nbsp;</h1>

        <h2 className={subtitle({ class: "mt-4" })}>
         Buy a Coffee for Most Attractive{` `}
          <span className={title({ color: randomColor,size:"sm" })}>(My Guess)</span>,
          decentralized and modern Blockchain Developer 😴😴
        </h2>
		<div className="mt-4">

		<DrawerCoffee />
		</div>
      </div>
      <div className="flex gap-3 ">
        <CardCoffee />
      </div>
    </section>
  );
}
