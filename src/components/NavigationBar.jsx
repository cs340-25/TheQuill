import { useNavigate, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

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
  const [miniQuery, setMiniQuery] = useState("");
  const [avatarSrc, setAvatarSrc] = useState(DEFAULT_AVATAR);
  const [pickerOpen, setPickerOpen] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedAvatar = localStorage.getItem('userAvatar');
    if (savedAvatar) {
      setAvatarSrc(savedAvatar);
    }
  }, []);

  const handleMiniSearch = e => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(miniQuery)}`);
  };

  const openFilePicker = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarSrc(reader.result);
      localStorage.setItem('userAvatar', reader.result); 
      setPickerOpen(false);
    };
    reader.readAsDataURL(file);
  };

  const selectPreset = (url) => {
    setAvatarSrc(url);
    localStorage.setItem('userAvatar', url);
    setPickerOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-name">GreatReads</div>
  
      <div className="navbar-search">
        <form onSubmit={handleMiniSearch}>
          <input
            type="text"
            placeholder="Search books..."
            value={miniQuery}
            onChange={e => setMiniQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/my-books">My Books</Link></li>
      </ul>

      <div className="navbar-avatar-wrapper">
        <img
          src={avatarSrc}
          alt="avatar"
          className="avatar-image"
          onClick={() => setPickerOpen(open => !open)}
        />

        {pickerOpen && (
          <div className="avatar-picker">
            <div className="avatar-scroll">
              {PRESET_AVATARS.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  className="avatar-thumb"
                  onClick={() => selectPreset(url)}
                  alt={`preset ${i}`}
                />
              ))}
              <button
                className="avatar-upload-btn"
                onClick={openFilePicker}
              >
                + Upload
              </button>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        )}
      </div>

      <ul className="navbar-links">
        <li><Link to="/user/johndoe">My Profile</Link></li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
