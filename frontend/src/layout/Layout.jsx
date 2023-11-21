import Header from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
    return (
        <>
        <Header />
        <Sidebar />
        <main>{children}</main>
        </>
    );
}

export default Layout;