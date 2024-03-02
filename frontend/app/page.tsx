import { title, subtitle } from "@/components/primitives";
import { CardCoffee } from "@/components/cards/cardCoffee";
import { CorouselTransaction } from "@/components/corouselTransaction";
import { DrawerCoffee } from "@/components/cards/drawerCoffee";

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
    <section className="flex flex-col lg:flex-row items-center justify-around gap-4 py-6 md:pt-12">
      <div className="max-w-lg text-start justify-center">
        <h1 className={title()}>Buy Me A&nbsp;</h1>
        <h1 className={title({ color: randomColor })}>Coffee !&nbsp;</h1>

        <h2 className={subtitle({ class: "mt-4" })}>
          Buy a Coffee for Most Attractive{` `}
          <span className={title({ color: randomColor, size: "sm" })}>
            (My Guess)
          </span>
          , decentralized and modern Blockchain Developer 😴😴
        </h2>

        <div className="pt-4">
          <DrawerCoffee  />
          <CorouselTransaction />
        </div>
      </div>
      <div className="hidden bg-gradient-to-b md:block lg:block">
        <CardCoffee />
      </div>
    </section>
  );
}
