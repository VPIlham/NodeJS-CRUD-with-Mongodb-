var express = require('express');
var router = express.Router();
var Movie = require('../models/MovieSchema');
var moment = require('moment');

const {checkAuth} = require('../config/auth'); 

// Halaman Home Movies
router.get('/', checkAuth ,function(req, res, next) {
  let ListMovies = [];
  Movie.find((err,movies) => {
    if(movies){
      for(let data of movies){
        ListMovies.push({
          id : data._id,
          name : data.name,
          released_on : data.released_on
        })
      }
      res.render('movie/allMovies', {ListMovies});
    } else {
      ListMovies.push({
        id : '',
        name : '',
        released_on : ''
      });
      res.render('movie/allMovies', {ListMovies});
    }
  });
});

// Halaman Create Movies
router.get('/create', checkAuth , function(req, res, next) {
  res.render('movie/createMovies', { title: 'Halaman Create Movies' });
});

// Halaman Update Movies
router.get('/update/:movieId', checkAuth , function(req, res, next) {
  Movie.findById(req.params.movieId, (err, movieInfo) => {
    var newDate = moment(movieInfo.released_on).format('YYYY-MM-DD');
    if(movieInfo){
      console.log(movieInfo);
      res.render("movie/updateMovies",{
        //ini adaalah object 
        movies : movieInfo,
        newDate
      })
    }
  })
});

//Action Create
router.post('/create', checkAuth ,function(req, res){
  // console.log(req.body);
  const {name, date} = req.body;
  let errors = [];
  
  if(!name || !date){
    errors.push({msg : "Silahkan Lengkapi Data Yang Dibutuhkan"})
  }

  if(errors.length > 0){
    res.render('movie/createMovies', {errors});
  } else {
    const newMoview = Movie({
      name,
      released_on : date
    });
    newMoview.save().then(
      movie => {
        errors.push({msg : 'data telah di tambahkan'});
        res.render('movie/createMovies', {errors})
      }
    ).catch(err => console.log(err))
  }

});

//Action update
router.post('/update', checkAuth ,function(req, res){
  let errors = [];
  Movie.findByIdAndUpdate(req.body.id, {
    name : req.body.name,
    released_on : req.body.date
  },function (err){
    if(err){
      console.log(err);
    } else {
      errors.push({msg : 'Data Berhasil Di Ubah'});

      var newMovies = {
        _id : req.body.id,
        name : req.body.name
      }
      //req body date adalah sama kaya request->date di laravel
      var newDate = moment(req.body.date).format('YYYY-MM-DD');
      res.render('movie/updateMovies', {
        movies : newMovies,
        newDate,
        errors
      });
    }
  })
});

//Action Delete
router.get('/delete/:movieId', checkAuth ,function(req, res){
  // console.log(req.params.movieId);
  Movie.findByIdAndDelete(req.params.movieId, () => res.redirect('/movies'))
});

// kalau pake rest api disarankan update menjadi put 
// kalau delete ya delete

module.exports = router;