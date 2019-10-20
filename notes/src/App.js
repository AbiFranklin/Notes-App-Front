import React, {useState, useEffect} from 'react';
import './App.css';
import Board from './Components/Board'
import AddNote from './Components/AddNote'
import { Grommet, Box } from 'grommet'
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


  useEffect(() => {
    axios.get('https://notesappschmidts.herokuapp.com/users')
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

  usernames.sort()

  let findId = (name) => {
    let index = users.findIndex(x => x.username ===`${name}`);
    return users[index].id
  } 
  
  let findPostId = (id) => {
    let index = posts.findIndex(x => x.id ===`${id}`);
    return index
  } 

  let addUser = (user) => {
    axios.post('https://notesappschmidts.herokuapp.com/createUser', {username:user})
    .then(setCurrentUser(user))
    .then(res => {setCurrentUserId(res.data.id)})
    .then(usernames.push(user))
    .catch(err => {
      console.log(err)
    })
    window.location.reload()
  }
  
  let addPost = async (post) => {
    await axios.post('https://notesappschmidts.herokuapp.com/createPost', {title: post.title, text: post.text, user_id: post.user_id})
    .then(posts.unshift(post))
    .then(setOpen(false))
    .catch(err => {
      console.log(err)})
  }

  let deletePost = async (id) => {
    await axios.delete(`https://notesappschmidts.herokuapp.com/posts/${id}`)
    .catch(err => {
      console.log(err)
    })
    window.location.reload()
  }

  let deleteUser = async (id) => {
    console.log(id)
    await axios.delete(`https://notesappschmidts.herokuapp.com/users/${id}`)
    .then(res => console.log(res.data))
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
        addPost={addPost}
        deleteUser={deleteUser} />
      <Board
       posts={posts}
       users={users}
       delPost = {deletePost} />
    </Grommet>
  )}
}
export default App;




