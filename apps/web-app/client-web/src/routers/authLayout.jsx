// AuthLayout.jsx
import { AuthProvider } from "../utilites/authContextapi";
const AuthLayout = ({ children }) => <AuthProvider>{children}</AuthProvider>;

export { AuthLayout };
