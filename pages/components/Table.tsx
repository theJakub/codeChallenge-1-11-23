import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { FactType } from './Home';
import Button from './Button';

export interface TablePropType {
  filteredData: FactType[],
  handleDownvote: Function,
  handleUpvote: Function,
};

const MyTable = ({ filteredData, handleDownvote, handleUpvote }: TablePropType) => (
  <TableContainer>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell />
        <TableCell>Fact</TableCell>
        <TableCell align="right" sx={{ minWidth: 'fit-content', whiteSpace: 'no-wrap'}}>
          Vote Count
        </TableCell>
        <TableCell align="center" sx={{ minWidth: 'fit-content', whiteSpace: 'no-wrap'}}>
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
            <Grid container columnSpacing="8px" rowSpacing="8px" justifyContent="flex-end">
              <Grid item>
                <Button onClick={() => handleDownvote(row.id)} variant="cancel">
                  Downvote
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={() => handleUpvote(row.id)} variant="submit">
                  Upvote
                </Button>
              </Grid>
            </Grid>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
);

export default MyTable;