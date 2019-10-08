import React, {useState, useEffect} from 'react';
import './App.css';
import Display from './Components/Display'
import AddNote from './Components/AddNote'
import { Grommet, Box, Button, Select, Form, FormField, DropButton, TextArea, TextInput } from 'grommet'
import axios from 'axios'




function App() {
  const [users, setUsers] = useState({ users: [] });
  const [currentUser, setCurrentUser] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(async () => {
    const result = await axios(
      'https://notesappschmidts.herokuapp.com/users',
    );
    const userArray = [];
    console.log(userArray)
    result.data.forEach(user => {userArray.push(user.username)})
    setUsers(userArray);
    setCurrentUser(userArray[0])
  }, []);

  let addUser = (user) => {
    axios.post('https://notesappschmidts.herokuapp.com/createUser', {username:user})
    .then(setCurrentUser(user))
    .catch(err => {
      console.log(err)
    })
  }


  return (
    <Grommet>
      <AddNote 
        users={users} 
        addUser={addUser} 
        currentUser={currentUser} 
        setCurrentUser={setCurrentUser}
        open={open}
        setOpen={setOpen} />
        <Box
  direction="row" round={true}
  border={{ color: 'accent-3', size: 'medium' }}
  pad="medium"
  margin="small"
>
  <Box pad="small" background="dark-3" />
  <Box pad="medium" background="light-3" />
</Box>

      
    </Grommet>
  );
}
export default App;




