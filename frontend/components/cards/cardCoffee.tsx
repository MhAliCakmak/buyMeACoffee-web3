import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CardCoffee() {
  return (
    <Card className="w-[400px] bg-black">
      <CardHeader>
        <CardTitle>Checkout point</CardTitle>
        <CardDescription>
          Provide ease of payment with Web3 wallet.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="For writing on the cup" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Message</Label>
              <Input id="name" placeholder="Message for Kodista!" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Coffee Type</Label>
              <Select>
                <SelectTrigger className="bg-black" id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper" className="bg-black">
                  <SelectItem value="next">Coffee ✨</SelectItem>
                  <SelectItem value="sveltekit">Turkish Coffee ✨✨</SelectItem>
                  <SelectItem value="astro">
                    Latte in Switzerland ✨✨✨
                  </SelectItem>
                  <SelectItem value="nuxt">Frappuccino ✨✨✨✨</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Size</Label>
              <Select>
                <SelectTrigger className="bg-black" id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper" className="bg-black">
                  <SelectItem value="next">Tall ⚡</SelectItem>
                  <SelectItem value="sveltekit">Grande ⚡⚡</SelectItem>
                  <SelectItem value="astro">Venti ⚡⚡⚡</SelectItem>
                  <SelectItem value="nuxt">Trenta ⚡⚡⚡⚡</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="mt-auto flex flex-col  px-4">
        <Button className=" w-full ">Buy A Coffee</Button>
      </CardFooter>
    </Card>
  );
}
