import * as React from "react";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DrawerCoffee() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Checkout point</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Checkout point</DrawerTitle>
            <DrawerDescription>
              Provide ease of payment with Web3 wallet.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="For writing on the cup" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">Coffee Type</Label>
                  <Select>
                    <SelectTrigger className="bg-black" id="framework">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="bg-black">
                      <SelectItem value="next">Coffee ✨</SelectItem>
                      <SelectItem value="sveltekit">
                        Turkish Coffee ✨✨
                      </SelectItem>
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

            <div className="mt-3 h-[120px]"></div>
          </div>
          <DrawerFooter >
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
