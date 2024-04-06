import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import { getCurrentUser } from '../auth/auth';
import Base from '../main/Base';
import { getUser, userUpdate } from '../services/user-service';
import { useNavigate } from 'react-router-dom';


const UserUpdate = () => {

  const currentUser = getCurrentUser();

  const [error] = useState({});
  
  const [user, setUser] = useState({});

  const [data] = useState({});

  const navigate = useNavigate();

  useEffect(()=>{
    getUser(currentUser).then((data)=>{
      setUser(data);
    }).catch((error)=>{
      console.log(error);
    })
  }, [currentUser]); // [currentUser] is a dependency which might cause problems

  const handleChange = (e, name)=>{
    setUser({...user, [name]: e.target.value});
    console.log(user);
  }

  const resetData = ()=>{
    getUser(currentUser).then((data)=>{
      setUser(data);
    }).catch((error)=>{
      console.log(error);
    })
  }

  const submitForm = (e)=>{
    e.preventDefault();
    userUpdate(user).then((data)=>{
      console.log(data);
      toast.success('User updated');
      navigate('/user/dashboard');
    }).catch((error)=>{
      console.log(error);
      toast.error('User update failed');
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
                      disabled={true}
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
                    <Button color='danger' style={{marginLeft: '-15px'}}>Update</Button>
                    <Button
                      className='ms-2' 
                      color='primary' 
                      onClick={resetData}
                    >Reset</Button>
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