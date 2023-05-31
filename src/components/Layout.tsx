import Header from "./Header";

const Layout = (props: { children: JSX.Element }) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default Layout;
