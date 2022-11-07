// import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
	const navigate = useNavigate()
	const [data, setData] = useState({ email: "", password: "" });
	// const [error, setError] = useState("");
	// const [msg, setmsg] = useState("")

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch("http://localhost:8080/api/auth", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: data.email, password: data.password })
		});

		const json = await response.json()

		setData({ email: "", password: "" })

		if (json.success) {
			// Save the auth token and redirect
			localStorage.setItem('token', json.authtoken);
			navigate("/");
		}
		else {
			alert("Invalid credentials");
		}
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							autoComplete="on"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							autoComplete="on"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{/* {error && <div className={styles.error_msg}>{error}</div>}
						{msg && <div className={styles.success_msg}>{msg}</div>} */}

						<button type="submit" className={styles.green_btn}>
							Sign in
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
