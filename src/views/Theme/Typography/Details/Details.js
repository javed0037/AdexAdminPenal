import React, { Component } from 'react';
import { Alert, Card, CardBody, CardHeader,Table, Col, Row,FormGroup,Button,
  Input,Label } from 'reactstrap';
  import Select from 'react-select';

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products :[],
      visible: true,
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
         console.log('data',json.results)
        if (json.results.length > 0) {
          // var total_count = json["totalpages"];
          // console.log("total_counttotal_count---------------",total_count);
          
          this.setState({
            products: json.results,
            
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
 

  render() {
    console.log('state--',this.state.products[0])
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>User Details</strong>
              </CardHeader>
              <CardBody>
               <Table responsive striped>
                  <thead>
                    <tr>
                      <th>
                
                  <h4 className="alert-heading">Details</h4>
                  </th>
                  </tr>
                    </thead>
                  <tbody>

                    <tr>
                      <td>Name</td>
                      <td>{(this.state.products[0])?(this.state.products[0].name) : ''}</td>
                      </tr>
                      <tr>
                      <td>Email</td>
                      <td>{(this.state.products[0])?(this.state.products[0].email) : ''}</td>
                      </tr>
                      <tr>
                      <td>Phone</td>
                      <td>{(this.state.products[0])?(this.state.products[0].phone) : ''}</td>
                      </tr>
                       <tr>
                      <td>Status</td>
                      <td>{(this.state.products[0])?((this.state.products[0].status == 1)?'Active':'Inactive') : ''}</td>
                      </tr>            
                         </tbody>
                         </Table>                           
              </CardBody>
            </Card>
          </Col>
  
        </Row>

      </div>
    );
  }
}

export default Details;
