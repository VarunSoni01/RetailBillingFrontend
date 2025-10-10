import { Route, Routes } from 'react-router-dom';
import Menubar from './Components/Menubar/Menubar';
import Dashboard from './pages/Dashboard/Dashboard';
import Explore from './pages/Explore/Explore';
import ManageCategory from './pages/ManageCategory/ManageCategory';
import ManageItem from './pages/ManageItem/ManageItem';
import ManageUsers from './pages/ManageUsers/ManageUsers';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login/Login';

const App = () => {
    return (

        <div>
            <Menubar />
            <Toaster />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/categories" element={<ManageCategory />} />
                <Route path="/items" element={<ManageItem />} />
                <Route path="/users" element={<ManageUsers />} />
            </Routes>
        </div>
    )
}

export default App;