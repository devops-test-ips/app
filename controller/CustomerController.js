const CustomerSchema = require('../model/CustomerSchema');

const create = (req, resp) => {
    //console.log(req.body);
    try {
        let customerSchema = new CustomerSchema({
            name: req.body.name,
            address: req.body.address,
            salary: req.body.salary
        });

        customerSchema.save()
            .then(result => resp.status(201).json({'message': 'customer saved'}))
            .catch(error => resp.status(500).json({'message': 'something went wrong', error: error}))

    } catch (e) {
        resp.status(500).json({'message': 'something went wrong', error: e});
    }

}
const findOneById = (req, resp) => {
    try {
        const customerId = req.params.id;
        CustomerSchema.findById(customerId)
            .then(result => {
                if (result) {
                    resp.status(200).json({'data': result})
                } else {
                    resp.status(404).json({'message': 'customer not found'})
                }
            })
            .catch(error => resp.status(500).json({'message': 'something went wrong', error: error}))
    } catch (e) {
        resp.status(500).json({'message': 'something went wrong', error: e});
    }
}
const deleteOneById = (req, resp) => {
    try {
        const customerId = req.params.id;
        CustomerSchema.findByIdAndDelete(customerId)
            .then(result => resp.status(201).json({'message': 'customer deleted'}))
            .catch(error => resp.status(500).json({'message': 'something went wrong', error: error}))
    } catch (e) {
        resp.status(500).json({'message': 'something went wrong', error: e});
    }
}
const updateById = (req, resp) => {
    try {
        const customerId = req.params.id;
        CustomerSchema.findByIdAndUpdate(customerId,{
            name: req.body.name,
            address: req.body.address,
            salary: req.body.salary
        })
            .then(result => resp.status(201).json({'message': 'customer updated'}))
            .catch(error => resp.status(500).json({'message': 'something went wrong', error: error}))
    } catch (e) {
        resp.status(500).json({'message': 'something went wrong', error: e});
    }
}
const search = (req, resp) => {
    try {
        const searchText = req.query.searchText || '';

        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;

        const query={
            $or:[
                {name:new RegExp(searchText,'i')},
                {address:new RegExp(searchText,'i')}
            ]
        };
        CustomerSchema.find(query)
            .skip((page-1)*size)
            .limit(size)
            .then(result => resp.status(200).json({'data': result}))
            .catch(error => resp.status(500).json({'message': 'something went wrong', error: error}))
    } catch (e) {
        resp.status(500).json({'message': 'something went wrong', error: e});
    }
}
module.exports = {create, findOneById, deleteOneById, updateById, search}