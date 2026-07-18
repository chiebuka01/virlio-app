import app from './app'
import { connectDB } from './db'

connectDB()

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server on port ${port}`)
})
