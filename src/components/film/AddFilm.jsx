import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap';
import Base from '../main/Base';
import { loadAllCategories } from '../services/category-service';
import { createFilm, uploadFilmImage } from '../services/film-service';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

const AddFilm = () => {

  const [categories, setCategories] = useState([]);

  const [cast] = useState([]);

  const [producer] = useState([]);

  const [image, setImage] = useState(null);

  const [filmDetails, setFilmDetails] = useState({
    title: 'title',
    year: 'year',
    runtime: 'runtime',
    categoryId: 1,
    summary: 'summary',
    trailerLink: 'trailerLink',
    producer: producer,
    director: 'director',
    cameraman: 'cameraman',
    cast: cast,
    rating: 'rating'
  });

  useEffect(()=>{
    loadAllCategories().then((data)=>{
      // console.log(data);
      setCategories(data);
    }).catch((error)=>{
      console.log(error);
    })
  }, []);

  const fieldChanged = (e)=>{
    setFilmDetails({...filmDetails, [e.target.name]: e.target.value});
  }

  const arrayChanged = (e)=>{
    /* setProducer({...producer, [e.target.name]: e.target.value.split(', ')});
    setCast({...cast ,[e.target.name]: e.target.value.split(', ')}); */
    const { name, value } = e.target;
    setFilmDetails({ ...filmDetails, [name]: value.split(', ') });
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    // console.log(filmDetails);
    createFilm(filmDetails).then((response)=>{
      
      uploadFilmImage(image, response.id).then((response)=>{
        console.log(response.id);
        toast.success("Image uploaded!");
      }).catch((error)=>{
        toast.error("Error uploading image");
        // console.log(error);
      })

      toast.success("Film created successfully!");
      setFilmDetails({
        title: '',
        year: '',
        runtime: '',
        categoryId: 1,
        summary: '',
        trailerLink: '',
        producer: [],
        director: '',
        cameraman: '',
        cast: [],
        rating: ''
      })
    }).catch((error)=>{
      console.log(error);
    })
  }

  // handle file change event
  const handleFileChange = (e)=>{
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  }



  return (
    <Base className='mx-5'>
      {/* {JSON.stringify(filmDetails)} */}
      <div className='container' style={{maxWidth:'700px'}}>

        <div className='wrapper mx-5'>

          <Card className='mx-5 shadow'>
              <CardBody>
                <h3 style={{textAlign: 'center'}}>Lights, Camera, Action!</h3>
                <h3 style={{textAlign: 'center'}}> Film Details</h3>

                <Form onSubmit={handleSubmit}>
                  <div className='my-3'>
                    <Label for='title'>Title</Label>
                    <Input type='text' id='title' 
                      placeholder='Enter here'
                      name='title'
                      onChange={fieldChanged}/>
                  </div>
                  <div className='my-3'>
                    <Label for='year'>Year</Label>
                    <Input type='number' id='year' 
                    placeholder='Enter here'
                    name='year'
                    onChange={fieldChanged}/>
                  </div>
                  <div className='my-3'>
                    <Label for='runtime'>Runtime (Example: 1h 03m)</Label>
                    <Input type='text' id='runtime' 
                    placeholder='Enter here'
                    name='runtime'
                    onChange={fieldChanged}/>
                  </div>
                  <div className='my-3'>
                    <Label for='category'>Genre</Label>
                    <Input type='select' id='category' 
                      placeholder='Enter here'
                      name='categoryId'
                      onChange={fieldChanged}>
                      {
                        categories.map((category, index)=>{
                          return <option value={category.categoryId} key={category.categoryId}>
                            {category.categoryTitle}
                          </option>
                        })
                      }
                    </Input>
                    cant find category? <NavLink to='/category/add'>add here</NavLink>
                  </div>

                    <div className="my-3">
                      <Label htmlFor='image'>Upload Film Poster</Label>
                      <Input 
                        id='image' 
                        name='image' 
                        type='file'
                        onChange={handleFileChange}>

                      </Input>

                    </div>

                  <div className='my-3'>
                    <Label for='summary'>Summary</Label>
                    <Input type='textarea' id='summary' 
                    placeholder='Enter here'
                    name='summary'
                    onChange={fieldChanged}/>
                  </div>
                  <div className='my-3'>
                    <Label for='trailerLink'>Trailer Link</Label>
                    <Input type='text' id='trailerLink' 
                    placeholder='Enter here'
                    name='trailerLink'
                    onChange={fieldChanged}/>
                  </div>
                  <div className='my-3'>
                    <Label for='producer'>Producers</Label>
                    <Input type='text' id='producer' 
                    placeholder='Enter here'
                    name='producer'
                    onChange={arrayChanged}/>
                  </div>
                  <div className='my-3'>
                    <Label for='director'>Director</Label>
                    <Input type='text' id='director' 
                    placeholder='Enter here'
                    name='director'
                    onChange={fieldChanged}/>
                  </div>
                  <div className='my-3'>
                    <Label for='cameraman'>Cameraman</Label>
                    <Input type='text' id='cameraman' 
                    placeholder='Enter here'
                    name='cameraman'
                    onChange={fieldChanged}/>
                  </div>
                  <div className='my-3'>
                    <Label for='cast'>Cast</Label>
                    <Input type='text' id='cast' 
                    placeholder='Enter here'
                    name='cast'
                    onChange={arrayChanged}/>
                  </div>
                  <div className='my-3'>
                    <Label for='rating'>imdb rating</Label>
                    <Input type='text' id='rating' 
                    placeholder='Enter here'
                    name='rating'
                    onChange={fieldChanged}/>
                  </div>

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

export default AddFilm