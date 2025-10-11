import { useState } from 'react';
import './Login.css';
import toast from 'react-hot-toast';

const Login = () => {

    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const onChangeHandler = (e) => {
        const name = e.targe.name;
        const value = e.targe.value;

        setData((data) => ({ ...data, [name]: value }));
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // 
        } catch (error) {
            toast.error("Email/Password Invalid");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-light d-flex align-items-cente justfy-content-center vh-100 login-background">
            <div className="card shoaddow-lg w-100" style={{ maxWidth: '480px' }}>
                <div className="card-body">
                    <div className="text-center">
                        <h1 className="card-title">Sign in</h1>
                        <p className="card-text text-muted">Sign in below to access your account</p>
                    </div>
                    <div className="mt-4">
                        <form onSubmit={onSubmitHandler}>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label text-muted">
                                    Email Address
                                </label>
                                <input type="text" name="email" id="email" placeholder="yourname@example.com" className='form-control' onChange={onChangeHandler} value={data.email} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label text-muted">
                                    Password
                                </label>
                                <input type="text" name="password" id="password" placeholder="********" className='form-control' onChange={onChangeHandler} value={data.password} />
                            </div>
                            <div className="d-grid">
                                <button type='submit' className="btn btn-dark btn-lg">
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}


export default Login;