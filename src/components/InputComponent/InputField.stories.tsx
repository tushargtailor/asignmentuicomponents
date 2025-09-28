import  { useState } from "react";
import InputField from "./InputField";

export default {
  title: "Components/InputField",
  component: InputField,
};

export const Default = () => {
  const [name, setName] = useState("");
  return (
    <InputField
      label="Name"
      placeholder="Enter your name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      helperText="This is helper text"
    />
  );
};

export const Disabled = () => (
  <InputField label="Disabled" placeholder="Cannot type" disabled />
);

export const Error = () => (
  <InputField
    label="Email"
    placeholder="Enter email"
    invalid
    errorMessage="Invalid email address"
  />
);

export const Loading = () => (
  <InputField label="Loading" placeholder="Please wait..." loading />
);

export const FilledVariant = () => (
  <InputField label="Filled" placeholder="Filled variant" variant="filled" />
);

export const GhostVariant = () => (
  <InputField label="Ghost" placeholder="Ghost variant" variant="ghost" />
);
