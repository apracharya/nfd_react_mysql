import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '../auth/auth';
import { getUser, signup } from '../services/user-service';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap'
import { toast } from 'react-toastify';
import Base from '../main/Base';


const UserUpdate = () => {
  
  const [user, setUser] = useState({});
  const username = getCurrentUser();

  useEffect(()=>{
    getUser(username).then((data)=>{
      setUser(data);
    }) 
  }, [username]);



  const [data, setData] = useState({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    password: user.password
  });

  const [error, setError] = useState({
    errors: {},
    isError: false
  })


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
      // console.log(error);
      // console.log("error log");
      // handle error
      toast.error("Something went wrong");
      setError({
        errors: error,
        isError: true
      })

    })
  }

  return (
    <Base>
      <Container>

        <Row>
          <Col sm={{size:6, offset:3}}>
            <Card>
              <CardHeader>
                <h3>Fill Info to Update</h3>
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
                      value={user.username}
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
                      value={user.firstName}
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
                      value={user.lastName}
                      invalid={error.errors?.response?.data?.lastName
                        ? true : false}
                    />

                    <FormFeedback>
                      {error.errors?.response?.data?.lastName}
                    </FormFeedback>

                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="password">New Password: </Label>
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

export default UserUpdate