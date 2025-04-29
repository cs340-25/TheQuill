import { useNavigate, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Menu,
  Box,
  Button,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import UploadIcon from '@mui/icons-material/Upload';
import { useUser } from '../contexts/userContext'; // adjust path if needed


const DEFAULT_AVATAR = '/images/default-avatar.png';
const PRESET_AVATARS = [
  'dog.png',
  'panda.png',
  'rabbit.png',
  'panda-bear.png',
  'rabbit-2.png',
  'bear.png',
  'bird.png',
  'bee.png',
  'sheep.png'
];

function NavigationBar() {
  const [miniQuery, setMiniQuery] = useState('');
  const [avatarSrc, setAvatarSrc] = useState(DEFAULT_AVATAR);
  const [anchorEl, setAnchorEl] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      setAvatarSrc(savedAvatar);
    }
  }, []);

  const handleMiniSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(miniQuery)}`);
  };

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      console.log('User exists:', user);
    } else {
      console.log('No user logged in');
    }
  }, [user]);

  const openFilePicker = () => fileInputRef.current?.click();
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarSrc(reader.result);
      localStorage.setItem('userAvatar', reader.result);
      setAnchorEl(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const selectPreset = (url) => {
    setAvatarSrc(url);
    localStorage.setItem('userAvatar', url);
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#ec4899' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          GreatReads
        </Typography>

        <Box component="form" onSubmit={handleMiniSearch} sx={{ mx: 2, width: 300 }}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Search books..."
            value={miniQuery}
            onChange={(e) => setMiniQuery(e.target.value)}
            InputProps={{
              sx: { backgroundColor: 'white', borderRadius: 1 },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" sx={{ color: '#ec4899' }}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button color="inherit" component={Link} to="/" sx={{ textTransform: 'none' }}>
            Home
          </Button>
          <Button color="inherit" component={Link} to="/my-books" sx={{ textTransform: 'none' }}>
            My Books
          </Button>
          {user ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to={`/user/${user.id}`} // or username if available
                sx={{ textTransform: 'none' }}
              >
                My Profile
              </Button>

              <IconButton onClick={handleAvatarClick}>
                <Avatar src={avatarSrc} />
              </IconButton>
            </>
          ) : (
            <Button
              color="inherit"
              component={Link}
              to="/signin"
              sx={{ textTransform: 'none' }}
            >
              Sign In
            </Button>
          )}


          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <Box sx={{ px: 2, py: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
              {PRESET_AVATARS.map((url, i) => (
                <IconButton key={i} onClick={() => selectPreset(url)}>
                  <Avatar src={url} alt={`preset ${i}`} />
                </IconButton>
              ))}
              <IconButton onClick={openFilePicker}>
                <UploadIcon />
              </IconButton>
            </Box>
          </Menu>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
