import { useEffect, useState } from 'react';
import UserForm from '../../components/UserForm/UserForm';
import UsersList from '../../components/UsersList/UsersList';
import './ManageUsers.css';
import toast from 'react-hot-toast';

const ManageUsers = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchUsers() {
            try {
                setLoading(true);
                const response = await fetchUsers();
                setUsers(response.data);
            } catch (error) {
                console.error(error);
                toast.error("Unable to fetch users");
            } finally {
                setLoading(false);
            }
        }

        fetchUsers();
    }, [])


    return (
        <div className="users-container text-light">
            <div className="left-column">
                {/* Passing set user function to UserForm */}
                <UserForm setUsers={setUsers} />
            </div>

            <div className="right-column">
                {/* Passing users and set user function to UserForm */}
                <UsersList users={users} setUsers={setUsers} />
            </div>
        </div>
    );
}


export default ManageUsers;