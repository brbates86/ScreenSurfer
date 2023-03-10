import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
//import chakraTheme from '@chakra-ui/theme'
//import { getMe, deleteMovie } from '../utils/omdbAPI';
import { QUERY_ME } from "../utils/queries";
import { REMOVE_MOVIE } from "../utils/mutations";
import Auth from "../utils/auth";
import { removeMovieId } from "../utils/localStorage";
import { useQuery, useMutation } from "@apollo/react-hooks";

const SavedMovies = () => {
  const { loading, data } = useQuery(QUERY_ME);
  let userData = data?.me || {};
  console.log(userData);
  const [removeMovie] = useMutation(REMOVE_MOVIE);

  const handleDeleteMovie = async (movieId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { user } = await removeMovie({
        variables: {
          movieId: movieId,
        },
      });

      userData = user;
      removeMovieId(movieId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved movies!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedMovies?.length
            ? `Viewing ${userData.savedMovies.length} saved ${
                userData.savedMovies.length === 1 ? "movie" : "movies"
              }:`
            : "You have no saved movies!"}
        </h2>
        <CardColumns>
          {userData.savedMovies?.map((movie) => {
            return (
              <Card key={movie.movieId} border="dark">
                {movie.poster ? (
                  <Card.Img
                    src={movie.poster}
                    alt={`The cover for ${movie.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <p className="small">Released: {movie.released}</p>
                  <Card.Text></Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteMovie(movie.movieId)}
                  >
                    Delete this Movie!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedMovies;

// const SavedMovies = () => {
//   const [userData, setUserData] = useState({});
//   const userDataLength = Object.keys(userData).length;

//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const token = Auth.loggedIn() ? Auth.getToken() : null;
//         if (!token) {
//           return false;
//         }
//         const response = await getMe(token);
//         if (!response.ok) {
//           throw new Error('something went wrong!');
//         }
//         const user = await response.json();
//         setUserData(user);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     getUserData();
//   }, [userDataLength]);

//   const handleDeleteMovie = async (movieId) => {
//     const token = Auth.loggedIn() ? Auth.getToken() : null;
//     if (!token) {
//       return false;
//     }
//     try {
//       const response = await deleteMovie(movieId, token);

//       if (!response.ok) {
//         throw new Error('something went wrong!');
//       }
//       const updatedUser = await response.json();
//       setUserData(updatedUser);
//       removeMovieId(movieId);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!userDataLength) {
//     return <h2>LOADING...</h2>;
//   }

//   return (
//     <>
//       <div fluid title className='text-light bg-dark p-5'>
//         <Container>
//           <h1>Viewing saved movies!</h1>
//         </Container>
//       </div>
//       <Container>
//         <h2 className='pt-5'>
//           {userData.savedmovies.length
//             ? `Viewing ${userData.savedmovies.length} saved ${userData.savedmovies.length === 1 ? 'movie' : 'movies'}:`
//             : 'You have no saved movies!'}
//         </h2>
//         <SimpleGrid>
//           {userData.savedmovies.map((movie) => {
//             return (
//               <Box md="4">
//                 <Card key={movie.movieId} border='dark'>
//                   {movie.poster ? <Image src={movie.poster} alt={`The cover for ${movie.title}`} variant='top' /> : null}
//                   <CardBody>
//                     <Heading>{movie.title}</Heading>
//                     <p className='small'>Director: {movie.director}</p>
//                     <Text>{movie.description}</Text>
//                     <Button className='btn-block btn-danger' onClick={() => handleDeleteMovie(movie.movieId)}>
//                       Delete this movie!
//                     </Button>
//                   </CardBody>
//                 </Card>
//               </Box>
//             );
//           })}
//         </SimpleGrid>
//       </Container>
//     </>
//   );
// };
