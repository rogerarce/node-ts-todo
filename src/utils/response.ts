
export enum HttpResponses {
	OK = 200,
	INVALID_BODY = 400,
	NOT_AUTHORIZED = 401,
	SERVER_ERROR = 500,
}

export const success = (
	status: Exclude<HttpResponses, HttpResponses.SERVER_ERROR & HttpResponses.NOT_AUTHORIZED & HttpResponses.INVALID_BODY>, 
	data: Array<any> | object | string
) => {
	return {
		data,
		statusCode: status
	}
}


export const error = (status: Exclude<HttpResponses, HttpResponses.OK>) => {
	return {
		statusCode: status,
	}
}
