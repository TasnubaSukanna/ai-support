import { useState } from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import ChatInterface from '../components/chatInterface';
import ReactHowler from 'react-howler';

export default function Home() {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #a8edea 30%, #fed6e3 90%)',
        overflow: 'hidden',
      }}
    >
      {/* Soothing Jazz Music */}
      <ReactHowler
        src="C:\Users\Tasnuba\Desktop\ai-support\pages\adhdSoothingJazz.mp3"
        playing={true}
        loop={true}
        volume={0.5}
      />

      <Container maxWidth="sm" sx={{ textAlign: 'center', mb: 4 }}>
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: hovered ? -10 : 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ color: '#4A90E2', fontWeight: 'bold' }}
          >
            ADHD Support Assistant
          </Typography>
        </motion.div>
      </Container>

      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Paper
          elevation={4}
          sx={{
            padding: 3,
            borderRadius: 3,
            background: 'white',
            maxWidth: 600,
          }}
        >
          <ChatInterface />
        </Paper>
      </motion.div>

      <motion.div
        className="floating-elements"
        initial={{ x: '-50%', y: '-50%' }}
        animate={{
          x: ['-50%', '50%', '-50%'],
          y: ['-50%', '50%', '-50%'],
        }}
        transition={{
          duration: 10,
          ease: 'easeInOut',
          loop: Infinity,
          repeatType: 'mirror',
        }}
        style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
        }}
      />
    </Box>
  );
}
