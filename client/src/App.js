import React from 'react';
import './App.css'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
//import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
//import ProfileTest from './pages/ProfileTest'
import SearchMovies from './pages/searchedMovies';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Header />
          <div>
            <Routes>
              <Route 
                path="/" 
                element={<Home />}
              />
              <Route 
                path="/login" 
                element={<Login />}
              />
              <Route 
                path="/signup" 
                element={<Signup />}
              />
               {/* <Route 
                path="/test" 
                element={<ProfileTest />}
              /> */}
              {/* <Route 
                path="/me" 
                element={<Profile />}
              />
              <Route 
                path="/profiles/:profileId"
                element={<Profile />}
              /> */}
            </Routes>
          </div>
          
        </div>
        <div style={{position:'fixed', bottom:'0', width:'100vw'}}><Footer /></div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
