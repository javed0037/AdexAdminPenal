import React, { Component } from 'react';
import { Alert, Card, CardBody, CardHeader, Col,Form, Row,CardFooter,FormGroup,Button,
  Input,Label } from 'reactstrap';
  import Select from 'react-select';
  import swal from 'sweetalert';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Status2 :3,
      name : '',
      email : '',
      phone : '',
      visible: true,
     // EmployeeList : [{label  : '3 Month',value : 3},{label  : '6 Month',value : 6},{label  : '12 Month',value : 12}],
      Status1  : [{label : 'Select Status' , value : 'Select Statu'},{label : 'Active',value : 'Active'},{label : 'Inactive', value  :'Inactive'}],
      // Wipe  : [{label : 'Select Status1' , value : 3},{label : 'Yes',value : 1},{label : 'No', value  :2}]
    };

    this.onDismiss = this.onDismiss.bind(this);
  }
  componentDidMount() {
    this.getUserDetails();
    
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  getUserDetails = () => {
    var object = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
       // 'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      }
    }
    var parameter = this.props.match.params.ids;
    var user_ids = (parameter) ? parameter : 0;

    var apiUrl = "";
    apiUrl   =  'http://localhost:5000/getUserDetails?userid='+user_ids
       
    fetch(apiUrl, object)
      .then(res => res.json())
      .then(json => {

        console.log("js json-------",json)
        if (json.results.length > 0) {
          console.log('json.results[0].status******************************',json.results[0].status)
          this.setState({
           
            name : json.results[0].name,
            email : json.results[0].name,
            phone : json.results[0].phone,
            Status2 : json.results[0].status

          //  Status1 : {label : 'Active',value : json.results[0].status} //json.results[0].Status1,
            
          });
        }
        else {
          this.setState({
            products: [],
          })
        }
      }).catch(error => {
        console.log("error-->>", error)
      });
  }
  handleChange = (e) => {
    console.log("XXXXXXX--------@@@@@@@@@@@@@@@ ", e)
    var val1=(e.value=="Active")?1:0;
    this.setState({ Status2: val1 });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ [e.target.email]: e.target.value });
    this.setState({ [e.target.phone]: e.target.value });
  }
  onSubmit = (e) => {
    e.preventDefault();
    // get our form data out of state
    console.log('there are the state 444444444=>', this.state)
    var parameter = this.props.match.params.ids;
    var user_ids = (parameter) ? parameter : 0;
    
    var email = (this.state.email) ? this.state.email.toString() : "";
    var name = (this.state.name) ? this.state.name.toString() :    "";
    var phone = (this.state.phone) ? this.state.phone.toString() : "";
    var Status1 = (this.state.Status2);
   
    var args1 = {
      "email": email,
      "name": name,
      "phone" : phone,
      "Status" : Status1
    };

    var swaltitle = (user_ids == 0) ? "SAVE" : "UPDATE";
    var swaltext = (user_ids == 0) ? "Successfully save" : "Successfully update";

    var object1 = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      },
      body: JSON.stringify(args1)
    }
    var api_url = '';
    api_url = 'http://localhost:5000/admin/updateprofile?userid='+user_ids;
   
    fetch(api_url, object1)
      .then(function (response) {
        console.log('there are the response',response);
        
        response.json().then(json => {
          console.log('there are the json---------', json.status,"jsonnnnn",json)
          if (json.status){
            swal({
              title: swaltitle,
              text:  swaltext,
              icon:  "success",
            });
            //console.log("there are the typography",window.location.href)
            window.location.href = '/#/theme/typography';
            console.log("there are the typography88888888888888888888",window.location.href)
          }
          else {
            console.log("this is going on the way")
            swal({
              title: "Warning",
              text: json.message,
              icon: "warning",
            });
             window.location.href = '/#/theme/typography';
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
                <i className="fa fa-align-justify"></i><strong>Edit Profile</strong>   
                  </CardHeader>
                   <CardBody>
                   <FormGroup>    
                   <Label htmlFor="name">Name</Label>  
                    <Input type="text" id="name" name="name" required value = {this.state.name} onChange={this.onChange} placeholder="name" required />
                    </FormGroup>   
                    <FormGroup>  
                    <Label htmlFor="email">Email</Label>
                    <Input type="text" id="email" name="email"   onChange={this.onChange} required value = {this.state.email}  placeholder="email" />
                    </FormGroup>   
                    <FormGroup> 
                    <Label htmlFor="phone">Phone</Label> 
                    <Input type="tel" min="0" pattern="[0-9]{3}[0-9]{3}[0-9]{4}" id="username" name="phone" value={this.state.phone} onChange={this.onChange} placeholder="Phone Number" />
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

export default EditProfile;
