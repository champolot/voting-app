import axios from 'axios';

export default function authLocalStore(user, mapLocalStore) {
  const storeName = 'thekholm80VotingApp';
  // const url = `http://localhost:8000/user/history/${ user }`;  // development
  const url = `/user/history/${ user }`;  // production

  axios.get(url)
       .then( (response) => {
         const storeName = 'thekholm80VotingApp';
         const payload = response.data;

         localStorage.setItem(storeName, JSON.stringify(payload));
         mapLocalStore(JSON.parse(localStorage.getItem(storeName)));
       })
       .catch( (error) => {
         console.warn('Axios error', error);
       });
}
