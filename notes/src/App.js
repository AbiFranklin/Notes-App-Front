import React, {useState, useEffect} from 'react';
import './App.css';
import Display from './Components/Display'
import { Grommet, Box, Button, Select, Form, FormField, DropButton, Heading, Text } from 'grommet'
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
    result.data.forEach(user => {userArray.push(user.username)})
    setUsers(userArray);
    setCurrentUser(userArray[0])
  }, []);

  let addUser = (user) => {
    axios.post('https://notesappschmidts.herokuapp.com/createUser', {username:user})
    .then(setCurrentUser(user))
  }


  return (
    <Grommet>
      <DropButton
          label='Choose'
          open={open}
          onClick={() => setOpen(true)}
          dropContent={
            <Box align="center" background="neutral-3" pad="medium" direction="row" className="headerbar">
              <Select
              options={users}
              value={currentUser}
              onChange={({ option }) => setCurrentUser(option)}
              />

              <Form onSubmit={({ value }) => addUser(value.name)} className="userform">
                <FormField name="name" placeholder="New User" className="userinput" />
                <Button type="submit" primary label="Submit" />
              </Form>
                <Button
                  onClick={() => setOpen(false)}
                >Close</Button>
            </Box>
          }
        />

      
    </Grommet>
  );
}
export default App;




