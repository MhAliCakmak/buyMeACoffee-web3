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

      setMemos(response);
     
    } catch (error) {
      toast("error fetching memos from the blockchain..", {
        description:new Date().toLocaleString(),
        action: {
          label: "Got it",
          onClick: () => console.log("Undo"),
        },
      })
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
      className="w-full justify-center max-w-xs sm:max-w-lg"
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
                    <br />
                    {sizes[Number(memo.coffSize)]}
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
