import axios from 'axios';

// register
const isEmailUnique = ({ email }) => (
  axios.get(`/auth/registration/email?email=${email}`)
    .then(({ data }) => data)
    .catch(({ response }) => response.data.status)
);


const addNewUser = ({ email, fullName, password }) => (
  axios.post('/auth/registration/user', { email, fullName, password })
    .then(({ data }) => data)
    .catch(({ response }) => {
      const { status, msg } = response.data;
      return { status, msg };
    })
);

// login
const getUserByEmail = ({ email }) => (
  axios.get(`/auth/login/email?email=${email}`)
    .then(({ data }) => data)
    .catch(({ response }) => {
      const { status } = response.data;
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

const changeUserInfo = userData => (
  axios.patch('/profile', { userData })
    .then(({ data }) => data)
    .catch((err) => {
      throw new Error(err.message);
    })
);


const saveProfileImg = (img) => {
  const formData = new FormData();
  formData.append('profile-img', img, img.name);
  return axios.post('/profile/img', formData)
    .then(({ data }) => data)
    .catch(({ message }) => ({
      status: false,
      message,
    }));
};


export {
  isEmailUnique,
  addNewUser,
  getUserByEmail,
  isPassValid,
  singInById,
  changeUserInfo,
  saveProfileImg,
};
