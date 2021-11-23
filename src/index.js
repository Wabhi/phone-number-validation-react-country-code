import React from "react";
import ReactDOM from "react-dom";
import { TextField } from "@material-ui/core/TextField";
import { useForm, Controller } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./Validation";
import "react-phone-number-input/style.css";

import "./index.css";

function App() {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({ resolvers: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="firstName"
          control={control}
          defaultValue=""
          rules={{
            required: { value: true, message: "required" },
            validate: (value) => isValidPhoneNumber(value)
          }}
          render={({ field: { onChange, value, ...field } }) => (
            <PhoneInput
              {...field}
              value={value}
              onChange={onChange}
              defaultCountry="IN"
              id="phoneNumber"
              className="form-control"
            />
          )}
        />
        {errors.firstName && errors.firstName.type === "required" && (
          <p>{errors.firstName.message}</p>
        )}
        {errors.firstName && errors.firstName.type === "validate" && (
          <p>Invalid</p>
        )}

        <input type="submit" />
      </form>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
