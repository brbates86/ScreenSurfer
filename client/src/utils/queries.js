import { gql } from '@apollo/client';

export const QUERY_PROFILE = gql`
  query profile {
    profile {
      _id
      name
      bio
      letterboxd
      
    }
  }
`;

// export const QUERY_SINGLE_PROFILE = gql`
//   query singleProfile($profileId: ID!) {
//     profile(profileId: $profileId) {
//       _id
//       name
      
//     }
//   }
// `;

// export const QUERY_ME = gql`
//   query me {
//     me  {
//       _id
//       name
      
//     }
//   }
// `;


