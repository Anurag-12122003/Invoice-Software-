import { Button, Container, Paper } from "@mui/material"
import ThemeSwitcher from "./theme/ThemeSwitcher"

const App = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <ThemeSwitcher />

        <Button
          variant="contained"
          sx={{ mt: 3 }}
        >
          Save Invoice
        </Button>
      </Paper>
    </Container>
  )
}

export default App