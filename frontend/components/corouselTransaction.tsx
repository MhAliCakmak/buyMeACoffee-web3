"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ContractContext } from "@/context";
import { toast } from "sonner";
import { CardFooter } from "@nextui-org/react";

export function CorouselTransaction() {
  const [memos, setMemos] = React.useState([
    {
      name: "",
      message: "",
      coffType: "",
      coffSize: "",
      timestamp: BigInt(0),
    },
  ]);
  const { contract } = React.useContext(ContractContext);

  const getMemos = async () => {
    try {
      const response = await contract({
        functionName: "getMemos",
        methodType: "read",
        args: [],
      });

      setMemos(response.reverse());
    } catch (error) {
      toast("error fetching memos from the blockchain..", {
        description: new Date().toLocaleString(),
        action: {
          label: "Got it",
          onClick: () => console.log("Undo"),
        },
      });
    }
  };

  function convertTimestampToDate(timestamp: bigint) {
    let date = new Date(Number(timestamp) * 1000);
    return date.toDateString();
  }

  React.useEffect(() => {
    getMemos();
  }, []);
  const types = [
    "Coffee ✨",
    "Turkish Coffee ✨✨",
    "Latte in Switzerland ✨✨✨",
    "Frappuccino ✨✨✨✨",
  ];
  const sizes = ["Tall ⚡", "Grande ⚡⚡", "Venti ⚡⚡⚡", "Trenta ⚡⚡⚡⚡"];

  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 1500,
        }),
      ]}
      className="w-full justify-center max-w-xs sm:max-w-lg mx-auto"
    >
      <CarouselContent className="items-center">
        {memos?.map((memo, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/1">
            <div className="p-1">
              <Card>
                <CardHeader>
                  <CardTitle>{memo.name}</CardTitle>
                  <CardDescription>
                    {types[Number(memo.coffType)]}
                    <br />
                    {sizes[Number(memo.coffSize)]}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex aspect-[4] items-start  px-6">
                  {memo.message}
                </CardContent>
                <CardHeader>
                  <CardDescription>
                    {convertTimestampToDate(memo.timestamp).toLocaleString()}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
