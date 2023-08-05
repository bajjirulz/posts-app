import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from './AuthContext';


const AddPost = ({onValueReceive}) => {

    const [show, setShow] = useState(false);

    

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [reset, setReset] = useState("");

  const handleShow = () =>{ setShow(true); 
    setTitle('');
    setBody('');
    setReset(false)};

  const handleTitleChange = (e) => {
    setTitle(e.target.value);

  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleClose = () => {    
    setShow(false)
  }



  const { user, logout } = useAuth();


  const handleSubmit = async (e) => {
    e.preventDefault();
if(title !== "" && body !== ""){
  const newPost = {
    title,
    body,
    userId:user.loggedUser.id , // Set the user ID as required by the JSONPlaceholder API
  };

  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
    setShow(false)
    onValueReceive(response.data);
    // Optionally, you can redirect or show a success message here
  } catch (error) {
    console.error('Error adding new post:', error);
    // Handle error, show an error message, etc.
  }
}
else {
  setReset(<div className="alert alert-danger mx-auto pb-3">Please fill title and body</div>)
}
   
  };

  return (
    <div className='container'>

    {
         user ? (<div className="clearfix">
          <Button variant="primary" className="float-end" onClick={handleShow}>
        Add Post      </Button></div>)  : (
        <div className="alert alert-danger" role="alert">
        You need to login to post
      </div>
        )

    }
    

    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title><p className='h5'>Add New Post</p></Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" className='form-control' value={title} placeholder='Post Title' onChange={handleTitleChange} />
        </div>
        <div className='pt-4'>
          <textarea value={body} className='form-control' placeholder='Post Body' onChange={handleBodyChange} />
        </div>
        <span className='alert alert-danger'>{reset}</span>
        <div className="d-grid gap-2 mx-auto pt-4">
        <button type="submit">Submit</button>
        </div>
      </form>
    </div>

    </Modal.Body>
  </Modal>



   
  </div>

  );
};

export default AddPost;


