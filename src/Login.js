import React, { useState,useEffect} from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [reset, setReset] = useState("");


  // const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
  
if(username !=="" && password !==""){

  var loggedUser = users.find(d => d.id == username)
  console.log(users,username);
      if (loggedUser) {
          const userData = { loggedUser, name: '' };
      login(userData);
      console.log(userData)
      navigate(`/`);
  
      }
}
else{
  setReset(<div className="alert alert-danger mx-auto pb-3">Please enter valid login id and password</div>);
}

  };



  useEffect(() => {

    // Fetch users
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className='d-flex justify-content-center align-items-center flex-wrap'>
    <div className="card text-bg-light mx-auto mt-5" style={{"maxwidth": "25rem"}}>
  <div className="card-header text-center"><h5>Login</h5></div>
  <div className="card-body">
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" className='form-control' id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" className='form-control' id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <br/>
        <span >{reset}</span>
        <div className="d-grid gap-2">
        <button type="submit">Log In</button>
        </div>
      </form>
  </div>
</div>
</div>
    
  );
};

export default Login;