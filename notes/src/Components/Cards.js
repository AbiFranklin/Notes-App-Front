import React from 'react';
import { Grommet, 
        Box, 
        Text } from 'grommet'


function Card(props) {

  return (
    <Grommet>
      <Box 
        maxWidth={236} 
        padding={2} column={12}>
        <Card>
          <Text 
            align="center" 
            bold 
            size="xl">
            <Box 
              paddingX={3} 
              paddingY={2}>
              Hi
            </Box>
          </Text>
        </Card>
      </Box> 
    </Grommet>
  );
}
export default Card;