const errors = {
    validationFailed: {
        statusCode: 400,
        message: 'validation Failed',
        code: 'BAD_REQUEST'
    },
    categoryNotFound: {
        statusCode: 404,
        message: 'category Not Found',
        code: 'NOT_FOUND'
    },
    categoryAlreadyExists: {
        statusCode: 400,
        message: 'Category Already Exists',
        code: 'BAD_REQUEST'
    },
    colorAlreadyExists: {
        statusCode: 400,
        message: 'Color Already Exists',
        code: 'BAD_REQUEST'
    },
    sizeAlreadyExists: {
        statusCode: 400,
        message: 'Size Already Exists',
        code: 'BAD_REQUEST'
    },
    ProductAlreadyExists: {
        statusCode: 400,
        message: 'Product Already Exists',
        code: 'BAD_REQUEST'
    },
    colorNotFound: {
        statusCode: 404,
        message: 'Color Not Found',
        code: 'NOT_FOUND'
    },
    sizeNotFound: {
        statusCode: 404,
        message: 'Size Not Found',
        code: 'NOT_FOUND'
    },
    productImagesRequired: {
        statusCode: 404,
        message: 'product Images Required',
        code: 'BAD_REQUEST'
    },productPriceRequired: {
        statusCode: 400,
        message: 'Product price is required and must be greater than 0.',
        code: 'BAD_REQUEST'
    },
    productSizesRequired: {
        statusCode: 400,
        message: 'Product sizes are required and must not be empty.',
        code: 'BAD_REQUEST'
    },
    productDescriptionRequired: {
        statusCode: 400,
        message: 'Product description is required and cannot be empty.',
        code: 'BAD_REQUEST'
    },
    ProductNotFound: {
        statusCode: 404,
        message: 'Product Not Found.',
        code: 'NOT_FOUND'
    }
}


export default errors;