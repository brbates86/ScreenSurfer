import React from 'react';

import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    
  } from '@chakra-ui/react'


const TestCom = () => {
    return (
        <div>
            <Popover>
            <PopoverTrigger>
                <button>Trigger</button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Confirmation!</PopoverHeader>
                <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
            </PopoverContent>
            </Popover>
        </div>
    );    
};
export default TestCom;