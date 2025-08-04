import React, { lazy, Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { KeepAlive,AliveScope } from "react-activation";
import "./App.scss";

const Home = lazy(() => import("./pages/Home/Home"));

const withSuspense = (Component: React.FC) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Component />
  </Suspense>
);

const withAlive = (Component: React.FC) => (
  <KeepAlive>
    <Component />
  </KeepAlive>
);

const router = createBrowserRouter([
  {
    path: "/home",
    element: withSuspense(Home)
  },
  {
    path: "*", // 兜底匹配
    element: withSuspense(Home)
  },
]);

const App: React.FC = () => {
  return (
    <AliveScope>
      <RouterProvider router={router} />
    </AliveScope>
  )
};

export default App;
