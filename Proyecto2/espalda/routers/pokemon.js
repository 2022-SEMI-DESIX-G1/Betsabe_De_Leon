const { Router } = require('express');
const { getPokemon } = require('../controllers/pokemon');

const router = Router();

router.post('/:name', getPokemon);

module.exports = router;