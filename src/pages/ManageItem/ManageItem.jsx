import ItemForm from '../../components/ItemForm/ItemForm';
import ItemsList from '../../components/ItemsList/ItemsList';
import './ManageItem.css';

const ManageItem = () => {
    return (
        <div className="items-container text-light">
            <div className="left-column">
                <ItemForm />
            </div>

            <div className="right-column">
                <ItemsList />
            </div>
        </div>
    );
}


export default ManageItem;