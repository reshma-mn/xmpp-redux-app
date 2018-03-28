import React from 'react';


import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

let db;

export default class LocalStorage{
    constructor() {
        
    }
    // asyncFunc() {
    //     return new Promise((resolve, reject) => { // (A)
            
    //             this.loadAndQueryDB("gokul")
            
    //     });
    // }
    

    loadAndQueryDB = (user) => {
        return new Promise(resolve => {
            console.log("Plugin integrity check ...");
            SQLite.echoTest().then(() => {
                console.log("Integrity check passed ...")
                console.log("Opening database ...")
                SQLite.openDatabase({name : "testDB.db", createFromLocation : 1}).then((DB) => {
                    db = DB;
                    console.log("Database OPEN");
                }).catch((error) => {
                    console.log(error);
                });
    
            }).catch(error => {
                console.log("echoTest failed - plugin not functional");
            });
          });
       
    }

    doit = (user) => {
        
        db.transaction((tx) => { 
            console.log("doit");
        tx.executeSql('CREATE TABLE IF NOT EXISTS '+user+'( '
            + 'friends VARCHAR(55) NOT NULL);')
            .catch((error) => {  
            console.log(error) 
        });
        // tx.executeSql('DROP TABLE pets;');
        tx.executeSql('INSERT INTO '+user+' (friends) VALUES ("Denver");');
        tx.executeSql('INSERT INTO '+user+' (friends) VALUES ("Arun");');
        this.printFromPets(user);
        });
    }


    // insertIntoPets = (owner, pet) => {
    //     var bigqery = "(?,?)";
       
    //     var parameters= [owner, pet];
    //     db.transaction((tx) => { 
    //         tx.executeSql('INSERT INTO pets (owner, pet_name) VALUES '+ bigqery +';', parameters);
    //     });
    //     this.printFromPets();

    // }

    printFromPets = (user) => {
        
        db.transaction((tx) => { 
            
        tx.executeSql('SELECT * FROM '+ user ,[], (tx, results) => {
            console.log(results.rows.item(0));
            // this.setState({details:[]});
            // var len = results.rows.length;
            // console.log(len);
            // for(let i=0;i<len;i++){
            //     console.log("heloo   ");
            //     var row = results.rows.item(i);
            //     const temp_detail = Object.assign({}, this.state.details, { names: row.owner , pets: row.pet_name});
            //     this.setState({ details:[...this.state.details, temp_detail] });
                
            // }
            // console.log("heloo   ");
            
            // if(len > 0) {
            //   // exists owner name John
            //   var row = results.rows.item(0);
            //   this.setState({petname: row.pet_name});
              
            // }
          });
        });
    }

    loadMessagesFromDb = (sender,reciever) => {

    }
}