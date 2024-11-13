import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
	const { currentUser, loading } = useAuth();
	const navigate = useNavigate();

	if (loading) {
		return <div>Loading...</div>;
	}

	if (currentUser) {
		return children;
	}

	return navigate("/login");
};

export default PrivateRoute;
