import * as yup from "yup";

const schema = yup.object().shape({
  phone: yup.string().required("hhhhhhh")
});
export default schema;
