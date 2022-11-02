import axios from 'axios';
import React, { useEffect } from 'react'
import { Fragment } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../EmailVerify/styles.module.css'
import success from '../images/emailVerify.png'

const EmailVerify = () => {
    const [validUrl, setvalidUrl] = useState(false)
    const param = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `http://localhost:8080/api/users/${param.id}/verify/${param.token}`
                const { data } = await axios.get(url);
                console.log(data);
                setvalidUrl(true)
            } catch (error) {
                console.log(error);
                setvalidUrl(false)
            }
        }
        verifyEmailUrl()
    }, [param])

    return (
        <div>
            <Fragment>
                {validUrl ? (
                    <div className={styles.container}>
                        <img src={success} alt="success_img" className={styles.success_img} />
                        <h1>Email verified successfully</h1>
                        <Link to='/login'>
                            <button className={styles.green_btn}>Login</button>
                        </Link>
                    </div>
                ) : (
                    <h1>404 not found</h1>
                )}
            </Fragment>
        </div>
    )
}

export default EmailVerify
