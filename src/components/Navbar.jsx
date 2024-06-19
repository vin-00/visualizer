import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import MenuItem from '@mui/material/MenuItem';

function Navbar({algo , setAlgo , setLearn}) {

  const handleChange = (event) => {
    if(event.target.value!=""){
      setLearn(false);
    }
    setAlgo(event.target.value);
    
  };

  return (
    <AppBar position="static" sx={{backgroundColor:"#eb3b3b"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ display:'flex' , alignItems:'center' , justifyContent:'center', gap:{sm:'0' , md:'40px'} ,flexWrap:'wrap'}}>
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'white',
              textDecoration: 'none',
            }}
          >
            VISUALIZE
          </Typography>

          <Box>
                <FormControl sx={{ m:3 }}>
                    <InputLabel id="algo" sx={{color:'white'}}>Visualize</InputLabel>
                    <Select
                    labelId="algo"
                    value={algo}
                    onChange={handleChange}
                    autoWidth
                    label="Algorithm"
                    sx={{color:'white'}}
                    >
                    <MenuItem value="None">
                        <em>None</em>
                    </MenuItem>
                    
                    <MenuItem value="NQueen">NQueen</MenuItem>
                    <MenuItem value="Sudoku">Sudoku</MenuItem>
                    <MenuItem value="Tower of Hanoi">Tower of Hanoi</MenuItem>
                    </Select>
                </FormControl>
          </Box>

          <Typography
            className='learnMore'
            variant="h6"
            noWrap 
            
            sx={{
              padding :'10px',
              cursor:'pointer',
              fontFamily:'monospace',
              color: 'black',
              opacity :'0.4',
              textDecoration: 'none',
            }}

            onClick={()=>{
              setAlgo("None");
              setLearn(true)
            }}
          >
            See info
          </Typography>

          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
