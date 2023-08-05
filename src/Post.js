// src/User.js
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import userEvent from '@testing-library/user-event';
import { useAuth } from './AuthContext';

  const Post = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [searchText, setSearchText] = useState('');

//   const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [comments2, setComments2] = useState([]);
  const [reset, setReset] = useState("");



useEffect(() => {
    // Fetch posts
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));

      fetch('https://jsonplaceholder.typicode.com/comments')
      .then((response) => response.json())
      .then((data) => {setComments(data)
        
        var currentComments = data.filter(d=>d.postId==id)
        console.log(currentComments)
        setComments2(currentComments);
      })
      .catch((error) => console.error('Error fetching posts:', error))

  }, []);

  const currentPosts = posts.filter(d=>d.id==id)

  const handleSearchTextChange = (event) => {
    
    setSearchText(event.target.value);
  };

  const handleClose = (e) => {
    if(searchText !==""){
      const corval=comments2.length+1;
    var currentCommentsval = comments2;
    currentCommentsval.push({postId: parseInt(id),body: searchText,id:corval, name:"",title: 'Hello', email:user.loggedUser.email});
    setShow(false)
    setComments2(currentCommentsval)
    }
    else{
      setReset("Please enter a comment")
    }
    
    
  }

  const minClose =  () => {
    
    setShow(false)
    setSearchText("");
  }


  return (
  <>
  <div className='container'>
               <div className='mx-auto p-2'>
        <div class="card" >
          <div class="card-body">
          <ul className='list-items'>
    


    {currentPosts.map((post) => {
              // Find the user with matching ID
              return (
                <li key={post.id}>
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                  
                 
                  {
         user ? ( <div class="clearfix">
         <Button variant="primary" className="float-end" onClick={handleShow}>
         Add Comment      </Button> </div>)  : (
        <div class="alert alert-danger" role="alert">
        You need to login to comment
      </div>
        )

    }
                </li>
              );
            })}
          </ul>
          </div>
             
</div>
</div>

<div className='mx-auto p-2'>

      <div class="card" >
          <div class="card-body">
          <p className='h5'>Comments</p>

<ul className='list-group list-unstyled'>
    {comments2.reverse().map((post) => {
              // Find the user with matching ID
              return (
                <li key={post.id}>
                  <figure className='list-group-item list-group-item-action'>
  <blockquote class="blockquote">
    <p>{post.body}</p>
  </blockquote>
  <figcaption class="blockquote-footer">
    Comment by <cite title="Source Title">{post.email}</cite>
  </figcaption>
</figure>
                 
    
                </li>
              );
            })}
          </ul>
</div>




       
</div>
</div>  
</div>


   <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      

      <Modal show={show} onHide={minClose}>
        <Modal.Header closeButton>
          <Modal.Title><p className='h5'>Add Comment</p></Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <div>

                <textarea  className="form-control" type="text"
        value={searchText}
        onChange={handleSearchTextChange} >

                </textarea>
                <span> { reset}</span>
            </div>
        </Modal.Body>
        <Modal.Footer>
        <div class="d-grid gap-2 mx-auto pt-4">

          <Button variant="primary" onClick={handleClose}>
            Add Comment
          </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default Post;