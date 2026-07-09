import React from "react";

export const SnakePreview: React.FC = () => {
  return (
    <div className="grid h-32 w-32 grid-cols-10 grid-rows-10 gap-px sm:h-40 sm:w-40">
      <div className="col-start-5 row-start-5 rounded-sm bg-snake-head" />
      <div className="col-start-4 row-start-5 rounded-sm bg-snake-body" />
      <div className="col-start-3 row-start-5 rounded-sm bg-snake-body" />
      <div className="col-start-2 row-start-5 rounded-sm bg-snake-body" />
      <div className="col-start-7 row-start-5 rounded-full bg-snake-food" />
    </div>
  );
};
