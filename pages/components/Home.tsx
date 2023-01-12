import { useEffect, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useQuery } from 'react-query';
import { join } from 'path';

const useFetchData = () => useQuery(
  'tableData1',
  async () => {
    const res = await fetch('https://cat-fact.herokuapp.com/facts');
    return await res.json();
  },
);

interface FactType {
  dataIndex: number,
  id: string,
  verified: boolean,
  text: string,
  votes: number,
};

interface RawData {
  _id: string,
  status: { verified: boolean },
  text: string,
};

interface StateType {
  [key:string]: FactType,
};

const getHighestVotedItems = (data: StateType): string => {
  const itemsArray = Object.values(data).reduce((acc: string[], fact: FactType, index: number): string[] => {
    if (index === 0) {
      acc.push(fact.id);
      return acc;
    } else if (data[acc[0]].votes < fact.votes) {
      return [fact.id];
    } else if (data[acc[0]].votes === fact.votes) {
      acc.push(fact.id);
      return acc;
    }
    return acc;
  }, []);
  return itemsArray.map(id => data[id].dataIndex + 1).join(', ');
};

const getLowestVotedItems = (data: StateType): string => {
  const itemsArray = Object.values(data).reduce((acc: string[], fact: FactType, index: number): string[] => {
    if (index === 0) {
      acc.push(fact.id);
      return acc;
    } else if (data[acc[0]].votes > fact.votes) {
      return [fact.id];
    } else if (data[acc[0]].votes === fact.votes) {
      acc.push(fact.id);
      return acc;
    }
    return acc;
  }, []);
  return itemsArray.map(id => data[id].dataIndex + 1).join(', ');
};

const Home = () => {
  const [renderData, setRenderData] = useState<StateType>({});
  const { isLoading, data } = useFetchData();

  useEffect(() => {
    if (!isLoading) {
      setRenderData(data.reduce((acc: StateType, fact: RawData, index: number) => ({
        ...acc,
        [fact._id]: {
          dataIndex: index,
          id: fact._id,
          verified: fact.status.verified,
          text: fact.text,
          votes: 0,
        }
      }), {}));
    }
  }, [isLoading, data]);

  const handleUpvote = (id: string ) => {
    setRenderData((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], votes: prevState[id].votes + 1 },
    }));
  };

  const handleDownvote = (id: string ) => {
    setRenderData((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], votes: prevState[id].votes - 1 },
    }));
  };

  return (
    <Container>
      <h1>Jakub's Cat Facts UI</h1>
      <Grid>
        {isLoading && <h3>Loading...</h3>}
        {!isLoading && (
          <>
            <div>
              <h3>Leaderboard</h3>
              <Grid>
                <Grid item xs={2}>Highest votes</Grid>
                <Grid item xs={10}>{getHighestVotedItems(renderData)}</Grid>
              </Grid>
              <Grid>
                <Grid item xs={2}>Lowest votes</Grid>
                <Grid item xs={10}>{getLowestVotedItems(renderData)}</Grid>
              </Grid>
            </div>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Fact</TableCell>
                    <TableCell align="right">Vote Count</TableCell>
                    <TableCell align="center">
                      Place Vote
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.values(renderData)?.map((row: FactType, index: number) => (
                    <TableRow key={row.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell sx={{ maxWidth: '50ch'}}>{row.text}</TableCell>
                      <TableCell align="right">{row.votes}</TableCell>
                      <TableCell align="right">
                        <ButtonGroup variant="outlined">
                          <Button onClick={() => handleDownvote(row.id)}>
                            Downvote
                          </Button>
                          <Button onClick={() => handleUpvote(row.id)}>
                            Upvote
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default Home;