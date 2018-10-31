import React, { Component } from 'react';
import { Input, Badge, Card, CardBody, CardHeader, Col, Row, Table,  FormGroup,
        Label } from 'reactstrap';
import config from '../../../config';
import dateFormat from 'dateformat';
import { NavLink } from 'react-router-dom';
import Select from 'react-select';
import {
  NavLink as BSNavLink,
  Button
} from 'reactstrap';
import swal from 'sweetalert';
// import {displaytotalrows,previousPage,nextPage,arry_data,OnClickPage,displaytotalpage,
//   PagingCurrent,PagingNext,PagingPrevious} from '../../../Controllers/Paging';

import ReactPaginate from 'react-paginate';
import { PAGELIMIT } from '../../../Controllers/Comman';
var size;
class VendorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: '',
      products: [],
      offset: 0,
      pageno: 1,
      pageCount: 0
    };
  }
  componentDidMount() {
    this.userlist();
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    let pno = selected + 1;
    this.setState(
      { pageno: pno },
      () => {
        this.userlist();
      }
    );
  };


  userlist = () => {
    var susername = (this.state.susername) ? this.state.susername : "";
    var smobileno = (this.state.smobileno) ? this.state.smobileno : "";
    var saddress = (this.state.saddress) ? this.state.saddress : "";
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
       // 'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      }
    }
    //var parameter = this.props.match.params.ids;
    //var user_ids = (parameter) ? parameter : 0;
   // var pageno = this.state.pageno;
    var api_url = `${config.API_URL}`;

     var apiUrl = "/getAllUserForAdmin";
   // apiUrl   =  'http://localhost:5000/getUserWithPagination?npp='+PAGELIMIT+'&page='+pageno
    //apiUrl = api_url + "/superadmin/getAllVendors?page=" + pageno + "&limit=" + PAGELIMIT + "&name=" + susername + "&mobileno=" + smobileno + "&address=" + saddress + "";
    //console.log(PAGELIMIT,'PAGELIMIT');
    
    fetch(api_url+apiUrl, object)
      .then(res => res.json())
      .then(json => {

        if (json.data.length > 0) {
          var total_count = json["totalpages"];
          
          this.setState({
            products: json.data,
            //pageCount: Math.ceil(total_count / PAGELIMIT)
          });

        }
        else {
          this.setState({
            products: [],
            mobile : '',
            //pageCount: 0
          })
        }
      }).catch(error => {
        console.log("error-->>", error)
      });
  }


  statusupdate = (p, dt) => {
    //e.preventDefault(); // <--- prevent form from submitting
    console.log(p.status, "this is status@@@@@@@")
    var currentform = this;
    var currentstatus = (dt) ? dt : ((p.isDeleted === false) ? 2 : 1);
    var currentstatusname = (dt) ? "delete" : ((p.isDeleted === false) ? "inactive" : "active");
    var currentStatusTitle = (dt) ? "Delete" : ((p.isDeleted === false) ? "Inactive" : "Active");

    swal({
      title: "Are you sure?",
      text: "You want to " + currentstatusname + " '" + p.email + "'!",
      icon: "warning",
      buttons: [
        'No, cancel it!',
        'Yes, I am sure!'
      ],
      dangerMode: true,
    }).then(function (isConfirm) {
      if (isConfirm) {
        swal({
          title: currentStatusTitle + "!",
          text: 'user ' + p.email + ' is successfully ' + currentstatusname + '!',
          icon: 'success'
        }).then(function () {
          console.log(p, "there are the req param")

          ///////////////////////////
          var object = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              //'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
            },
            body: JSON.stringify({
              "mobile" :p.mobile,
              
            })
          }

          var api_url = `${config.API_URL}`;
          var apiUrl = "/disableUser";
           /*apiUrl   =  'http://localhost:5000/getUserWithPagination?npp='+PAGELIMIT+'&page='+pageno
            apiUrl = api_url + "/superadmin/getAllVendors?page=" + pageno + "&limit=" + PAGELIMIT + "&name=" + susername + "&mobileno=" + smobileno + "&address=" + saddress + "";
            console.log(PAGELIMIT,'PAGELIMIT');*/
         
         fetch(api_url+apiUrl, object)
            .then(res => res.json())
            .then(json => {
              currentform.userlist();
            }).catch(error => {

            });
        });
      } else {
        swal("Cancelled", "It is cancelled.", "error");
      }
    })
  };

  onSearch = (e) => {
    this.setState(
      { [e.target.name]: e.target.value },
      () => {
        this.userlist();
      }
    );
  }

  render() {
    const formthis = this;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col xs="6" lg="6">
                    <Input type="text" id="susername" name="susername" value={this.state.susername} onChange={this.onSearch} placeholder="Enter Name" />
                  </Col>
                  
                  <Col xs="6" lg="6">
                    <Input type="email" id="email" name="email" value={this.state.susername} onChange={this.onSearch} placeholder="Enter email" />
                  </Col>
                  <br/>
                  </Row>
                  <Row>
                  <Col xs="6" lg="6">
                    <Input type="number" min="0" id="smobileno" name="smobileno" value={this.state.smobileno} onChange={this.onSearch} placeholder="Mobile No." />
                  </Col>
                 
                  <Col xs="6" lg="6">
                
            
                        <Select required className="dropdown-width"  
                          name="form-field-name"
                          value={{value: this.state.employeetype, 
                          label: this.state.employeetype}}
                          onChange={this.handleChange}
                          options={this.state.EmployeeList}
                        />
                      
                  </Col>
                </Row>
                <br/>
                <Row><Col><Button type="submit" size="sm" color="primary">Seach</Button></Col></Row>
              </CardHeader>
              <br/>
              <br/>
              <CardBody>
              <Row>
                  <Col xs="10" lg="10">
                <p><strong>User</strong></p>
                </Col>
                </Row>
                <Table responsive striped>
                  <thead>
                    <tr>

                      <th>mobile</th>
                      <th>email</th>  
                      <th>activeuser</th>
                     
                      <th>userbalance</th>
                      <th>withdrawamount</th>
                      <th>spinpoint</th>
                      <th>scratchpoint</th>
                      <th>videopoint</th>
                      <th>Status</th>
                     
                      <th>Transaction</th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.products.map(function (p, index, ) {
                        return (
                          <tr>
                            <td>{p.mobile}</td>
                            <td>{p.email}</td>
                            <td>{p.balance}</td>
                           
                           <td>{p.balance}</td>
                           <td>{p.withdrawal_amount}</td>
                           <td>{p.otp}</td>
                           <td>{p.max_amount_for_jackpot}</td>
                           
                           <td>{p.otp}</td>
                           <td>                                                                
                          <Badge className="pointer" onClick={()=>formthis.statusupdate(p)} color={(p.isDeleted== false)?"success":"secondary"}>{(p.isDeleted==false)?"Active":"Inactive"}</Badge>    
                   
                          </td>
                           

                        
                        <td>
                              <BSNavLink
                                className="text-uppercase"
                                tag={NavLink}
                                to={'/AddUser/' + p.mobile}
                                activeClassName="active"
                                exact="true">
                                <i class="cui-note icons font-1xl d-block mt-0"></i>
                              </BSNavLink>
                            </td>


                          </tr>
                        )
                      })
                    }

                  </tbody>
                </Table>
                {/* <ReactPaginate previousLabel={"previous"}
                  nextLabel={"next"}
                  breakLabel={<a href=""></a>}
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={0}
                  pageRangeDisplayed={10}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages page-item"}
                  activeClassName={"active"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousLinkClassName={"page-link"}
                  nextLinkClassName={"page-link"}
                /> */}
              </CardBody>
            </Card>
          </Col>
        </Row>


      </div>

    );
  }
}

export default VendorList;
