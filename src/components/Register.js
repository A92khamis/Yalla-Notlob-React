import React from 'react';
import logo from '../public/images/otolb.png';
import { Button, Form, Image, Grid, Header, Message, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import SocialButton from './SocialButton';
import Cookies from 'universal-cookie';
import axios from 'axios';

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordPattern: '',
      errorMessage: '',
      selectedFile: null
    }
  }



  handleSocialLogin = (user) => {
    console.log(user)
    axios({
      method:'POST',
      url:"http://localhost:3000/auth/register",
      headers:{"Content-Type":"application/json"},
      data:{        
        "name": user._profile.name,
        "email": user._profile.email,
        "password": user._profile.id,
        "api_type": 'g',
        "api_token": user._token.accessToken ,
        "profile_id":user._profile.id
          
      }
    }).then((res)=>{
      console.log(res);
      console.log(user._profile.email);
      axios({
        method:'POST',
        url:"http://localhost:3000/auth/login",
        headers:{"Content-Type":"application/json"},
        data:{        
          "email": user._profile.email,
          "password": user._profile.id,   
        }
      }).then((logRes)=>{
        
        console.log('response', logRes);
        const cookies = new Cookies();
        cookies.set('access_token', logRes.data.access_token);
        window.location = '/';
      });
         
    });
  }

  handleSocialLoginFailure = (err) => {
    console.error(err)
  }

  // helper function to escape the value of unput field password
  escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  fileChangedHandler(e) {
    this.setState({ selectedFile: e.target.files[0] })
  }

  handleSubmit = (e) => {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/auth/register', false); // to put the route of registration
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      image: this.state.selectedFile,
      api_type: 'w'
    }));
    let response;
    try {
      console.log(xhr.responseText);
      response = JSON.parse(xhr.responseText);
    } catch(e) {}
    if (response) {
      console.log('response', response);
      window.location = '/';
    }
  }

  render() {
    return (
      <div className='form ui'>
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.form {
            height: 100%;
          }
        `}</style>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
        >
          <Grid.Row style={{ background: '#05386b' }}>
            <Header
              style={{ fontSize: '70px', color: '#FFDE00',
              fontWeight: 'bold', margin: 'auto' }}
            >
              <Image
                size='massive'
                src={ logo }
                style={{ marginBottom: '20px' }}
              />
              Yalla Notlob
            </Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{ maxWidth: 350 }}>
              <Header as='h2' style={{ color: '#ffffff' }}>
                {' '}Create a new account
              </Header>
              <Segment stacked>
                <Form size='large' onSubmit={ this.handleSubmit }>
                  <Form.Input
                    name='name'
                    required
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='Name'
                    onChange={ (e) => { this.setState({ name: e.target.value }) } }
                  />
                  <Form.Input
                    name='email'
                    required
                    fluid
                    icon='at'
                    iconPosition='left'
                    placeholder='E-mail address'
                    type='email'
                    inputMode='email'
                    onChange={ (e) => { this.setState({ email: e.target.value }) } }
                  />
                  <Form.Input
                    name='password'
                    required
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    onChange={ (e) => {
                      this.setState({
                        passwordPattern: this.escapeRegExp(e.target.value),
                        password: e.target.value
                      })
                    } }
                  />
                  <Form.Input
                    name='confirmPassword'
                    required
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Retype Password'
                    type='password'
                    pattern={ this.state.passwordPattern }
                    // title="error"
                    onInvalid={ (e) => {
                      e.target.setCustomValidity('passwords don\'t match');
                    } }
                    onChange={ (e) => {
                      e.target.setCustomValidity('');
                    } }
                  />
                  <Form.Input
                    name='image'
                    required
                    fluid
                    icon='image'
                    iconPosition='left'
                    type='file'
                    onChange={ this.fileChangedHandler }
                  />
                  <Button color='grey' fluid size='large' id="register-button">Register</Button>
                  <div>
                    <SocialButton 
                      provider='google'
                      appId= '228775057985-h5afvhpmglcloss2jj752h0t64lhmrgm.apps.googleusercontent.com'
                      onLoginSuccess={this.handleSocialLogin}
                      onLoginFailure={this.handleSocialLoginFailure}
                    >
                    Gmail
                    </SocialButton>
                  </div>
                </Form>
              </Segment>
              <Message>
                Already have account? <a href='/'>Login</a>
              </Message>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Register
