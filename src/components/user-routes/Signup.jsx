import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { signup } from '../services/user-service';

import { toast } from 'react-toastify';
import Base from '../main/Base';
const Signup = () => {

  const [data, setData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: ''
  });

  const [error, setError] = useState({
    errors: {},
    isError: false
  })

  useEffect(()=>{
    
  }, [data])

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  }

  const resetData = ()=>{
    setData({
      username: '',
      firstName: '',
      lastName: '',
      password: ''
    })
  }

  const submitForm = (e) => {
    e.preventDefault();
    // console.log(data);

    // call server
    signup(data).then((response)=>{
      // console.log(response);

      /* if(error.isError) {
        toast.error("Form data is invalid!");
        setError({...error, isError: false});
        return;
      } */


      // console.log("success log")
      toast.success("User Registered Successfully")
      setData({
        username: '',
        firstName: '',
        lastName: '',
        password: ''
      })
    }).catch((error)=>{
      console.log(error);
      // handle error
      toast.error("Username might already exist");
      setError({
        errors: error,
        isError: true
      })
      console.log(error);

    })
  }

  return (
    <Base>
      <Container className='py-4'>

        <Row>
          <Col sm={{size:6, offset:3}}>
            <Card>
              <CardHeader>
                <h3>Fill Info to Register</h3>
              </CardHeader>

              <CardBody>

                <Form onSubmit={submitForm}>
                  <FormGroup>
                    <Label htmlFor="username">Username: </Label>
                    <Input
                      type="text" 
                      placeholder="Enter username here" 
                      id="username"
                      onChange={(e)=>handleChange(e, 'username')}
                      value={data.username}
                      invalid={error.errors?.response?.data?.message === 'User already exists' || error.errors?.response?.data?.username
                        ? true : false}
                      
                    />

                    <FormFeedback>
                      {error.errors?.response?.data?.message}
                      {error.errors?.response?.data?.username}
                    </FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="fname">First Name: </Label>
                    <Input 
                      type="text" 
                      placeholder="Enter first name here" 
                      id="firstName"
                      onChange={(e)=>handleChange(e, 'firstName')}
                      value={data.firstName}
                      invalid={error.errors?.response?.data?.firstName
                        ? true : false}
                      />

                    <FormFeedback>
                      {error.errors?.response?.data?.lastName}
                    </FormFeedback>

                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="lname">Last Name: </Label>
                    <Input 
                      type="text" 
                      placeholder="Enter last name here" 
                      id="lastName"
                      onChange={(e)=>handleChange(e, 'lastName')}
                      value={data.lastName}
                      invalid={error.errors?.response?.data?.lastName
                        ? true : false}
                    />

                    <FormFeedback>
                      {error.errors?.response?.data?.lastName}
                    </FormFeedback>

                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="password">Password: </Label>
                    <Input 
                      type="password" 
                      placeholder="Enter password here" 
                      id="password"
                      onChange={(e)=>handleChange(e, 'password')}
                      value={data.password}
                      invalid={error.errors?.response?.data?.password
                        ? true : false}
                    />
                    <FormFeedback>
                      {error.errors?.response?.data?.password}
                    </FormFeedback>
                  </FormGroup>
                  <Container>
                    <Button className='mx-2'>Register</Button>
                    <Button onClick={resetData}>Reset</Button>
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

export default Signup
