require('dotenv').config()
const mongoose = require('mongoose')
const colors = require('colors')
const bcrypt = require('bcrypt')
const MONGO_STRING = process.env.MONGO_STRING

if (!MONGO_STRING) {
  console.error(colors.red('MONGO_STRING not found in environment variables.'))
  process.exit(1)
}

const mock_users = [
  {
    _id: '68f74a56962880f2c850e151',
    username: 'basit',
    email: 'basit.test@example.com',
    password: '$2b$12$q7nHI1TDyEldjxSIJ2k3LOwARZcRdrp7Pb.l.LuBMR2CsLBkehhXi',
    verficationCode: '000000',
    verficationExpiry: '2025-10-25T09:03:55.989427Z',
    isShowingIdentity: true,
    isVerifiedUser: true,
    isAnon: false,
    friends: [],
    requests: [],
    blocks: [],
    createdAt: '2025-10-25T09:03:55.989440Z',
    updatedAt: '2025-10-25T09:03:55.989441Z',
    __v: 0,
  },
  {
    _id: '68f74a56962880f2c850e152',
    username: 'faaiz',
    email: 'faaiz.test@example.com',
    password: bcrypt.hashSync('Faaiz.1234', 10),
    verficationCode: '111111',
    verficationExpiry: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 7,
    ).toISOString(),
    isVerifiedUser: true,
    isAnon: false,
    isShowingIdentity: true,
    friends: [],
    requests: [],
    blocks: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  },
  {
    _id: '68f74a56962880f2c850e153',
    username: 'daud',
    email: 'daud.test@example.com',
    password: bcrypt.hashSync('Daud.1234', 10),
    verficationCode: '111111',
    verficationExpiry: new Date(
      Date.now() + 1000 * 60 * 60 * 24 * 7,
    ).toISOString(),
    isVerifiedUser: true,
    isAnon: false,
    isShowingIdentity: true,
    isAcceptingMessages: true,
    friends: [],
    requests: [],
    blocks: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  },
]

async function seedDatabase() {
  try {
    console.log(colors.blue('Connecting to MongoDB...'))
    await mongoose.connect(MONGO_STRING)
    console.log(colors.green('Database connected successfully.'))

    // Define User schema inline if needed
    const userSchema = new mongoose.Schema({
      username: String,
      email: String,
      password: String,
      isVerifiedUser: Boolean,
      isShowingIdentity: Boolean,
      isAnon: Boolean,
      isAcceptingMessages: Boolean,
      friends: Array,
      requests: Array,
      blocks: Array,
      verficationCode: String,
      verficationExpiry: String,
      createdAt: String,
      updatedAt: String,
      __v: Number,
    })

    const UserModel = mongoose.model('users', userSchema)

    console.log(colors.yellow('Deleting existing users...'))
    await UserModel.deleteMany({})
    console.log(colors.green('Old users deleted.'))

    console.log(colors.blue('Seeding new users...'))
    const createdUsers = await UserModel.insertMany(mock_users)
    console.log(
      colors.green(
        `Users seeded successfully: ${createdUsers.length} users created`,
      ),
    )
    createdUsers.forEach((u) => {
      console.log(colors.cyan(`  - ${u.username} (${u.email})`))
    })
  } catch (err) {
    console.error(colors.red(`Seeding error: ${err}`))
  } finally {
    await mongoose.disconnect()
    console.log(colors.blue('Database connection closed.'))
    process.exit(0)
  }
}

seedDatabase()
