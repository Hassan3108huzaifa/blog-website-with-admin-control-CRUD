const { kv } = require('@vercel/kv')
const fs = require('fs')
const path = require('path')

async function seedData() {
  const dataFilePath = path.join(process.cwd(), 'data', 'blog-data.json')
  const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'))
  await kv.set('posts', data.posts)
  console.log('Data seeded successfully')
}

seedData().catch(console.error)