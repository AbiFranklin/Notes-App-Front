import React from 'react';
import { Grommet, 
        Box, 
        Button, 
        Select, 
        Form, 
        FormField, 
        DropButton, 
        TextArea, 
        TextInput } from 'grommet';
import { Card, CardHeader } from '@material-ui/core'

function Board(props) {
 console.log(props.users)

 let userName = (id) => {
   for(let i=0; i < props.users.length; i++) {
     if (props.users[i].id === id) {
       return props.users[i].username
     }
   }
 }

 let titles = () => {
   return (
   props.posts.map(post => {return (
   <Box border={{ color: 'accent-3', size: 'medium' }} margin="medium" pad="medium" round={true} background={{"color": "light-1", "opacity": "strong"}} className="card">
    <h3>{post.title}</h3>
    <p>{userName(post.user_id)}</p>
    {post.text}
    </Box>)})
   )
 }

  return (
      <Box
        direction="row" 
        round={true}
        background={{"color": "light-1", "opacity": "medium"}}
        border={{ color: 'accent-3', size: 'medium' }}
        pad="medium"
        margin="small"> 
        {titles()}
    </Box>
  );
}
export default Board;




