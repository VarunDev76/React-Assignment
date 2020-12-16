import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from 'uuid';

import { showSuccessMsg, showErrorMsg } from "../../utils/notification";

/**
 * Import Other Dependencies
 */
import { setLocalStorage } from "../../utils/helper";
import Spinner from "react-bootstrap/Spinner";

const userEmail = process.env.REACT_APP_USER_NAME
const userPassword = process.env.REACT_APP_PASSWORD

const AssignmentLoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid Email Address")
    .required("Please Enter Your Email Address"),
  password: Yup.string().required("Please Enter Your Password"),
});

class AssignmentLogin extends React.Component {

  AssignmentLoginValuesSchema = () => {
    return {
      email: "",
      password: "",
    }
  };

  loginWithAssignment = (values, { setSubmitting }) => {
    const { history } = this.props;
    const { email, password } = values;

    if(userEmail === email && userPassword === password){
      showSuccessMsg("Login successfully");
      let data = {
        id: uuidv4(),
        email: 'testing@gmail.com',
        name: 'testing',
        role_type: 'assignment',
        token: uuidv4(),
      }
      setLocalStorage(data); // setLocalStroage
      setSubmitting(false);
      if (history) {
        if (data.role_type === "assignment") {
          history.push("/user/dashboard");
        }
      }
    }
    else if(userEmail !== email || userPassword !== password){
      showErrorMsg('Invalid Credentials')
      setSubmitting(false);
    }
  };

  render() {

    return (  
      <div className="d-flex justify-content-center w-100">
        <div className="pt-5 w-100">
          <h1> Sign in</h1>
          <Formik
            initialValues={this.AssignmentLoginValuesSchema}
            validationSchema={AssignmentLoginSchema}
            onSubmit={this.loginWithAssignment}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="row w-100">
                  <div className="col-12">
                    <div className="form-group">
                      <label className="form-label">
                        E-mail
                      </label>
                      <Field type="text" name="email" className="form-control" placeholder="E.g. john.doe@mail.com" />
                      <ErrorMessage name="email" component="div" className="error-msg mt-0 my-1 pl-2 pb-0" />
                    </div>
                  </div>
                </div>

                <div className="row w-100">
                  <div className="col-12">
                    <div className="form-group">
                      <label className="form-label">
                        Password
                      </label>
                      <Field type="password" name="password" className="form-control" placeholder="Enter Password" />
                      <ErrorMessage name="password" component="div" className="error-msg mt-0 my-1 pl-2 pb-0" />
                    </div>
                  </div>
                </div>

                <div className="">
                  <button className="btn btn-primary" disabled={isSubmitting} type="submit" >
                    {isSubmitting && <Spinner size={true} className="mr-2" />}
                    Log in
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

/**
 *  Define component PropTypes
 */
AssignmentLogin.propTypes = {
};

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps, {
})(AssignmentLogin);
