/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { addContact, updateContact } from "../../store/contactSlice";
interface DialogBoxProps {
  open: boolean;
  id: string;
  OnDialogHandle: () => void;
}

type ContactFormData = {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
};
const DialogBox: React.FC<DialogBoxProps> = (props) => {
  let [isOpen, setIsOpen] = useState(props.open);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ContactFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      status: "Inactive",
      id: "",
    },
  });
  const contactData = useAppSelector((state) => {
    return state.contact.contactList.find((contact) => contact.id === props.id);
  });
  useEffect(() => {
    setValue("firstName", contactData?.firstName || "");
    setValue("lastName", contactData?.lastName || "");
    setValue("status", contactData?.status || "");
    setValue("id", contactData?.id || "");
  }, [contactData]);
  const { status } = watch();
  console.log(contactData, status);
  const dispatch = useAppDispatch();

  const closeBackHandle = () => {
    setIsOpen(false);
    props.OnDialogHandle();
  };
  const handleOnSubmit = (data: ContactFormData) => {
    const { firstName, lastName, status, id } = data;

    if (id) {
      console.log("1", 1);
      editContact(firstName, lastName, status, id);
      return;
    }
    dispatch(addContact({ firstName, lastName, status, id: uuidv4() }));
    props.OnDialogHandle();
    setIsOpen(false);
  };

  const editContact = (
    firstName: string,
    lastName: string,
    status: string,
    id: string
  ) => {
    dispatch(updateContact({ firstName, lastName, status, id: id }));
    props.OnDialogHandle();

    setIsOpen(false);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("status", (event.target as HTMLInputElement).value);
  };

  return (
    <Dialog onClose={closeBackHandle} open={isOpen}>
      <DialogTitle sx={{ paddingBottom: 0 }}>Add Contacts </DialogTitle>

      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="flat"
            label="First Name"
            type="text"
            fullWidth
            {...register("firstName", { required: true })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="floor"
            label="Last name"
            type="text"
            fullWidth
            {...register("lastName", { required: true })}
          />
          <div className="flex flex-row gap-5 items-center">
            Status:
            <span>
              <Radio
                checked={status === "Active"}
                onChange={handleChange}
                value="Active"
                name="radio-buttons"
              />
              Active
            </span>
            <span>
              <Radio
                checked={status === "Inactive"}
                onChange={handleChange}
                value="Inactive"
                name="radio-buttons"
              />
              Inactive
            </span>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeBackHandle} color="error" variant="outlined">
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="outlined">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DialogBox;
