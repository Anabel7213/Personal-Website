# Personal Website

This is my personal website that I first created when I just started learning programming. Since then, it has evolved from a basic static HTML CSS webpage to a comprehensive platform with features like a fully functional blog editor, databases, and Mailchimp integration.

The website is built using Node.js, EJS, and Express.js, employing advanced techniques such as route mounting and the MVC architecture. The newsletter form interacts with the Mailchimp API to handle subscriber data in the background.

The blog editor is designed to be accessible only by the website owner (myself) and is hidden from public access. It offers various blocks to construct an article. Instead of a drag-and-drop-like editor I came up with a simpler and less time consuming approach, and used special symbols to represent specific blocks, which are triggered and displayed on the screen if a corresponding symbol is typed at the beginning of a text. This allows for the creation of customized articles with different layouts without adding excessive complexity to the functionality.

The blog editor is powered by MongoDB Atlas, enabling operations such as fetching (all or by ID), creating, and deleting blog posts using Mongoose.
