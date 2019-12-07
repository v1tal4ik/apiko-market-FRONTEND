import axios from 'axios';


const getTours = () => (
  axios.get('/tours')
    .then(({ data }) => data)
    .catch((err) => {
      throw new Error(err.message);
    })
);

export {
  getTours,
};
