import { Box, Button, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { MakeEventBanner, RegisterBanner, BannerHome } from './components';
import InteriorItem from '../../shared/ui/Card/InteriorItem';
import { ISpace } from '../../entities/types/ISpace';
import useFetch from '../../shared/network/useFetch';

export default function HomePage() {
  const [spaces, setSpaces] = useState<ISpace[]>([]);

  const { loading: loadingData, fetchData } = useFetch<ISpace[]>(
    'https://space-event.kenuki.org/order-service/api/v1/space',
  );

  useEffect(() => {
    fetchData({
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
      if (response) {
        setSpaces(response);
      }
    });
  }, [fetchData]);

  return (
    <Box component="section" sx={{ background: 'white' }}>
      <div className="container">
        <Box component="div" className={styles.home}>
          <BannerHome />
        </Box>
      </div>
      <MakeEventBanner />
      <Box className="container">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#4A148C',
            }}
          >
            Spaces
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#8e24aa',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#6a1b9a',
              },
              padding: '10px 20px',
              borderRadius: '5px',
              fontWeight: 'bold',
            }}
            component={Link}
            to="/spaces"
          >
            All Spaces
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '40px 0px',
          }}
        >
          {spaces
            .slice(0, 3)
            .map(place =>
              place.imageUrl ? (
                <InteriorItem
                  key={place.id}
                  interior={place}
                  updateQuery={fetchData}
                />
              ) : null,
            )}
        </Box>
      </Box>
      <RegisterBanner />
    </Box>
  );
}
