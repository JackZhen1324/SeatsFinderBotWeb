import React from 'react'
import { Table, Tab } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import ReactDOM from 'react-dom';
import { Dimmer,Button, Header, Modal,Popup,Loader,Segment} from 'semantic-ui-react'
import { instanceOf } from 'prop-types';
import FormExampleForm from './form'
import { unmountComponentAtNode } from 'react-dom'
import axios from 'axios'
import LoaderExampleLoader from './loaderDemo'
import { withCookies, Cookies } from 'react-cookie'

import {
  Collapse,
  Col,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,FormGroup,FormControl,Grid,Row} from 'react-bootstrap';


function handleClick(e) {
    e.preventDefault();

    console.log('链接被点击');
  }


  


class TableExampleCompact extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
 
  constructor(props) {
     super(props);
     
     
     this.classTable = React.createRef();
     this.textInput = React.createRef();
     this.info = React.createRef();
     this.state = {
       isloading: false,
      timeoutLength:250000,
      modalOpen: false ,
      deleting:false,
      currentUser:'',
      courses:[
        {
          courseId:'',
          status:'',
          mode:'',
        }
      ]
     };
  }
  componentDidMount() {
    console.log('Component WILL MOUNT!')
    console.log(this.state)
    var output = "";
    
    const bigText = this.textInput.current;
    const info = this.info.current;
    const classTable = this.info.current;
    const { cookies } = this.props;
    const dbRef = firebase.database().ref('users/'+cookies.get('name')+'/courses');
    console.log('users/'+this.state.currentUser+'/courses')
    /*dbRef.on('value', snap =>{bigText.innerText = snap.val()});
    var table = document.querySelector('#userInfo');
  const dbEvaluationStudentsRef = firebase.database().ref().child("History");
  */
  
  
  
  
  
  
  dbRef.on('value', snap => {
    var coursesList = this.state.courses
    this.setState({courses:[]})
    
    var students = snap.val();
    
    for(var i in students) {
      try{
      //var row = info.insertRow(+1);
        const course = {content: students[i].logs}
        const id = {content: students[i].coueseId}
        const mode = {content: students[i].mode}
        
        var coursesList = this.state.courses
        coursesList.push({course:[{courseId:id, status:course,mode:mode}]
  
        })
        this.setState(this.state)
        console.log(this.state)
     
      
      }
      catch(err)
      {
      //	var row = info.insertRow(0);
        
      }
      for(var j in students[i]) {
  
        //var cell = row.insertCell(-1);
        //cell.innerHTML = students[i][j];
        //this.setState()
  
      }
      console.log(this.state)
      //this.state.courses.splice(0,2);
      
  
    }
    
    
  });
    
}
componentWillReceiveProps(nextProps)
{
  console.log(nextProps)
}
componentWillMount() {
 
}

componentWillReceiveProps(newProps) {
    console.log('Component WILL RECEIVE PROPS!')
}
shouldComponentUpdate(newProps, newState) {
    return true;
}
componentWillUpdate(nextProps, nextState) {
    console.log('Component WILL UPDATE!');
}
componentDidUpdate(prevProps, prevState) {
  
}
componentWillUnmount() {
     console.log('Component WILL UNMOUNT!')
}





updateFormData = ()=>
{
  
	  
    
 }
 handleDelete = event => {
  event.preventDefault();
  var childToDelete = event.target.id;
  this.setState({deleting:true})
  console.log('hello ');
 
  
  
  const user2 = {
    classId : childToDelete,
    
  };
  console.log(user2);
  axios.post('http://72.201.206.220:8000/delClass/', { user2 })
    .then(res => {
      this.setState({deleting:false})
    })
}
handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })
  transferMsg(msg) {
  console.log(msg[1])
  this.setState({ modalOpen: false, isloading:msg[0], currentUser:msg[1]})
  
  console.log(this.state)
 
  
  
}
onChangeState(stateName){
  this.setState(stateName)
}
  render() {
    
     return (
<Grid>
<Row className="show-grid">
    <Col xs={6} md={1}>
    
    </Col>
    <Col xs={6} md={10}>
    <table className="table table-dark" id="userInfo" ref={this.classTable}>
  <thead>
    <tr>
    
      <th style={{textAlign:"left"}} scope="col">
    
      <Modal style={{
        width:'800px',
        height:'500px',
        margin: '0 auto',
        

      }}
        trigger={<Button icon='add'  onClick={this.handleOpen}></Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='large'
      >
        <Header icon='browser' content='Add Course' />
        <Modal.Content>
        <FormExampleForm transferMsg = {msg => this.transferMsg(msg)}></FormExampleForm>
        </Modal.Content>
        
      </Modal>
      Course ID</th>
      <th style={{textAlign:"center"}} scope="col">Mode</th>
      <th style={{textAlign:"center"}} scope="col">Status</th>
			<th style={{textAlign:"center"}} scope="col">Delete</th>
    </tr>
  </thead>
  <tbody ref={this.info}>
  {
   this.state.courses.map((course,i) => (
   
        
          (typeof(course.course)=='object')?
          
           
            course.course.map((sub,k)=>(
             <tr>
               <td>
                
                <div style={{textAlign:"left", paddingLeft:'30px'}}>
                {sub.courseId.content}
                
                
                </div>
                </td>
                <td>
                
                <div style={{textAlign:"center"}}>
                {this.state.isloading?
                  <LoaderExampleLoader></LoaderExampleLoader>
                  :
                  sub.mode.content
                }
                
                
                </div>
                </td>
              <td>
                
                <div style={{textAlign:"center"}}>
                {this.state.isloading?
                  <LoaderExampleLoader></LoaderExampleLoader>
                  :
                  sub.status.content
                }
                
                
                </div>
                </td>
                <td>
                
                <div style={{textAlign:"center"}}>
                {this.state.deleting?
                  <LoaderExampleLoader></LoaderExampleLoader>
                :
                <Button icon='delete' id={sub.courseId.content} onClick={this.handleDelete}></Button>
                
              
              
              }
                
                
                        
                </div>
                </td>
                
                
                </tr>  
                
                
              ))
            
              
          
            
          :
          null
        
        
        
      
       
      ))
      
        
   
     
    
  }
  
 
  </tbody>
  
</table>
    </Col>
    <Col xsHidden md={1}>
      
    </Col>
  </Row>
</Grid>
      

      
      
      
     );
  }
}
export default withCookies(TableExampleCompact);