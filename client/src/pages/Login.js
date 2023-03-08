import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, Flex, Box, Heading, Text, Stack, StackDivider, Input, Button, useColorModeValue, } from '@chakra-ui/react'
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

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
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <Card bg={"whiteAlpha.900"}>
      <CardHeader>
        <Heading size='lg' textAlign={'center'}>Signup</Heading>
      <Flex spacing='4'>
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap' justify={'center'}>
        <Box 
        rounded={'sm'}
        bg={useColorModeValue('whiteAlpha.900', 'gray.800')} boxShadow={'xl'}
        p={8}>
          <Stack spacing={6}>
        <Heading size='sm'>

    <CardBody>
      <Stack divider={<StackDivider />} spacing={50} mx={'auto'} maxW={'md'} py={5} px={50}>
        <Stack align={'center'}>
      <Box>
        <Heading size='xs' textTransform='uppercase'></Heading>  
        <Text pt='2' fontSize='sm'></Text>

    
        <main className="flex-row justify-center mb-4">
      <Stack spacing={10} pt={2}>
        <div className="col-12 col-lg-10">
          <div className="card">
            <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              
              <form onSubmit={handleFormSubmit}>
                
                <Input
                  rounded={'sm'}
                  className="form-input"
                  placeholder="Username"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                
                <Input
                  rounded={'sm'}
                  className="form-input"
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <Input
                  rounded={'sm'}
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                
                <Stack spacing={10} pt={2}>
                <Button
                rounded={'sm'}
                loadingText="Submitting"
                size="md"
                bg={'green.300'}
                color={'white'}
                _hover={{
                  bg: 'blue.400',
                }}
                  className="btn btn-block btn-info"
                  style={{ cursor: "pointer" }}
                  type="submit">
                  Signup
                </Button>
                </Stack>
              </form>
            )}

                {error && (
                  <div className="my-3 p-3 bg-danger text-white">
                    {error.message}
                  </div>
                    )}
                  </div>
          
                </div>
        
              </div>
            </Stack>
          </main>
    
                          </Box>
                        </Stack>
                    </Stack>
                   </CardBody>
                  </Heading>
                </Stack>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
    </Card>
  );
};

export default Login;


