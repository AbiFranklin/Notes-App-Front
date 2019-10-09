import React, {useState, useEffect} from 'react';
import './App.css';
import Board from './Components/Board'
import AddNote from './Components/AddNote'
import { Grommet, Box, Button, Select, Form, FormField, DropButton, TextArea, TextInput } from 'grommet'
import axios from 'axios'




function App() {
  const [users, setUsers] = useState({ users: [] });
  const [currentUser, setCurrentUser] = useState('');
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState({ posts: [] });
  const [loading, setLoading] = useState(true)
  
  let userArray = []
  let postArray = []

  useEffect(async () => {
    await axios.get('https://notesappschmidts.herokuapp.com/users')
      .then(result => {
        result.data.forEach(user => {userArray.push([user.username, user.id])});
        setUsers(userArray);
        setCurrentUser(userArray[0])
      })
      .catch(err => console.log(err))
    // const postcall = await axios(
    //   'https://notesappschmidts.herokuapp.com/posts',
    // );
    // postcall.data.forEach(post => {userArray.push([post.title, post.text, post.user_id])})
    // setPosts(postArray);

  }, []);


  let usernames = []
  userArray.forEach(user => {usernames.push(user[0])})
  

  let addUser = (user) => {
    axios.post('https://notesappschmidts.herokuapp.com/createUser', {username:user})
    .then(setCurrentUser(user))
    .catch(err => {
      console.log(err)
    })
  }
  
  let addPost = (post) => {
    axios.post('https://notesappschmidts.herokuapp.com/createPost', {title: post.title, text: post.text, user_id: 1})
    .then(post => { 
      setPosts(posts => [...posts, [post.title, post.text, currentUser]])},
      console.log(posts))
    .catch(err => {
      console.log(err)
    })
  }

  if (loading) {
   return (
    <Box
    direction="row"
    border={{ color: 'brand', size: 'large' }}
    pad="medium"
    animation="pulse"
    round={true}
    elevation="xlarge"
    className="loading">
    Loading...
    </Box>
   )} else { 
  return (
    <Grommet>
      <AddNote 
        users={usernames} 
        addUser={addUser} 
        currentUser={currentUser} 
        setCurrentUser={setCurrentUser}
        open={open}
        setOpen={setOpen}
        addPost={addPost} />
      <Board />
    </Grommet>
  )}
}
export default App;




