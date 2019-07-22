import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { addNewTable } from "../../actions/tableActions";

class NewTableForm extends Component {
    constructor() {
      super();
      this.state = {
        name: "",
        status: "",
        gameType: "",
        errors: {}
      };
    }

    componentDidMount() {
      this.props.history.push("/newtable");
    }

    componentWillReceiveProps(nextProps) {
	    if (nextProps.errors) {
	      this.setState({
	        errors: nextProps.errors
	      });
	    }
	  }

    onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
      e.preventDefault();
      const newTable = {
        name: this.state.name,
        status: this.state.status,
        gameType: this.state.gameType,
	  };
      this.props.addNewTable(newTable, this.props.history); 
    }

    render() {
      const errors = this.state.errors;
      return (
        <div>
	    <div className="container">
		  <div className="row">
			<form noValidate onSubmit={this.onSubmit}>
			  <div className="input-field col s12">
			    <input
				  onChange={this.onChange}
	              value={this.state.name}
	              error={errors.name}
	              id="name"
	              type="text"
	              className={classnames("", {
	                invalid: errors.name
	              })}
	            />
	            <label htmlFor="name">Name</label>
	            <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col s12">
	            <input
	              onChange={this.onChange}
	              value={this.state.status}
	              error={errors.status}
	              id="status"
	              type="text"
	              className={classnames("", {
	                invalid: errors.status
	              })}
	            />
	            <label htmlFor="status">Game status</label>
	            <span className="red-text">{errors.gameType}</span>
              </div>
	          <div className="input-field col s12">
	            <input
	              onChange={this.onChange}
	              value={this.state.gameType}
	              error={errors.gameType}
	              id="gameType"
	              type="text"
	              className={classnames("", {
	                invalid: errors.gameType
	              })}
	            />
	            <label htmlFor="gameType">Game Type</label>
	            <span className="red-text">{errors.gameType}</span>
	          </div>
	          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Create
                </button>
              </div>
            </form>
		  </div>
	    </div>
      </div>
      );
    }
}

NewTableForm.propTypes = {
  addNewTable: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errors: state.errors
});


export default connect(mapStateToProps, { addNewTable })(withRouter(NewTableForm));