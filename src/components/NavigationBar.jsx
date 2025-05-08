import { useNavigate, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { ref, update, get } from 'firebase/database';
import { db } from '../firebase'; // adjust path if needed

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
import { useUser } from '../contexts/userContext';

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
  const { user } = useUser();

  // Load avatar from Realtime Database when user logs in or changes
  useEffect(() => {
    if (!user?.id) return;
    get(ref(db, `users/${user.id}`))
      .then((snapshot) => {
        const data = snapshot.val() || {};
        if (data.avatar) {
          setAvatarSrc(data.avatar);
        }
      })
      .catch((err) => console.error('Error loading avatar:', err));
  }, [user]);

  const handleMiniSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(miniQuery)}`);
  };

  const openFilePicker = () => fileInputRef.current?.click();

  // Upload custom avatar and save to Realtime Database
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      setAvatarSrc(base64);
      setAnchorEl(null);

      update(ref(db, `users/${user.id}`), { avatar: base64 })
        .then(() => console.log('Uploaded avatar saved to Firebase'))
        .catch((error) => console.error('Error saving avatar:', error));
    };
    reader.readAsDataURL(file);
  };

  // Select preset avatar and save to Realtime Database
  const selectPreset = (url) => {
    if (!user?.id) return;
    setAvatarSrc(url);
    setAnchorEl(null);

    update(ref(db, `users/${user.id}`), { avatar: url })
      .then(() => console.log('Preset avatar saved to Firebase'))
      .catch((error) => console.error('Error saving avatar:', error));
  };

  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <AppBar position="static" sx={{ bgcolor: '#ec4899' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Button color="inherit" component={Link} to="/" sx={{ textTransform: 'none', fontSize: 24 }}>
          Great Reads
        </Button>

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
          <Button color="inherit" component={Link} to="/mybooks" sx={{ textTransform: 'none' }}>
            My Books
          </Button>
          {user ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to={`/user/${user.id}`}
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

