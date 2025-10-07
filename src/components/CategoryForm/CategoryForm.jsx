import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";

const CategoryForm = () => {
    // const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        bgColor: "#2c2c2c",
        image: "https://placehold.co/48x48"
    });

    useEffect(() => {
        console.log(data);
    }, [data]);
    const onChangeHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setData((data) => ({ ...data, [name]: value }));
    }


    return (
        <div className="mx-2 mt-2">
            <div className="row">
                <div className="card col-md-12 form-container">
                    <div className="card-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-lable"><img src={image ? URL.createObjectURL(image) : assets.uploads} alt="" width={48} /></label>
                                <input type="file" name="image" id="image" className="form-control" hidden onChange={(e) => setImage(e.target.files[0])} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" name="name" id="name" className="form-control" placeholder="Sample Name" onChange={onChangeHandler} value={data.name} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea rows={5} name="description" id="description" className="form-control" placeholder="Write content here: " onChange={onChangeHandler} value={data.description} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="bgcolor" className="form-label">Background Color</label>
                                <br />
                                <input type="color" name="bgColor" id="bgcolor" placeholder="#ffffff" onChange={onChangeHandler} value={data.bgColor} />
                            </div>
                            <button type="submit" className="btn btn-warning w-100" >Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
}


export default CategoryForm;