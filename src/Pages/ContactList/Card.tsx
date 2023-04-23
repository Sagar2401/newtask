import * as React from "react";
import "./Card.css";

import Button from "@mui/material/Button";
import Contact from "../../Model/Contact";
import { useAppDispatch } from "../../store/hooks";
import { removeContact } from "../../store/contactSlice";

interface ContactProps {
  contact: Contact;
  onContactUpdate: (id: string) => void;
}

const ContactInfo: React.FC<ContactProps> = (props) => {
  const dispatch = useAppDispatch();
  const contact = props.contact;

  const setUpdatePage = (id: string) => {
    props.onContactUpdate(id);
  };

  return (
    <div className="card">
      <div>
        <div className="avatar"></div>
      </div>
      <h3>
        First Name:<span>{contact.firstName}</span>
      </h3>
      <h3>
        Last Name:<span>{contact.lastName}</span>
      </h3>
      <h3>
        Status:<span>{contact.status}</span>
      </h3>
      <div className="button-wrap">
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            setUpdatePage(contact.id);
          }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => dispatch(removeContact({ id: contact.id }))}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ContactInfo;
