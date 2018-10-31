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
      pageCount: 0,
      owner_of_transaction : ''
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


 
  listTransaction = () => {
    var object = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      },
      body: JSON.stringify({
        "mobile" : this.props.match.params.mobile
         
      })
    }
    console.log("ther are the params7777..........",this.props)    
    // var user_ids = (parameter) ? parameter : 0;
    // var pageno = this.state.pageno;
    var api_url = `${config.API_URL}`;

    var apiUrl = "/getUserTransactions";

    fetch(api_url+apiUrl, object)
      .then(res => res.json())
      .then(json => {
        console.log("there are the transaction result....................",json)
        if (json.data.transaction_list.length > 0) {
         // var total_count = json["totalElements"];
          this.setState({
            products: json.data.transaction_list,
            owner_of_transaction :json.data.owner_of_transaction
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
      <h4>Transnaction history</h4>
        <Row>
          <Col xs="12" lg="12">
            <Card>
              
              <CardBody>
                
                <Table responsive striped>
                  <thead>
                    <tr>
                      
                      <th>transaction_date</th>
                      <th>is_withdraw</th>
                      <th>comment</th>
                      <th>amount</th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.products.map(function (p, index, ) {
                        return (
                          <tr>  
                           
                            <td>{p.transaction_date}</td>
                            <td>{(p.is_withdraw == false)?'false':'True'}</td>
                            <td>{p.comment}</td>
                            <td>{p.amount}</td>


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
