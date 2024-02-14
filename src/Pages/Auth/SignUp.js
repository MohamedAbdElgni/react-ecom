import './signup.css';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AlertNew from '../../Components/Alert';

//import { useHistory } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../AuthContext';

//!!this code will be Refactored later
class User {

    constructor(fname, lname, email, phone, password, age, gender) {
        this.fname = fname;
        this.lname = lname;
        this.name = this.fname + ' ' + this.lname;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.age = age;
        this.gender = gender;
        this.createdAt = new Date();
        this.cart = [];
        this.wishLists = [];
        this.fav = [];
    }
}
function SignUp() {
    //const history = useHistory();



    const Validations = {
        nameValid: function (name) {
            const re = /^[a-zA-Z]{3,}$/;
            const result = { isValid: re.test(name), message: '' };
            if (!result.isValid) {
                result.message = 'Name should contain only letters no numbers or special characters and at least 3 characters long and no spaces';
            }
            return result;
        },

        emailValid: function (email) {
            // should contain @ and .
            const re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
            const result = { isValid: re.test(email), message: '' };
            if (!result.isValid) {
                result.message = 'Email is not valid';
            }
            return result;
        },

        phoneValid: function (phone) {
            // should start with 010 or 011 or 012 or 015 and have 11 
            const re = /^(010|011|012|015)\d{8}$/;
            const result = { isValid: re.test(phone), message: '' };
            if (!result.isValid) {
                result.message = 'Phone number should start with 010 or 011 or 012 or 015 and have 11 digits';
            }

            return result;
        },

        passwordValid: function (password) {
            // one digit, one lower case, one upper case and at least 6 characters long
            const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
            const result = { isValid: re.test(password), message: '' };
            if (!result.isValid) {
                result.message = 'Password should contain at least one digit, one lower case, one upper case and at least 6 characters long';
            }
            return result;
        },

        confirmPasswordValid: function (password, confirmPassword) {
            const result = { isValid: password === confirmPassword, message: '' };
            if (!result.isValid) {
                result.message = 'Password and confirm password should match';
            }
            return result;
        },

        ageValid: function (age) {
            const re = /^[0-9]+$/;
            const result = { isValid: re.test(age), message: '' };
            if (!result.isValid) {
                result.message = 'Age should be a number';
            }
            else if (age < 18) {
                result.message = 'Age should be greater than 18';
            }

            else if (age > 100) {
                result.message = 'Age should be less than 100';
            }

            return result;
        },
    }
    const [showAlert, setShowAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users'));
        if (storedUsers) {
            setUsers(storedUsers);
        } else {

            localStorage.setItem('users', JSON.stringify([]));
        }
    }, []);

    const [fname, setFname] = useState({ value: '', isValid: false, message: '' });
    const [lname, setLname] = useState({ value: '', isValid: false, message: '' });
    const [email, setEmail] = useState({ value: '', isValid: true, message: '' });
    const [phone, setPhone] = useState({ value: '', isValid: true, message: '' });
    const [password, setPassword] = useState({ value: '', isValid: false, message: '' });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', isValid: false, message: '' });
    const [age, setAge] = useState({ value: '', isValid: false, message: '' });
    const [gender, setGender] = useState('male')
    const [reged, setReged] = useState(false);
    const authContext = useContext(AuthContext);






    const handleFnameChange = (e) => {
        const result = Validations.nameValid(e.target.value);
        setFname({ value: e.target.value, isValid: result.isValid, message: result.message });
    }

    const handleLnameChange = (e) => {
        const result = Validations.nameValid(e.target.value);
        setLname({ value: e.target.value, isValid: result.isValid, message: result.message });
        e.target.className = result.isValid ? 'form-control' : 'form-control is-invalid';
    }

    const handleEmailChange = (e) => {
        const result = Validations.emailValid(e.target.value);
        setEmail({ value: e.target.value, isValid: result.isValid, message: result.message });
        e.target.className = result.isValid ? 'form-control' : 'form-control is-invalid';
    }

    const handlePhoneChange = (e) => {
        const result = Validations.phoneValid(e.target.value);
        setPhone({ value: e.target.value, isValid: result.isValid, message: result.message });
        e.target.className = result.isValid ? 'form-control' : 'form-control is-invalid';
    }

    const handlePasswordChange = (e) => {
        const result = Validations.passwordValid(e.target.value);
        setPassword({ value: e.target.value, isValid: result.isValid, message: result.message });
        e.target.className = result.isValid ? 'form-control' : 'form-control is-invalid';
    }

    const handleConfirmPasswordChange = (e) => {
        const result = Validations.confirmPasswordValid(password.value, e.target.value);
        setConfirmPassword({ value: e.target.value, isValid: result.isValid, message: result.message });
        e.target.className = result.isValid ? 'form-control' : 'form-control is-invalid';
    }

    const handleAgeChange = (e) => {
        const result = Validations.ageValid(e.target.value);
        setAge({ value: e.target.value, isValid: result.isValid, message: result.message });
        e.target.className = result.isValid ? 'form-control' : 'form-control is-invalid';
    }
    const handelGenderChange = (e) => {
        setGender(e.target.value);
    }



    const handleSubmit = (e) => {
        e.preventDefault();

        if (fname.isValid && lname.isValid && email.isValid && phone.isValid && password.isValid && confirmPassword.isValid && age.isValid) {
            if (users.some(user => user.email === email.value || user.phone === phone.value)) {
                setAlertTitle('Attention!');
                setAlertMessage('Email or Phone already exists!!');
                setShowAlert(true);
                setEmail({ value: email.value, isValid: false, message: '' });
                setPhone({ value: phone.value, isValid: false, message: '' });

            } else {
                const user = new User(fname.value, lname.value, email.value, phone.value, password.value, age.value, gender);
                setUsers([...users, user]);
                authContext.setUsers([...users, user]);
                setReged(true);
            }
        } else {
            console.log('Invalid Data');
        }
    }

    const handleCloseAlert = () => {
        setShowAlert(false);
    }

    if (reged) {
        return <Redirect to='/login' />
    }

    return (
        <div className='container mt-5 prod'>
            <div className='text-center'>
                <h1>Sign Up</h1>
                or already have an account?
                <Link to='/login' className="ps-2">Login</Link>

            </div>
            <div className='text-center '>
                {showAlert && <AlertNew title={alertTitle} message={alertMessage} onClose={handleCloseAlert} />}
            </div>
            <Form onSubmit={handleSubmit}>

                <Form.Group controlId="formBasicFname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" value={fname.value} onChange={handleFnameChange} />
                    <Form.Text className="text-danger">{fname.message}</Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicLname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" value={lname.value} onChange={handleLnameChange} />
                    <Form.Text className="text-danger">{lname.message}</Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email.value} onChange={handleEmailChange} className={email.isValid ? 'form-control' : 'form-control is-invalid'} />
                    <Form.Text className="text-danger">{email.message}</Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" placeholder="Enter phone" value={phone.value} onChange={handlePhoneChange} className={phone.isValid ? 'form-control' : 'form-control is-invalid'} />
                    <Form.Text className="text-danger">{phone.message}</Form.Text>
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

                <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword.value} onChange={handleConfirmPasswordChange} />
                    <Form.Text className="text-danger">{confirmPassword.message}</Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="text" placeholder="Enter age" value={age.value} onChange={handleAgeChange} />
                    <Form.Text className="text-danger">{age.message}</Form.Text>
                </Form.Group>

                {/* Gender */}
                <Form.Group controlId="formBasicGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control as="select" onChange={handelGenderChange} value={gender} className="form-user-select-sm">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </Form.Control>
                </Form.Group>


                <Button variant="" type="submit" className='w-100 p-2 btn-warning border-black'>
                    Register
                </Button>
            </Form>
        </div>
    )
}

export default SignUp;












