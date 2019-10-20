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
  const [currentUserId, setCurrentUserId] = useState(0);

  let getPosts = (async() => {
    await axios.get('https://notesappschmidts.herokuapp.com/posts')
      .then(result => {
        result.data.forEach(post => posts.push(post))
        posts.reverse()
        setLoading(false)
      })
      .catch(err => console.log(err))
  })


  useEffect(async () => {
    await axios.get('https://notesappschmidts.herokuapp.com/users')
      .then(result => {
        result.data.forEach(user => users.push(user))
        setCurrentUser(users[0].username)
        setCurrentUserId(users[0].id)
      })
      .catch(err => console.log(err))
      getPosts()
  }, []);

  

  let usernames = []
  users.forEach(user => {usernames.push(user.username)})

  let findId = (name) => {
    let index = users.findIndex(x => x.username ===`${name}`);
    return users[index].id
  } 
  

  let addUser = (user) => {
    axios.post('https://notesappschmidts.herokuapp.com/createUser', {username:user})
    .then(setCurrentUser(user))
    .then(res => {setCurrentUserId(res.data.id)})
    .then(usernames.push(user))
    .catch(err => {
      console.log(err)
    })
  }
  
  let addPost = async (post) => {
    await axios.post('https://notesappschmidts.herokuapp.com/createPost', {title: post.title, text: post.text, user_id: post.user_id})
    .then(posts.unshift(post))
    .then(setOpen(false))
    .catch(err => {
      console.log(err)})
    // window.location.reload()
  }

  let deletePost = async (id) => {
    await axios.delete(`https://notesappschmidts.herokuapp.com/posts/${id}`)
    .then(posts => {console.log(posts)})
    .catch(err => {
      console.log(err)
    })
    window.location.reload()
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
        findId={findId}
        open={open}
        setOpen={setOpen}
        addPost={addPost} />
      <Board
       posts={posts}
       users={users}
       delPost = {deletePost} />
    </Grommet>
  )}
}
export default App;




