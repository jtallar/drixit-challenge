import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import getGifs from '../services/apiCalls'
import Gif from '../components/Gif'

export default function ListOfGifs( ) {
    const { keyword } = useParams()
    const [loading, setLoading] = useState(false)

    const [gifs, setGifs] = useState([])

    // Esto se ejecutaria una sola vez al arrancar,lo segundo es las dependencias (ninguna aca)
    // Si no pongo dependencias, se ejecuta cada vez que cambia el estado
    useEffect(function () {
        setLoading(true)
        getGifs({ keyword }).then(gifs => {
            setGifs(gifs)
            setLoading(false)
        })
    }, [keyword])

    if (loading) return <h1>Loading</h1>

    return <>{
            gifs.map(gif => <Gif key={gif.keyword} title={gif.keyword}/>)
        }
    </>
}