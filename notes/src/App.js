import React, {useState, useEffect} from 'react';
import './App.css';
import Display from './Components/Display'
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
      <DropButton
          label='New Message'
          open={open}
          onClick={() => setOpen(true)}
          dropContent={
            <Box align="center" background="neutral-3" pad="medium" direction="column" className="headerbar">
              <Button label="X" icon="Close"
                  onClick={() => setOpen(false)}
                  color="status-critical"
                  className="closeButton"
                />
              <TextInput placeholder="Title" className="title"/>
              <TextArea placeholder="Message" />
              <div className="author">
                <div>
              Signed,
              <Select
              options={users}
              value={currentUser}
              onChange={({ option }) => setCurrentUser(option)}
              /></div>
              <Form onSubmit={({ value }) => addUser(value.name)} className="userform">
                <FormField name="name" placeholder="New User" className="userinput" />
                <Button margin="small" type="submit" primary label="Add New User" />
              </Form>
              </div>
              <Button label="Submit Message"
                />
            </Box>
          }
        />

      
    </Grommet>
  );
}
export default App;




