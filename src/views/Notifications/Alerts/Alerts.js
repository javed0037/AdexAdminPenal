import React, { Component } from 'react';
import { Alert, Card, CardBody, CardHeader, Col, Row,FormGroup,Button,
  Input,Label } from 'reactstrap';
  import Select from 'react-select';

class Alerts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>About Us</strong>
              
              </CardHeader>
              <CardBody>

                
                  <h4 className="alert-heading">Title</h4>
                    <Input type="text" id="susername" name="susername" value={this.state.susername} onChange={this.onSearch} placeholder="About us" />

                       
                   <h4 className="alert-heading">Descripation</h4>
                    
                   <Input type="textarea" id="address" name="address" value={this.state.address} onChange={this.onChange} placeholder="Enter Description" />
                   <br/><br/><br/>
                 
                 
                
                   <h4 className="alert-heading">Status</h4>
                <Select defaultValue= "Active"  required className="dropdown-width"  
                  name="form-field-name"
                  value={{value: this.state.employeetype, 
                  label: this.state.employeetype}}
                  onChange={this.handleChange}
                  options={this.state.EmployeeList}
                />
             
              
              </CardBody>
            </Card>
          </Col>
  
        </Row>
        <Button type="submit" size="sm" color="primary">Submit</Button>
      </div>
    );
  }
}

export default Alerts;
