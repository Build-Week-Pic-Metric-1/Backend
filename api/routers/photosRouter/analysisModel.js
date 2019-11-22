const db = require('../../knexConfig');


const find = (id) =>{
    return db('analysis')
    .select('*')
    .where({id})
    .first();
}

const add = analysis =>{
    return db('analysis')
    .insert(analysis, 'id')
    .then(id => find(...id));
}

module.exports = {
    add,
    find
}