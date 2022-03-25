import ResourceTele from '@utils/resourceTele';

export default new ResourceTele('/Users', {
	loginWithToken: {
		url: 'loginWithToken',
		method: 'post',
	},
	getUser: {
		url: 'me',
		method: 'get',
	},
});