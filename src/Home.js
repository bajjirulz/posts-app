// Posts.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddPost from './AddPost';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { Spinner } from './Spinner';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [handleValue, sethandleReceive] = useState(null);


  const [selectedUser, setSelectedUser] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filteredPosts2, setFilteredPosts2] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const handleValueReceive = (value) => {
    sethandleReceive(value);
  };

  
  

  const [enableSpinner, setEnableSpinner] = useState(false);


  // useEffect(() => {} , [])

  useEffect(() => {
    // Fetch posts
    setEnableSpinner(true)
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        var postdata = data;
        if (handleValue) {
          postdata.push(handleValue);
        }
        console.log(postdata);
        setPosts(postdata);
          setEnableSpinner(false)
      })
      .catch((error) => console.error('Error fetching posts:', error));

    // Fetch users
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, [handleValue]);
  // Get current posts

  useEffect(() => {
    setCurrentPage(1);

  }, [selectedUser]);



  useEffect(() => {
console.log(posts);
    const filteredPosts = posts?.filter((post) => {
      return (
       
        (!selectedUser || post?.userId.toString() === selectedUser) &&
        (!searchText ||
          post?.title.toLowerCase().includes(searchText.toLowerCase())
          //   ||
          //   post.body.toLowerCase().includes(searchText.toLowerCase())

        )

      );
    });
    setFilteredPosts2(filteredPosts);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);


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
    <>
    {
      enableSpinner ? (<Spinner/>) : (
        <div className='container mx-auto p-2'>


        <div className='mx-auto p-2'>
  
        <div className="card">
              <div className="card-body">
          <div className="row">
          
                <p className='h5'>User Filter</p>
  
                <div className="col">
                  <select className="form-control" value={selectedUser} onChange={handleUserChange}>
                    <option value="">All Users</option>
                    {users.map((user) => (
                      <option key={user?.id} value={user?.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    value={searchText}
                    onChange={handleSearchTextChange}
                    placeholder="Search Posts"
                  />
                </div>
              </div>
            </div>
  
          </div>
  
  
  
        </div>
  
        <div className='mx-auto p-2'>
          <div className="card" >
            <div className="card-body">
               <AddPost  onValueReceive={handleValueReceive} />
  
               <p className='h5'>Posts</p>
  
               <ul className='list-group list-unstyled'>
  
                {filteredPosts?.map((post) => {
                  // Find the user with matching ID
                  const user = users.find((user) => user?.id === post?.userId);
                  return (
  
                    <li key={post.id}>
                      <div className="list-group-item list-group-item-action" aria-current="true">
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1"><Link to={`post/${post?.id}`} variant="link"> {post.title}</Link></h5>
                          <small>3 days ago</small>
                        </div>
                        <p className="mb-1 lead">{post.body}</p>
                        <small><Link to={`user/${user?.id}`}>{user && <p>Posted by: {user.name}</p>}</Link></small>
                      </div>
  
  
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
  
  
  
        {/* Pagination */}
        <div className="d-flex justify-content-center mx-auto p-2">
          {Array.from({ length: Math.ceil(filteredPosts2?.length / postsPerPage) }).map((_, index) => (
            <div key={index}>
              <ButtonToolbar key={index} aria-label="Toolbar with button groups">
                <ButtonGroup className="me-2" aria-label="First group">
                  <Button  onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </Button>
                </ButtonGroup>
              </ButtonToolbar>
            </div>
  
  
          ))}
        </div>
  
  
  
      </div>
      )
    }


   
    </>
  );
};

export default Home;