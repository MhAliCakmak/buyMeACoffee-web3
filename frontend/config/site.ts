export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Buyme a Coffee",
  description: "Platform to raise money to buy coffee on blockchain ",
  navItems: [],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/MhAliCakmak",
    linkedin: "https://www.linkedin.com/in/mhalicakmak/",
  },
};
