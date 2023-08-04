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

  const handleClose = () => {
    const corval=comments2.length+1;
    var currentCommentsval = comments2;
    currentCommentsval.push({postId: parseInt(id),body: searchText,id:corval, name:"",title: 'Hello', email:user.loggedUser.email});
    setShow(false)
    setComments2(currentCommentsval)
  }

  

  return (<>
                <ul>
    


{currentPosts.map((post) => {
          // Find the user with matching ID
          return (
            <li key={post.postId}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              
              <Button variant="primary" onClick={handleShow}>
Add Comment      </Button>
            </li>
          );
        })}
      </ul>

      <ul>
    

<h1>Comments</h1>
    {comments2.map((post) => {
              // Find the user with matching ID
              return (
                <li key={post.name}>
                  <h3>{post.email}</h3>
                  <p>{post.body}</p>
    
                </li>
              );
            })}
          </ul>

          <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>

            <div>

                <textarea type="text"
        value={searchText}
        onChange={handleSearchTextChange}>

                </textarea>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add Comment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>


  </>);
};

export default Post;