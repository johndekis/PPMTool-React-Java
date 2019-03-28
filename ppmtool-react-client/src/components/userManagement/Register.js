import React, { Component } from "react";
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createNewUser } from '../../actions/securityActions'


export class Register extends Component {
  constructor(){
    super();
    this.state = {
      username: "",
      fullname: "",
      password: "",
      confirmPassword: "",
      errors: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if(this.props.security.validToken) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.project);
    if(nextProps.errors) {
        this.setState({ errors: nextProps.errors})
    }
   
 };

  onChange = (e) => {
    this.setState({ [e.target.name]:e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      username: this.state.username,
      fullname: this.state.fullname,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    }

    this.props.createNewUser(newUser, this.props.history)

}

  render() {
    const { errors } = this.state
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your Account</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.fullname
                    })}
                    placeholder="Full Name"
                    name="fullname"
                    value={this.state.fullname}
                    onChange={this.onChange}
                    //required
                  />
                  {errors.fullname && (
                    <div className="invalid-feedback">{errors.fullname}</div>
                   )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.username
                    })}
                    value={this.state.username}
                    onChange={this.onChange} 
                    placeholder="Email Address"
                    name="username"
                                      
                  />
                  {errors.username && (
                    <div className="invalid-feedback">{errors.username}</div>
                   )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}                 
                    value={this.state.password}
                    onChange={this.onChange}
                    placeholder="Password"
                    name="password"
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                   )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.confirmPassword
                    })}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.onChange}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                   )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  security: state.security,
  errors: state.errors
});
export default connect(mapStateToProps, { createNewUser })(Register);