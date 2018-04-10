import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import Cookies from 'universal-cookie';
import 'semantic-ui-css/semantic.min.css';

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
    } catch(e) {}
    if (response) {
      console.log('response', response);
      const cookies = new Cookies();
      cookies.set('access_token', response.access_token);
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
          <Grid.Row>
            <p
              style={{ color: '#05386b', fontSize: '70px',
                  fontWeight: 'bold', margin: 'auto' }}>
               Yalla Notlob
            </p>

          </Grid.Row>
          <Grid.Row
          >
          <Grid.Column style={{ maxWidth: 350 }}>
            <Header as='h2' style={{ color: '#ffffff' }}>
              {' '}Log-in to your account
            </Header>
            <Form size='large' onSubmit={ this.handleSubmit }>
              <Segment stacked>
                <Form.Input
                  name='email'
                  fluid
                  required
                  icon='at'
                  type='email'
                  iconPosition='left'
                  placeholder='E-mail address'
                  onChange={ (e) => { this.setState({ email: e.target.value }) } }
                />
                <Form.Input
                  name='password'
                  fluid
                  required
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={ (e) => { this.setState({ password: e.target.value }) } }
                />

                <Button color='grey' fluid size='large'>Login</Button>
              </Segment>
            </Form>
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
