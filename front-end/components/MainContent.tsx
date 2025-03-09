import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';

// Dummy card data representing books
const cardData = [
  {
    img: 'https://picsum.photos/800/450?random=1',
    tag: 'Fiction',
    title: 'The Great Adventure',
    description: 'An epic journey through a fantastical world.',
    authors: [
      { name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' },
      { name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' },
    ],
  },
  {
    img: 'https://picsum.photos/800/450?random=2',
    tag: 'Mystery',
    title: 'Secrets Unveiled',
    description: 'A thrilling mystery that keeps you guessing until the end.',
    authors: [{ name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }],
  },
  {
    img: 'https://picsum.photos/800/450?random=3',
    tag: 'Non-Fiction',
    title: 'The Story of Innovation',
    description: 'Insights into the breakthroughs shaping our world.',
    authors: [{ name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }],
  },
  {
    img: 'https://picsum.photos/800/450?random=4',
    tag: 'Romance',
    title: 'A Love Rekindled',
    description: 'A heartfelt tale of second chances and new beginnings.',
    authors: [{ name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }],
  },
  {
    img: 'https://picsum.photos/800/450?random=45',
    tag: 'Sci-Fi',
    title: 'Future Bound',
    description: 'A vision of tomorrow, filled with adventure and danger.',
    authors: [
      { name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' },
      { name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' },
    ],
  },
  {
    img: 'https://picsum.photos/800/450?random=6',
    tag: 'Fantasy',
    title: 'Realm of Magic',
    description: 'Discover a land where magic and mystery intertwine.',
    authors: [{ name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }],
  },
];

const StyledCard = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <Box
    component="div"
    sx={{
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2,
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      '&:hover': { backgroundColor: 'action.hover' },
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}
    {...props}
  />
);

const StyledCardContent = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <Box
    component="div"
    sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    }}
    {...props}
  />
);

const StyledTypography = (props: React.ComponentProps<typeof Typography>) => (
  <Typography
    {...props}
    sx={{
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 2,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      ...props.sx,
    }}
  />
);

function Author({ authors }: { authors: { name: string; avatar: string }[] }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
      >
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.avatar}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(', ')}
        </Typography>
      </Box>
      <Typography variant="caption">July 14, 2021</Typography>
    </Box>
  );
}

export function Search() {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}

