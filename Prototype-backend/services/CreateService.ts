import * as Knex from "knex";

import * as path from "path";
import * as fs from "fs-extra";


export default class CreateService {
    private knex: Knex;

    constructor(knex: Knex) {
        // this.upload = path.join(__dirname, '../', "public", "images");
        this.knex = knex
    }

    public writeFile(name:string, body: Express.Multer.File) {
        const pathName = path.join(__dirname, `../public/images/${name}.jpg`);
        return fs.outputFile(pathName, body.buffer).then(() => pathName)
    };
   

    getTemplate() {
        console.log("entered getTemplate")
        return this.knex("todo as td")
            .select("td.id as td_id", "td.type", "td.package", "items.name as items_name", "items.quantity")
            .join("items", "items.todo_id", "td.id")
            .where("td.template", true)
            .then(todoArray => {
                console.log("completed query")
                todoArray.map((data: any) => { data.td_id, data.type, data.package, data.items_name, data.items_category })
                return todoArray
            })//TEMPLATES HAVE DIFFERENT LEVELS
    }

    saveNewEvent(data: any, user: any, file: Express.Multer.File, res:any) {
        console.log("file1232", file);
       return  this.writeFile(file.originalname, file)
                    .then((fileName: string)=>{
                return this.knex.transaction((trx) => {
                    console.log("fileName", fileName)
                    return trx("events")
                        .insert({
                            name: data.events_name,
                            description: data.description,
                            datetime: data.datetime,
                            address: data.address,
                            photo: `${fileName}`,
                            private: true,
                            deposit: data.deposit,
                            isactive: true
                        })
                        .returning("id")
                        .then(eventid => {
                            console.log("eventid", eventid)
                            eventid.map((idata: any) => {
                                idata.id
                            })
                            return trx("todo")
                                .insert({
                                    events_id: eventid[0],
                                    type: data.todo_type,
                                    isactive: true,
                                    template: false
                                })
                                .returning("id")
                                .then((todoid: any) => {
                                    console.log("todoid", todoid)
                                    todoid.map((tdata: any) => {
                                        tdata.id
                                    })
                                    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>ADDING NEW VOLUNTEERS    
                                    // let volunteerIds: any[] = [];

                                    // for (let i in data.itemsArray) {
                                    //     this.knex("users")
                                    //         .select("users.id")
                                    //         .where("name", data.itemsArray[i].volunteer)
                                    //         .then((vId) => {
                                    //             console.log("vId", vId)
                                    //             volunteerIds.push(
                                    //                 vId.id
                                    //             )
                                    //         })
                                    // }
                                    // console.log("volunteerIds",volunteerIds)
                                    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<ADDING NEW VOLUNTEERS


                                    let parsedItems: any[] = [];

                                    for (let i in data.itemsArray) {
                                        parsedItems.push({
                                            name: data.itemsArray[i].items_name,
                                            quantity: data.itemsArray[i].quantity,
                                            todo_id: todoid[0],
                                            isactive: true
                                        })
                                    }
                                    console.log("parsedItems", parsedItems)
                                    return trx("items")
                                        .insert(parsedItems)
                                        .returning("id")
                                        .then((itemid: any) => {
                                            return trx("events_users")
                                                .insert({
                                                    users_id: user,
                                                    events_id: eventid[0],
                                                    creator: true,
                                                    isactive: true
                                                })
                                                .returning("events_id")
                                        })
                                })
                                .catch((err: any) => {
                                    console.log("post err", err);
                                    res.status(500).json({ status: "failed" })
                                })
                        })

                    })
            })
    }
    
}



// select "todo".id as "todo_id", "todo".type,items.name as items_name, items.quantity from "todo" inner join items on items."todo_id" = "todo".id where "todo".template = true