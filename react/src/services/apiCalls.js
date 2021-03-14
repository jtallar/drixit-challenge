export default function getGifs(keyword = '') {
    
    const apiURL = 'https://api.giphy.com/v2/gifs/search'

    return fetch(apiURL)
      .then(res => res.json())
      .then(response => {
        const {data = []} = response // [] es valor default
        // return data
        return ['dasdsa', keyword]
      })
      .catch(error => {
          return ['errro', keyword]
      })
}