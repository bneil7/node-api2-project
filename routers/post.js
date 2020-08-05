const router = require("express").Router();

const Db = require("../data/db.js");

// POST	/api/posts
router.post("/", (req, res) => {
  const post = req.body;

  if (!post.title || !post.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else {
    Db.insert(post)
      .then(database => {
        res.status(201).json(post);
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the post to the database",
        });
      });
  }
});

// POST	/api/posts/:id/comments
router.post("/:id/comments", (req, res) => {
  const id = req.params.id;

  const comment = { text: req.body.text, post_id: id };

  if (!comment.text) {
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });
  } else {
    Db.findPostComments(req.params.id)
      .then(comments => {
        if (comments) {
          Db.insertComment(comment);
          res.status(201).json(comment);
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist.",
          });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          error: "There was an error while saving the comment to the database",
        });
      });
  }
});

// GET api/posts
router.get("/", (req, res) => {
  Db.find(req.query)
    .then(database => {
      res.status(200).json({ database });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

// GET api/posts/:id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Db.findById(id)
    .then(database => {
      const post = database[0];
      console.log(post);

      if (post) {
        res.status(200).json({ database });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

// GET api/posts/:id/comments
router.get("/:id/comments", (req, res) => {
  const id = req.params.id;
  Db.findById(id)
    .then(database => {
      const post = database[0];
      console.log(post);

      if (post) {
        Db.findPostComments(post.id)
          .then(comments => {
            res.status(200).json({ comments });
          })
          .catch(error => {
            res
              .status(500)
              .json({
                error: "The comments information could not be retrieved.",
              });
          });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

// DELETE	/api/posts/:id
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Db.remove(id)
    .then(() => {
      res.send(204);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The post with the specified ID does not exist." });
    });
});

// PUT /api/posts/:id
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const post = req.body;

  if (!post.title || !post.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else {
    Db.update(id, post)
      .then(item => {
        if (item > 0) {
          res.status(200).json(post);
        } else {
          res.status(400).json({
            message: "The post with the specified ID does not exist.",
          });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "The posts information could not be retrieved." });
      });
  }
});

module.exports = router;
