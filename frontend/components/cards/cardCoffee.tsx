"use client";
import * as React from "react";
import ReactLoading from "react-loading";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { ContractContext } from "@/context";
import { parseEther, formatEther } from "viem";
import { ValidationSchema } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { CustomConnectButton } from "../customConnectButton";
import { toast } from "sonner";

export function CardCoffee() {
  const { contract, isConnected } = React.useContext(ContractContext);
  const [loading, setLoading] = React.useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof ValidationSchema>>({
    resolver: zodResolver(ValidationSchema),
    defaultValues: {
      name: "",
      message: "",
      type: "",
      size: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof ValidationSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      setLoading(true);
      const { name, message, type, size } = data;

      const response = await contract({
        functionName: "buyCoffee",
        methodType: "write",
        args: [name, message, Number(type), Number(size)],
        values: calculateAmount(Number(size), Number(type)),
      });
      toast("Successfully bought a coffee thanks.", {
        description: new Date().toLocaleString(),
        action: {
          label: "See transaction",
          onClick: () =>
            window.open(
              `
            https://testnet.bscscan.com/tx/${response.toString()}`,
              "_blank"
            ),
        },
      });
      form.reset();
      setLoading(false);
    } catch (e) {
      console.error(e);
      toast("Error buying coffee", {
        description: new Date().toLocaleString(),
        action: {
          label: "Got it",
          onClick: () => console.log(e),
        },
      });
    } finally {
      setLoading(false);
    }
  }

  const calculateAmount = (size: number, type: number) => {
    if (!isFinite(size)) throw new Error("Size must be a number");
    if (!isFinite(type)) throw new Error("Type must be a number");
    return parseEther(((size + type + 1) / 100).toString());
  };

  return (
    <Card className="sm:w-[400px] w-[300px] bg-gradient-to-b ">
      <CardHeader>
        <CardTitle>Checkout point</CardTitle>
        <CardDescription>
          Provide ease of payment with Web3 wallet.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          {...field}
                          placeholder="For writing on the cup"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Input
                          id="message"
                          {...field}
                          placeholder="Leave a note to Codista(Barista)"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="type">Coffee Type</FormLabel>

                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a Coffee" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent position="popper">
                          <SelectItem value="0">Coffee ✨</SelectItem>
                          <SelectItem value="1">Turkish Coffee ✨✨</SelectItem>
                          <SelectItem value="2">
                            Latte in Switzerland ✨✨✨
                          </SelectItem>
                          <SelectItem value="3">
                            Frappuccino ✨✨✨✨
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="size">Coffee Size</FormLabel>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a Size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent position="popper">
                          <SelectItem value="0">Tall ⚡</SelectItem>
                          <SelectItem value="1">Grande ⚡⚡</SelectItem>
                          <SelectItem value="2">Venti ⚡⚡⚡</SelectItem>
                          <SelectItem value="3">Trenta ⚡⚡⚡⚡</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {isConnected ? (
              <Button type="submit" className="mt-3 w-full">
                {loading ? (
                  <ReactLoading
                    type="bars"
                    color="ffffff"
                    height={20}
                    width={20}
                  />
                ) : (
                  "Buy Me A Coffee"
                )}
              </Button>
            ) : (
              <div className="mt-3">
                <CustomConnectButton outline title="Please connect your wallet to buy coffee." />
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
