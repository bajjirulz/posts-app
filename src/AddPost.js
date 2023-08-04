import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from './AuthContext';


const AddPost = ({onValueReceive}) => {

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

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

    const newPost = {
        
      title,
      body,
      userId:user.loggedUser.id , // Set the user ID as required by the JSONPlaceholder API
    };

    console.log(newPost);
 
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
      console.log('New post added:', response.data);
      setShow(false)
    //   onValueReceive(response.data);
      // Optionally, you can redirect or show a success message here
    } catch (error) {
      console.error('Error adding new post:', error);
      // Handle error, show an error message, etc.
    }
  };

  return (
    <>

    {
         user ? (<Button variant="primary" onClick={handleShow}>
        Add Post      </Button>)  : (<h1>You need to login to post</h1>)

    }
    

    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Modal heading</Modal.Title>
    </Modal.Header>
    <Modal.Body>

    <div>
      <h2>Add New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label>Body:</label>
          <textarea value={body} onChange={handleBodyChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>

    </Modal.Body>
  </Modal>



   
  </>

  );
};

export default AddPost;


