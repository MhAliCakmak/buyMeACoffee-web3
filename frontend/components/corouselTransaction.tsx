"use client"
import * as React from "react";
import Autoplay from "embla-carousel-autoplay"

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
interface Transaction {
  name: string;
  message: string;
  coffeeType: string;
  size: string;
}
export function CorouselTransaction() {
  const transaction: Transaction[] = [
    {
      name: "Mehmet",
      message: "Message for Kodista!",
      coffeeType: "Coffee ✨",
      size: "Small",
    },
    {
      name: "Mehmet",
      message: "Message for Kodista!",
      coffeeType: "Turkish Coffee ✨✨",
      size: "Medium",
    },
    {
      name: "Mehmet",
      message: "Message for Kodista!",
      coffeeType: "Latte in Switzerland ✨✨✨",
      size: "Large",
    },
    {
      name: "Mehmet",
      message: "Message for Kodista!",
      coffeeType: "Frappuccino ✨✨✨✨",
      size: "Extra Large",
    },
  ];
  return (
    <Carousel  plugins={[
      Autoplay({
        delay: 1500,
      }),
    ]} className="w-full justify-center max-w-sm sm:max-w-lg">
      <CarouselContent className="">
        {transaction.map((tran, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/1">
            <div className="p-1">
              <Card>
                <CardHeader>
                  <CardTitle>{tran.name}</CardTitle>
                  <CardDescription>
                    {tran.coffeeType}-{tran.size}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex aspect-auto items-start  px-6">
                  {tran.message}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
     
    </Carousel>
  );
}
