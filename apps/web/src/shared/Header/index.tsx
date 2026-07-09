import { Button } from "@/shared/atoms/Button";

interface HeaderProps {
  isLoggedIn: boolean;
  username: string;
  handleLogout: () => void;
  setIsAuthModalOpen: (isOpen: boolean) => void;
}

export const Header = ({
  isLoggedIn,
  username,
  handleLogout,
  setIsAuthModalOpen,
}: HeaderProps) => {
  return (
    <header className="mb-8 text-center">
      <div className="mb-2 flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <div className="shrink-0 text-center md:order-last">
          {isLoggedIn ? (
            <div className="flex flex-col items-center gap-2 sm:flex-row">
              <span className="text-user-greeting">
                {username}님 환영합니다!
              </span>
              <Button variant="secondary" size="small" onClick={handleLogout}>
                로그아웃
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              size="small"
              onClick={() => setIsAuthModalOpen(true)}
              className="text-center"
            >
              로그인
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
