import { useSelector } from "react-redux";

function ProtectedRoute({ children, allowedRoles }) {
  const role = useSelector((state) => state.auth.role);

  if (!allowedRoles.includes(role)) {
    return (
      <div className="text-red-500 text-xl text-center mt-10">
        ❌ Access Denied
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;