import { Paper, Typography } from '@mui/material'

export default function Footer() {
  return (
    <Paper  component="footer">
      <Typography
        py={2}
        textAlign="center"
        bgcolor="primary.main"
        color="common.white"
        variant="body1"
      >
        Project made by Sebastian Jędrak for portfolio purposes
      </Typography>
    </Paper>
  )
}
