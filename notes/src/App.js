import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import Board from './Components/Board'
import AddNote from './Components/AddNote'
import { Grommet, Box, Button, Select, Form, FormField, DropButton, TextArea, TextInput } from 'grommet'
import axios from 'axios'




function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true)


  useEffect(async () => {
    await axios.get('https://notesappschmidts.herokuapp.com/users')
      .then(result => {
        result.data.forEach(user => users.push(user))
        setCurrentUser(users[0].username)

      })
      .catch(err => console.log(err))
      await axios.get('https://notesappschmidts.herokuapp.com/posts')
      .then(result => {
        result.data.forEach(post => posts.push(post))
        posts.reverse()
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, []);


  let usernames = []
  users.forEach(user => {usernames.push(user.username)})
  

  let addUser = (user) => {
    axios.post('https://notesappschmidts.herokuapp.com/createUser', {username:user})
    .then(setCurrentUser(user))
    .then(usernames.push(user))
    .catch(err => {
      console.log(err)
    })
  }
  
  let addPost = async (post) => {
    await axios.post('https://notesappschmidts.herokuapp.com/createPost', {title: post.title, text: post.text, user_id: 1})
    .then(posts.unshift(post))
    .then(setOpen(false))
    .catch(err => {
      console.log(err)})
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
    className="loading"
    justify= "center">
    Loading...
    </Box>
   )} else { 
  return (
    <Grommet>
      <div className="back"></div>
      <AddNote 
        users={usernames} 
        addUser={addUser} 
        currentUser={currentUser} 
        setCurrentUser={setCurrentUser}
        open={open}
        setOpen={setOpen}
        addPost={addPost} />
      <Board
       posts={posts}
       users={users} />
    </Grommet>
  )}
}
export default App;




