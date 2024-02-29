import { FC, ReactElement, ReactNode, Suspense, lazy } from "react";
import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Home = lazy(() => import("./pages/Home"));
const MyAccount = lazy(() => import("./pages/MyAccount"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const CreateBlog = lazy(() => import("./pages/CreateBlog"));
const UpdateBlog = lazy(() => import("./pages/UpdateBlog"));
const BlogSearch = lazy(() => import("./pages/BlogSearch"));

import Navbar from "./components/Navbar";
import { RootState } from "./store";
import PageLoader from "./components/PageLoader";
import NotFound from "./pages/NotFound";

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
  const { id } = useSelector((state: RootState) => state.user);

  if (!id) {
    // User is not logged in, redirect them
    return <Navigate to="/login" replace />;
  }

  // User logged in, render the requested page
  return children;
};
const Routes: FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
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
          path="/blogs/new"
          element={
            <AuthRoute>
              <MainLayout>
                <CreateBlog />
              </MainLayout>
            </AuthRoute>
          }
        />
        <Route
          path="/blogs/update/:id"
          element={
            <AuthRoute>
              <MainLayout>
                <UpdateBlog />
              </MainLayout>
            </AuthRoute>
          }
        />
        <Route
          path="/blogs/search"
          element={
            <MainLayout>
              <BlogSearch />
            </MainLayout>
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
        <Route
          path="*"
          element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          }
        />
      </RouterRoutes>
    </Suspense>
  );
};

export default Routes;
