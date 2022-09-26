const error = (error) => {
    return {
        status: false,
        errorCode: error.code,
        errorMessage: error.message
      }
}

const success = (data) => {
    return {
        status: true,
        data: data
      }
}

const apiReturns = {
    error,
    success
};

export default apiReturns;