import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_LIST } from '../../utils/mutations';
import {
   FaFilm
} from 'react-icons/fa';
import {
    List,
    ListItem,
    ListIcon,
    Card,
    CardBody,
    Heading,
    Center
  } from '@chakra-ui/react'
import Auth from '../../utils/auth'
  
export default function TopTen() {

    return (
        <Card bg='red.200'>
        <CardBody color='white'> 
        <Center h='500px'>
        <List spacing={3}>
        <Heading>Top Ten Of All Time</Heading>

        <ListItem>
            <ListIcon  as={FaFilm} color='green.500' />
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