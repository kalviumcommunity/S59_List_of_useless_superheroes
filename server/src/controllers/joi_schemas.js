const joi = require("joi")

const postScheme = joi.object({
    author: joi.string().required(),
    title: joi.string().required(),
    description: joi.string().required(),
    body: joi.array().items(joi.object({
        subtitle: joi.string(),
        point: joi.string()
    }))
})


const validatePost = (data) => {
    return postScheme.validate(data, { abortEarly: false })
}


module.exports = {
    postScheme,
    validatePost,
}