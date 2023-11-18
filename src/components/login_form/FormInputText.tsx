import { InputProps, TextField } from "@mui/material";
import { Control, Controller, DeepMap, FieldError, FieldValues, RegisterOptions } from "react-hook-form";

type FormInputProps = {
    type: string;
    name: string;
    control: Control<any, any>;
    placeholder: string;
    color: any;
    inputProps: Partial<InputProps>
    rules?: Omit<RegisterOptions<any, string>, "setValueAs" | "disabled" | "valueAsNumber" | "valueAsDate"> | undefined
}

export default function FormInputText({ name, control, placeholder, color, inputProps, rules, type }: FormInputProps) {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({
                field: { onChange, value, ref, ...fieldProps },
                fieldState: { error },
                formState: { errors, ...formstate },
            }) => {

                return <TextField
                    inputRef={ref}
                    type={type}
                    helperText={errors[name] ? `${(errors[name] as DeepMap<FieldValues, FieldError>).message}` : null}
                    size="small"
                    error={!!errors[name]}
                    onChange={onChange}
                    value={value}
                    fullWidth
                    placeholder={placeholder}
                    variant="outlined"
                    color={color}
                    InputProps={inputProps}
                    {...fieldProps}
                />
            }}
        />
    );
};
