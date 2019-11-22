export const isValidEmail = (email) => {
	const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (reg.test(email) === true) {
		return true;
	}
	return false;
};

export const randomString = (length) => {
	return Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)).toString(36).slice(1);
};

export const isValidPassword = (password, length) => {
	if (password.length >= length) {
		return true;
	}
	return false;
};

export const isValidComparedPassword = (password, confirmPassword) => {
	if (password == confirmPassword) {
		return true;
	}
	return false;
};

export const isValidPhoneNumber = (phoneNumber) => {
	if (phoneNumber.length >= 10) {
		for (i = 0; i < phoneNumber.length; i++) {
			if (isNaN(phoneNumber[i])) {
				return false;
			}
		}
		return true;
	} else {
		return false;
	}
};
