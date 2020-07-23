import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams, useHistory } from 'react-router-dom';

const initialItem = {
    title: "",
    director: "",
    metascore: "",
    // stars: []
}

const UpdateForm = props => {
    const location = useLocation();
    const params = useParams();
    const [movie, setMovie] = useState(initialItem);
    const { push } = useHistory();

    useEffect(() => {
        if(location.state) {
            setMovie(location.state);
        } else {
            axios
                .get(`http://localhost:5000/api/movies/${params.id}`)
                .then(res => setMovie(res.data))
                .catch(err => console.log(err))
        }
    }, [])

    const changeHandler = e => {
        // change metascore string into integer
        e.persist();
        let value = e.target.value;
        if (e.target.name === "metascore") {
            value = parseInt(value, 10) 
            // 10 is the radix: a # from 2-36 that represents the numeral system to be used
        }
        // if (e.target.name === "stars") {
        //     value = value.join('')
        // }

        setMovie({
            ...movie,
            [e.target.name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        // put request to edit item
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                console.log(res.data)
                // res.data.stars.split(',')
                setMovie(movie)
                push(`/movies/${movie.id}`)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h3>Update Item</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    onChange={changeHandler}
                    value={movie.title}
                    placeholder='title'
                />
                <input
                    type='text'
                    name='director'
                    onChange={changeHandler}
                    value={movie.director}
                    placeholder='director'
                />
                <input
                    type='text'
                    name='metascore'
                    onChange={changeHandler}
                    value={movie.metascore}
                    placeholder='metascore'
                />
                {/* <input
                    type='text'
                    name='stars'
                    onChange={changeHandler}
                    value={movie.stars}
                    placeholder='stars'
                /> */}
                <button>Update</button>
            </form>
        </div>
    )
}
export default UpdateForm;