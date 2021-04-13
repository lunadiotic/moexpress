const db = require('../models')
const Post = db.posts

exports.findAll = (req, res) => {
    const title = req.query.title
    let condition = title ? {
        title: {
            $regex: new RegExp(title),
            $options: "1"
        }
    } : {}

    Post.find(condition)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(500).send({
            message:
                err.message || "Some error while retrieving posts."
        })
    })
}

exports.create = (req, res) => {
    const post = new Post({
        title: req.body.title,
        body: req.body.body,
        published: req.body.published ? req.body.published : false
    })

    post.save(post)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message: 
                err.message || "Something wrong while creating resource"      
        })
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id

    Post.findById(id)
    .then((result) => {
        res.send(result)
    }).catch((err) => {
        res.status(409).send({
            message:
                err.message || `Resource with id ${id} is not found!`
        })
    });
}

exports.update = (req, res) => {
    const id = req.params.id

    Post.findByIdAndUpdate(id, req.body)
    .then((result) => {
        if (!result) {
            res.status(404).send({
                message: 'Not found!'
            })
        } else {
            res.send({
                message: "Post was updated."
            })
        }
    }).catch((err) => {
        res.status(409).send({
            message: 
                err.message || `Cannot update Post with id: ${id}.`
        })
    });
}

exports.delete = (req, res) => {
    const id = req.params.id

    Post.findByIdAndRemove(id)
    .then((result) => {
        if(!result) {
            res.status(404).send({
                message: 'Not Found!'
            })
        } else {
            res.send({
                message: 'Post was deleted!'
            })
        }
    }).catch((err) => {
        res.status(409).send({
            message: 
                err.message || `Cannot delete Post with id: ${id}.`
        })
    });
}