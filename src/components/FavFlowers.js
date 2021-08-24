import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Modal } from 'bootstrap';
class FavFlowers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Fav: []
    };
  }


  componentDidMount = async () => {

    axios.get(process.env.REACT_APP_SERVER_URL + '/getFav/' + 'tamim.hamoudi@gmail.com')
      .then(result => {
        this.setState({
          Fav: result.data,
          isOpen: true

        })
        console.log(this.state.Fav);
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteFav = async (obj) => {
    console.log(obj);
    axios.delete(`${process.env.REACT_APP_SERVER_URL}/delete/${obj.email}/${obj.slug}`)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      })
  }

  updateFav = async (obj) => {

    axios.put(`${process.env.REACT_APP_SERVER_URL}/update`, obj)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      })
  }


  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });
  handleSubmit = (name) => {
    console.log(name);
  }



  render() {
    return (
      <>
        <Container>
          <Row>
            {this.state.Fav.map(item => {
              item.email = 'tamim.hamoudi@gmail.com'
              return (
                <Col>

                  <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={item.photo} />
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>
                        {item.instructions}
                      </Card.Text>
                      <Button onClick={(e) => {
                        this.openModal(item)
                        return (
                          <>
                            <div
                              className="d-flex align-items-center justify-content-center"
                              style={{ height: "100vh" }}
                            >
                            </div>

                            <Modal
                              show={this.isOpen}
                              onHide={this.closeModal}
                              backdrop="static"
                            >
                              <Modal.Header closeButton>
                                <Modal.Title>Modal Form Title</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <Form.Group >
                                  <Form.Label>Name: </Form.Label>
                                  <Form.Control type="text" onChange={this.handleChange} value={item.name} placeholder="Name" />
                                </Form.Group>
                                <Form.Group >
                                  <Form.Label>Photo: </Form.Label>
                                  <Form.Control type="text" onChange={this.handleChange} value={item.photo} placeholder="url" />
                                </Form.Group>
                                <Form.Group >
                                  <Form.Label>instructions: </Form.Label>
                                  <Form.Control type="text" onChange={this.handleChange} value={item.instructions} placeholder="instructions" />
                                </Form.Group>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button variant="primary" type="submit" onClick={(e) => this.handleSubmit("e.target")}>
                                  Submit
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </>
                        )
                      }} variant="primary">update</Button>
                      <Button onClick={(e) => this.deleteFav(item)} variant="danger">delete</Button>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })}
          </Row>
        </Container>
      </>
    )
  }
}

export default FavFlowers;
