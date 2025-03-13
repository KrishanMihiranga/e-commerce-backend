const errors = {
    validationFailed: {
        statusCode: 400,
        message: 'validation Failed',
        error: 'Bad Request',
        code: 'BAD_REQUEST'
    },
    categoryNotFound: {
        statusCode: 404,
        message: 'category Not Found',
        error: 'Not Found',
        code: 'NOT_FOUND'
    },
    categoryAlreadyExists: {
        statusCode: 400,
        message: 'category Already Exists',
        error: 'Bad Request',
        code: 'BAD_REQUEST'
    }
}


export default errors;