import { Link } from "react-router-dom";

function Login() {
    const onSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">Enter in your account</h1>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button className="btn btn-block">Login</button>
            <p className="message">
                Register here! <Link to="/signup">Create account</Link>
            </p>
        </form>
    );
}

export default Login;
