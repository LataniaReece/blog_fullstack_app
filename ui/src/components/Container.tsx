import { FC, ReactElement } from "react";

interface ContainerProps {
  children: ReactElement;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return <div className="container mx-auto px-4 lg:px-2">{children}</div>;
};
export default Container;
