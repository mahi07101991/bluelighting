import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';

// Component to display loan applications
// It requires an array of loan applications as `props`
class LoanApplications extends Component {

  constructor(props, context) {
    super(props, context);

    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }

  updateStatus = (application) => {
    this.props.onStatus(application);
  }

  edit() {
    this.handleShow();
  }

  delete(application) {
    this.props.onDelete(application);
  }

  onSubmit(e) {
    e.preventDefault();
    const { first_name, last_name, amount, installments } = this.state;

    const new_application = {
      id: this.state.applications.length + 1,
      name: `${first_name} ${last_name}`,
      amount,
      date: Date.now(),
      installments,
      status: 'Pending'
    }

    this.setState(state => ({
      applications: state.applications.concat(new_application)
    }));

    this.handleClose();
  }

  render() {
    return (
      <tbody>
        {this.props.applications.map((application, index) => (
          <tr key={index}>
            <td>{application.id}</td>
            <td>{application.firstName} {application.lastName}</td>
            <td>{application.date}</td>
            <td>{application.amount}</td>
            <td>{application.installments}</td>
            <td>{application.status}</td>
            <td>
              <Row>
                <Col xs={12} md={6}>
                  <Button bsStyle="primary" bsSize="small" onClick={() => this.updateStatus(application)}>Edit</Button>
                </Col>
                <Col xs={12} md={6}>
                  <Button bsStyle="danger" bsSize="small" onClick={() => this.delete(application)}>Delete</Button>
                </Col>
              </Row>
            </td>
          </tr>
        ))}
      </tbody>
    )
  }
}

// Define required props for component
LoanApplications.propTypes = {
  applications: PropTypes.array.isRequired
}

// Default props for LoanApplication component
LoanApplications.defaultProps = {
  applications: []
}

// Export LoanApplication component
export default LoanApplications;