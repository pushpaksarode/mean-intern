export class Userlogin {
    public email: string;
    public _id: string;
    public firstname: string;
    public lastname: string;
    public address: string;

    constructor(p_email: string, p_id: string, p_firstname: string, p_lastname: string, p_address: string) {

        this.email = p_email;
        this._id = p_id;
        this.firstname = p_firstname;
        this.lastname = p_lastname;
        this.address = p_address;

    }



    // constructor(
    //   public email: string,
    //   public _id: string,
    // public name: string 
    // ) {}

}
