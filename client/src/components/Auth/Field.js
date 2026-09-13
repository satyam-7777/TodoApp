export default function Field({ fieldItem, handleChange }) {
  const { label, type, placeholder, required, minLength, maxLength, inputMode, pattern, id, name } =
    fieldItem;
  return (
    <div className="field-container">
      <label htmlFor={id}>
        {label} {required && <span className="required-icon">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        id={id}
        name={name}
        onChange={handleChange}
        inputMode={inputMode}
      />
    </div>
  );
}
