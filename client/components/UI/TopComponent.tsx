import { ChildrenProps } from "interface";

export const TopComponent = ({ children }: ChildrenProps) => {
  return (
    <div className="flex justify-between items-center bg-gray1 px-5 py-3 h-16 select-none">
      {children}
    </div>
  );
};
