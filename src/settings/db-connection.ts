import colors from 'colors'
import mongoose from 'mongoose'

interface ConnectionObject {
  isConnected?: number
}

const connection: ConnectionObject = {}

const connect_db = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log(colors.yellow('DB already connected.'))
    return
  }

  try {
    const uri = process.env.MONGODB_URI
    if (!uri) {
      console.log(colors.red('MONGODB_URI not found in environment variables.'))
      process.exit(1)
    }

    const db = await mongoose.connect(uri)
    connection.isConnected = db.connections[0].readyState

    console.log(colors.green('Database connected successfully.'))
  } catch (error: unknown) {
    console.error(colors.red(`DB connection error: ${error}`))
    process.exit(1)
  }
}

export { connect_db }
