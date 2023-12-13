// import express from 'express';
// import mysql from 'mysql2';

// const app = express();

// app.use(express.json());

// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'andrew',
//   password: 'cawl_admech',
//   database: 'chirps',
// });

// function validateBlogPost(blogData) {
//   return !blogData.userId || !blogData.text ? 'userId and text are required fields' : null;
// }
// app.get('/', (req, res) => {
// 	res.status(200).send('Hello World!');
// });

// app.get('/api/blogs', async (req, res) => {
//   try {
//     const [blogPosts] = await pool.query('SELECT * FROM blogs');
//     res.status(200).json({ data: blogPosts });
//   } catch (error) {
//     console.error('Error getting blog posts:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// app.post('/api/blogs', async (req, res) => {
//   try {
//     const validationError = validateBlogPost(req.body);
//     if (validationError) {
//       return res.status(400).json({ message: 'Validation failed', error: validationError });
//     }

//     const [result] = await pool.query('INSERT INTO blogs (userId, text, location) VALUES (?, ?, ?)', [
//       req.body.userId,
//       req.body.text,
//       req.body.location || null,
//     ]);

//     const [savedBlogPost] = await pool.query('SELECT * FROM blogs WHERE id = ?', [result.insertId]);

//     res.status(201).json({ message: 'Blog post created', data: savedBlogPost[0] });
//   } catch (error) {
//     console.error('Error creating blog post:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// app.delete('/api/blogs/:id', async (req, res) => {
//   try {
//     await pool.query('DELETE FROM blogs WHERE id = ?', [req.params.id]);
//     res.status(200).json({ message: 'Blog post deleted' });
//   } catch (error) {
//     console.error('Error deleting blog post:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// app.put('/api/blogs/:id', async (req, res) => {
//   try {
//     const validationError = validateBlogPost(req.body);
//     if (validationError) {
//       return res.status(400).json({ message: 'Validation failed', error: validationError });
//     }

//     await pool.query('UPDATE blogs SET userId = ?, text = ?, location = ? WHERE id = ?', [
//       req.body.userId,
//       req.body.text,
//       req.body.location || null,
//       req.params.id,
//     ]);

//     res.status(200).json({ message: 'Blog post updated' });
//   } catch (error) {
//     console.error('Error updating blog post:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));