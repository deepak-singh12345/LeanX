import Service from '../models/serviceModel.js';

const createService = async (req, res) => {
    try{
        const {title, description, price, duration} = req.body;

        const service = await Service.create({
            title,
            description,
            price,
            duration,
            createdBy: req.user.id
        });

        res.status(201).send(service);
    }catch (error){
        res.status(500).send(error.message);
    }
}


export {createService};
