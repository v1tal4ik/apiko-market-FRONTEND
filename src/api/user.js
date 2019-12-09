import axios from 'axios';

// register
const isEmailUnique = ({ email }) => (
  axios.get(`/auth/registration/email?email=${email}`)
    .then(({ data }) => data)
    .catch(({ response }) => {
      const { status, msg } = response.data;
      console.error(msg);
      return status;
    })
);


const addNewUser = ({ email, fullName, password }) => (
  axios.post('/auth/registration/user', { email, fullName, password })
    .then(({ data }) => data)
    .catch(({ response }) => {
      const { status, msg } = response.data;
      console.error(msg);
      return { status, msg };
    })
);

// login
const getUserByEmail = ({ email }) => (
  axios.get(`/auth/login/email?email=${email}`)
    .then(({ data }) => data)
    .catch(({ response }) => {
      const { status, msg } = response.data;
      console.error(msg);
      return { status, user: {} };
    })
);

const isPassValid = ({ email, password }) => (
  axios.get(`/auth/login/password?email=${email}&password=${password}`)
    .then(({ data }) => data)
    .catch(() => false)
);


const singInById = ({ id }) => (
  axios.get(`/auth/singIn?id=${id}`)
    .then(({ data }) => data)
    .catch(() => false)
);

const getItemList = () => (
  axios.get('/itemList')
    .then(({ data }) => data)
    .catch((err) => {
      throw new Error(err.message);
    })
);


export {
  isEmailUnique,
  addNewUser,
  getUserByEmail,
  isPassValid,
  singInById,
  getItemList,
};
