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

const useFetchData = () => useQuery(
  'tableData1',
  async () => {
    const res = await fetch('https://cat-fact.herokuapp.com/facts');
    return await res.json();
  },
);

interface Row {
  _id: string,
  status: { verified: boolean },
  text: string,
};

interface InitialState {
  [key:string]: number,
};

const Home = () => {
  const [votes, setVotes] = useState<InitialState>({});
  const { isLoading, data } = useFetchData();

  const handleUpvote = (id: string ) => {
    if (votes[id]) {
      setVotes((prevState) => ({ ...prevState, [id]: prevState[id] + 1}));
    } else {
      setVotes((prevState) => ({ ...prevState, [id]: 1}));
    }
  };

  const handleDownvote = (id: string ) => {
    if (votes[id]) {
      setVotes((prevState) => ({ ...prevState, [id]: prevState[id] - 1}));
    } else {
      setVotes((prevState) => ({ ...prevState, [id]: -1}));
    }
  };

  return (
    <Container>
      <h1>Jakub's Cat Facts UI</h1>
      <Grid>
        {isLoading && <h3>Loading...</h3>}
        {!isLoading && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Fact</TableCell>
                  <TableCell align="right">Vote Count</TableCell>
                  <TableCell align="center">
                    Place Vote
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row: Row) => (
                  <TableRow key={row._id}>
                    <TableCell sx={{ maxWidth: '50ch'}}>{row.text}</TableCell>
                    <TableCell align="right">{votes[row._id] || '0'}</TableCell>
                    <TableCell align="right">
                      <ButtonGroup variant="outlined">
                        <Button onClick={() => handleDownvote(row._id)}>
                          Downvote
                        </Button>
                        <Button onClick={() => handleUpvote(row._id)}>
                          Upvote
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Container>
  );
};

export default Home;