import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap'
import Base from '../main/Base'
import { updateFilm } from '../services/film-service'


const UpdateFilm = () => {

  const params = useParams();

  const navigate = useNavigate();

  // const [categories, setCategories] = useState([]);

  const [cast] = useState([]);

  const [producer] = useState([]);

  // const [image, setImage] = useState(null);

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

    axios.get(`http://localhost:8080/films/read/${params.id}`)
    .then((response)=>{
      console.log(response);
      setFilmDetails({
        id: response.data.id,
        title: response.data.title,
        year: response.data.year,
        runtime: response.data.runtime,
        category: response.data.category,
        summary: response.data.summary,
        trailerLink: response.data.trailerLink,
        producer: response.data.producer,
        director: response.data.director,
        cameraman: response.data.cameraman,
        cast: response.data.cast,
        rating: response.data.rating,
        thumbnailSrc: response.data.thumbnailSrc
      });
    })

    // loadAllCategories().then((data)=>{
    //   // console.log(data);
    //   setCategories(data);
    // }).catch((error)=>{
    //   console.log(error);
    // })
  }, [params.id]);

  const fieldChanged = (e)=>{
    setFilmDetails({...filmDetails, [e.target.name]: e.target.value});
  }

  const arrayChanged = (e)=>{
    /* setProducer({...producer, [e.target.name]: e.target.value.split(', ')});
    setCast({...cast ,[e.target.name]: e.target.value.split(', ')}); */
    const { name, value } = e.target;
    setFilmDetails({ ...filmDetails, [name]: value.split(',') });
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    // console.log(filmDetails);
    updateFilm(filmDetails).then((response)=>{
      
      // uploadFilmImage(image, response.id).then((response)=>{
      //   console.log(response.id);
      //   toast.success("Image uploaded!");
      // }).catch((error)=>{
      //   toast.error("Error uploading image");
      //   // console.log(error);
      // })

      toast.success("Film updated successfully!");
      navigate(`/films/${response.id}`);
      // setFilmDetails({
      //   title: '',
      //   year: '',
      //   runtime: '',
      //   categoryId: 1,
      //   summary: '',
      //   trailerLink: '',
      //   producer: [],
      //   director: '',
      //   cameraman: '',
      //   cast: [],
      //   rating: ''
      // })
    }).catch((error)=>{
      toast.error("Error creating film");
      console.log(error);
    })
  }

  // handle file change event
  // const handleFileChange = (e)=>{
  //   console.log(e.target.files[0]);
  //   setImage(e.target.files[0]);
  // }



  return (
    <Base>
      {/* {JSON.stringify(filmDetails)} */}
      <div className="alert alert-warning" role="alert">
        <h4 className="alert-heading">Warning!</h4>
        <p className="mb-0">You might need to have admin role to use this feature!</p>
      </div>
      {/* {JSON.stringify(filmDetails)} */}
      <div className='container' style={{maxWidth:'700px'}}>

        <div className='wrapper mx-5'>

          <Card className='mx-5 shadow'>
              <CardBody>
                <h3 style={{textAlign: 'center'}}>Okay, let's try that again,</h3>
                <h3 style={{textAlign: 'center'}}>but this time, good!</h3>

                <Form onSubmit={handleSubmit}>
                  <div className='my-3'>
                    <Label for='title'>Title</Label>
                    <Input type='text' id='title' 
                      placeholder='Enter here'
                      name='title'
                      value={filmDetails.title}
                      onChange={fieldChanged}/>
                  </div>
                  <div className='my-3'>
                    <Label for='year'>Year</Label>
                    <Input type='number' id='year' 
                    placeholder='Enter here'
                    name='year'
                    value={filmDetails.year}
                    onChange={fieldChanged}/>
                  </div>
                  <div className='my-3'>
                    <Label for='runtime'>Runtime (Example: 1h 03m)</Label>
                    <Input type='text' id='runtime' 
                    placeholder='Enter here'
                    name='runtime'
                    value={filmDetails.runtime}
                    onChange={fieldChanged}/>
                  </div>
                  <div className='my-3'>
                    <Label for='category'>Genre</Label>
                    <Input type='text' id='category'
                      disabled={true} 
                      placeholder='Enter here'
                      name='categoryId'
                      value={filmDetails.category?.categoryTitle}
                    >
                    </Input>
                  </div>
                  {/* <div className='my-3'>
                    <Label for='category'>Genre</Label>
                    <Input type='select' id='category' 
                      placeholder='Enter here'
                      name='categoryId'
                      value={filmDetails.categoryId}
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
                  </div> */}

                  <div className="my-3">
                    <Label htmlFor='image'>Upload Film Poster</Label>
                    <Input 
                      disabled={true}
                      id='image' 
                      name='image' 
                      type='text'
                      value={filmDetails.thumbnailSrc}
                      // onChange={handleFileChange}
                    >

                    </Input>

                  </div>
                  {/* <div className="my-3">
                    <Label htmlFor='image'>Upload Film Poster</Label>
                    <Input 
                      id='image' 
                      name='image' 
                      type='file'
                      onChange={handleFileChange}>

                    </Input>

                  </div> */}

                  <div className='my-3'>
                    <Label for='summary'>Summary</Label>
                    <Input type='textarea' id='summary' 
                    placeholder='Enter here'
                    name='summary'
                    value={filmDetails.summary}
                    onChange={fieldChanged}/>
                  </div>
                  <div className='my-3'>
                    <Label for='trailerLink'>Trailer Link</Label>
                    <Input type='text' id='trailerLink' 
                    placeholder='Enter here'
                    name='trailerLink'
                    value={filmDetails.trailerLink}
                    onChange={fieldChanged}/>
                  </div>
                  <div className='my-3'>
                    <Label for='producer'>Producers (Example: A,B)</Label>
                    <Input type='text' id='producer' 
                    placeholder='Enter here'
                    name='producer'
                    value={filmDetails.producer}
                    onChange={arrayChanged}/>
                  </div>
                  <div className='my-3'>
                    <Label for='director'>Director</Label>
                    <Input type='text' id='director' 
                    placeholder='Enter here'
                    name='director'
                    value={filmDetails.director}
                    onChange={fieldChanged}/>
                  </div>
                  <div className='my-3'>
                    <Label for='cameraman'>Cameraman</Label>
                    <Input type='text' id='cameraman' 
                    placeholder='Enter here'
                    name='cameraman'
                    value={filmDetails.cameraman}
                    onChange={fieldChanged}/>
                  </div>
                  <div className='my-3'>
                    <Label for='cast'>Cast</Label>
                    <Input type='text' id='cast' 
                    placeholder='Enter here'
                    name='cast'
                    value={filmDetails.cast}
                    onChange={arrayChanged}/>
                  </div>
                  <div className='my-3'>
                    <Label for='rating'>Rating</Label>
                    <Input type='text' id='rating' 
                    placeholder='Enter here'
                    name='rating'
                    value={filmDetails.rating}
                    onChange={fieldChanged}/>
                  </div>

                  <Container>
                    <Button style={{marginLeft: '-15px'}} type='submit' color='primary'>Update</Button>
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

export default UpdateFilm