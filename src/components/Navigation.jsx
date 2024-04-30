import React from 'react';
import { Box, Link } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';

function Navigation() {
  return (
    <Box as="nav" w="200px" p="5" bg="gray.100">
      <Link href="/" display="flex" alignItems="center" p="2">
        <FaHome />
        <span style={{ marginLeft: '10px' }}>Home</span>
      </Link>
    </Box>
  );
}

export default Navigation;