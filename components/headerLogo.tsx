import NextLink from "next/link";

const HeaderLogo = () => {
  return (
    <NextLink href="/" className="inline-flex gap-2 items-end">
      <img
        src="/logo.png"
        alt=""
        className="h-[24px] w-auto hidden md:inline-flex"
      />
      <img src="/logo-small.png" alt="" className="h-[24px] w-auto md:hidden" />
      <span className="px-[8px] py-[2px] leading-tight bg-secondary-lightest text-primary-dark uppercase text-xs rounded-sm">
        beta
      </span>
    </NextLink>
  );
};

export { HeaderLogo };
