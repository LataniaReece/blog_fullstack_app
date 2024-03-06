import { PropsWithChildren, ReactElement } from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import { blogApi } from "../services/blogApiStub";

const customRender = (
  ui: ReactElement,
  {
    initialState = {},
    useMemoryRouter = false,
    initialEntries = ["/"],
    ...renderOptions
  } = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  const store = configureStore({
    reducer: { user: authReducer, [blogApi.reducerPath]: blogApi.reducer },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(blogApi.middleware),
    preloadedState: initialState,
  });

  const RouterComponent = useMemoryRouter ? MemoryRouter : BrowserRouter;
  const routerProps = useMemoryRouter ? { initialEntries } : {};

  const Wrapper = ({ children }: PropsWithChildren): JSX.Element => {
    return (
      <RouterComponent {...routerProps}>
        <Provider store={store}>{children}</Provider>
      </RouterComponent>
    );
  };

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
    store,
  };
};

export { customRender as render };
