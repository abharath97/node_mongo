const MongoClient=require('mongodb').MongoClient;
const assert=require('assert');
const url= 'mongodb://localhost:27017/';

const dbname='conFusion';

const dboper= require('./operations');

MongoClient.connect(url, (err,client) =>{
    assert.equal(err,null);
    console.log('Connected correctly!!');

    const db=client.db(dbname);
    
    dboper.insertDocument(db,{name:'vadonut',description:'test'},'dishes',(result)=>{
        console.log('Insert document:\n',result.ops);
        
        dboper.findDocuments(db,'dishes',(docs)=> {
            console.log("Found Document:\n ",docs);

            dboper.updateDocument(db,{name:'vadonut'},{description:'Update Test'},'dishes',(result)=>{

                console.log('Updated document:\n',result.result);


                dboper.findDocuments(db,'dishes',(docs)=>{
                    console.log('found documents:\n',docs);
                    
                    db.dropCollection('dishes',(result)=>{
                        console.log('Dropped collection',result);

                        client.close();
                    });
                });
            });
        });
    });
});
