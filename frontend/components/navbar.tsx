"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon } from "@/components/icons";

import { LinkedinIcon } from "lucide-react";
import Image from "next/image";
import { CustomConnectButton } from "./customConnectButton";
import { MenuSection } from "@nextui-org/react";

export const Navbar = () => {
  //   const searchInput = (
  //     <Input
  //       aria-label="Search"
  //       classNames={{
  //         inputWrapper: "bg-default-100",
  //         input: "text-sm",
  //       }}
  //       endContent={
  //         <Kbd className="hidden lg:inline-block" keys={["command"]}>
  //           K
  //         </Kbd>
  //       }
  //       labelPlacement="outside"
  //       placeholder="Search..."
  //       startContent={
  //         <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
  //       }
  //       type="search"
  //     />
  //   );

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Image src="/coffee.png" width={36} height={36} alt="" />
            <p className="font-bold text-inherit">BuyMeACoffee</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <LinkedinIcon className="text-default-500" />
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden md:flex">
          <CustomConnectButton />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <CustomConnectButton />
      </NavbarContent>
    </NextUINavbar>
  );
};
