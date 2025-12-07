import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg">
        Checking authentication...
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
