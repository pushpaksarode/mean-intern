export class Userlogin {
    public email: string;
    public _id: string;
    public firstname: string;
    public lastname: string;


    constructor(p_email: string, p_id: string, p_firstname: string, p_lastname: string) {

        this.email = p_email;
        this._id = p_id;
        this.firstname = p_firstname;
        this.lastname = p_lastname;

    }



    // constructor(
    //   public email: string,
    //   public _id: string,
    // public name: string 
    // ) {}

}