export default function MainContent() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null,
  );

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  const handleClick = () => {
    console.info('You clicked the filter chip.');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
    <div>
      <Typography variant="h1" gutterBottom>
        GreatReads
      </Typography>
      <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
        Stay updated with the latest books, reviews, and author insights
      </Typography>
    </div>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'row',
          gap: 1,
          width: { xs: '100%', md: 'fit-content' },
          overflow: 'auto',
        }}
      >
        <Search />
        <IconButton size="small" aria-label="RSS feed">
          <RssFeedRoundedIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          width: '100%',
          justifyContent: 'space-between',
          alignItems: { xs: 'start', md: 'center' },
          gap: 4,
          overflow: 'auto',
        }}
      >
        <Box
            sx={{
              display: 'inline-flex',
              flexDirection: 'row',
              gap: 3,
              overflow: 'auto',
            }}
          >
          <Chip onClick={handleClick} size="medium" label="All Genres" />
          <Chip onClick={handleClick} size="medium" label="Fiction" />
          <Chip onClick={handleClick} size="medium" label="Non-Fiction" />
          <Chip onClick={handleClick} size="medium" label="Mystery" />
          <Chip onClick={handleClick} size="medium" label="Sci-Fi" />
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row',
            gap: 1,
            width: { xs: '100%', md: 'fit-content' },
            overflow: 'auto',
          }}
        >
          <Search />
          <IconButton size="small" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
      </Box>
      <Grid container spacing={2} columns={12}>
      <Grid item xs={12} md={6}>
        <StyledCard tabIndex={0}>
          <CardMedia
            component="img"
            alt={cardData[0].title}
            image={cardData[0].img}
            sx={{
              aspectRatio: '16/9',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          />
          <StyledCardContent>
            <Typography variant="caption" component="div" gutterBottom>
              {cardData[0].tag}
            </Typography>
            <Typography variant="h6" component="div" gutterBottom>
              {cardData[0].title}
            </Typography>
            <StyledTypography variant="body2" color="text.secondary" gutterBottom>
              {cardData[0].description}
            </StyledTypography>
          </StyledCardContent>
          <Author authors={cardData[0].authors} />
        </StyledCard>

      </Grid>
      <Grid item xs={12} md={6}>
        <StyledCard
          onFocus={() => handleFocus(1)}
          onBlur={handleBlur}
          tabIndex={0}
          className={focusedCardIndex === 1 ? 'Mui-focused' : ''}
        >
          <CardMedia
            component="img"
            alt={cardData[1].title}
            image={cardData[1].img}
            sx={{
              aspectRatio: '16 / 9',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          />
          <StyledCardContent>
            <Typography variant="caption" component="div" gutterBottom>
              {cardData[1].tag}
            </Typography>
            <Typography variant="h6" component="div" gutterBottom>
              {cardData[1].title}
            </Typography>
            <StyledTypography variant="body2" color="text.secondary" gutterBottom>
              {cardData[1].description}
            </StyledTypography>
          </StyledCardContent>
          <Author authors={cardData[1].authors} />
        </StyledCard>
      </Grid>
      <Grid item xs={12} md={6}>
      <StyledCard
        onFocus={() => handleFocus(2)}
        onBlur={handleBlur}
        tabIndex={0}
        className={focusedCardIndex === 2 ? 'Mui-focused' : ''}
      >
        <CardMedia
          component="img"
          alt={cardData[2].title}
          image={cardData[2].img}
          sx={{
            height: { sm: 'auto', md: '50%' },
            // For small screens, force a 16:9 aspect ratio; remove on md if not needed
            aspectRatio: { xs: '16/9', md: 'unset' },
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        />
        <StyledCardContent>
          <Typography gutterBottom variant="caption" component="div">
            {cardData[2].tag}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {cardData[2].title}
          </Typography>
          <StyledTypography variant="body2" color="text.secondary" gutterBottom>
            {cardData[2].description}
          </StyledTypography>
        </StyledCardContent>
        <Author authors={cardData[2].authors} />
      </StyledCard>
    </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}
          >
            <StyledCard
              //variant="outlined"
              onFocus={() => handleFocus(3)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 3 ? 'Mui-focused' : ''}
              //sx={{ height: '100%' }}
            >
              <StyledCardContent
                // sx={{
                //   display: 'flex',
                //   flexDirection: 'column',
                //   justifyContent: 'space-between',
                //   height: '100%',
                // }}
              >
                <div>
                  <Typography gutterBottom variant="caption" component="div">
                    {cardData[3].tag}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {cardData[3].title}
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {cardData[3].description}
                  </StyledTypography>
                </div>
              </StyledCardContent>
              <Author authors={cardData[3].authors} />
            </StyledCard>
            <StyledCard
              //variant="outlined"
              onFocus={() => handleFocus(4)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 4 ? 'Mui-focused' : ''}
              //sx={{ height: '100%' }}
            >
              <StyledCardContent
                // sx={{
                //   display: 'flex',
                //   flexDirection: 'column',
                //   justifyContent: 'space-between',
                //   height: '100%',
                // }}
              >
                <div>
                  <Typography gutterBottom variant="caption" component="div">
                    {cardData[4].tag}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {cardData[4].title}
                  </Typography>
                  <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {cardData[4].description}
                  </StyledTypography>
                </div>
              </StyledCardContent>
              <Author authors={cardData[4].authors} />
            </StyledCard>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component={StyledCard}
            onFocus={() => handleFocus(5)}
            onBlur={handleBlur}
            tabIndex={0}
            className={focusedCardIndex === 5 ? 'Mui-focused' : ''}
            //sx={{ height: '100%' }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              image={cardData[5].img}
              sx={{
                height: { sm: 'auto', md: '50%' },
                aspectRatio: { sm: '16 / 9', md: '' },
              }}
            />
            <StyledCardContent>
              <Typography gutterBottom variant="caption" component="div">
                {cardData[5].tag}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {cardData[5].title}
              </Typography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {cardData[5].description}
              </StyledTypography>
            </StyledCardContent>
            <Author authors={cardData[5].authors} />
       //</Box>
        </Grid>
      </Grid>
    </Box>
  );
}
