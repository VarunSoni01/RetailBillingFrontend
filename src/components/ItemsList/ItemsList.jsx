import toast from "react-hot-toast";
import { deleteItem } from "../../service/ItemService";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import './ItemList.css'

const ItemsList = () => {

    const { items, setItems } = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const deleteItemById = async (itemId) => {
        try {
            const response = await deleteItem(itemId);
            if (response.status === 204) {
                const updatedItems = items.filter(item => item.itemId !== itemId);
                setItems(updatedItems);

                toast.success("Item deleted successfully");
            } else {
                toast.error("Failed to delete item");
                // display error message
            }
        } catch (error) {
            toast.error("An error occurred while deleting the item");
            console.error("Error deleting item:", error);
        }
    }


    return (
        <div className="item-list-container" style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>

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
                {filteredItems.map((item, index) => (
                    <div key={index} className="col-12">
                        <div className="card p-3 bg-dark" style={{ backgroundColor: item.bgColor }}>
                            <div className="d-flex align-items-center">
                                <div style={{ marginRight: '15px' }}>
                                    <img src={item.imgUrl} alt={item.name} className="item-image" />
                                </div>
                                <div className="flex-grow-1">
                                    <h5 className="mb-1 text-white">{item.name}</h5>
                                    <p className="mb-0 text-white">{item.description}</p>
                                    <span className="mb-0 text-block badge rouded-pill text bg-warning text-dark"
                                    >{item.price}</span>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteItemById(item.itemId)}>
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


export default ItemsList;