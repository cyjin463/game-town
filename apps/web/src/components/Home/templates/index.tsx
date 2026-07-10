import { GameList } from "@/shared/organisms/GameList";

export function HomeTemplate() {
  return (
    <div className="w-full mx-auto px-4 py-6 sm:px-6">
      <main className="flex flex-col items-center justify-center">
        <h1 className="heading-hero-gradient mb-10 text-4xl md:text-6xl">
          dev37 게임 타운
        </h1>
        <GameList />
      </main>
    </div>
  );
}