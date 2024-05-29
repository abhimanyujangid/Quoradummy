const express = require("express"); // Import the express module
const app = express(); // Create an instance of an Express application
const port = 8020; // Define the port number to listen on
const path = require("path"); // Import the path module to handle file paths
const { v4: uuidv4 } = require('uuid'); // Import the uuid module to generate unique IDs, using the v4 method

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data sent with POST requests

app.set('view engine', 'ejs'); // Set EJS as the templating engine
app.set('views', path.join(__dirname, 'views')); // Set the directory for EJS views/templates
app.use(express.static(path.join(__dirname, "public"))); // Serve static files (like CSS) from the 'public' directory

// Initial data array with posts, each post has a unique ID, username, and content
let posts = [
    { id: uuidv4(), username: "Abhimanyu", content: "I love coding" },
    { id: uuidv4(), username: "Anish", content: "coding" },
    { id: uuidv4(), username: "Aryan", content: "Flutter" },
    { id: uuidv4(), username: "Adish", content: "I love DSA" }
];

// Route to display all posts
app.get('/posts', (req, res) => {
    res.render('index', { posts }); // Render the 'index.ejs' template and pass the 'posts' array to it
});

// Route to display a form for creating a new post
app.get('/posts/new', (req, res) => {
    res.render('new'); // Render the 'new.ejs' template, which contains the form
});

// Route to handle form submission for creating a new post
app.post('/posts', (req, res) => {
    const { username, content } = req.body; // Extract 'username' and 'content' from the request body
    const id = uuidv4(); // Generate a new unique ID for the new post
    posts.push({ id, username, content }); // Add the new post to the 'posts' array
    res.redirect('/posts'); // Redirect the client to the '/posts' route to see all posts
});

// Route to display a single post based on its ID
app.get('/posts/:id', (req, res) => {
    const { id } = req.params; // Extract 'id' from the request parameters
    const post = posts.find(p => p.id === id); // Find the post with the matching ID in the 'posts' array
    res.render('show', { post }); // Render the 'show.ejs' template and pass the found post to it
});

// Route to display a form for editing an existing post
app.get('/posts/:id/edit', (req, res) => {
    const { id } = req.params; // Extract 'id' from the request parameters
    const post = posts.find(p => p.id === id); // Find the post with the matching ID in the 'posts' array
    res.render('edit', { post }); // Render the 'edit.ejs' template and pass the found post to it
});

// Route to handle form submission for editing an existing post
app.post('/posts/:id/edit', (req, res) => {
    const { id } = req.params; // Extract 'id' from the request parameters
    const { content } = req.body; // Extract 'content' from the request body
    const post = posts.find(p => p.id === id); // Find the post with the matching ID in the 'posts' array
    post.content = content; // Update the content of the post
    res.redirect(`/posts/${id}`); // Redirect to the post's detail page
});

// Route to handle the deletion of a post
app.post('/posts/:id/delete', (req, res) => {
    const { id } = req.params; // Extract 'id' from the request parameters
    posts = posts.filter(p => p.id !== id); // Remove the post with the matching ID from the 'posts' array
    res.redirect('/posts'); // Redirect to the list of posts
});

// Start the server and listen on the defined port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
