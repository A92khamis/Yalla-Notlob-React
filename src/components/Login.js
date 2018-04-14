import React from 'react';
import { Button, Form,Icon, Image, Grid, Header, Message, Segment } from 'semantic-ui-react';
import Cookies from 'universal-cookie';
import logo from '../public/images/otolb.png';
import 'semantic-ui-css/semantic.min.css';
import SocialButton from './SocialButton'
import axios from 'axios';

import './App.css';
class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/auth/login', false); // to put the route of login
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(this.state));
    let response;
    try {
      console.log(xhr.responseText);
      response = JSON.parse(xhr.responseText);
    } catch (e) { }
    if (response) {
      console.log('response', response);
      const cookies = new Cookies();
      cookies.set('access_token', response.access_token);
      window.location = '/';
    }
  }

  handleSocialLogin = (user) => {
    console.log(user)
    // axios({
    //   method:'POST',
    //   url:"http://localhost:3000/auth/register",
    //   headers:{"Content-Type":"application/json"},
    //   data:{        
    //     "name": user._profile.name,
    //     "email": user._profile.email,
    //     "password": user._profile.id,
    //     "api_type": 'g',
    //     "api_token": user._token.accessToken ,
    //     "profile_id":user._profile.id
          
    //   }
    // }).then((res)=>{
    //   console.log(res);
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
        console.log('access_token', logRes.data.access_token);
        
        const cookies = new Cookies();
        cookies.set('access_token', logRes.data.access_token);
         window.location = '/';
      });
         
    // });
  }

  handleSocialLoginFailure = (err) => {
    console.error(err)
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
              style={{
                fontSize: '70px', color: '#FFDE00',
                fontWeight: 'bold', margin: 'auto'
              }}
            >
              <Image
                size='massive'
                src={logo}
                style={{ marginBottom: '20px' }}
              />
              Yalla Notlob
            </Header>

          </Grid.Row>
          <Grid.Row
          >
            <Grid.Column style={{ maxWidth: 350 }}>
              <Header as='h2' style={{ color: '#ffffff' }}>
                {' '}Log-in to your account
            </Header>
            <Segment stacked>
              <Form size='large' onSubmit={this.handleSubmit}>
                
                  <Form.Input
                    name='email'
                    fluid
                    required
                    icon='at'
                    type='email'
                    iconPosition='left'
                    placeholder='E-mail address'
                    onChange={(e) => { this.setState({ email: e.target.value }) }}
                  />
                  <Form.Input
                    name='password'
                    fluid
                    required
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    onChange={(e) => { this.setState({ password: e.target.value }) }}
                  />

                  <Button color='grey' fluid size='large' id="login-button">Login</Button>
                  
                  </Form>
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
                    
                 
                </Segment>
             
              <Message>
                New to us? <a href='/register'>Sign Up</a>
              </Message>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Login
