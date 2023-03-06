import React from 'react';
import { Link } from 'react-router-dom';
import {Flex, Box, FormControl, FormLabel, Input, Checkbox, Stack, Button, Heading, Text, useColorModeValue} from '@chakra-ui/react';
// import { useMutation } from '@apollo/client';
// import { ADD_PROFILE } from '../utils/mutations';



  const Signup = () => {
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('white', 'blue.500')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Signup</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> 
            </Text>
          </Stack>
          <Box
            rounded={'sm'}
            bg={useColorModeValue('whiteAlpha.500', 'blue.400')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
            <FormControl id="name">
                <FormLabel>First Name</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Last Name</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={'green.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.300',
                  }}>
                  Sign Up
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }

export default Signup;
