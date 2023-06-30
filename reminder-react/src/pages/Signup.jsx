import { Link } from "react-router-dom";

function Signup() {
    const onSubmit = (event) => {
        event.preventDefault();
    };
    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">Signup now</h1>
            <input type="email" placeholder="Full Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Password Confirmation" />
            <button className="btn btn-block">Signup</button>
            <p className="message">
                Already a member?
                <Link to="/login">Sign in</Link>
            </p>
        </form>
    );
}

export default Signup;
