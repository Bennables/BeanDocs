import { prisma } from '../lib/prisma.js'

async function main() {
  // Create a new user with a post
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      password: "",
    },
    include: {
      docs: true,// when you search for a user, you get all associated docs
    },
  })
  console.log('Created user:', user)

  // Fetch all users with their docs
  const allUsers = await prisma.user.findMany({
    include: {
      docs: true,
    },
  })
  console.log('All users:', JSON.stringify(allUsers, null, 2))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })