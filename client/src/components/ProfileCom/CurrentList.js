import React from 'react';
import { Card, CardBody, Heading } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'
import {
   FaFilm
} from 'react-icons/fa';


import {
    List,
    ListItem,
    ListIcon,
  } from '@chakra-ui/react'
  
export default function CurrentList() {
    return (
        <Card bg='green.200'>
        <CardBody color='white'>
        <Center h='500px'>
        
        <List spacing={3}>
        <Heading>Current List</Heading>
        <ListItem>
            <ListIcon as={FaFilm} color='green.500' />
            Parasite
        </ListItem>
        <ListItem>
            <ListIcon as={FaFilm} color='green.500' />
            Comet
        </ListItem>
        <ListItem>
            <ListIcon as={FaFilm} color='green.500' />
            Big Fish
        </ListItem>
        <ListItem>
            <ListIcon as={FaFilm} color='green.500' />
            The Princess Bride
        </ListItem>
        <ListItem>
            <ListIcon as={FaFilm} color='green.500' />
            Nine Days
        </ListItem>
        <ListItem>
            <ListIcon as={FaFilm} color='green.500' />
            The Grand Budapest Hotel
        </ListItem>
        <ListItem>
            <ListIcon as={FaFilm} color='green.500' />
            About Time
        </ListItem>
        <ListItem>
            <ListIcon as={FaFilm} color='green.500' />
            The Prestige
        </ListItem>
        <ListItem>
            <ListIcon as={FaFilm} color='green.500' />
            Pineapple Express
        </ListItem>
        <ListItem>
            <ListIcon as={FaFilm} color='green.500' />
            Pulp Fiction
        </ListItem>
        </List>
        </Center>
        </CardBody>
        </Card>
    );
}