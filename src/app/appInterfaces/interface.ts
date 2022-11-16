export interface studentData{
    'photo':String,
    'firstName':String,
    'lastName':String,
    'age':Number,
    'email':String,
    'phone':Number,
    'address':String,
}
export interface events{
    "_id": Number,
    "name": String,
    "description":String,
    "date": Date
}
export interface loginUserData{
    "email": String ,
    "password": String
}