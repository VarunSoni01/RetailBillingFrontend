const ItemForm = () => {
    return (
        <div className="item-form" style={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden' }}>
            <div className="mx-2 mt-2">
                <div className="row">
                    <div className="card col-md-8 form-container">
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Item Name</label>
                                    <input type="text" name="name" id="name" className="form-control" placeholder="Item Name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <select name="category" id="category" className="form-control">
                                        <option value="" disabled selected>--Select Category--</option>
                                        <option value="Category 1">Category 1</option>
                                        <option value="Category 2">Category 2</option>
                                        <option value="Category 3">Category 3</option>
                                        <option value="Category 4">Category 4</option>
                                        <option value="Category 5">Category 5</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Item Price</label>
                                    <input type="text" name="price" id="price" className="form-control" placeholder="₹100.00" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea rows={5} name="description" id="description" className="form-control" placeholder="Write content here: " />
                                </div>

                                <button type="submit" className="btn btn-warning w-100" >Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div >

        </div>
    );
}


export default ItemForm;