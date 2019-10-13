import React from 'react';
import { Box} from 'grommet';
import Masonry from 'react-masonry-css'

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
    <Box
    direction="row" 
    round={true}
    background={{"color": "light-1", "opacity": "medium"}}
    border={{ color: 'accent-3', size: 'medium' }}
    pad="medium"
    margin="small"> 
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
        margin="small"
        justofy="center"> 
          <Masonry
          breakpointCols={{default: 5, 1200: 4, 1000: 3, 800: 2, 600: 1}}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
            {titles()}
          </Masonry>
      </Box>
  );
}
export default Board;




