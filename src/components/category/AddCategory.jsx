import React, { useState } from 'react'
import Base from '../main/Base'
import { Button, Card, CardBody, Container, Form, FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { createCategory } from '../services/category-service';
import { toast } from 'react-toastify';


const AddCategory = () => {

  const [category, setCategory] = useState({
    categoryTitle: '',
    categoryDescription: ''
  });

  const [error, setError] = useState({
    errors: {},
    isError: false
  })

  const fieldChanged = (e)=>{
    setCategory({...category, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    createCategory(category).then(data => {
      console.log(data);
      toast.success("category created");
    }).catch(error => {
      console.log(error)
      setError({
        errors: error,
        isError: true
      })
    })
  }



  return (
    <Base className='mx-5'>
      {JSON.stringify(category)}
      <div className='container' style={{maxWidth:'700px'}}>

        <div className='wrapper mx-5'>

          <Card className='mx-5 shadow'>
              <CardBody>
                <h3 style={{textAlign: 'center'}}>Create new category</h3>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for='categoryTitle'>Category Title</Label>
                    <Input type='text' id='categoryTitle' 
                      placeholder='Enter here'
                      name='categoryTitle'
                      onChange={fieldChanged}
                      invalid={error.errors?.response?.data?.categoryTitle
                        ? true : false}/>
                    <FormFeedback>
                      {error.errors?.response?.data?.categoryTitle}
                    </FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for='categoryDescription'>Category Description</Label>
                    <Input type='textarea' id='categoryDescription' 
                    placeholder='Enter here'
                    name='categoryDescription'
                    onChange={fieldChanged}
                    invalid={error.errors?.response?.data?.categoryDescription
                      ? true : false}/>
                    <FormFeedback>
                      {error.errors?.response?.data?.categoryDescription}
                    </FormFeedback>
                  </FormGroup>

                  <Container>
                    <Button type='submit' color='dark'>Submit</Button>
                    <Button className='ms-2' color='danger'>Reset</Button>
                  </Container>
                </Form>

              </CardBody>

          </Card>

        </div>
      </div>
    </Base>
  )
}

export default AddCategory