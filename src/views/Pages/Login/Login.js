import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import config from '../../../config';
import swal from 'sweetalert';


class Login extends Component {

  constructor(props) {
    super(props);
    sessionStorage.clear(); 

    this.state = {
      username: '',
      password: ''
    }

  }

  onSubmit = (e) =>{    
    e.preventDefault();
 
    var userId   =   this.state.username;
    var password =   this.state.password;

    if(userId!="" && password!= "")
    {
      var getAdmin={ 

        method: 'POST',

        headers: new Headers({

          'Content-Type': 'application/json'                 
       
        }),

        body: JSON.stringify({
          "username" :userId,
          "password" :password
        })
      }    

      var api_url=`${config.API_URL}`;
      console.log("there are the Request params",getAdmin.body)

      fetch(api_url+'/adminLogin', getAdmin)
         
         .then(function(response){
          

          if(response.status!=200)
          {

            swal({
              title: "Wrong!",
              text: "Somthing went wrong.",
              icon: "error",
            });
          }
          
          response.json().then(json=>{

              if(json.code == 1)
              {

                sessionStorage.clear(); 
                sessionStorage.setItem("username",json.data.username);
                sessionStorage.setItem("jwt",json.token);
    

                 window.location.href = '/login';
              }
              else
              {
                  swal({
                    title: "Wrong!",
                    text: json.message,
                    icon: "error",
                  });
              }
          })
            


        }).catch(error => {
          console.log("threere are the error",error)
          swal({
            title: "Wrong!",
            text: error.toString(),
            icon: "error",
          });          
        });
        
      }
      else
      {
        swal({
              title: "Required!",
              text: "Username & password is compulsory!",
              icon: "warning",
            });
      }
  }


  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="4">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.onSubmit}> 
                      <h1 md="6">Add To Wallet</h1>
                      <p className="text-muted">Sign In to Dashboard</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="username" autoComplete="username" 
                        name="username"
                        value={this.state.username}
                        onChange={this.onChange} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                         />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right hidden">
  
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
