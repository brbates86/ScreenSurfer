import Popcorn from '../../images/popcorn.png'
import { Card, CardBody, Text, Heading, CardFooter, Button, Stack, Image, Link } from '@chakra-ui/react'


export default function ProfilePic() {
    return(

    <Card
    direction={{ base: 'column', sm: 'row' }}
    overflow='hidden'
    variant='outline'
    >
    <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '200px' }}
        src={Popcorn}
        alt='Caffe Latte'
    />

    <Stack>
        <CardBody>
        <Heading size='md'>Scott Weinkauf</Heading>

        <Text py='2'>
        I rate movies with my heart not my head
        </Text>
        </CardBody>

        <CardFooter>
        <Button variant='solid' colorScheme='blue'>
            <Text>
            {' '}
            <Link color='white' href='https://letterboxd.com/weinland/'>
                Letterboxd
            </Link>
            </Text>
        </Button>
        </CardFooter>
    </Stack>
    </Card>
    );
}


