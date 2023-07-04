import { Field, useField } from "formik"

export const InputField = (props) => {
  const [field, meta] = useField(props)
  return (
    <>
      <Field
        className="px-5 py-2 rounded-md focus:outline-none bg-gray7"
        autoComplete="off"
        type={props.type || "text"}
        {...props}
        {...field}
      />
      {meta.touched && meta.error ? (
        <p className="text-xs text-red-500">{meta.error}</p>
      ) : null}
    </>
  )
}
