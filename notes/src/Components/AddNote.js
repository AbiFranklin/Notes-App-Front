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
                <TextInput placeholder="Title" className="title"/>
                <TextArea placeholder="Message" className="message"/>
                <div className="author">
                    <div>
                        <h3>Signed, </h3>
                        <Select
                          options={props.users}
                          value={props.currentUser}
                          onChange={({ option }) => props.setCurrentUser(option)}/>
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
                      primary 
                      label="Add User" />
                    </Form>
                </div>
                <Button 
                  label="Submit Message" 
                  className="submitButton"/>
            </Box>
        }/>
    </Grommet>
  );
}
export default AddNote;




