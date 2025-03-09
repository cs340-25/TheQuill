// src/components/MediaCard.tsx
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface BookCardProps {
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  onLearnMore?: () => void;
  onShare?: () => void;
}

export default function BookCard({
  title,
  author,
  coverUrl,
  description,
  onLearnMore,
  onShare,
}: BookCardProps) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 180 }}
        image={coverUrl}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
          by {author}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onShare}>
          Share
        </Button>
        <Button size="small" onClick={onLearnMore}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
