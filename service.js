const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const postFile = path.join(__dirname, 'posts.json')

const posts = require(postFile)

function getPost(req, res) {
  const title = req.query.title
  const post = posts.find((post) => post.title === title)
  if (!post) return res.status(404).send('Data not found')

  res.status(200).json(post)
}

function getPosts(req, res) {
  res.status(200).json(posts)
}

async function addPost(req, res) {
  let post = req.body
  post = {
    id: uuidv4(),
    title: post.title,
    image: '',
    description: post.description,
    comment: '',
  }
  try {
    posts.push(post)
    writeFile('Added')
  } catch (err) {
    console.log(err)
  }

  res.status(200).json(posts)
}

async function updatePost(req, res) {
  const id = req.params.id
  const comment = req.body.comment

  try {
    const index = posts.findIndex((post) => post.id === id)
    if (index === -1) return res.status(404).send('Data not found')
    posts[index].comment = comment
    writeFile('Updated')
  } catch (err) {
    console.log(err)
  }

  res.status(200).json(posts)
}

async function deletePost(req, res) {
  const id = req.params.id

  try {
    const index = posts.findIndex((post) => post.id === id)
    if (index === -1) return res.status(404).send('Data not found')
    posts.splice(index, 1)
    writeFile('Deleted')
  } catch (err) {
    console.log(err)
  }

  res.status(200).json(posts)
}

async function writeFile(message) {
  await fs.promises.writeFile(
    'posts.json',
    JSON.stringify(posts),
    function (err) {
      if (err) throw err
      else console.log(message)
    }
  )
}

module.exports = {
  getPost,
  getPosts,
  addPost,
  updatePost,
  deletePost,
}
