import bcrypt from 'bcrypt'

const memes = [
  {
    _id: '68f74a56962880f2c850e151',
    username: 'basit',
    email: 'basit.test@example.com',
    password: '$2b$12$q7nHI1TDyEldjxSIJ2k3LOwARZcRdrp7Pb.l.LuBMR2CsLBkehhXi',
    verficationCode: '000000',
    verficationExpiry: '2025-10-25T09:03:55.989427Z',
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
    friends: [],
    requests: [],
    blocks: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  },
]

export { memes }
