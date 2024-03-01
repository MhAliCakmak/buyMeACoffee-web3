"use client";
import * as React from "react";

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
import { SoonerTransaction } from "../soonerTransaction";
import { toast } from "sonner";

export function CardCoffee() {
  const { contract } = React.useContext(ContractContext);
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
    toast("Event has been created")
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const { name, message, type, size } = data;

      const response = await contract({
        functionName: "buyCoffee",
        methodType: "write",
        args: [name, message, Number(type), Number(size)],
        values: calculateAmount(Number(size), Number(type)),
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  const calculateAmount = (size: number, type: number) => {
    if (!isFinite(size)) throw new Error("Size must be a number");
    if (!isFinite(type)) throw new Error("Type must be a number");
    return parseEther(((size + type + 1) / 100).toString());
  };

  return (
    <Card className="w-[400px]">
      
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
                          placeholder="Leave a note to Kodista(Barista)"
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
            <Button type="submit" className="mt-3 w-full ">
              Buy A Coffee - {

              
              } TBNB
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
