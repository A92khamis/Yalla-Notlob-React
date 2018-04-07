import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

export default class Login extends React.Component {
    render() {
        return (
            <div className='login-form' style={{ background: '#5cbd95' }}>
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
                    <Form size='large'>
                      <Segment stacked>
                        <Form.Input
                          fluid
                          icon='user'
                          iconPosition='left'
                          placeholder='E-mail address'
                        />
                        <Form.Input
                          fluid
                          icon='lock'
                          iconPosition='left'
                          placeholder='Password'
                          type='password'
                        />

                        <Button color='' fluid size='large'>Login</Button>
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

