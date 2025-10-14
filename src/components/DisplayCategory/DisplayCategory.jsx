import Category from '../Category/Category';
import './DisplayCategory.css'

const DisplayCategory = ({ categories }) => {
    return (
        <div className='row g-3' style={{ width: '100%', margin: 0 }}>
            {categories.map(category => (
                <div key={category.categoryId} className="col-md-3 col-sm-6" style={{ padding: '0 10px' }}>
                    <div className="category-card">
                        <h5>{category.name}</h5>
                        {/* Add more category details here */}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DisplayCategory;