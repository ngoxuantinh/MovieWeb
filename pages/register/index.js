import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import Link from 'next/link';
import { saveState } from "utils/helpers/localStorage";
import { useEffect, useState } from "react";
import { TMDB_API_BASE_URL, TMDB_API_KEY, TMDB_API_VERSION } from "config/tmdb";
import { Users } from "pages/user";
// import { userService, alertService } from "services";

export default Register;

function Register() {
    const router = useRouter();

    // form validation rules
    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
        mail: Yup.string().required("Mail is required").email("Not valid")
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;
    const [users, setUsers] = useState();

    useEffect(() => {
        setUsers(Users);
    }, [])
    const onSubmit = (user) => {
        console.log('user,' + user.username + '|' + user.password)
        console.log(users)
        const result = users.find(e => {
            return e.username == user.username;
        });
        console.log(result)
        if (!result) {
            require('crypto').randomBytes(48, function (err, buffer) {
                var token = buffer.toString('hex');

                saveState({
                    access_token_manual: token,
                    username: user.username,
                    password: user.password
                });
            });

            router.push('http://localhost:8080/?category=Popular&page=1')
        } else {
            require('crypto').randomBytes(48, function (err, buffer) {
                var token = buffer.toString('hex');
                Users.push({
                    username: user.username,
                    password: user.password,
                    access_token_manual: token

                })
            });

        }
    }

    return (
        <>
            <div className="login-page">
                <div className="form">
                    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" placeholder="username" {...register('username')} />
                        <div className="invalid-feedback">{errors.username?.message}</div>
                        <input type="password" placeholder="password" {...register('password')} />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                        <input type="text" placeholder="email address" {...register('mail')} />
                        <div className="invalid-feedback">{errors.mail?.message}</div>
                        <button>create</button>
                        <div className="message">Already registered? <Link href={'/login'}>Sign In</Link></div>
                    </form>
                </div>
            </div>
            <style jsx>{`
                .login-page {
                    width: 360px;
                    padding: 8% 0 0;
                    margin: auto;
                  }
                  .form {
                    position: relative;
                    z-index: 1;
                    background: #FFFFFF;
                    max-width: 360px;
                    margin: 0 auto 100px;
                    padding: 45px;
                    text-align: center;
                    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
                  }
                  .form .invalid-feedback{
                    color: red;
                  }
                  .form input {
                    font-family: "Roboto", sans-serif;
                    outline: 0;
                    background: #f2f2f2;
                    width: 100%;
                    border: 0;
                    margin: 0 0 15px;
                    padding: 15px;
                    box-sizing: border-box;
                    font-size: 14px;
                  }
                  .form button {
                    font-family: "Roboto", sans-serif;
                    text-transform: uppercase;
                    outline: 0;
                    background: #4CAF50;
                    width: 100%;
                    border: 0;
                    padding: 15px;
                    color: #FFFFFF;
                    font-size: 14px;
                    -webkit-transition: all 0.3 ease;
                    transition: all 0.3 ease;
                    cursor: pointer;
                  }
                  .form button:hover,.form button:active,.form button:focus {
                    background: #43A047;
                  }
                  .form .message {
                    margin: 15px 0 0;
                    color: #b3b3b3;
                    font-size: 12px;
                  }
                  .form .message p {
                    color: #4CAF50;
                    text-decoration: none;
                  }
                //   .form .register-form {
                //     display: none;
                //   }
                  .container {
                    position: relative;
                    z-index: 1;
                    max-width: 300px;
                    margin: 0 auto;
                  }
                  .container:before, .container:after {
                    content: "";
                    display: block;
                    clear: both;
                  }
                  .container .info {
                    margin: 50px auto;
                    text-align: center;
                  }
                  .container .info h1 {
                    margin: 0 0 15px;
                    padding: 0;
                    font-size: 36px;
                    font-weight: 300;
                    color: #1a1a1a;
                  }
                  .container .info span {
                    color: #4d4d4d;
                    font-size: 12px;
                  }
                  .container .info span a {
                    color: #000000;
                    text-decoration: none;
                  }
                  .container .info span .fa {
                    color: #EF3B3A;
                  }
                  body {
                    background: #76b852; /* fallback for old browsers */
                    background: rgb(141,194,111);
                    background: linear-gradient(90deg, rgba(141,194,111,1) 0%, rgba(118,184,82,1) 50%);
                    font-family: "Roboto", sans-serif;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;      
                  }
            `}</style>
        </>
    );
}
