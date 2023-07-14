# Personal Website

This is my personal website that I built when I just started learning programming, so it evolved from being a static HTML CSS webpage to featuring a fully functional blog editor, databases, and Mailchimp. 

Built with Node.JS, EJS, and Express.JS using some advanced techniques like route mounting and MVC. The newsletter form runs with Mailchimp API behind the scenes sending subscribers data. 

The blog editor is meant to only be accessed by the owner of the website (myself) and is therefore a hidden path. It offers a number of different blocks to build an article. I was first thinking to make it into a drag and drop editor but figured a less time consuming approach where a number of special symbols corresponds to a certain block and triggers it's appearance on screen when typed in the beginning of any text. This allows for the creation of customized articles with different layouts without excessive complexity to the functionality. It runs on MongoDB Atlas and is able to fetch (all or by id), create, and delete blog posts with Mongoose.
