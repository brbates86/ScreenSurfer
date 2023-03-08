import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {Flex, Box, FormControl, FormLabel, Input, Stack, Button, Heading, Text, useColorModeValue} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [addProfile, { error, data }] = useMutation(ADD_PROFILE);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addProfile({
        variables: { ...formState },
      });

      Auth.login(data.addProfile.token);
    } catch (e) {
      console.error(e);
    }
    setFormState({
      email: '',
      password: '',
    });
  };


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
          <div>
          {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
          <Box 
          rounded={'sm'}
          boxShadow={'lg'}
          p={8}>
             <Stack spacing={4}>
          <FormControl id="name" onSubmit={handleFormSubmit}>
            <FormLabel>First Name</FormLabel>
                <Input
                  placeholder="******"
                  name="First Name"
                  type="first name"
                  value={formState.firstName}
                  onChange={handleChange}
                />
          </FormControl>
          <FormControl id="name" onSubmit={handleFormSubmit}>
             <FormLabel>Last Name</FormLabel>
                   <Input
                  className="form-input"
                  placeholder="******"
                  name="Last Name"
                  type="last name"
                  value={formState.lastName}
                  onChange={handleChange}
                />
          </FormControl>
          <FormControl id="email" onSubmit={handleFormSubmit}>
            <FormLabel>Email</FormLabel>
                 <Input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
          </FormControl>
          <FormControl id="password" onSubmit={handleFormSubmit}>
            <FormLabel>Password</FormLabel>
                  <Input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                /> 
          </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  
                </Stack>
                <Button
                  type='submit'
                  bg={'green.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.300',
                  }}>
                  Sign Up
                </Button>
                
                {error && (
              <div>
                {error.message}
              </div>
            )}
              </Stack>
            </Stack>
          </Box>
           )}
          </div>
          
        </Stack>
        
      </Flex>
      
    );
  }

export default Signup;

 