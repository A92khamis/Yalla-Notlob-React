import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class Login extends React.Component {

  state = {
    email: '',
    password: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:2222"); // to put the route of login
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(this.state));
  }

  render() {
    return (
      <div className='login-form'>
        {/*
          Heads up! The styles below are necessary for the correct render of this example.
          You can do same with CSS, the main idea is that all the elements up to the `Grid`
          below must have a height of 100%.
        */}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
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
                  onChange={ (e) => { this.state.email = e.target.value } }
                />
                <Form.Input
                  name='password'
                  fluid
                  required
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={ (e) => { this.state.password = e.target.value } }
                />

                <Button color='grey' fluid size='large'>Login</Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href='#'>Sign Up</a>
            </Message>
          </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Login
