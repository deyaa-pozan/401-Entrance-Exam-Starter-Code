import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import Modal from 'react-bootstrap/Modal'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      Api: [],
     
    };
   }

   componentDidMount = async()=>{
    console.log(process.env.REACT_APP_SERVER_URL);
axios.get(process.env.REACT_APP_SERVER_URL+'/getFlowers')
.then(result =>{
  this.setState({
    Api:result.data,
    email:this.props.auth0.user?.email

  })
  console.log(this.state.Api);
})
.catch(err=>{
  console.log(err);
})
   }


   addFav = (obj)=>{
    console.log(obj);

    axios.post(process.env.REACT_APP_SERVER_URL+'/add',obj)
    .then(result =>{
      console.log(result);
      console.log("Added");
    })
    .catch(err=>{
      console.log(err);
    })

   }


  render() {
    return (
      <>
      <Container>
  <Row>
    {this.state.Api.map(item =>{
      console.log(this.state.email);
      item.email = 'tamim.hamoudi@gmail.com'
      return(
    <Col>

    <Card style={{ width: '18rem' }}>
<Card.Img variant="top" src= {item.photo} />
<Card.Body>
 <Card.Title>{item.name}</Card.Title>
 <Card.Text>
 {item.instructions}
 </Card.Text>
 <Button onClick={()=>this.addFav(item)} variant="primary">Add Fav</Button>
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

export default withAuth0(Home);
