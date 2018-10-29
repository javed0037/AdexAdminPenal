import React, { Component } from 'react';
import {
  Badge,
  Button,
  ButtonDropdown,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import config from '../../../config';
import swal from 'sweetalert';

class Forms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone : '',
      firstname : '',
      lastname  : '',
         email  : '',
    Oldpasword : '',
      Password : '',

    };
  }
  componentDidMount() {
    var object = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
       // 'Authorization': 'token ' + sessionStorage.getItem('jwt') + ''
      }
    }    
  //  var api_url = `${config.API_URL}`;
    var apiUrl = "";

    let api_url = 'http://localhost:5000/user/getUse';
      var host_url = `${config.HOST_URL}`;
      
        console.log(api_url,"gettin api_url")
        fetch(api_url, object)
          .then(res => res.json())
          .then(json => {
            console.log("there are the json",json);
          this.setState({
            
            firstname: json.firstName,
            phone    : json.phone,
            lastname: json.lastname,
            oldpassword: json.password,
            email : json.email


          })


        }).catch(error => {
          console.log(error)
                  
        });
    }
  

  onSubmit = (e) => { 
    e.preventDefault();
    // get our form data out of state
    console.log("there are the state for this",this.state)
    var firstname = (this.state.firstname) ? this.state.firstname.toString() : "";
    var phone = (this.state.phone) ? this.state.phone.toString() : "";
    var lastname = (this.state.lastname) ? this.state.vehilastnamecleNo.toString() : "";
    var email = (this.state.email) ? this.state.email.toString() : "";
    var args1 = {
      "firstname": firstname,
      "phone": phone,
      "email" :email,
      "lastname": lastname
     
};
    var swaltitle = (0) ? "SAVE" : "UPDATE";
    var swaltext = (0) ? "Successfully save" : "Successfully update";
    ///////////////////////////
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      },
      body: JSON.stringify(args1)
    }
    var api_url = `${config.API_URL}`;

    var reqapi = "";
      reqapi =  "/vendor/edit_profile";
    

    fetch(api_url + reqapi, object)
      .then(function (response) {
        response.json().then(json => {
          if (json.status) {
            swal({
              title: swaltitle,
              text: swaltext,
              icon: "success",
            });
            window.location.href = '/#/vendor/VehicleList';
          }
          else {
            swal({
              title: "Warning",
              text: json.message,
              icon: "warning",
            });
          }
        })


      }).catch(error => {
        console.log(error.toString());
            
      });
  }

  // passwordDisplay = (e) => {
  //   console.log(e.target.checked)
  //   if (e.target.checked) {
  //     this.setState({ readPass: false });
  //     this.setState({ checkedPass: true });
  //     this.setState({ password: '' });
  //   }
  //   else {
  //     this.setState({ readPass: true });
  //     this.setState({ checkedPass: false });
  //     this.setState({ password: '' });
  //   }

  // }
  // handleChange = (selectedOption1) => {
  //   this.setState({ "unit": selectedOption1.value });
  // }


  
  
       
  render() {
    return (
      <div className="animated fadeIn">      
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <strong>Edit</strong> Profile
              </CardHeader>
              <CardBody>
                <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">UserName</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                      <FormText color="muted">This is a help text</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                      <FormText color="muted">This is a help text</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Email Input</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="email" id="email-input" name="email-input" placeholder="Enter Email" autoComplete="email"/>
                      <FormText className="help-block">Please enter your email</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="email-input">Phone</Label>
                    </Col>
                    <Col xs="12" md="9">
                    <Input type="tel" min="0" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" className id="username" name="username" required value={this.state.username} onChange={this.onChange} placeholder="Enter Mobile No." required />
                      <FormText className="help-block">Please enter your email</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="password-input">Old Password</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="password" id="password-input" name="password-input" placeholder="Password" autoComplete="new-password" />
                      <FormText className="help-block">Please enter a complex password</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="password-input">Password</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="password" id="password-input" name="password-input" placeholder="Password" autoComplete="new-password" />
                      <FormText className="help-block">Please enter a complex password</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="password-input">confirm Password</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="password" id="password-input" name="password-input" placeholder="Password" autoComplete="new-password" />
                      <FormText className="help-block">Please enter a complex password</FormText>
                    </Col>
                  </FormGroup>
                                  
                </Form>
              </CardBody>
              <CardFooter>
                <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
         &nbsp;      <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
       
      </div>
    );
  }
}

export default Forms;
