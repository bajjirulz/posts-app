// src/User.js
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Spinner } from './Spinner';

const User = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);

  const [posts, setPosts] = useState([]);
  

  const [enableSpinner, setEnableSpinner] = useState(false);


useEffect(() => {
  setEnableSpinner(true)

    // Fetch posts
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {setPosts(data);   setEnableSpinner(false)
      })


      .catch((error) => console.error('Error fetching posts:', error));
      // Fetch users
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((data) => setUsers(data))
    .catch((error) => console.error('Error fetching users:', error));

  }, []);

  const currentPosts = posts.filter(d=>d.userId==id)

  const user = users.find(d=>d.id==id)

  return (
  <>
    {
      enableSpinner ? (<Spinner/>) : (
  <div className='container'>
               <div className='mx-auto p-2'>
        <div className="card" >
          <div className="card-body">
          <div className="container">
  <div className="row mx-auto p-2">
    <div className="col">
    <p className='h5'>Name : {user?.name}</p>
    </div>
    <div className="col">
    <p className='h5'>Email : {user?.email}</p>
    </div>
  
    <div className="col">
    <p className='h5'>Username : {user?.username}</p>
    </div>
    </div>
    </div>
                
    <ul className='list-items mx-auto p-2'>
{currentPosts.map((post) => {
          // Find the user with matching ID
          return (
            <li key={post.id}>
               
               <div className='mx-auto p-2'>
        <div className="card" >
          <div className="card-body">

               <div className="list-group-item list-group-item-action mx-auto p-2" aria-current="true">
                      <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{post.title}</h5>

                      </div>

                      <p className="mb-1 lead">{post.body}</p>

              
              </div>
              </div></div>
              </div>

            </li>
          );
        })}
      </ul>

      </div>
      </div>
      </div>
      </div>)
}
  </>
  );
};

export default User;