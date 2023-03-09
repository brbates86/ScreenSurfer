import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import TopTen from "../components/ProfileCom/TopTen";
import CurrentList from "../components/ProfileCom/CurrentList";
import ProfilePic from "../components/ProfileCom/ProfilePic";
import UserReviews from "../components/ProfileCom/UserReviews";

export default function ProfileTest() {
  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem w="100%" h="10">
          <TopTen />
        </GridItem>

        <GridItem w="100%" h="10">
          <ProfilePic />
          <UserReviews />
        </GridItem>

        <GridItem w="100%" h="10">
          <CurrentList />
        </GridItem>
      </Grid>
    </>
  );
}
