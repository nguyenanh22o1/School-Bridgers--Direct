import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUni } from "../../redux/apiRequests";
import * as Yup from "yup";
import "./register.css";
import { useFormik } from "formik";

const UniRegister = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector((state) => state.auth.register.message);

    const formik = useFormik({
        initialValues: {
            email: "",
            username: "",
            university: "",
            password: "",
            phonenumber: "",
            firstName: "",
            lastName: ""
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .min(8, "Must be at least 8 characters")
                .required("Required"),
            email: Yup.string()
                .required("Required")
                .matches(
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    "Please enter a valid email"
                ),
            password: Yup.string()
                .required("Required"),
            firstName: Yup.string()
                .required("Required"),
            lastName: Yup.string()
                .required("Required"),
        }),
        onSubmit: (values) => {
            const newUser = {
                email: values.email,
                username: values.username,
                password: values.password,
                university: values.university,
                firstName: values.firstName,
                lastName: values.lastName,
                phonenumber: values.phonenumber
            };
            registerUni(newUser, dispatch, navigate);
        },
    });

    return (
        <section className="register-container">
            <div className="register-title"> School Registration Form </div>
            <div className="register-input">
                <form onSubmit={formik.handleSubmit}>

                    {/* EMAIL */}
                    <label className="email-label"> EMAIL </label>
                    <input
                        required
                        id="email"
                        name="email"
                        type="text"
                        className="email-label"
                        placeholder="Enter email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />



                    {/* USERNAME */}
                    <label className="email-label"> USERNAME </label>
                    <input
                        id="username"
                        name="username"
                        value={formik.values.username}
                        type="text"
                        placeholder="Enter username"
                        onChange={formik.handleChange}
                        className="email-label"
                    />
                    {formik.errors.username && (<p className="errorMsg">{formik.errors.username}</p>)}



                    {/* PASSWORD */}
                    <label className="email-label"> PASSWORD </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        placeholder="Enter password"
                        onChange={formik.handleChange}
                        className="email-label"
                    />
                    {formik.errors.password && (<p className="errorMsg">{formik.errors.password}</p>)}



                    {/* UNIVERSITY */}
                    <label className="email-label"> SCHOOL NAME </label>
                    <input
                        id="university"
                        name="university"
                        type="text"
                        value={formik.values.university}
                        placeholder="Enter university"
                        onChange={formik.handleChange}
                        className="email-label"
                    />
                    {formik.errors.university && (<p className="errorMsg">{formik.errors.university}</p>)}


                    {/* Phonenumber */}
                    <label className="email-label"> PHONENUMBER </label>
                    <input
                        id="phonenumber"
                        name="phonenumber"
                        type="text"
                        value={formik.values.phonenumber}
                        placeholder="Enter phonenumber"
                        onChange={formik.handleChange}
                        className="email-label"
                    />
                    {formik.errors.phonenumber && (<p className="errorMsg">{formik.errors.phonenumber}</p>)}




                    {/* FIRST NAME */}
                    <label className="email-label"> FIRST NAME </label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formik.values.firstName}
                        placeholder="Enter register firstname"
                        onChange={formik.handleChange}
                        className="email-label"
                    />
                    {formik.errors.firstName && (<p className="errorMsg">{formik.errors.firstName}</p>)}



                    {/* LAST NAME */}
                    <label className="email-label"> LAST NAME </label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formik.values.lastName}
                        placeholder="Enter register lastname"
                        onChange={formik.handleChange}
                        className="email-label"
                    />
                    {formik.errors.lastName && (<p className="errorMsg">{formik.errors.lastName}</p>)}



                    {/* CREATE STUDENT ACCOUNT BUTTON */}
                    {error && <p className="register-err"> {error.substr(46).replace("to be unique", "already existed")} </p>}
                    <button type="submit"> Create </button>


                </form>
                <div className="register-login"> Already have an account ? </div>
                <Link className="register-login-link" to="/login">
                    LOG IN
                </Link>
                <div className="register-login"> Register as student ? </div>
                <Link className="register-login-link" to="/register">
                    STUDENT SIGN UP
                </Link>
            </div>
        </section>
    );
};

export default UniRegister;
