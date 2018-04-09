import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      passwordPattern: ''
    }
  }

  // helper function to escape the value of unput field password
  escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  handleSubmit = (e) => {
    var request = new XMLHttpRequest();
    request.open('POST', '#/users');
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.send();
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
              {' '}Create a new account
            </Header>
            <Form size='large' onSubmit={ this.handleSubmit }>
              <Segment stacked>
                <Form.Input
                  name='name'
                  required
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Name'
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
                />
                <Form.Input
                  name='password'
                  required
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={ (e) => this.setState({
                    passwordPattern: this.escapeRegExp(e.target.value)
                  }) }
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
                <Button color='grey' fluid size='large'>Register</Button>
              </Segment>
            </Form>
            <Message>
              Already have account? <a href='#'>Login</a>
            </Message>
          </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Register
