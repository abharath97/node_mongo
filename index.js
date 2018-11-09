const MongoClient=require('mongodb').MongoClient;
const assert=require('assert');
const url= 'mongodb://localhost:27017/';

const dbname='conFusion';

const dboper= require('./operations');

MongoClient.connect(url).then((client) =>{
        
        console.log('Connected correctly!!');

        const db=client.db(dbname);
    
    dboper.insertDocument(db,{name:'vadonut',description:'test'},'dishes')
    
    .then((result)=>{
        console.log('Insert document:\n',result.ops);        
        return dboper.findDocuments(db,'dishes')
    })


    .then((docs)=> {
        console.log("Found Document:\n ",docs);
        return dboper.updateDocument(db,{name:'vadonut'},{description:'Update Test'},'dishes')
    })
    

    .then((result)=>{

        console.log('Updated document:\n',result.result);
        return dboper.findDocuments(db,'dishes')
    })

    .then((docs)=>{
        console.log('found documents:\n',docs);
                    
        return db.dropCollection('dishes')
    })

    .then((result)=>{
        console.log('Dropped collection',result);

        client.close();
    })
    .catch((err)=>console.log(err));
})
.catch((err)=> console.log(err));
