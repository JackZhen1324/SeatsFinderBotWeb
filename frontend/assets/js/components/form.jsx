import React from 'react'
import Popup from "reactjs-popup";
import axios from 'axios';
import {Radio, Button, Checkbox, Form ,Input} from 'semantic-ui-react'
import ButtonExampleLoading from './progressButton'
import { withAlert } from 'react-alert'
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
var loading = false;


class FormExampleForm extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };
  state = {
    currentMthod:'c1',
    isloading: false,
    classId : '',
    classLevel: '',
    semester: '',
    reserved: '',
    timeInterval: '',
    asuID: '',
    password: '',
    swapCourse:'',
  }
  constructor(props)
  {
    super(props)
    
    
  }
  componentDidMount() {
    console.log(this.state)
    
  }
   sleep = (time)=> {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  handleChange = event => {
    if(event.target.name=='classId')
    {
      this.setState(
    
        { classId:event.target.value
        
        
        });
    }
    if(event.target.name=='classLevel')
    {
      this.setState(
    
        { classLevel:event.target.value,
        
        
        });
    }
    if(event.target.name=='semester')
    {
      this.setState(
    
        { semester:event.target.value,
       
        
        });
    }
    if(event.target.name=='swapCourse')
    {
      this.setState(
        { swapCourse :event.target.value
     
        }
      );
    }
    if(event.target.name=='reserved')
    {
      this.setState(
    
        { reserved:event.target.value
     
        });
    }
    if(event.target.name=='timeInterval')
    {
      this.setState(
    
        { timeInterval:event.target.value
     
        });
    }
    if(event.target.name=='asuID')
    {
      this.setState(
    
        { asuID:event.target.value
     
        });
    }
    if(event.target.name=='password')
    {
      this.setState(
    
        { password:event.target.value
     
        });
    }
    console.log(this.state)
    
    
      
  }
  handleSubmit = event => {
    
    const { cookies } = this.props;
    const currentUser = cookies.get('name')
    this.setState({isloading:true})
    this.sleep(3000).then(() => {
    setTimeout(() => {
      this.props.transferMsg([true,this.state.asuID])
    }, 0)});
    event.preventDefault();
    const dbRef = firebase.database().ref('users/'+this.state.asuID+'/courses/'+this.state.classId);
    firebase.database().ref('users/'+this.state.asuID+'/courses/'+this.state.classId).once("value", snapshot => {
      if (snapshot.exists()){
        console.log("exists!");
        this.sleep(3000).then(() => {
        setTimeout(() => {
          
          this.props.transferMsg([false,this.state.asuID])
        }, 0)});
        const r = window.confirm("course already exist"); 
        if(r == true){ 
          console.log('test')
          this.props.handler
          
          //sign Out logic }
         // TODO: Handle that users do exist
         
         // TODO: Handle that users do exist
         return true;
        }
      }
      else
      {
        
        const user = {
        classId : this.state.classId,
      'classLevel': this.state.classLevel,
      'semester': this.state.semester,
      'reserved': this.state.reserved,
      'timeInterval': this.state.timeInterval,
      'asuID': this.state.asuID,
      'password': this.state.password,
      'method':(this.state.currentMthod=='c1')?'add':'swap',
      'swapWith':this.state.swapCourse,
      };
      console.log(user);
  
      axios.post('http://72.201.206.220:8000/addClass/', { user })
      this.sleep(9000).then(() => {
        setTimeout(() => {
          console.log(this.state.asuID)
          this.props.transferMsg([false,this.state.asuID])
        }, 0);
        if(cookies.get('name')!=this.state.asuID){
          cookies.set('name',this.state.asuID,{path:'/'})
          window.location.reload()
      }
        // Do something after the sleep!
    })
    
    
  }
      
      
      // TODO: Handle that users do not exist
   });
    
   
  }
  handleMethodChnage = (e) => {
  this.setState({currentMthod:e.target.id})
  console.log(this.state)
}
  
  render() {
    let styles = {
      color:'white',
      
    };
    const { value } = this.state.currentMthod
    return(
  
  <Form loading={loading} size='small' key='small'  onSubmit={this.handleSubmit}>
  <Form.Group inline>
      <label style={{color:'white'}} >Mode Selection</label>
      <label style={{color:'white'}} >Add</label>
      <Form.Field style={styles} id='c1'   control='input' type='radio' name='htmlRadios' 
      value='1'
      
      onChange={this.handleMethodChnage}
      
      />
      <label style={{color:'white'}} >Swap</label>
      <Form.Field  control='input' id='c2'  type='radio' name='htmlRadios' 
      value='2'
      
      onChange={this.handleMethodChnage}
      />
      {
        (this.state.currentMthod=='c1')?

        
        null
        
        :<Input id="swapCourse" style={{textAlign:'center'}} onChange={this.handleChange} name="swapCourse" placeholder='Swap With Course' />
        

      }
    </Form.Group>
  
   <Form.Group widths='equal'>
   
   
   <Form.Field>
      <label>Class#</label>
      <Input  name="classId" style={{textAlign:'center'}} onChange={this.handleChange} placeholder='Class#' />
    </Form.Field>
    <Form.Field>
      <label>Class level</label>
      <Input id="classLevel" style={{textAlign:'center'}} onChange={this.handleChange} name="classLevel" placeholder='Class level' />
    </Form.Field>
		

    <Form.Field>
      <label>Semester</label>
      <Input id="semester" style={{textAlign:'center'}} onChange={this.handleChange} name="semester" placeholder='Semester' />
    </Form.Field>
      <Form.Field>
      <label>Reserved</label>
      <Input id="reserved" style={{textAlign:'center'}} onChange={this.handleChange} name="reserved" placeholder='Reserved' />
    </Form.Field>
      <Form.Field>
      <label>Timeinterval</label>
      <Input id="timeInterval" style={{textAlign:'center'}} onChange={this.handleChange} name="timeInterval" placeholder='Timeinterval' />
    </Form.Field>
   </Form.Group>
   <Form.Group widths='equal'>
    <Form.Field>
      <label>ASU ID</label>
      <Input id="asuID" style={{textAlign:'center'}} onChange={this.handleChange} name="asuID" placeholder='ASU ID' />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <Input id="password" style={{textAlign:'center'}} onChange={this.handleChange} name="password" placeholder='Password' />
    </Form.Field>
    
		</Form.Group >
    <div style={{paddingTop:'10px'}}>
    <Form.Group widths='equal'>
    <Form.Field>
    {
      (this.state.isloading)?
      <ButtonExampleLoading   type='submit'  >Submit</ButtonExampleLoading>
      :
      <Button fluid type='submit' >Submit</Button>
      
    }
    
    </Form.Field>
    </Form.Group>
    </div>
  </Form>
    )
  }
}
export default withCookies(FormExampleForm);

