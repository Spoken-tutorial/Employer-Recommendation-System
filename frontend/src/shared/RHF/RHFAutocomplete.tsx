import {
  Autocomplete,
  TextField,
  Chip,
  AutocompleteProps
} from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

type Option = string | { label: string; value: string }

interface RHFAutocompleteProps
  extends Omit<
    AutocompleteProps<Option, boolean, boolean, boolean>,
    'renderInput' | 'options'
  > {
  name: string
  label: string
  options: Option[]
  multiple?: boolean
}

/**
 * Generic RHF-compatible Autocomplete
 * ✅ Works with both single and multiple selections
 * ✅ Handles string[] or {label,value}[] options
 * ✅ Displays validation errors automatically
 */
export default function RHFAutocomplete({
  name,
  label,
  options,
  multiple = false,
  ...rest
}: RHFAutocompleteProps) {
  const { control } = useFormContext()

  const normalize = (option: Option) =>
    typeof option === 'string' ? { label: option, value: option } : option

  const all = options.map(normalize)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Autocomplete
          {...rest}
          multiple={multiple}
          options={all}
          getOptionLabel={(o) => normalize(o).label}
          value={
            multiple
              ? all.filter((o) =>
                  Array.isArray(field.value)
                    ? field.value.includes(o.value)
                    : false
                )
              : all.find((o) => o.value === field.value) ?? null
          }
          onChange={(_, v) => {
            if (multiple) {
              const values = (v as Option[]).map((o) => normalize(o).value)
              field.onChange(values)
            } else {
              const value = (v as Option | null)
                ? normalize(v).value
                : ''
              field.onChange(value)
            }
          }}
          renderTags={
            multiple
              ? (selected, getTagProps) =>
                  selected.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={normalize(option).value}
                      label={normalize(option).label}
                    />
                  ))
              : undefined
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      )}
    />
  )
}
