import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./CategoryList.css"
import { useState } from "react";
import { deleteCategory } from "../../service/CategoryService";
import toast from "react-hot-toast";

const CategoryList = () => {
    const { categories, setCategories } = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredCategories = categories.filter(category => category.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const deleteCategoryById = async (categoryId) => {
        try {
            const response = await deleteCategory(categoryId);
            if (response.status === 204) {
                const updatedCategories = categories.filter(category => category.categoryId !== categoryId);
                setCategories(updatedCategories);
                toast.success("Category deleted successfully");
            } else {
                toast.error("Failed to delete category");
                // display error message
            }
        } catch (error) {
            toast.error("An error occurred while deleting the category");
            console.error("Error deleting category:", error);
        }
    }


    return (
        <div className="category-list-container" style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>

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
                {filteredCategories.map((category, index) => (
                    <div key={index} className="col-12">
                        <div className="card p-3" style={{ backgroundColor: category.bgColor }}>
                            <div className="d-flex align-items-center">
                                <div style={{ marginRight: '15px' }}>
                                    <img src={category.imageUrl} alt={category.name} className="category-image" />
                                </div>
                                <div className="flex-grow-1">
                                    <h5 className="mb-1 text-white">{category.name}</h5>
                                    <p className="mb-0 text-white">{category.items}5 Items</p>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteCategoryById(category.categoryId)}>
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


export default CategoryList;