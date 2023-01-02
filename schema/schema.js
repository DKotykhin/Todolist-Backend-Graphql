import { buildSchema } from "graphql";

const schema = buildSchema(`
    scalar Date
    type User {
        _id: ID!
        name: String!
        email: String!
        avatarURL: String        
        createdAt: Date        
        token: String
        message: String              
    }
    type PasswordUserResponse {
        status: Boolean
        message: String
    }
    type DeleteUserResponse {
        taskStatus: DeleteUserStatus
        userStatus: DeleteUserStatus
        message: String
    }
    type DeleteUserStatus { 
        acknowledged: Boolean
        deletedCount: Int
    }
    type AvatarUserResponse {
        avatarURL: String
        message: String
    }
    type Task {
        _id: ID!
        title: String!
        subtitle: String
        description: String
        completed: Boolean
        deadline: Date
        createdAt: Date
        updatedAt: Date
        message: String
    }
    type updateTaskResponse {
        status: UpdateTaskStatus        
        message: String
    }
    type UpdateTaskStatus {
        matchedCount: Int
        modifiedCount: Int
        upsertedId: ID
        acknowledged: Boolean
    }
    type deleteTaskResponse {
        status: DeleteTaskStatus        
        message: String 
    }
    type DeleteTaskStatus {
        acknowledged: Boolean
        deletedCount: Int
    }
    type getTasksResponse {
        totalTasksQty: Int
        totalPagesQty: Int
        tasksOnPageQty: Int
        tasks: [Task]
    }

    input UserRegisterInput {        
        name: String!
        email: String!
        password: String!          
    }    
    input UserPasswordInput {       
        password: String!                      
    }
    input UserAvatarInput {       
        avatarURL: String!                      
    }
    input UserDeleteInput {       
        _id: ID!                      
    }
    input TaskParamsInput {
        limit: Int
        page: Int
        tabKey: Int
        sortField: String
        sortOrder: Int
        search: String
    }
    input TaskInput {
        _id: ID       
        title: String!
        subtitle: String
        description: String
        completed: Boolean
        deadline: Date        
    }
    input TaskDeleteInput {
        _id: ID!
    }

    type Query {        
        getUserByToken: User        
        getTasks(paramsInput: TaskParamsInput): getTasksResponse
        userLogin(email: String!, password: String!): User
    }
    
    type Mutation {
        userRegister(registerInput: UserRegisterInput): User
        userDelete(deleteInput: UserDeleteInput): DeleteUserResponse
        userUpdateName(name: String!): User
        userConfirmPassword(passwordInput: UserPasswordInput): PasswordUserResponse
        userUpdatePassword(passwordInput: UserPasswordInput): User
        uploadAvatar(uploadAvatarInput: UserAvatarInput): AvatarUserResponse
        deleteAvatar(deleteAvatarInput: UserDeleteInput): AvatarUserResponse
        createTask(createTaskInput: TaskInput): Task
        updateTask(updateTaskInput: TaskInput): updateTaskResponse
        deleteTask(deleteTaskInput: TaskDeleteInput): deleteTaskResponse
    }
`);

export default schema;