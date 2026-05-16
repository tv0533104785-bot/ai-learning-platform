import Navbar from "./Navbar";

const PageContainer = ({ children }) => {
    return (
        <div>
            <Navbar/>
            <main className="max-w-5xl mx=auto p-6">{children}</main>
        </div>
    )
}

export default PageContainer