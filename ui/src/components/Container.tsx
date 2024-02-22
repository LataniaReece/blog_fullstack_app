import { FC, ReactElement } from "react";

interface ContainerProps {
  children: ReactElement;
  isHero?: boolean;
}

const Container: FC<ContainerProps> = ({ children, isHero }) => {
  return (
    <div className={isHero ? "bg-black" : ""}>
      <div className="container mx-auto px-4 md:px-10">{children}</div>
    </div>
  );
};
export default Container;
