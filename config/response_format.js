module.exports.success = (res, payload) => {
    return res.status(200).json({
        status: 200,
        message: "Success",
        payload
    });
}

module.exports.created = (res, payload) => {
    return res.status(201).json({
        status: 201,
        message: "Created",
        payload
    });
}

module.exports.accepted = (res) => {
    return res.status(202).json({
        status: 202,
        message: "Accepted"
    });
}

module.exports.bad_request = (res, message="Bad Request") => {
    return res.status(400).json({
        status: 400,
        message
    });
}

module.exports.not_authorized = (res, message="Not Authorized.") => {
    return res.status(401).json({
        status: 401,
        message
    });
}

module.exports.not_found = (res, message="Resource Not Found.") => {
    return res.status(404).json({
        status: 404,
        message
    });
}

module.exports.not_processible = (res, message="Cannot Process Request.") => {
    return res.status(422).json({
        status: 422,
        message
    });
}

module.exports.internal_error = (res, message="Internal Server Error") => {
    return res.status(500).json({
        status:500,
        message
    })
}