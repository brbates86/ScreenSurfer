import React from "react";
import { Card, CardBody, Heading } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";
import { FaFilm } from "react-icons/fa";

import { List, ListItem, ListIcon } from "@chakra-ui/react";

export default function CurrentList() {
  return (
    <Card bg="green.200">
      <CardBody color="white">
        <Center h="500px">
          <List spacing={3}>
            <Heading>Top Ten Horror Movies</Heading>
            <ListItem>
              <ListIcon as={FaFilm} color="green.500" />
              Scream
            </ListItem>
            <ListItem>
              <ListIcon as={FaFilm} color="green.500" />
              Midsommar
            </ListItem>
            <ListItem>
              <ListIcon as={FaFilm} color="green.500" />
              Sinister
            </ListItem>
            <ListItem>
              <ListIcon as={FaFilm} color="green.500" />
              Halloween: Resurrection
            </ListItem>
            <ListItem>
              <ListIcon as={FaFilm} color="green.500" />
              Friday The 13th
            </ListItem>
            <ListItem>
              <ListIcon as={FaFilm} color="green.500" />
              Paranormal Activity
            </ListItem>
            <ListItem>
              <ListIcon as={FaFilm} color="green.500" />
              Suspiria
            </ListItem>
            <ListItem>
              <ListIcon as={FaFilm} color="green.500" />X
            </ListItem>
            <ListItem>
              <ListIcon as={FaFilm} color="green.500" />
              Get Out
            </ListItem>
            <ListItem>
              <ListIcon as={FaFilm} color="green.500" />
              The Conjuring
            </ListItem>
          </List>
        </Center>
      </CardBody>
    </Card>
  );
}
