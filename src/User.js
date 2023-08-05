// src/User.js
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


const User = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);

  const [posts, setPosts] = useState([]);

useEffect(() => {
    // Fetch posts
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
      // Fetch users
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((data) => setUsers(data))
    .catch((error) => console.error('Error fetching users:', error));

  }, []);

  const currentPosts = posts.filter(d=>d.userId==id)

  const user = users.find(d=>d.id==id)
  console.log(currentPosts);

  return (
  <>
  <div className='container'>
               <div className='mx-auto p-2'>
        <div class="card" >
          <div class="card-body">
          <div class="container">
  <div class="row mx-auto p-2">
    <div class="col">
    <p className='h5'>Name : {user?.name}</p>
    </div>
    <div class="col">
    <p className='h5'>Email : {user?.email}</p>
    </div>
  
    <div class="col">
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
        <div class="card" >
          <div class="card-body">

               <div class="list-group-item list-group-item-action mx-auto p-2" aria-current="true">
                      <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">{post.title}</h5>

                      </div>

                      <p class="mb-1 lead">{post.body}</p>

              
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
      </div>
  </>
  );
};

export default User;