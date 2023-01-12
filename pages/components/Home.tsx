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
  TextField,
  debounce,
  useMediaQuery,
} from '@mui/material';
import { useQuery } from 'react-query';
import { join } from 'path';
import { log } from 'console';

const useFetchData = () => useQuery(
  'tableData1',
  async () => {
    const res = await fetch('https://cat-fact.herokuapp.com/facts');
    return await res.json();
  },
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

const getInitialStateFromData = (data: RawData[]) =>
  data.reduce((acc: StateType, fact: RawData, index: number) => ({
    ...acc,
    [fact._id]: {
      dataIndex: index,
      id: fact._id,
      verified: fact.status.verified,
      text: fact.text,
      votes: 0,
    }
  }), {});

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
  
const Home = () => {
  const [renderData, setRenderData] = useState<StateType>({});
  const [filterString, setFilterString] = useState('');
  const { isLoading, data } = useFetchData();
  const isXXSM = useMediaQuery('(max-width:400px)');

  useEffect(() => {
    if (!isLoading) {
      setRenderData(getInitialStateFromData(data));
    }
  }, [isLoading, data]);

  const handleUpvote = (id: string) => {
    setRenderData((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], votes: prevState[id].votes + 1 },
    }));
  };

  const handleDownvote = (id: string) => {
    setRenderData((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], votes: prevState[id].votes - 1 },
    }));
  };

  const resetVotes = () => setRenderData(getInitialStateFromData(data));

  const filterData = ({ target: { value }}: { target: { value: string } }) => {
    setFilterString(value.toLowerCase());
  };

  const debouncedInputChange = debounce(filterData, 300);

  const filteredData = Object.values(renderData)
    .filter((fact: FactType) => fact.text.toLowerCase().includes(filterString));
  
  return (
    <Container>
      <h1>Jakub's Cat Facts UI</h1>
      <Grid>
        {isLoading && <h3>Loading...</h3>}
        {!isLoading && (
          <>
            <Grid container alignItems="center">
              <Grid item xs={isXXSM ? 6 : 4} sm={3} md={2}>
                <h3>Leaderboard</h3>
              </Grid>
              <Grid item xs={6}>
                <Button onClick={resetVotes} size="small" variant="outlined">
                  Reset Votes
                </Button>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={isXXSM ? 6 : 4} sm={3} md={2}>Highest votes:</Grid>
              <Grid item xs={6}>{getOrderedItemsFromVotes(renderData, 'highest')}</Grid>
            </Grid>
            <Grid container marginBottom="24px">
              <Grid item xs={isXXSM ? 6 : 4} sm={3} md={2}>Lowest votes:</Grid>
              <Grid item xs={6}>{getOrderedItemsFromVotes(renderData, 'lowest')}</Grid>
            </Grid>
            <TextField
              onChange={debouncedInputChange}
              label="filter"
              placeholder="Filter table results"
              variant="standard"
            />
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
                  {filteredData?.map((row: FactType, index: number) => (
                    <TableRow key={row.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell sx={{ maxWidth: '50ch', minWidth: '25ch' }}>
                        {row.text}
                      </TableCell>
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