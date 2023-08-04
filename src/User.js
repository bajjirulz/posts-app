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

  return (<>
                <ul>
        {/* {currentPosts.map((post) => (



          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))} */}

<h1>Id : {user?.id}</h1>
<h1>email : {user?.email}</h1>
<h1>name : {user?.name}</h1>
<h1>username : {user?.username}</h1>



{currentPosts.map((post) => {
          // Find the user with matching ID
          return (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>

            </li>
          );
        })}
      </ul>
  </>);
};

export default User;