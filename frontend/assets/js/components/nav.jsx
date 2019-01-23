import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,FormGroup,FormControl} from 'react-bootstrap';
  import { Popup,Loader,Segment,Input,Button} from 'semantic-ui-react'
  import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import { SSL_OP_EPHEMERAL_RSA } from 'constants';
class Example extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  constructor(props) {
    
    super(props);
    const { cookies } = this.props;
    const currentUser = cookies.get('name')
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      currentUser:currentUser,
      isloading: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  handleChange = event => {
    if(event.target.name=='current')
    {
      this.setState(
    
        { currentUser:event.target.value
        
        
        });
        console.log(this.state)
    }
  }
  chnageSession = event=>
  {
    const { cookies } = this.props;
    cookies.set('name',this.state.currentUser,{path:'/'})
    this.setState({isloading:true})
    this.sleep(3000).then(() => {
      setTimeout(() => {
        window.location.reload()
      }, 0)});
   
  }
  sleep = (time)=> {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  render() {
    return (
      <Navbar>
  <Navbar.Header >
    <Navbar.Brand >
      <a href="#home">SeatsFinderBot</a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Navbar.Form pullRight>
      <FormGroup>
      <Popup
      trigger={<Input id='current' name='current' onChange={this.handleChange}   placeholder='Get My Session' />}
      content = 'Please Input Your ASU UserName'
      on = 'hover'
      >
      

        </Popup>
        
      </FormGroup>{' '}
      {(this.state.isloading)?
      <Button size='big' loading   >Submit</Button>
      :
      <Button size='big' onClick={this.chnageSession} >Submit</Button>
      }
    </Navbar.Form>
  </Navbar.Collapse>
</Navbar>
        
    );
  }
}
export default withCookies(Example)