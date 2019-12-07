import axios from 'axios';


const getItemList = () => (
  axios.get('/itemList')
    .then(({ data }) => data)
    .catch((err) => {
      throw new Error(err.message);
    })
);

export {
  getItemList,
};
