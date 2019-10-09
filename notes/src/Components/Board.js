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
      <Box
        direction="row" 
        round={true}
        border={{ color: 'accent-3', size: 'medium' }}
        pad="medium"
        margin="small">
      </Box>
    </Grommet>
  );
}
export default AddNote;




