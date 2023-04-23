class Contact {
    id: string;
    firstName: string;
    lastName: string; 
    status: string;

    constructor(firstName: string, lastName: string,   status: string        , id: string) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.status = status;
      this.id = id;
    }
  }
  
  export default Contact;
  