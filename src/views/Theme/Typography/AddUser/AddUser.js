import React, { Component } from 'react';
import { Input, Badge, Card, CardBody, CardHeader, Col, Row, Table,  FormGroup,
Label } from 'reactstrap';
import config from '../../../../config';
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
//import { PAGELIMIT } from '../../../Controllers/Comman';
class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      offset: 0,
      pageno: 1,
      pageCount: 0
    };

  }

  componentDidMount() {
    this.listTransaction();

  }

  handlePageClick = (data) => {
    let selected = data.selected;
    let pno = selected + 1;
    this.setState(
      { pageno: pno },
      () => {
        this.listTransaction();
      }
    );
  };

// var parameter = this.props.match.params.ids;
  listTransaction = () => {
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      },
      body: JSON.stringify({
        "mobile" :"p.mobile",
         
      })
    }
    // var parameter = this.props.match.params.ids;
    
    // var user_ids = (parameter) ? parameter : 0;
    // var pageno = this.state.pageno;
    var api_url = `${config.API_URL}`;

    var apiUrl = "/getUserTransactions";

    fetch(api_url+apiUrl, object)
      .then(res => res.json())
      .then(json => {
        if (json["data"].length > 0) {
          var total_count = json["totalElements"];
          this.setState({
            products: json["data"],
           // pageCount: Math.ceil(total_count / PAGELIMIT)
          });
        }
        else {
          this.setState({
            products: [],
            pageCount: 0
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
    var currentstatus = (dt) ? dt : ((p.isDelete === 1) ? 2 : 1);
    var currentstatusname = (dt) ? "delete" : ((p.status === 1) ? "inactive" : "active");
    var currentStatusTitle = (dt) ? "Delete" : ((p.status === 1) ? "Inactive" : "Active");

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
          text: 'Vendor ' + p.email + ' is successfully ' + currentstatusname + '!',
          icon: 'success'
        }).then(function () {
          
          p.status = currentstatus;
         
          console.log(p, "there are the req param")

          ///////////////////////////
          var object = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
            },
            body: JSON.stringify(p)
          }
          var api_url = `${config.API_URL}`;
          fetch(api_url + '/superadmin/updateVendor', object)
            .then(res => res.json())
            .then(json => {
              currentform.listTransaction();
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
        this.listTransaction();
      }
    );
  }

  render() {
    const formthis = this;
    return (
      <div className="animated fadeIn">
      <h4>CHAT WALLPAPER LIST</h4>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              
              <CardBody>
                
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Color Code</th>
                      <th>Color Box</th>
                      <th>Edit</th>
                      <th>Delete</th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.products.map(function (p, index, ) {
                        return (
                          <tr>
                            <td>{p.id}</td>
                            
                          
                            <td>
                             
                             <Badge className="pointer" onClick={() => formthis.statusupdate(p)} color={(p.status == 1) ? "success" : "secondary"}>{(p.status == 1) ? "Active" : "Inactive"}</Badge>

                           </td>
                            <td>
                              <BSNavLink
                                className="text-uppercase"
                                tag={NavLink}
                                to={'/vendor/VendorEmployeeList/' + p.userid}
                                activeClassName="active"
                                exact="true">
                                <i class="icon-eye icons font-1xl d-block mt-0"></i>
                              </BSNavLink>
                            </td>
                            <td>
                              <BSNavLink
                                className="text-uppercase"
                                tag={NavLink}
                                to={'/vendor/updatevendor/' + p.userid}
                                activeClassName="active"
                                exact="true">
                                <i class="cui-note icons font-1xl d-block mt-0"></i>
                              </BSNavLink>
                            </td>


                            <td>
                              <Badge className="pointer1" onClick={() => formthis.statusupdate(p, 3)}><i class="fa fa-trash" aria-hidden="true"></i></Badge>


                            </td>


                          </tr>
                        )
                      })
                    }

                  </tbody>
                </Table>
                <ReactPaginate previousLabel={"previous"}
                  nextLabel={"next"}
                  breakLabel={<a href="">...</a>}
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages page-item"}
                  activeClassName={"active"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousLinkClassName={"page-link"}
                  nextLinkClassName={"page-link"}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}


export default AddUser;
