import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { login } from '../services/user-service';
import { doLogin } from '../auth/auth';
import { useNavigate } from 'react-router-dom';
import Base from '../main/Base';

const Login = () => {

  const navigate = useNavigate();

  const [loginDetails, setLoginDetails] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e, property) => {
    let actualValue = e.target.value;
    setLoginDetails({...loginDetails, [property]: actualValue});

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(loginDetails);

    if(loginDetails.username.trim() === '' || loginDetails.password.trim() === '') {
      toast.error("Please fill all the fields");
      return;
    }

    // call server to generate token
    login(loginDetails).then((jwtTokenData)=>{
      // console.log(jwtTokenData);

      doLogin(jwtTokenData, ()=>{
        // console.log("login detail is saved to local storage");
        // redirect to home page
        navigate('/');

      })

      toast.success("Login successful!");
      // localStorage.setItem('jwtToken', jwtTokenData.token);
      // localStorage.setItem('user', JSON.stringify(jwtTokenData.user));
      // window.location.href = '/';
    }).catch((error)=>{
      console.log(error);
      if(error.response?.status === 400) {
        toast.error(error.response.data.message);
      } else if(error.response.status === 404) {
        toast.error("Credentials invalid!");
      } else {
        toast.error("Something went wrong!");
      }
    })


  }

  const handleReset = ()=> {
    setLoginDetails({
      username: '',
      password: ''
    })
  }

  return (
    <Base>
      <Container className='py-4'>

        <Row>
          <Col sm={{size:6, offset:3}}>
            <Card>
              <CardHeader>
                <h3>Login here</h3>
              </CardHeader>

              <CardBody>

                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="username">Username: </Label>
                    <Input 
                      type="text" 
                      placeholder="Enter username" 
                      id="username"
                      value={loginDetails.username}
                      onChange={(e)=> handleChange(e, 'username')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password: </Label>
                    <Input 
                      type="password" 
                      placeholder="Enter password" 
                      id="password" 
                      value={loginDetails.password}
                      onChange={(e)=> handleChange(e, 'password')}
                    />
                  </FormGroup>

                  <Container>
                    <Button className='mx-2' color='dark'>Login</Button>
                    <Button onClick={handleReset}>Reset</Button>
                  </Container>


                </Form>

              </CardBody>
            </Card>
          </Col>

        </Row>

      </Container>
    </Base>
  )
}

export default Login
