exports.success = function(req, res, message = '', status = 200){
    res.status(status).send({
        error:false,
        status:status,
        body:message
    });
}

exports.error = function(req, res, message, status = 500){
    const messageError = message || 'Internal server error'
    res.status(status).send({
        error:true,
        status:status,
        body:messageError
    });
}


