import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [photos, setPhotos] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState(true)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    if (fetching) {
        console.log('fetching')
        axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=20_page=${currentPage}`)
            .then((response) => {
                setPhotos([...photos, ...response.data])
                setCurrentPage(prevState => prevState + 1)
                setTotalCount(response.headers['x-total-count'])
            }, )
            .finally(() => setFetching(false))
    }
  }, [fetching])

  useEffect(() =>{
      document.addEventListener('scroll', scrollHandler)
      return function () {
        document.removeEventListener('scroll', scrollHandler)
      }
  }, [])

  const scrollHandler = (e) => {
      if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
        setFetching(true)
      }
  }

  return (

    <div className="App">
        <div className="container">
          {
              photos.map(photo =>
                      <div className="card m-3">
                        <img src={photo.thumbnailUrl} className="card-img-top" />
                        <div className="card-body">
                            <p className="card-text"><b>{photo.title}</b></p>
                            <p>{photo.id}</p>
                        </div>
                      </div>
                  )
          }
        </div>
    </div>
  );
}

export default App;
