import 'dotenv/config'
import { Types } from 'mongoose'
import { UserModel } from '@/entities'
import { connect_db } from '@/settings'
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
      createdUsers.map((u) => (u._id as Types.ObjectId).toString()),
    )
  } catch (err) {
    console.error('Seeding error:', err)
  } finally {
    process.exit(0)
  }
}

seedmemes()
