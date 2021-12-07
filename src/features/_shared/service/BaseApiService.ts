import axios from 'axios';

export default class BaseApiService {
	private baseURL?: string = String(process.env.REACT_APP_API_ENDPOINT);

	private authStorageName = 'SSID';

	constructor(baseUrl?: string) {
		this.baseURL = typeof baseUrl == 'undefined' ? this.baseURL : baseUrl;
	}

	private getHeader(useAuth?: boolean, isMultipart?: boolean) {
		let forgeHeader = {
			'content-type': isMultipart ? 'multipart/form-data' : 'application/json',
		};

		if (useAuth && this.getAuthStorage()) {
			forgeHeader = {
				...forgeHeader,
				...{
					Authorization: 'Bearer ' + this.getAuthStorage(),
				},
			};
		}
		return forgeHeader;
	}

	private async baseHTTP(
		method: 'get' | 'post' | 'delete' | 'put',
		URL: string,
		body?: any,
		parameter?: any,
		useAuth?: boolean,
		isMultipart?: boolean
	) {
		const response: {
			data?: any;
			isFailed: boolean;
			message: string;
			original: any;
		} = {
			isFailed: false,
			message: '',
			data: [],
			original: {},
		};

		try {
			const request = await axios({
				method: method,
				url: this.baseURL + URL,
				headers: this.getHeader(useAuth, isMultipart),
				data: body,
				params: parameter,
				timeout: 10000,
			});

			Object.assign(response, {
				data: await request.data,
				message: request?.data?.messages
					? request?.data?.messages
					: 'SUCCESSFULY ' + method + ' DATA',
				original: request,
			});
		} catch (err: any) {
			if (err.response?.status === 401) {
				alert(err.response.message || 'UNAUTHORIZED');
				window.dispatchEvent(new Event('APP_AUTH_UNAUTHORIZED'));
				Object.assign(response, {
					isFailed: true,
					message: err?.response?.data?.message,
					data: '',
				});
			}
			if (err.response?.status === 400) {
				Object.assign(response, {
					isFailed: true,
					// message: JSON.stringify(Object.values(err.response.data.messages).join(",")),
					message: Object.keys(err.response.data.messages)
						.map(function (key) {
							return '' + key + ':' + err.response.data.messages[key];
						})
						.join('\r\n \r\n'),
					data: '',
				});
			} else {
				Object.assign(response, {
					isFailed: true,
					message: err?.response?.data?.messages?.error
						? err?.response?.data?.messages?.error
						: err?.response?.data?.message,
					data: '',
				});
			}
		}

		return response;
	}

	public getStorage(key: string) {
		try {
			let val = window.localStorage.getItem(key);
			val = JSON.parse(val as string);
			return val;
		} catch (error) {
			return null;
		}
	}

	public setStorage(key: string, value: any) {
		try {
			const val = JSON.stringify(value);
			window.localStorage.setItem(key, val);
			return true;
		} catch (error) {
			return false;
		}
	}

	public deleteStorage(key: string) {
		try {
			window.localStorage.removeItem(key);
			return true;
		} catch (error) {
			return false;
		}
	}

	public setAuthStorage(val: string) {
		const dt = this.setStorage(this.authStorageName, val);
		return dt;
	}

	public deleteAuthStorage() {
		this.deleteStorage(this.authStorageName);
		return true;
	}

	public getAuthStorage() {
		const dt = this.getStorage(this.authStorageName);
		return dt;
	}

	public baseGET(
		url: string,
		parameter?: any,
		useAuth?: boolean,
		isMultipart?: boolean
	) {
		return this.baseHTTP('get', url, {}, parameter, useAuth, isMultipart);
	}

	public baseDELETE(
		url: string,
		parameter?: any,
		useAuth?: boolean,
		isMultipart?: boolean
	) {
		return this.baseHTTP('delete', url, {}, parameter, useAuth, isMultipart);
	}

	public basePOST(
		url: string,
		parameter?: any,
		body?: any,
		useAuth?: boolean,
		isMultipart?: boolean
	) {
		return this.baseHTTP('post', url, body, parameter, useAuth, isMultipart);
	}

	public basePUT(
		url: string,
		parameter?: any,
		body?: any,
		useAuth?: boolean,
		isMultipart?: boolean
	) {
		return this.baseHTTP('get', url, {}, parameter, useAuth, isMultipart);
	}

	public mockHTTP(
		timeout?: any,
		returnObject?: any,
		returnMessage?: any,
		shouldFailed?: boolean
	) {
		return new Promise((resolve) =>
			setTimeout(() => {
				const response: { data?: any; isFailed: boolean; message: string } = {
					isFailed:
						typeof shouldFailed === 'undefined' || shouldFailed === false
							? false
							: true,
					message: returnMessage,
					data: returnObject,
				};

				resolve(response);
			}, timeout)
		);
	}
}
