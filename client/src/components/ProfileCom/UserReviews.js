
import Popcorn from '../../images/popcorn.png'
import { Card, CardHeader, CardBody,  Flex, Avatar, Box, Heading, Text } from '@chakra-ui/react'
import React, { useState } from 'react';
import ReviewForm from './ReviewForm';
import Review from './Review';

export default function UserReviews () {
  
    const [review, setReview] = useState([]);
  
    const addReviewItem = (item) => {
      console.log(
        '🚀 ~ file: UserReviews.js ~ line 15 ~ addReviewItem ~ item',
        item
      );
      if (!item.text) {
        return;
      }
  
      const newReview = [item, ...review];
      console.log(newReview);
  
      setReview(newReview);
    };
  
    const removeReviewItem = (id) => {
      const updatedReview = [...review].filter((item) => item.id !== id);
  
      setReview(updatedReview);
    };
  
    
    const editReviewItem = (itemId, newValue) => {
      
      if (!newValue.text) {
        return;
      }
  
      setReview((prev) =>
        prev.map((item) => (item.id === itemId ? newValue : item))
      );
    };
    return (
      <div>
      <ReviewForm onSubmit={addReviewItem} />
     
      <Card >
      <CardHeader>
        <Flex spacing='4'>
          <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Avatar name='Scott Weinkauf' src={Popcorn} /> 
            <Box>
              <Heading size='sm'>Scott Weinkauf's Watched Movies</Heading>
            </Box>
          </Flex>  
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>
        <Review
        review={review}
        removeReviewItem={removeReviewItem}
        editReviewItem={editReviewItem}
        ></Review>
        </Text>
      </CardBody>
       
    
      {/* <CardFooter
        justify='space-between'
        flexWrap='wrap'
        sx={{
          '& > button': {
            minW: '136px',
          },
        }}
      >
        <Button flex='1' variant='ghost' >
          Like
        </Button>
        <Button flex='1' variant='ghost' >
          Comment
        </Button>
        <Button flex='1' variant='ghost' >
          Share
        </Button>
      </CardFooter> */}
    </Card>
    
    </div>
    );
}