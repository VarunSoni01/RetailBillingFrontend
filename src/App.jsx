import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Menubar from './components/Menubar/Menubar';
import Dashboard from './pages/Dashboard/Dashboard';
import Explore from './pages/Explore/Explore';
import ManageCategory from './pages/ManageCategory/ManageCategory';
import ManageItem from './pages/ManageItem/ManageItem';
import ManageUsers from './pages/ManageUsers/ManageUsers';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login/Login';
import OrderHistory from './pages/OrderHistory/OrderHistory';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import NotFound from './pages/NotFound/NotFound';

const App = () => {
    const location = useLocation();
    const { auth } = useContext(AppContext);

    const LoginRoute = ({ element }) => {
        if (auth.token) {
            return <Navigate to="/dashboard" replace />;
        }
        return element;
    }

    const ProtectedRoute = ({ element, allowedRoles }) => {
        console.log("Auth Role:", auth.role);
        if (!auth.token) {
            return <Navigate to="/login" replace />;
        }

        if (allowedRoles && !allowedRoles.includes(auth.role)) {
            return <Navigate to="/dashboard" replace />;
        }

        return element;
    }
    return (
        <div>
            {location.pathname !== "/login" && <Menubar />}
            <Toaster />
            <Routes>

                {/* Protected routes */}
                <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
                <Route path="/explore" element={<ProtectedRoute element={<Explore />} />} />


                {/* Admin only routes */}
                <Route path="/categories" element={<ProtectedRoute element={<ManageCategory />} allowedRoles={["ROLE_ADMIN"]} />} />
                <Route path="/items" element={<ProtectedRoute element={<ManageItem />} allowedRoles={["ROLE_ADMIN"]} />} />
                <Route path="/users" element={<ProtectedRoute element={<ManageUsers />} allowedRoles={["ROLE_ADMIN"]} />} />

                <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} />
                <Route path="/login" element={<LoginRoute element={<Login />} />} />
                <Route path="/orders" element={<ProtectedRoute element={<OrderHistory />} />} />
                <Route path="*" element={<NotFound />} />

            </Routes>
        </div>
    )
}

export default App;