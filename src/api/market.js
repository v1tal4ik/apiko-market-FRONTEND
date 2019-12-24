import axios from 'axios';


const getTours = () => (
  axios.get('/tours')
    .then(({ data }) => data)
    .catch((err) => {
      throw new Error(err.message);
    })
);

const addNewTour = obj => (
  axios.post('/tours', obj)
    .then(({ data }) => data)
    .catch(err => ({ status: false, message: err.message }))
);

const setTourImage = (img) => {
  const formData = new FormData();
  formData.append('tour-img', img, img.name);
  return axios.post('/tours/img', formData)
    .then(({ data }) => data)
    .catch(() => ({ status: false, url: 'https://res.cloudinary.com/v1tal4ik-cloud/image/upload/v1577205096/vxpyrzxeuqsn862nfiuj.png' }));
};

export {
  getTours,
  addNewTour,
  setTourImage,
};
