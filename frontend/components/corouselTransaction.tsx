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
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ContractContext } from "@/context";

export function CorouselTransaction() {
  const [memos, setMemos] = React.useState([
    {
      name: "",
      message: "",
      coffType: "",
      coffSize: "",
      timestamp: "",
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
      console.log("fetching memos from the blockchain..");
      console.log(response);
      setMemos(response);
      console.log("fetched!");
      console.log(memos);
    } catch (error) {
      console.log("error fetching memos from the blockchain..", error);
    }
  };
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
      className="w-full justify-center max-w-sm sm:max-w-lg"
    >
      <CarouselContent className="">
        {memos?.map((memo, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/1">
            <div className="p-1">
              <Card>
                <CardHeader>
                  <CardTitle>{memo.name}</CardTitle>
                  <CardDescription>
                    {types[Number(memo.coffType)]}
                    <br/>{sizes[Number(memo.coffSize)]}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex aspect-auto items-start  px-6">
                  {memo.message}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
