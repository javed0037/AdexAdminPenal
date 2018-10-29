import React, { Component } from 'react';
import { Alert, Card, CardBody, CardHeader,Form,CardFooter, Col, Row,FormGroup,Button,
  Input,Label } from 'reactstrap';
  import Select from 'react-select';
  import swal from 'sweetalert';
  var r = '';
class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Status2 : 3,
      status : '',
      name : '',
      email : '',
      phone : '',
      password : '',
      pinid : '',
      random1 :'',
      Status1  : [{label : 'Select Status' , value : 'Select Statu'},{label : 'Active',value : 'Active'},{label : 'Inactive', value  :'Inactive'}],
      visible: true
    };
    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  myFunction1=(e)=>{
    e.preventDefault();
   var r = Math.random().toString(36).substring(7);
     this.setState({random1:r})
   console.log('there are r-0---------',r);
   
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ [e.target.email]: e.target.value });
    this.setState({ [e.target.password]: e.target.value });
    this.setState({ [e.target.phone]: e.target.value });
    this.setState({ [e.target.pinid]: e.target.value });
  }
  handleChange = (e) => {
    console.log("XXXXXXX--------@@@@@@@@@@@@@@@ ", e)
    var val1=(e.value=="Active")?1:0;
    this.setState({ Status2: val1 });
  }
  // getString = (e){

  // }
  onSubmit = (e) => {
    e.preventDefault();
    console.log('there are the state=>', this.state)
    var parameter = this.props.match.params.ids;
    var user_ids = (parameter) ? parameter : 0; 
    var email = (this.state.email) ? this.state.email.toString() : "";
    var password = (this.state.password) ? this.state.password.toString() : "";
    var name = (this.state.name) ? this.state.name.toString() :    "";
    var phone = (this.state.phone) ? this.state.phone.toString() : "";
    var unique_key = (this.state.random1) ? this.state.random1.toString() : "";
    var Status1 = (this.state.Status2);
   
    var args1 = {
      "email": email,
      "username":  name,
      "phone" : phone,
      "password" : password,
      "status" : Status1,
      "unique_key" :  unique_key
    };

    var swaltitle = (user_ids == 0) ? "SAVE" : "UPDATE";
    var swaltext = (user_ids == 0) ? "Successfully save" : "Successfully update";

    var object1 = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args1)
    }
    var api_url = '';
    api_url = 'http://localhost:5000/addNewuser';
   
    fetch(api_url, object1)
      .then(function (response) {
        console.log('there are the response',response);
        
        response.json().then(json => {
          console.log('there are the json---------', json.status,"jsonnnnn",json)
          if (json.status == '200'){
            swal({
              title: swaltitle,
              text:  json.message,
              icon:  "success",
            });
            window.location.href = '/#/theme/typography';
          }
          else {
            console.log("this is going on the way")
            swal({
              title: "Warning",
              text: json.message,
              icon: "warning",
            });
          }
        })


      }).catch(error => {
        console.log(error.toString());
        // swal({
        //   title: "Wrong!",
        //   text: error.toString(),
        //   icon: "error",
        // });
      });
  }

  render() {
    const { selectedOption1 } = this.state;
    // var test = { "label": this.state.Status1 };
     var test1 = (this.state.Status2 === 1)?'Active' :'Inactive';
       console.log('test1=',test1,"Status2=",this.state.Status2)
    return (
      <div className="animated fadeIn">
     <Form onSubmit={this.onSubmit}>
      <Card>
      <CardBody>
        <Row>
          <Col xs="12" md="12"> 
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Add New User</strong>   
                  </CardHeader>
                   <CardBody>
                   <FormGroup>
                
                  <h4 className="alert-heading">Name</h4>
                    <Input type="text" id="name" name="name" onChange={this.onChange}  value={this.state.name} placeholder="Enter name number " />
                    </FormGroup>   
                    <FormGroup>    
                   <h4 className="alert-heading">Email</h4>
                    
                   <Input type="email" id="email" name="email" value={this.state.email}  onChange={this.onChange} placeholder="Enter email" />
                   
                   </FormGroup>   
                    <FormGroup>    
                   <h4 className="alert-heading">phone</h4>
                    
                   <Input type="tel" id="phone" name="phone" value={this.state.phone} onChange={this.onChange} placeholder="Enter phone" />
                   
                   </FormGroup>   
                    <FormGroup>   
                   <h4 className="alert-heading">Password</h4>
                  
                    <Input type="password" id="password" name="password" value={this.state.password} onChange={this.onChange} placeholder="Enter password" />
                   
                    </FormGroup>   
                    <FormGroup>  
                    <h4 className="alert-heading">Secure Pin id</h4>
                    
                    <Input type="text" id= "pinid" name= "pinid" value={this.state.random1} onChange={this.getString} placeholder="Enter enter the pin Id" />
                     <br/>
                     <button onClick={this.myFunction1}>Generate Key</button>
                    </FormGroup>   
                     
                    <FormGroup> 
                <Label htmlFor="status">Status</Label> 
                        <Select className="dropdown-width"
                          name="form-field-name"
                          value={{label : test1,value : test1}}
                          onChange={this.handleChange}
                          options={this.state.Status1}
                        />
                  </FormGroup> 
              </CardBody>
            </Card>
          </Col>
        </Row>
        </CardBody>
        <CardFooter>
        <Button type="submit" size="sm" color="primary">Submit</Button>
        </CardFooter>
        </Card>
      </Form>
      </div>
    );
  }
}

export default AddUser;
