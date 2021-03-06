import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import CreateIcon from '@mui/icons-material/Create';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import RefreshIcon from '@mui/icons-material/Refresh';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useHistory } from 'react-router-dom';
import { Dialog, Popover } from '@mui/material';
import Logout from '../logout/Logout';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  [theme.breakpoints.down('md')]: {
    position:'fixed',
    zIndex:'100',
  },
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const ProfileImg = styled('div')(({theme})=>({
  height:'40px',
  width:'40px',
  borderRadius: '50px',
  backgroundColor: 'darkgreen',
  textAlign: 'center',
  margin: '8px 0',
  cursor:'pointer'
}))

export default function DashBoardHeader(props) {
  
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const onSearch = (e) => {
    var filteredData = props.backup.filter((note) => (note.description.includes(e.target.value) || note.title.includes(e.target.value)));
    props.setDataArray(filteredData);
  }

  const drawerToggle = () => {
    setOpen(!open);
  };

  const clearSearch = () => {
    var elem = document.querySelector('#search')
    elem.value= "";
    props.setDataArray(props.backup);
  }

  const handleRouting = (key) => {
    switch(key){
      case "Notes" : history.push('/dashboard'); break;
      case"Remainder": break;
      case "Edit labels": break;
      case "Archive": history.push('/dashboard/archive'); break;
      case "Trash": history.push('/dashboard/trash'); break;
    }
  }

   
  const [rootEl, setrootEl] = React.useState(null);

  const handleClickOne = (event) => {
      setrootEl(event.currentTarget);
  };
  const handleCloseOne = () => {
      setrootEl(null);
  };

  const openMore = Boolean(rootEl);
  const id1 = openMore ? 'simple-popover' : undefined;

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={drawerToggle}
            edge="start"
            sx={{
              marginRight: '36px',
            }}
          >
            <MenuIcon />
          </IconButton>
          <img src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"/>
          <Typography variant="h6" noWrap component="div" sx={{padding:'0 20px'}}>
            Keep
          </Typography>
          <OutlinedInput
            id="search"
            placeholder="Search"
            name="search"
            startAdornment={<InputAdornment position="start"><IconButton sx={{color:'rgb(26, 26, 26)'}}><SearchIcon/></IconButton></InputAdornment>}
            endAdornment={<InputAdornment position="end" sx={{color:'rgb(26, 26, 26)'}}><ClearIcon onClick={clearSearch} sx={{cursor:'pointer'}}/></InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            onChange={(e)=>onSearch(e)}
            inputProps={{
              'aria-label': 'weight',
            }}
            sx={{width:'40%', backgroundColor:'rgb(239, 239, 239)', color:'rgb(26, 26, 26)', margin:'5px 10px', borderRadius:'8px', }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <IconButton size="large"  ><RefreshIcon/></IconButton>
          <IconButton onClick={props.onThemeChange}><Brightness4Icon/></IconButton>
          <IconButton size="large" ><ViewStreamIcon/></IconButton>
          <IconButton size="large" ><SettingsIcon/></IconButton>
          <Box sx={{width:'2%'}}/>
          <IconButton size="large" ><AppsIcon/></IconButton>
          <ProfileImg onClick={handleClickOne}>
            <Typography sx={{fontSize:'20px', paddingTop:'5px'}}>{localStorage.getItem('firstName').charAt(0)}</Typography>
          </ProfileImg>
          <Popover 
                id={id1}
                open={openMore}
                anchorEl={rootEl}
                onClose={handleCloseOne}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
            >
              <Logout/>
            </Popover>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
        </DrawerHeader>
        <List >
        {['Notes', 'Remainder', 'Edit labels', 'Archive', 'Trash'].map((text, index) => (
            <ListItem button key={text} onClick={()=> handleRouting(text)}>
              <ListItemIcon >
                {index === 0 ? <LightbulbIcon /> : ""}
                {index === 1 ? <NotificationsIcon /> : ""}
                {index === 2 ? <CreateIcon /> : ""}
                {index === 3 ? <InboxIcon /> : ""}
                {index === 4 ? <DeleteIcon /> : ""}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      </div>
  );
}