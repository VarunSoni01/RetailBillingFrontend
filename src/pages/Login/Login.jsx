import './Login.css';

const Login = () => {

    return (
        <div className="bg-light d-flex align-items-cente justfy-content-center vh-100 login-background">
            <div className="card shoaddow-lg w-100" style={{ maxWidth: '480px' }}>
                <div className="card-body">
                    <div className="text-center">
                        <h1 className="card-title">Sign in</h1>
                        <p className="card-text text-muted">Sign in below to access your account</p>
                    </div>
                    <div className="mt-4">
                        <form>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label text-muted">
                                    Email Address
                                </label>
                                <input type="text" name="email" id="email" placeholder="yourname@example.com" className='form-control' />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label text-muted">
                                    Password
                                </label>
                                <input type="text" name="password" id="password" placeholder="********" className='form-control' />
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