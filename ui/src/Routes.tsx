import { FC, ReactElement, ReactNode, Suspense, lazy } from "react";
import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import BlogDetail from "./components/BlogDetail";

const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const MyAccount = lazy(() => import("./pages/MyAccount"));

interface LayoutProps {
  children: ReactNode;
}

const MainLayout: FC<LayoutProps> = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

const PlainLayout: FC<LayoutProps> = ({ children }) => <>{children}</>;

interface AuthRouteProps {
  children: ReactElement;
}

const AuthRoute: FC<AuthRouteProps> = ({ children }) => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  if (!isLoggedIn) {
    // User is not logged in, redirect them
    return <Navigate to="/login" replace />;
  }

  // User logged in, render the requested page
  return children;
};
const Routes: FC = () => {
  return (
    <Suspense fallback={<div className="h-full w-full">Loading...</div>}>
      <RouterRoutes>
        <Route
          path="/login"
          element={
            <PlainLayout>
              <Login />
            </PlainLayout>
          }
        />
        <Route
          path="/register"
          element={
            <PlainLayout>
              <Register />
            </PlainLayout>
          }
        />
        <Route
          path="/account"
          element={
            <AuthRoute>
              <MainLayout>
                <MyAccount />
              </MainLayout>
            </AuthRoute>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <MainLayout>
              <BlogDetail />
            </MainLayout>
          }
        />
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        {/* <Route path="*" element={<NotFound />} /> */}
      </RouterRoutes>
    </Suspense>
  );
};

export default Routes;
