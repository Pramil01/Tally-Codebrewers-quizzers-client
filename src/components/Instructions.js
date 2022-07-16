import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Admin_panel = () => {
  return (
    
    <><Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >

          </IconButton>
          <Typography align="center" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Instructions
          </Typography>

        </Toolbar>
      </AppBar>
    </Box>
      <List sx={{ bgcolor: 'white' }}>
        <ListItem>
          <ListItemText align="center" primary="lorem ipsum dolor sit amet"/>
        </ListItem>
        <ListItem>
          <ListItemText align="center" primary="lorem ipsum dolor sit amet"/>
        </ListItem>
        <ListItem>
          <ListItemText align="center" primary="lorem ipsum dolor sit amet"/>
        </ListItem>
        <ListItem>
          <ListItemText align="center" primary="lorem ipsum dolor sit amet"/>
        </ListItem>
        <ListItem>
          <ListItemText align="center" primary="lorem ipsum dolor sit amet"/>
        </ListItem>
        <ListItem>
          <ListItemText align="center" primary="lorem ipsum dolor sit amet"/>
        </ListItem>
        <ListItem>
          <ListItemText align="center" primary="lorem ipsum dolor sit amet"/>
        </ListItem>
        <ListItem>
          <ListItemText align="center" primary="lorem ipsum dolor sit amet"/>
        </ListItem>
        <ListItem>
          <ListItemText align="center" primary="lorem ipsum dolor sit amet"/>
        </ListItem>
        <ListItem>
          <ListItemText align="center" primary="lorem ipsum dolor sit amet"/>
        </ListItem>
        <ListItem>
          <ListItemText align="center" primary="lorem ipsum dolor sit amet"/>
        </ListItem>
      </List>

        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="I agree to the above terms." />
        </FormGroup>

        <Box
          m={1}
          display="flex"
          justifyContent="center"
          alignItems="flex-end">
          <Button variant="outlined" color="primary" sx={{ height: 40 }}>
            Start Quiz
          </Button>
        </Box>


      </>
  )
}

export default Admin_panel;