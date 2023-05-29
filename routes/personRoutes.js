const router = require('express').Router();

const Person = require('../models/Person');

// Criação de dados
router.post('/', async (req, res) => {

    // req.body

    // {name: 'Villy', salary: 1000, approved: true}
    const {name, salary, approved} = req.body;

    if (!name) return res.status(422).json({error: 'O nome é obrigatório!'});
    if (!salary) return res.status(422).json({error: 'O salário é obrigatório!'});

    const person = {
        name,
        salary,
        approved
    };

    // create 

    try {
    
        // Criando dados
        await Person.create(person);

        res.status(201).json({message: 'Pessoa inserida no sistema com sucesso!'});

    } catch (error) {
        res.status(500).json({error: error});
    }

});

// Leitura de dados
router.get('/', async (req, res) => {

    try {

        const people = await Person.find();

        res.status(200).json(people);

    } catch (error) {
        res.status(500).json({error: error});
    }

});

router.get('/:id', async (req, res) => {

    // Extrair dados pela url
    const id = req.params.id;
    
    try {

        const person = await Person.findOne({ _id: id });

        if (!person) return res.status(422).json({message: 'O usuário não foi encontrado'});

        res.status(200).json(person);

    } catch (error) {
        res.status(500).json({error: error});
    }

});

// Update - Atualização de dados (PUT, PATCH)
router.patch('/:id', async (req, res) => {

    const id = req.params.id;

    const {name, salary, approved} = req.body;

    const person = {
        name,
        salary,
        approved
    };

    try {

        const updatedPerson = await Person.updateOne({ _id: id }, person);

        console.log(updatedPerson);

        if (updatedPerson.matchedCount === 0) return res.status(422).json({message: 'Usuário não encontrado!'});

        res.status(200).json(person);

    } catch (error) {
        res.status(500).json({error: error});
    }

});

// Delete - deletar dados
router.delete('/:id', async (req, res) => {

    const id = req.params.id;

    try {
        const person = await Person.findOne({ _id: id });
    
        if (!person) {
            return res.status(422).json({ message: 'O usuário não foi encontrado' });
        }
    
        try {
            await Person.deleteOne({ _id: id });
    
            res.status(200).json({ message: 'Pessoa removida do sistema com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }

});

module.exports = router;