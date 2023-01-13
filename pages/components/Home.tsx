import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import {
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  debounce,
  useMediaQuery,
} from '@mui/material';
import Table from './Table';
import FactCards from './FactCards';
import Button from './Button';

const useFetchData = (count: number) => useQuery(
  ['tableData1', count],
  async () => {
    const res = await fetch(`https://meowfacts.herokuapp.com/?count=${count}`);
    return await res.json();
  },
  {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  }
);

const getOrderedItemsFromVotes = (data: StateType, orderType: string = 'highest'): string => {
  const itemsArray = Object.values(data)
    .reduce((acc: string[], fact: FactType, index: number): string[] => {
      if (index === 0) {
        acc.push(fact.id);
        return acc;
      } else if (data[acc[0]].votes === fact.votes) {
        acc.push(fact.id);
        return acc;
      } else if (orderType === 'lowest' && data[acc[0]].votes > fact.votes) {
        return [fact.id];
      } else if (orderType === 'highest' && data[acc[0]].votes < fact.votes) {
        return [fact.id];
      }
      return acc;
    }, []);
  return itemsArray.map(id => data[id].dataIndex + 1).join(', ');
};

const getInitialStateFromData = (data: string[]) =>
  data.reduce((acc: StateType, fact: string, index: number) => ({
    ...acc,
    [fact]: {
      dataIndex: index,
      id: fact,
      text: fact,
      votes: 0,
    }
  }), {});

export interface FactType {
  dataIndex: number,
  id: string,
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
  
const Home = () => {
  const [requestCount, setRequestCount] = useState(10);
  const [renderData, setRenderData] = useState<StateType>({});
  const [filterString, setFilterString] = useState('');
  const { isLoading, data } = useFetchData(requestCount);
  const isXXSM = useMediaQuery('(max-width:420px)');

  useEffect(() => {
    if (!isLoading) {
      setRenderData(getInitialStateFromData(data.data));
    }
  }, [isLoading, data]);

  const handleUpvote = (id: string) => {
    setRenderData((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], votes: prevState[id].votes + 1 },
    }));
  };

  const handleDownvote = (id: string) => {
    console.log('downvote');
    setRenderData((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], votes: prevState[id].votes - 1 },
    }));
  };

  const handleCountChange = (newCount: number) => setRequestCount(newCount);

  const resetVotes = () => setRenderData(getInitialStateFromData(data.data));

  const filterData = ({ target: { value }}: { target: { value: string } }) => {
    setFilterString(value.toLowerCase());
  };

  const debouncedInputChange = debounce(filterData, 300);

  const filteredData = Object.values(renderData)
    .filter((fact: FactType) => fact.text.toLowerCase().includes(filterString));
  
  const areAllVotesZero = Object.values(renderData).every(fact => fact.votes === 0);

  return (
    <Container>
      <Typography variant='h4'>Jakub's Cat Fact Table</Typography>
      <Grid>
        <Paper elevation={6}>
          <Box padding='16px'>
            <Grid container alignItems="center">
              <Grid item xs={isXXSM ? 6 : 4} sm={3} md={2}>
                <Typography variant='h6'>Leaderboard</Typography>
              </Grid>
              <Grid item xs={6}>
                <Button
                  onClick={resetVotes}
                  isLoading={isLoading}
                  isDisabled={areAllVotesZero}
                  variant="link"
                >
                  Reset Votes
                </Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={isXXSM ? 6 : 4} sm={3} md={2}>Highest votes:</Grid>
              <Grid item xs={6}>{getOrderedItemsFromVotes(renderData, 'highest')}</Grid>
            </Grid>
            <Grid container>
              <Grid item xs={isXXSM ? 6 : 4} sm={3} md={2}>Lowest votes:</Grid>
              <Grid item xs={6}>{getOrderedItemsFromVotes(renderData, 'lowest')}</Grid>
            </Grid>
          </Box>
        </Paper>
        <Paper
          elevation={6}
          sx={{ width: '100%', backgroundColor: '#fefefe', margin: '16px 0' }}
        >
          <Grid container padding="16px">
            <Grid item xs={6} md={4}>
              <TextField
                onChange={debouncedInputChange}
                label="filter"
                placeholder="Filter table results"
                sx={{ width: '100%' }}
                variant="standard"
              />
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={6}>
          {!isXXSM && (
            <Box padding="16px">
              <Table
                filteredData={filteredData}
                handleDownvote={handleDownvote}
                handleUpvote={handleUpvote}
              />
            </Box>
          )}
          {isXXSM && (
            <FactCards
              filteredData={filteredData}
              handleDownvote={handleDownvote}
              handleUpvote={handleUpvote}
            />
          )}
          <Grid container alignItems="center" columnSpacing="8px" padding="16px">
            <Grid item>
              Display:
            </Grid>
            <Grid item>
              <Button
                onClick={() => handleCountChange(10)}
                isLoading={isLoading}
                isDisabled={requestCount === 10}
              >
                10
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => handleCountChange(20)}
                isLoading={isLoading}
                isDisabled={requestCount === 20}
              >
                20
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => handleCountChange(50)}
                isLoading={isLoading}
                isDisabled={requestCount === 50}
              >
                50
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Container>
  );
};

export default Home;