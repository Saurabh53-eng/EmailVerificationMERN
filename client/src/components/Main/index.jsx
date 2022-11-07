
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Useritem from '../../useritem/Useritem';
import styles from '../Main/styles.module.css';
// import Useritem from '../Useritem';
const Main = () => {
	const navigate = useNavigate();
	const host = "http://localhost:8080"
	const [user, setuser] = useState([])
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
	const getUser = async () => {
		// API Call 
		const response = await fetch(`${host}/api/auth/fetchuserinfo`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'auth-token': localStorage.getItem('token')
			}
		});
		const json = await response.json()
		setuser(json)
	}

	useEffect(() => {
		if (localStorage.getItem('token')) {
			getUser();
		} else {
			navigate("/login")
		}
		// eslint-disable-next-line
	}, [])


	return (
		<div >
			<div className={styles.main_container}>
				<nav className={styles.navbar}>
					<h1>fakebook</h1>
					<button className={styles.white_btn} onClick={handleLogout}>
						Logout
					</button>
				</nav>
			</div>
			<div >
				<div className="row my-3" style={{backgroundColor:"black"}} >
					<h2 style={{color:"white"}}>User Information</h2>
					{Array.from(user).map((User) => {
						return <Useritem key={User._id} User={User} />
					})}
				</div>
			</div>

		</div>
	)
}

export default Main
