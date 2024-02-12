import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AlertNew from '../../Components/Alert';
import { Link, Redirect } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

const LogIn = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const handleCloseAlert = () => setShowAlert(false);
    const authContext = useContext(AuthContext);

    useEffect(() => {
    }, [authContext.isLoggedIn]);

    const Validations = {
        emailValid: function (email) {
            const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
            const result = { isValid: re.test(email), message: '' };
            if (!result.isValid) {
                result.message = 'Email is not valid format should be like "Exam@mail.com"';
            }
            return result;
        },
        passwordValid: function (password) {
            // should contain at least one digit, one lower case, one upper case and at least 6 characters long
            const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
            const result = { isValid: re.test(password), message: '' };
            if (!result.isValid) {
                result.message = 'Password should contain at least one digit, one lower case, one upper case and at least 6 characters long';
            }
            return result;
        },
    };
    const [email, setEmail] = useState({ value: '', isValid: true, message: '' });
    const [password, setPassword] = useState({ value: '', isValid: false, message: '' });

    const handleEmailChange = (e) => {
        const result = Validations.emailValid(e.target.value);

        setEmail({ value: e.target.value, isValid: result.isValid, message: result.message });
        e.target.className = result.isValid ? 'form-control ' : 'form-control is-invalid';
    };

    const handlePasswordChange = (e) => {
        const result = Validations.passwordValid(e.target.value);

        setPassword({ value: e.target.value, isValid: result.isValid, message: result.message });
        e.target.className = result.isValid ? 'form-control ' : 'form-control is-invalid';
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.isValid || !password.isValid) {
            setAlertTitle('Error');
            setAlertMessage('Invalid email or password');
            setShowAlert(true);
            return;
        } else {
            const user = authContext.users.find(u => u.email === email.value && u.password === password.value);
            if (user) {
                authContext.login(user);
            } else {
                setAlertTitle('Error');
                setAlertMessage('Invalid email or password');
                setShowAlert(true);
            }
        }
    };

    if (authContext.isLoggedIn) {
        return <Redirect to='/' />
    }


    return (


        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-12 col-md-6'>
                    <h2 className='text-center'>Login</h2>
                    <div className='text-center'>
                        {showAlert && <AlertNew title={alertTitle} message={alertMessage} onClose={handleCloseAlert} />}
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name='email' placeholder="Enter email" required onChange={handleEmailChange} value={email.value} />
                            <Form.Text className="text-danger">{email.message}</Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" style={{ position: 'relative' }}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password.value} onChange={handlePasswordChange} />
                            <span className='password-toggle-icon' onClick={() => {
                                const input = document.querySelector('#formBasicPassword');
                                const icon = document.querySelector('.password-toggle-icon');
                                if (input.type === 'password') {
                                    input.type = 'text';
                                    icon.innerHTML = '<i class="fa fa-eye green-ic"></i>';
                                }
                                else {
                                    input.type = 'password';
                                    icon.innerHTML = '<i class="fa fa-eye-slash"></i>';
                                }
                            }
                            }>
                                <i className="fa fa-eye-slash"></i>
                            </span>
                            <Form.Text className="text-danger">{password.message}</Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <p className='mt-3'>Don't have an account? <Link to='/signup'>Sign up</Link></p>
                </div>
            </div>

        </div>
    );
}

export default LogIn; 