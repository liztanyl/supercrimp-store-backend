export default function initUsersController(db) {
	const index = async (request, response) => {
		try {
		} catch (error) {
			console.log(error);
			response.status(400).send("Something went wrong");
		}
	};

	const edit = async (request, response) => {
		try {
		} catch (error) {
			console.log(error);
			response.status(400).send("Something went wrong");
		}
	};

	const login = async (request, response) => {
		try {
		} catch (error) {
			console.log(error);
			response.status(400).send("Something went wrong");
		}
	};

	const signup = async (request, response) => {
		try {
		} catch (error) {
			console.log(error);
			response.status(400).send("Something went wrong");
		}
	};

	return {
		index,
		edit,
		login,
		signup,
	};
}
