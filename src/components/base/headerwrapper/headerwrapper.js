import React, { Component } from 'react'
import { Row, Col, Button, Table, Modal, FormControl } from 'react-bootstrap';

export default class Headerwrapper extends Component {
    render() {
        return (
            <>
                <Row>
                    <Col sm={6} md={4}>
                        <h4>Welcome to Loan Manager</h4>
                    </Col>


                    <Col sm={3} md={2}>
                        <Button bsStyle="default" onClick={this.props.handleReApply}>Re-apply Applications</Button>
                    </Col>
                    <Col sm={3} md={2}>
                        <Button bsStyle="danger" onClick={this.props.handleClear}>Clear Loan Applications</Button>
                    </Col>
                    <Col sm={3} md={2}>
                        <Button bsStyle="success" onClick={this.props.handleShow}>Create Loan Application</Button>
                    </Col>
                    <Col sm={3} md={2}>
                        <Button bsStyle="primary" onClick={this.props.handleArchive}>Archive Applications</Button>
                    </Col>


                    {/* Modal to create a loan application */}
                    <Modal show={this.props.show} onHide={this.handleClose}>
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
                    <Modal show={this.props.edit} onHide={this.handleEditClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit loan Application</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col xs={12} md={4}>
                                    <Button bsStyle="danger" bsSize="small" onClick={() => this.props.deny()}>
                                        Deny Loan Application
                </Button>
                                </Col>
                                <Col xs={12} md={4}></Col>
                                <Col xs={12} md={4}>
                                    <Button bsStyle="primary" bsSize="small" onClick={() => this.props.allow()}>
                                        Accept Loan Application
                </Button>
                                </Col>
                            </Row>
                        </Modal.Body>
                    </Modal>
                    {/* End of Modal */}
                </Row>
            </>
        )
    }
}
