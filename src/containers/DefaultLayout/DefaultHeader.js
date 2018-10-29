import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import config from '../../config';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  logout=()=>{
    var host_url=`${config.HOST_URL}`;
    window.location.href = host_url+'/#/login';
  }
  editProfile =()=>{
    var host_url=`${config.HOST_URL}`;
    window.location.href  = host_url+'/#/base/forms';
  }
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand>Chat App</AppNavbarBrand>
       {/* <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
    />
    */}
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="/charts">Dashboard</NavLink>
          </NavItem>
              
        </Nav>
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
            < DropdownItem onClick={this.editProfile}><i className="fa fa-lock"></i>profile</DropdownItem>

            <DropdownItem>Login : {sessionStorage.getItem('username')}</DropdownItem>             <DropdownItem onClick={this.logout}><i className="fa fa-lock"></i>Logout</DropdownItem>
        
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}
{/* <form method="post" accept-charset="utf-8" id="profileForm" action="/users/profile" novalidate="novalidate"><div style="display:none;"><input type="hidden" name="_method" value="PUT"><input type="hidden" name="_csrfToken" value="990ab5fac90e03c108109766ecb31d16545660f5e476c033c4a287dd9b8c75e095700806c7e722d1ddd6a25c0c6e7b3bfc968ef88ae374c0b22c2fecb4a36479"></div>              <div class="form-group">
				        <div class="input text"><label for="username">Username</label><input type="text" name="username" placeholder="Enter Username" class="form-control valid" maxlength="200" id="username" value="admin" aria-required="true" aria-invalid="false"></div>	
              </div>
              <div class="form-group">
        			 <div class="input textarea"><label for="name">Name</label><textarea name="name" placeholder="Enter Name" class="form-control valid" id="name" rows="5" aria-required="true" aria-invalid="false">Admin</textarea></div>	
              </div>
              <div class="form-group">
				       <div class="input email"><label for="email">Email</label><input type="email" name="email" placeholder="Enter Email" class="form-control valid" maxlength="200" id="email" value="admin@admin.com" aria-required="true" aria-invalid="false"></div>	
              </div>
              <div class="form-group">
				        <div class="input tel"><label for="phone">Phone</label><input type="tel" name="phone" placeholder="Enter Phone Number" class="form-control valid" maxlength="20" id="phone" value="8233402576" aria-invalid="false"></div>	
              </div>
              <div class="form-group">
                <div class="input password"><label for="oldpassword">Old Password</label><input type="password" name="oldpassword" class="form-control" id="oldpassword" value=""></div>              </div>
              <div class="form-group">
                <div class="input password"><label for="password">Password</label><input type="password" name="password" class="form-control" id="password" value=""></div>              </div>
              <div class="form-group">
                <div class="input password"><label for="confirm-password">Confirm Password</label><input type="password" name="confirm_password" class="form-control" id="confirm-password" value=""></div>              </div>
              <div class="box-footer">
                <button class="btn btn-primary waves-effect" type="submit">Submit</button>  
              </div>
              </form> */}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
