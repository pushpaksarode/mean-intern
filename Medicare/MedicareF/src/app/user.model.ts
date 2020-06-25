export class User
{
    public _id? : string
    public firstname : string;
    public lastname : string;
    public email : string;
    public address : string;
    public password : string;



    constructor(u_firstname : string, u_lastname : string, u_email : string, u_address : string, u_password : string){
        this.firstname = u_firstname;
        this.lastname = u_lastname;
        this.email = u_email;
        this.address = u_address;
        this.password = u_password;
    }
}