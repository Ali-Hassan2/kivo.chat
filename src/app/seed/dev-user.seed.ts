import 'dotenv/config'
import { UserModel } from '../../entities/user.model'
import { connect_db } from '../../settings/db-connection'
import { memes } from '../data'

async function seedmemes() {
  try {
    await connect_db()
    console.log('Database connected')
    await UserModel.deleteMany({})
    console.log('Old users deleted.')

    const createdUsers = await UserModel.create(memes)
    console.log(
      'Users seeded successfully:',
      createdUsers.map((u: any) => u._id.toString()),
    )
  } catch (err) {
    console.error('Seeding error:', err)
  } finally {
    process.exit(0)
  }
}

seedmemes()
