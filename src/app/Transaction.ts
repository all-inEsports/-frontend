export class Transaction{
    _id!: Object;
    UserName!:String;
    Date!:Date; 
    Amount!:Number;
    Type!:String;
    Description!: String;
    _v!:Number;

    constructor(userName:string,Amount:Number,Type:string,Description:string){
        this.UserName = userName;
        this.Amount =Amount;
        this.Type = Type;
        this.Description = Description;
    }
}