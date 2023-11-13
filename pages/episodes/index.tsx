import { FC } from "react";
import { API } from "../../assets/api/api";
import { EpisodeType, ResponseType } from "../../assets/api/rick-and-morty-api";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { Header } from "../../components/Header/Header";
import { Card } from "../../components/Card/Card";

export const getServerSideProps = async (params: any) => {
  const episodes = await API.rickAndMorty.getEpisodes();

  if (!episodes) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      episodes,
    },
  };
};

type PropsType = {
  episodes: ResponseType<EpisodeType>;
};
const Episodes: FC<PropsType> = (props) => {
  const { episodes } = props;

  const charactersList = episodes.results.map((episodes) => (
    <Card key={episodes.id} name={episodes.name} />
  ));

  return (
    <PageWrapper>
      <Header />
      {charactersList}
    </PageWrapper>
  );
};

export default Episodes;
