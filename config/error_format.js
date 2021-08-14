module.exports.format = (filePath, functionName, request, err) => {
	return {
		"location": filePath,
		"function": functionName,
		"accessing url": request.originalUrl,
		"query": request.query,
		"params": request.params,
		"Error Msg": err.toString()
	}
}