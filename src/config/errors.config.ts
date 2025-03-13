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
        message: 'Category Already Exists',
        error: 'Bad Request',
        code: 'BAD_REQUEST'
    },
    colorAlreadyExists: {
        statusCode: 400,
        message: 'Color Already Exists',
        error: 'Bad Request',
        code: 'BAD_REQUEST'
    },
    colorNotFound: {
        statusCode: 404,
        message: 'Color Not Found',
        error: 'Not Found',
        code: 'NOT_FOUND'
    },
}


export default errors;