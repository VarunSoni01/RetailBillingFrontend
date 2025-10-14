import { useState } from "react";
import { deleteUser } from "../../service/UserService";
import toast from "react-hot-toast";

const UsersList = ({ users, setUsers }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const deleteUserById = async (userId) => {
        try {
            await deleteUser(userId);
            setUsers((prevState) => prevState.filter(user => user.userId !== userId));
            toast.success("User deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Unable to delete user");
        }

    }

    return (
        <div className="user-list-container" style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>

            <div className="row pe-2"> {/* Row with padding two on the right */}
                <div className="input-group mb-3">
                    <input type="text"
                        name="keyword"
                        id="keyword"
                        className="form-control"
                        placeholder="Search by keyword"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm} />
                    <span className="input-group-text bg-warning"><i className="bi bi-search"></i></span>
                </div>
            </div>
            <div className="row g-3 pe-2"> {/* Row with gap three and padding two on the right */}
                {filteredUsers.map((user, index) => (
                    <div key={index} className="col-12">
                        <div className="card p-3 bg-dark" style={{ backgroundColor: user.bgColor }}>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <h5 className="mb-1 text-light">{user.name}</h5>
                                    <p className="mb-0 text-white">{user.email}</p>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteUserById(user.userId)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default UsersList;