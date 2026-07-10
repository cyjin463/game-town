import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center mx-auto px-4 py-6 sm:px-6">
      <Link href="https://github.com/cyjin463/game-town" target="_blank" className="text-sm text-foreground-muted">
         👉 dev37 Game Town GitHub Repository 👈
      </Link>
    </footer>
  );
};