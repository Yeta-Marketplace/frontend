
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link as RouterLink } from 'react-router-dom';


type Props = {
  signedIn: boolean,
}

function ResponsiveAppBar({ signedIn }: Props) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const theme = useTheme();

  const pages = ['Yard Sales', 'About']; //'🛠 Buy 🛠', '🛠 Sell 🛠'];
  const pagesLinks = ['/', '/about']; //'workinprogress', 'workinprogress'];
  const settings = ['Give Feedback!', 'Sign Out']; // '🛠Dashboard🛠',
  const settingsLinks = ['/feedback', '/signout']; // '/workinprogress', 

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // TODO: Fix some weird issue with AnchorEl -> when on yardsales, sign out, then sign in

  return (
    <AppBar position="static" >
      <Container maxWidth="xl" >
        <Toolbar disableGutters >

          {/* ================== MOBILE view ========================= */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={page} component={RouterLink} to={pagesLinks[index]} onClick={handleCloseNavMenu}>
                  {page}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h3"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: theme.palette.secondary.main,
            }}
          >
            YetA
          </Typography>


          {/* ================== DESKTOP view ========================= */}
          <Typography
            variant="h3"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 5,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: theme.palette.secondary.main,
            }}
          >
            YetA
          </Typography>


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'space-around' }}>
            {pages.map((page, index) => (
              // <Button
              //   key={page}
              //   onClick={handleCloseNavMenu}
              //   sx={{ my: 2, color: 'white', display: 'block', fontSize: 'large' }}
              // >
              //   <Link component={RouterLink} to={pagesLinks[index]} color='secondary'>{page}</Link>
              // </Button>
              <Button key={page} component={RouterLink} to={pagesLinks[index]} color='secondary' size='large'
                sx={{ fontSize: '1.6rem', fontWeight: 400, }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* ===================== AVATAR  ========================= */}

          <Box sx={{ flexGrow: 0 }}>
            {signedIn ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ backgroundColor: theme.palette.secondary.main }}> A </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting, index) => (
                    <MenuItem
                      key={setting}
                      component={RouterLink}
                      to={settingsLinks[index]}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Button component={RouterLink} to='/signin' color='secondary' size='large'
                sx={{ fontSize: '1.3rem', fontWeight: 400, color: 'white' }}
              >
                Sign In →
              </Button>
            )}
          </Box>


        </Toolbar>
      </Container>
    </AppBar >
  );
};

export default ResponsiveAppBar