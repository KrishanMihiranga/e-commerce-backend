const errors = {
    validationFailed: {
        statusCode: 400,
        message: 'Validation failed. Please check the provided data.',
        code: 'VALIDATION_ERROR'
    },
    categoryNotFound: {
        statusCode: 404,
        message: 'The specified category was not found.',
        code: 'CATEGORY_NOT_FOUND'
    },
    categoryAlreadyExists: {
        statusCode: 409,
        message: 'A category with this name already exists.',
        code: 'CATEGORY_ALREADY_EXISTS'
    },
    colorAlreadyExists: {
        statusCode: 409,
        message: 'This color already exists.',
        code: 'COLOR_ALREADY_EXISTS'
    },
    sizeAlreadyExists: {
        statusCode: 409,
        message: 'This size already exists.',
        code: 'SIZE_ALREADY_EXISTS'
    },
    ProductAlreadyExists: {
        statusCode: 409,
        message: 'A product with this name already exists.',
        code: 'PRODUCT_ALREADY_EXISTS'
    },
    colorNotFound: {
        statusCode: 404,
        message: 'The specified color was not found.',
        code: 'COLOR_NOT_FOUND'
    },
    sizeNotFound: {
        statusCode: 404,
        message: 'The specified size was not found.',
        code: 'SIZE_NOT_FOUND'
    },
    NotEnoughStockAvailable: {
        statusCode: 400,
        message: 'Insufficient stock available for the requested quantity.',
        code: 'INSUFFICIENT_STOCK'
    },
    productImagesRequired: {
        statusCode: 400,
        message: 'At least one product image is required.',
        code: 'PRODUCT_IMAGES_REQUIRED'
    },
    productPriceRequired: {
        statusCode: 400,
        message: 'Product price is required and must be greater than 0.',
        code: 'PRODUCT_PRICE_REQUIRED'
    },
    productSizesRequired: {
        statusCode: 400,
        message: 'At least one product size is required.',
        code: 'PRODUCT_SIZES_REQUIRED'
    },
    productDescriptionRequired: {
        statusCode: 400,
        message: 'A product description is required and cannot be empty.',
        code: 'PRODUCT_DESCRIPTION_REQUIRED'
    },
    ProductNotFound: {
        statusCode: 404,
        message: 'The requested product was not found.',
        code: 'PRODUCT_NOT_FOUND'
    },
    TransactionFailError: {
        statusCode: 409,
        message: 'Transaction failed due to conflicting operations.',
        code: 'TRANSACTION_CONFLICT'
    },
};

export default errors;
