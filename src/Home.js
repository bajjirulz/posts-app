// Posts.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddPost from './AddPost';


const Home = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [handleValue, sethandleReceive] = useState([]);


  const [selectedUser, setSelectedUser] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filteredPosts2, setFilteredPosts2] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; 

  const handleValueReceive = (value) => {
    sethandleReceive(value);
    };

    // useEffect(() => {} , [])

  useEffect(() => {
    // Fetch posts
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        var postdata = data;
        if(handleValue){
          postdata.push(handleValue);
        }
        console.log(postdata);
        setPosts(postdata);
        
      })
      .catch((error) => console.error('Error fetching posts:', error));

    // Fetch users
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, [ handleValue]);
  // Get current posts

  useEffect(() => {
    setCurrentPage(1);

  }, [selectedUser]);



  useEffect(() => {

    const filteredPosts = posts.filter((post) => {
      return (
        
        (!selectedUser || post.userId.toString() === selectedUser) &&
        (!searchText ||
          post.title.toLowerCase().includes(searchText.toLowerCase()) 
        //   ||
        //   post.body.toLowerCase().includes(searchText.toLowerCase())
          
          )

      );
    });

    setFilteredPosts2(filteredPosts);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    console.log(filteredPosts,currentPosts)

    setFilteredPosts(currentPosts);
  }, [posts, currentPage, selectedUser, searchText]);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
    console.log(selectedUser);
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };


  
  return (
    <div>

<div>

  <AddPost  onValueReceive={handleValueReceive}  />
        <h2>User Filter</h2>
      <select value={selectedUser} onChange={handleUserChange}>
        <option value="">All Users</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={searchText}
        onChange={handleSearchTextChange}
        placeholder="Search Posts"
      />
    </div>
    
          <h2>Posts</h2>



      <ul>
       

{filteredPosts.map((post) => {
          // Find the user with matching ID
          const user = users.find((user) => user.id === post.userId);
          return (

            <li key={post.id}>
              <h3><Link to={`post/${post?.id}`} variant="link"> {post.title}</Link></h3>
              <p>{post.body}</p>
              <Link to={`user/${user?.id}`}>{user && <p>Posted by: {user.name}</p>}</Link>

            </li>
          );
        })}
      </ul>

      {/* Pagination */}
      <div>
        {Array.from({ length: Math.ceil(filteredPosts2.length / postsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;