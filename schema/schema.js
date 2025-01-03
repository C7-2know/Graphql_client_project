const Project = require('../server/models/project');
const Client = require('../server/models/client');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLEnumType, GraphQLNonNull} = require('graphql');




const ProjectType=new GraphQLObjectType({
    name: 'Project',
    fields:()=>({
        id:{type:GraphQLID},
        clientId:{type:GraphQLID},
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        status:{type:GraphQLString},
        client:{
            type:ClientType,
            resolve(parent, args){
                return Client.findById(parent.clientId)
            }
        }
    })
});


const ClientType = new GraphQLObjectType({
    name:'Client',
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLString},
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        clients:{
            type: new GraphQLList(ClientType),
            resolve(parent, args){
                return Client.find();
            }
        },
        client:{
            type: ClientType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                return Client.findById(args.id)
            }
        },
        projects:{
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
                return Project.find();
            }
        },
        project:{
            type: ProjectType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                return Project.findById(args.id)
            }
        }
    }
})


const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addClient:{
            type: ClientType,
            args :{
                name:{type: GraphQLNonNull(GraphQLString)},
                email:{type: GraphQLNonNull(GraphQLString)},
                phone:{type: GraphQLNonNull(GraphQLString)},
            },
            resolve(parent,args){
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                });
                return client.save()
            }

        },
        //  delete  a client
        deleteClient:{
            type: ClientType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                return Client.findByIdAndDelete(args.id)
            }
        },

        //  add a project
        addProject:{
            type: ProjectType,
            args:{
                clientId:{type: GraphQLNonNull(GraphQLString)},
                description:{type: GraphQLNonNull(GraphQLString)},
                status: {
                    type: new GraphQLEnumType({
                        name: "ProjectStatus",
                        values:{
                            'new':{value:'Not Started'},
                            'progress':{value:'In Progress'},
                            'completed':{value:'Completed'}
                        },
                    }),
                    defaultValue:'Not Started',
                },
                clientId: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                const project = new Project({
                    clientId: args.clientId,
                    description: args.description,
                    status: args.status
                });
                return project.save()
            }
        },

        //  update a project
        updateProject:{
            type: ProjectType,
            args:{
                id:{type:GraphQLNonNull(GraphQLID)},
                name:{type: GraphQLString},
                description: {type: GraphQLString},
                status:{
                    type: new GraphQLEnumType({
                        name:"ProjectStatusUpdate",
                        values:{
                            new: {value:"Not Started"},
                            progress:{ value:"In Progress"},
                            completed:{value:"Completed"}
                        }
                    })
                }
                
            },
            resolve(parent,args){
                return Project.findByIdAndUpdate(
                    args.id, 
                    {$set:{
                        name: args.name,
                        description: args.description,
                        status: args.status
                    }}, 
                    {new:true}
                )
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
