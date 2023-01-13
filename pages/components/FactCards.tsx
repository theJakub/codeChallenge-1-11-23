import {
  Box,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { FactType } from './Home';
import Button from './Button';
import { TablePropType } from './Table'

const FactCards = ({ filteredData, handleDownvote, handleUpvote }: TablePropType) => (
  <Box>
    {filteredData?.map((row: FactType, index: number) => (
      <Card sx={{ marginBottom: "16px" }} key={row.id}>
        <CardContent>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography>
                {`Fact #${index + 1}`}
              </Typography>
            </Grid>
            <Grid>
              <Typography>
                {`Votes: ${row.votes}`}
              </Typography>
            </Grid>
          </Grid>
          <Typography>
            {row.text}
          </Typography>
          <CardActions>
            <Grid container columnSpacing="8px" justifyContent="flex-end">
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
          </CardActions>
        </CardContent>
      </Card>
    ))}
  </Box>
);

export default FactCards;