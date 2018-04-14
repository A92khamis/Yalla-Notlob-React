import React from 'react'
import SocialLogin from 'react-social-login'
import { Button, Form,Icon, Image, Grid, Header, Message, Segment } from 'semantic-ui-react';
 
const Button2 = ({ children, triggerLogin, ...props }) => (
  <Button color='google plus' fluid onClick={triggerLogin} {...props}>
  <Icon name='google plus' />
    { children }
  </Button>
)
 
export default SocialLogin(Button2)