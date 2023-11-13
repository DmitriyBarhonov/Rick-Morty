import { FC } from "react";
import { API } from "../../assets/api/api";
import {
  EpisodeType,
  LocationType,
  ResponseType,
} from "../../assets/api/rick-and-morty-api";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { Header } from "../../components/Header/Header";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { Card } from "../../components/Card/Card";

// export const getServerSideProps = async (params: any) => {
//   const episodes = await API.rickAndMorty.getEpisodes();

//   if (!episodes) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       episodes,
//     },
//   };
// };

const getLocations = () => {
  return fetch("https://rickandmortyapi.com/api/location", {
    method: "GET",
  }).then((res) => res.json());
};

export const getStaticProps = async (params: any) => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery(["locations"], getLocations);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Locations: FC = (props) => {
  const { data: locations } = useQuery<ResponseType<LocationType>>(
    ["locations"],
    getLocations
  );

  if (!locations) return null;

  const locationsList = locations.results.map((locations) => (
    <Card key={locations.id} name={locations.name} />
  ));

  return (
    <PageWrapper>
      <Header />
      {locationsList}
    </PageWrapper>
  );
};

export default Locations;
