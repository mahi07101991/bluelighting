import React, { Component } from 'react';
import { Row, Col, Button, Table, Modal, FormGroup, FormControl } from 'react-bootstrap';
import LoanApplications from './LoanApplications';
import axios from 'axios';

let APP = {};

class App extends Component {
  componentDidMount() {
    this.getLoans();
  }

  getLoans() {
    // TODO: Request to get all loan applications. Update state.applications on success
    this.setState({
      applications: [{
        id: 1,
        date: '123',
        firstName: 'firstName',
        lastName: 'lastName',
        amount: 'amount',
        installments: 'installments',
        status: 'Denied'
      },
      {
        id: 2,
        date: '123',
        firstName: 'firstName',
        lastName: 'lastName',
        amount: 'amount',
        installments: 'installments',
        status: 'Accepted'
      }]
    })

  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      show: false,
      edit: false,
      first_name: '',
      last_name: '',
      amount: '',
      date: Date.now(),
      installments: '',
      applications: [],
      searchString: ''
    }

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditClose = this.handleEditClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleArchive = this.handleArchive.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleReApply = this.handleReApply.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.search = this.search.bind(this);
  }

  handleSearch = (e) => {
    this.setState({ searchString: e.target.value })
  }

  handleEdit(application) {
    console.log(application)
    APP = Object.assign({}, application);
    this.setState({ edit: true });
  }

  allow() {
    APP.status = "Accepted";
    console.log(APP);
    // C - TODO: Request to update a loan application status here
    let appFetch = this.state.applications.filter((item) => item.id !== APP.id)
    appFetch.push(APP)
    this.setState({
      ...this.state,
      applications: appFetch
    })

    this.handleEditClose();
  }

  deny() {
    APP.status = "Denied";
    console.log(APP);
    //  C -  TODO: Request to update a loan application status here
    let appFetch = this.state.applications.filter((item) => item.id !== APP.id)
    appFetch.push(APP)
    this.setState({
      ...this.state,
      applications: appFetch
    })
    this.handleEditClose();
  }

  handleEditClose() {
    this.setState({ edit: false });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  deleteApplication = (a) => {
    console.log(a)
    // TODO: Make request to delete a loan here. Call this.getLoans on success
  }

  onSubmit(e) {
    e.preventDefault();
    const { first_name, last_name, amount, installments } = this.state;

    const new_application = {
      firstName: first_name,
      lastName: last_name,
      amount,
      installments,
      status: 'Pending'
    }

    // TODO: Request to create a loan. Update the applications in state with newly created loan

    this.handleClose();
  }

  handleArchive() {
    const { applications } = this.state;

    let apps = [];
    apps = applications.filter(application => {
      if (application.status === 'Accepted') {
        console.log(application);
        // TODO: request to delete loan based on id. Call this.getLoans on success
      } else {
        this.getLoans();
        return application;
      }
    });
    this.getLoans();
  }

  handleClear() {
    const { applications } = this.state;

    let apps = [];
    apps = applications.filter(application => {
      if (application.status === 'Denied') {
        console.log(application);
        // TODO: request to delete loan based on id. Call this.getLoans on success
      } else {
        this.getLoans();
        return application;
      }
    });
    this.getLoans();
  }

  handleReApply() {
    const { applications } = this.state;

    // need to force a re-render
    let apps = [];
    apps = Object.assign([], applications);

    apps.forEach(a => {
      if (a.status === 'Denied') {
        a.status = 'Pending';
        // TODO: Request to update a loan application. Call this.getLoans on success
      }
    });
    this.getLoans();
  }

  search() {
    // TODO: Implement search based on first name and last name
  }

  render() {
    return (
      <div className="container App">
        <h3>Loan Application Manager</h3>
        <br /><br />
        <Row>
          <Col sm={6} md={4}>
            <h4>Welcome to Loan Manager</h4>
          </Col>


          <Col sm={3} md={2}>
            <Button bsStyle="default" onClick={this.handleReApply}>Re-apply Applications</Button>
          </Col>
          <Col sm={3} md={2}>
            <Button bsStyle="danger" onClick={this.handleClear}>Clear Loan Applications</Button>
          </Col>
          <Col sm={3} md={2}>
            <Button bsStyle="success" onClick={this.handleShow}>Create Loan Application</Button>
          </Col>
          <Col sm={3} md={2}>
            <Button bsStyle="primary" onClick={this.handleArchive}>Archive Applications</Button>
          </Col>


          {/* Modal to create a loan application */}
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create a loan Application</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                {/* TODO: Build form for loan application here */}
              </form>
            </Modal.Body>
          </Modal>
          {/* End of Modal */}

          {/* Modal to create a loan application */}
          <Modal show={this.state.edit} onHide={this.handleEditClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit loan Application</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col xs={12} md={4}>
                  <Button bsStyle="danger" bsSize="small" onClick={() => this.deny()}>
                    Deny Loan Application
                  </Button>
                </Col>
                <Col xs={12} md={4}></Col>
                <Col xs={12} md={4}>
                  <Button bsStyle="primary" bsSize="small" onClick={() => this.allow()}>
                    Accept Loan Application
                  </Button>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
          {/* End of Modal */}

        </Row>
        <br />
        <br />

        <React.Fragment>
          <Row>
            <Col xs={12} md={11}>
              <FormControl
                type="text"
                name="installments"
                value={this.state.searchString}
                placeholder="Search by name"
                onChange={this.handleSearch}
              />
            </Col>
            <Col xs={12} md={1}>
              <Button bsSize="small" bsStyle="primary" onClick={() => this.search()}>Search</Button>
            </Col>
          </Row>
          <hr />
          <Row>
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Amount Requested</th>
                  <th>Number of Installements</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {/* TODO: Call LoanApplication component here */}
              <LoanApplications applications={this.state.applications} onStatus={this.handleEdit} onDelete={this.deleteApplication} />
            </Table>
          </Row>
        </React.Fragment>

      </div>
    );
  }
}

export default App;
