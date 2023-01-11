import { useEffect, useState } from 'react';
import {
  Button,
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

  return (
    <Container>
      <h1>Jakub's Cat Facts</h1>
      <Grid>
        {isLoading && <h3>Loading...</h3>}
        {!isLoading && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Fact</TableCell>
                  <TableCell>Verified</TableCell>
                  <TableCell>Vote Count</TableCell>
                  <TableCell align="right">
                    Place Vote
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row: Row) => (
                  <TableRow key={row._id}>
                    <TableCell sx={{ maxWidth: '50ch'}}>{row.text}</TableCell>
                    <TableCell>{row.status?.verified ? 'True' : 'False'}</TableCell>
                    <TableCell>{votes[row._id] || '0'}</TableCell>
                    <TableCell>
                      <Button onClick={() => console.log('vote')}>Vote!</Button>
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