import React from 'react';
import { Grommet, 
        Box, 
        Button, 
        Select, 
        Form, 
        FormField, 
        DropButton, 
        TextArea, 
        TextInput } from 'grommet'


function AddNote(props) {


  return (
    <Grommet>
        <DropButton
        label='New Message'
        open={props.open}
        className="newMessage"
        onClick={() => props.setOpen(true)}
        dropContent={
            <Box 
            elevation="xlarge" 
            align="center" 
            background="neutral-3" 
            pad="medium" 
            className="headerbar">
                <Button 
                label="X" 
                icon="Close"
                onClick={() => props.setOpen(false)}
                color="status-critical"
                className="closeButton"/>
                <TextInput placeholder="Title" className="title" id="title" />
                <TextArea placeholder="Message" className="message" id="text" />
                <div className="author">
                    <div>
                        <h3>Signed, </h3>
                        <div className='authselect'>
                        <Select
                          options={props.users}
                          value={props.currentUser}
                          onChange={({ option }) => props.setCurrentUser(option)}/>
                        <Button 
                        label="Delete User"
                        className="deluserbutton"
                        color="status-critical"
                        onClick={() => {props.deleteUser(props.findId(props.currentUser))}}/>
                        </div>
                    </div>
                    <p> or... </p>
                    <Form 
                      onSubmit={({ value }) => props.addUser(value.name)} 
                      className="userform">
                    <FormField 
                      name="name" 
                      placeholder="New User" 
                      className="userinput" />
                    <Button 
                      margin="small" 
                      type="submit" 
                      label="Add User" />
                    </Form>
                </div>
                <Button 
                  label="Submit Message" 
                  className="submitButton"
                  primary
                  onClick={() => {props.addPost({
                    title: document.getElementById("title").value, 
                    text: document.getElementById("text").value, 
                    user_id: props.findId(props.currentUser)})}}/>
            </Box>
        }/>
    </Grommet>
  );
}
export default AddNote;




