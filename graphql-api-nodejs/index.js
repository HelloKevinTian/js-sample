import express from 'express';
import graphlHTTP from 'express-graphql';
import mongoose, { Aggregate } from 'mongoose';
import schema from './schema';
import formidable from 'formidable';
import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
} from 'graphql';

const app = express();
const PORT = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/test');

app.get('/', (req, res) => {
    res.json({
        msg: 'Welcome to GraphQL'
    })
});

app.use('/graphql', graphlHTTP({
    schema: schema,
    graphiql: true
}));

app.get('/:id', (req, res, next) => {
    console.log('get args', req.url, req.method, req.query, req.params);

    let fields = req.query.fields.replace(/,/g, ' ');
    let query = `
        {
          getProduct(_id: "${req.params.id}"){${fields}}
        }
    `;
    graphql(schema, query).then(result => {
        console.log(result);
        res.json(result);
    }).catch(err => {
        console.error(err);
        res.json({
            status: 'error'
        });
    });
});

app.get('/:id/:line', async (req, res, next) => {
    console.log('get args', req.url, req.method, req.query, req.params);
    let fields = req.query.fields.replace(/,/g, ' ');

    let query = `{${req.params.line}{${fields}}}`;
    graphql(schema, query).then(result => {
        console.log(result);
        res.json(result);
    }).catch(err => {
        console.error(err);
        res.json({
            status: 'error'
        });
    });
});

app.post('/:id', (req, res, next) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        console.log('post args:', req.params, req.query, fields);

        let fieldKeys = Object.keys(fields);
        let fieldKeyStr = fieldKeys.join(' ');
        let updateStr = '';
        for (let index = 0; index < fieldKeys.length; index++) {
            const element = fieldKeys[index];
            if (index == fieldKeys.length - 1) {
                updateStr += element + ':' + fields[element];
            } else {
                updateStr += element + ':' + fields[element] + ',';
            }
        }
        let mutation = `
            mutation{
                updateProduct(_id:"${req.params.id}",input:${updateStr}){${fieldKeyStr}}
            }
        `;
        // let mutation = `
        // mutation{
        //     updateProduct(_id:"5c8a0a64a24a99b7f28af880",input:{title:"newTitle",qty:55}){title qty}
        // }
        // `;
        console.log(`mutation: ${mutation}`);
        graphql(schema, mutation).then(result => {
            console.log(result);
            res.json({
                status: 'success'
            });
        }).catch(err => {
            console.error(err);
            res.json({
                status: 'error'
            });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});