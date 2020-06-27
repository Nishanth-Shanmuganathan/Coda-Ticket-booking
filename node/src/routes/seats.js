const express = require('express')
const bodyParser = require('body-parser')

const Movie = require('./../models/movie')

const seatsRouter = express.Router()

seatsRouter.use(bodyParser.json())

seatsRouter.get('/:movie',async (req,res)=>{
    const name = req.params.movie
    console.log(name);
    
    try {
        const movie = await Movie.findOne({name})
            return res.json({
                movie
            })
    } catch (error) {
        console.log(error);
        return res.send({
            message:'BAD_REQUEST'
        })
    }
})

seatsRouter.post('/:movie',async (req,res)=>{
    const name = req.params.movie
    console.log(name);
    
    try {
        const movie = await Movie.findOne({name})
        movie.seats = req.body.arr
        const ins = await movie.save()
        console.log(ins);
        
        return res.status(200).json({movie})
    } catch (error) {
        console.log(error);
        return res.send({
            message:'BAD_REQUEST'
        })
    }
})

module.exports = seatsRouter