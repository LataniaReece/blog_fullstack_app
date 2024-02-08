import { FC, ReactNode } from "react";
import { useMediaQuery } from "react-responsive";

import blue3dImg from "../../images/blue3d.jpg";

interface SplitScreenLayoutProps {
  error?: string | null;
  onCloseError?: () => void;
  children: ReactNode;
}

export const SplitScreenLayout: FC<SplitScreenLayoutProps> = ({
  error,
  onCloseError,
  children,
}) => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  return (
    <>
      {error && onCloseError && <p>{error}</p>}
      <div className="flex flex-row min-h-[700px] h-screen overflow-y-auto items-stretch">
        <div className="bg-white flex-1 flex flex-col text-left">
          <div className="px-[2rem] pt-[2rem] pb-5 sm:px-[3rem] md:px-[4rem] lg:px-[3rem] xl:px-[9rem] lg:pt-[5rem] h-full">
            {children}
          </div>
        </div>
        {isDesktop && (
          <div className="relative basis-1/2 block md:block h-full bg-whiteoverflow-hidden pt-6 pr-6 pb-6">
            <img
              src={blue3dImg}
              alt=""
              className="h-full w-full object-cover rounded-3xl"
            />
          </div>
        )}
      </div>
    </>
  );
};
