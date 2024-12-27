import { Link, Outlet, useLocation, useParams } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const params = useParams();

  // Helper function to generate breadcrumbs
  const generateBreadcrumbs = () => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    return (
      <div className="flex items-center space-x-2 text-gray-700">
        <Link to="/" className="text-blue-600">
          Home
        </Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <span key={to} className="text-gray-500">
              / {value === params.id ? params.id : value}
            </span>
          ) : (
            <p className="">/ {value}</p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen relative">
      {/* Navigation Bar */}
      <nav className="bg-gray-800 text-white p-4 px-10">
        <div className="mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            Recipe Book
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="hover:text-gray-400">
              Home
            </Link>
            <Link to="/about" className="hover:text-gray-400">
              About
            </Link>
          </div>
        </div>
      </nav>

      {/* Breadcrumbs */}
      <div className="pt-4 ml-10">
        <div className="mx-auto">{generateBreadcrumbs()}</div>
      </div>

      {/* Main Content */}
      <div className="">
        <Outlet />
      </div>

      <footer className="bg-gray-100 text-gray-600 py-4 text-center absolute bottom-0 left-0 right-0">
        <p className="text-sm">
          © {new Date().getFullYear()} Designed by{" "}
          <a
            href="https://github.com/bhanupm07"
            target="_blank"
            className="text-blue-500 hover:underline"
          >
            Bhanu Prakash Mahant
          </a>
          .
        </p>
      </footer>
    </div>
  );
};

export default Layout;
