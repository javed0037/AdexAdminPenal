import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import config from '../../../config';
import swal from 'sweetalert';


class Login extends Component {

  constructor(props) {
    super(props);
    sessionStorage.clear(); 

    this.state = {
      usernameOrEmail: '',
      password: ''
    }

  }

  onSubmit = (e) =>{    
    e.preventDefault();
 
    var txtusername=this.state.usernameOrEmail;
    var txtpassword=this.state.password;

    if(txtusername!="" && txtpassword!="")
    {
      var getusersobj={ 
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'                 
        }),
        body: JSON.stringify({
          "username" :txtusername,
          "password" :txtpassword
        })
      }    

      var api_url=`${config.API_URL}`;
         console.log(api_url,"api url",getusersobj,'threr arew getuser')
      fetch(api_url+'/auth/signin', getusersobj)
        .then(function(response){
          if(response.status!=200)
          {
          console.log("three are rewq param",getusersobj.body)
            swal({
              title: "Wrong!",
              text: "Somthing went wrong.",
              icon: "error",
            });
          }
          
          response.json().then(json=>{
              if(json.status==true)
              {
                sessionStorage.clear(); 
                sessionStorage.setItem("username",txtusername);
                sessionStorage.setItem("jwt",json.accessToken);
                sessionStorage.setItem("user_id",json.id);
                sessionStorage.setItem("typeid",json.typeid);
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
                      <h1 md="6">CHATAPP</h1>
                      <p className="text-muted">Sign In to Dashboard</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" 
                        name="usernameOrEmail"
                        value={this.state.usernameOrEmail}
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
                          <Button color="link" className="px-0">Forgot password?</Button>
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
