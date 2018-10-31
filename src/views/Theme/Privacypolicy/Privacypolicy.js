import React, { Component } from 'react';
import { Input, Badge, Card, CardBody, CardHeader, Col, Row, Table,  FormGroup,
        Label } from 'reactstrap';
import ResizeImage from 'react-resize-image'
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
class Alerts extends Component {
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
   
    var api_url = `${config.API_URL}`;

     var apiUrl = "/getAllPaymenttransaction";
    
    fetch(api_url+apiUrl, object)
      .then(res => res.json())
      .then(json => {
        console.log("there are json",json)
        if (json.data.length > 0) {
          var total_count = json["totalpages"];
          
          this.setState({
            products: json.data,
          });

        }
        else {
          this.setState({
            products: [],
            mobile : '',
          })
        }
      }).catch(error => {
        console.log("error-->>", error)
      });
  }


  statusupdate = (p, dt) => {
    //e.preventDefault(); // <--- prevent form from submitting
    console.log("new status ..........",dt)

    var currentform = this;
    var currentstatus = (dt) ? dt : ((p.status === 1) ? 1 :(p.status === 2)? 2:(p.status === 3)?3:4);
    var currentstatusname = (dt) ? "update" : ((p.status === 1) ? "paid" :(p.status === 2)?"hold": "Reserved");
    var currentStatusTitle = (dt) ? "update" : ((p.status === 1) ? "paid" :(p.status === 2)?"hold": "Reserved");

    swal({
      title: "Are you sure?",
      text: "You want to " + currentstatusname + " '" + p.id + "'!",
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
              "id" :p.id,
              "status" : dt
              
            })
          }

          var api_url = `${config.API_URL}`;
          var apiUrl = "/settlePayment";     
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
              <br/>
              <br/>
              <CardBody>
              <Row>
                  <Col xs="10" lg="10">
                <p><strong>Payment Details</strong></p>
                </Col>
                </Row>
                <Table responsive striped>
                  <thead>
                    <tr>
                      <th>amount</th>
                      <th>linked_number</th>  
                      <th>pay_id</th>
                      <th>logo</th>
                      <th>Status</th>
                      <th>status</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.products.map(function (p, index, ) {
                        return (
                          <tr>
                            <td>{p.amount}</td>
                            <td>{p.linked_number}</td>
                            <td>{p.pay_id}</td>
                           
                           <td><img src={p.logo} alt= {"p.logo"} height="42" width="100"/></td>
                           <td>{((p.status === 1)?'Pending':(p.status === 2)? 'Paid':(p.status === 3)?<p>Reverse</p>:<p>Hold</p>)}</td>     
                           <td> 



                           {(p.status === 1) ?
                          <Badge  className="pointer"  onClick={()=>formthis.statusupdate(p,2)} color={(p.status === 1)?"success":"secondary"}><p>Paid</p></Badge>
                    
                           :(p.status === 4)?<Badge  className="pointer"  onClick={()=>formthis.statusupdate(p,2)} color={(p.status=== 4)?"success":"secondary"}><p>Paid</p></Badge>: <Badge  className="pointer"  color= "secondary"><p>Paid</p></Badge>}
                          &nbsp; &nbsp;
                           {(p.status === 1) ?
                          <Badge  className="pointer"  onClick={()=>formthis.statusupdate(p,4)} color={(p.status ===1)?"success":"secondary"}><p>Hold</p></Badge>    
                           :<Badge  className="pointer"  color= "secondary"><p>Hold</p></Badge>}
                          &nbsp; &nbsp;
                           {(p.status === 1) ?
                          <Badge  className="pointer"  onClick={()=>formthis.statusupdate(p,3)} color={(p.status === 1)?"success":"secondary"}><p>Reversed</p></Badge>    
                           :(p.status === 4)?<Badge  className="pointer"  onClick={()=>formthis.statusupdate(p,3)} color={(p.status=== 4)?"success":"secondary"}><p>Reversed</p></Badge>:<Badge  className="pointer"  color= "secondary"><p>Reversed</p></Badge>}
                         </td>

                           

                        
                        {/* <td>
                              <BSNavLink
                                className="text-uppercase"
                                tag={NavLink}
                                to={'/AddUser/' + p.mobile}
                                activeClassName="active"
                                exact="true">
                                <i class="cui-note icons font-1xl d-block mt-0"></i>
                              </BSNavLink>
                            </td> */}


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

export default Alerts;
