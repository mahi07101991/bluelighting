import React, { Component } from 'react';
import { Row, Col, Button, Table, Modal, FormControl } from 'react-bootstrap';
import LoanApplications from '../LoanApplications';
import Navigation from '../navigation/navigation';
import HeaderWrapper from './headerwrapper/headerwrapper';
import axios from 'axios';

let APP = {};

class Base extends Component {
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
           <div>
                <Navigation {...this.props} auth={this.props.auth} />
            <div className="container App">
                <h3>Loan Application Manager</h3>
                <br /><br />
                <HeaderWrapper 
                handleReApply={this.handleReApply}
                handleClear ={this.handleClear}
                handleShow ={this.handleShow}
                handleArchive ={this.handleArchive}
                handleClose= {this.handleClose}
                show={this.state.show}
                edit={this.state.edit}
                deny={this.deny}
                allow={this.allow}
                />
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
        
           </div>
            );
    }
}

export default Base;
