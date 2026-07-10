interface GameStatusMessageProps {
  message: string;
}

export function GameStatusMessage({ message }: GameStatusMessageProps) {
  return (
    <div className="my-4">
      <p className="text-body mb-3">{message}</p>
    </div>
  );
}
