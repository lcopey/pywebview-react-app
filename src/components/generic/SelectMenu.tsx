import {
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    SxProps,
} from '@mui/material';

type SelectMenuProps = {
    label: string;
    id: string;
    values?: null | Array<string>;
    variant?: 'standard' | 'outlined' | 'filled' | undefined;
    sx?: SxProps;
};

export default function SelectMenu({
    label,
    id,
    values = null,
    variant = 'standard',
    sx = {},
}: SelectMenuProps) {
    const labelId = `${id}-select-label`;
    let items =
        values?.map((value, n) => (
            <MenuItem key={n + 1} value={value}>
                {value}
            </MenuItem>
        )) || [];
    items = [
        <MenuItem key={0}>
            <em>None</em>
        </MenuItem>,
        ...items,
    ];
    return (
        <FormControl sx={sx} variant={variant}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select label={label} labelId={labelId}>
                {items}
            </Select>
        </FormControl>
    );
}
