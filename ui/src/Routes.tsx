import { FC, Suspense, lazy } from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));

const Routes: FC = () => {
  return (
    <Suspense fallback={<div className="h-full w-full">Loading...</div>}>
      <RouterRoutes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </RouterRoutes>
    </Suspense>
  );
};

export default Routes;
