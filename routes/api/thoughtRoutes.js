const router = require('express').Router();

const {
    getThought,
    getIndvThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');


// /api/thoughts GET all and POST thought
router.route('/').get(getThought).post(createThought);




// /api/thoughts/:thoughtId GET single thought, PUT and DELETE by iD
router.route('/:thoughtID')
.get(getIndvThought)
.put(updateThought)
.delete(deleteThought);




//  /api/thoughts/:thoughtId/reactions POST new reactions
router.route('/:thoughtID/reactions')
.post(createReaction);




// /api/thoughts/:thoughtId/reactions/:reactionId DELETE reaction by ID

router.route('/:thoughtID/reactions/:reactionID')
.delete(deleteReaction);


module.exports = router;


