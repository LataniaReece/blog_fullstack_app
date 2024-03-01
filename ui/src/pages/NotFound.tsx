import { FC } from "react";
import PageError from "../components/PageError";

const NotFound: FC = () => {
  return <PageError heading="404" subHeading="It seems you got a bit lost" />;
};
export default NotFound;
