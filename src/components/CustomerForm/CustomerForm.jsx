import './CustomerForm.css'

const CustomerForm = () => {
    return (
        <div className="p-3">
            <div className="mb-3">
                <div className="d-flex align-items-center gap-2">
                    <label htmlFor="customerName" className='col-4'>Customer Name</label>
                    <input type="text" className='form-control form-control-sm' id='customerName' on />
                </div>
            </div>
        </div>
    )
}

export default CustomerForm;