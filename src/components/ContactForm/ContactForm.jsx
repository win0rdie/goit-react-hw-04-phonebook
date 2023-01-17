// import { Component } from 'react';
import { Component } from 'react';
import { Label, Input, ErrorText, ButtonAdd } from './ContactForm.styled';

import { nanoid } from 'nanoid';
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';

const nameRegExp = "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";
const phoneRegExp =
  /^(\+?\d{1,4})?\s?-?\s?(\(?\d{1,3}\)?)\s?-?\s?(\(?\d{1,4}\)?)\s?-?\s?(\(?\d{1,4}\)?)?$/;

// /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
// /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
// /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

let schema = yup.object().shape({
  name: yup.string().matches(nameRegExp, 'invalid name').required(),
  number: yup
    .string()
    .min(7)
    .matches(phoneRegExp, 'phone number is not valid')
    .required(),
});

const initialValues = { name: '', number: '' };

const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <ErrorText>{message}</ErrorText>}
    />
  );
};

class ContactForm extends Component {
  handleSubmit = (values, { resetForm }) => {
    console.log(values);
    this.props.onSubmit(values);
    resetForm();
  };
  render() {
    const nameInputId = nanoid();

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        validationSchema={schema}
      >
        <Form autoComplete="off">
          <Label htmlFor="name">
            Name
            <Input
              type="text"
              placeholder="Full name"
              name="name"
              id={nameInputId}
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            />
            <FormError name="name" />
          </Label>
          <Label htmlFor="number">
            Number
            <Input
              type="tel"
              placeholder="Your number"
              name="number"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            />
            <FormError name="number" />
          </Label>
          <ButtonAdd type="submit">Add contact</ButtonAdd>
        </Form>
      </Formik>
    );
  }
}

export default ContactForm;
