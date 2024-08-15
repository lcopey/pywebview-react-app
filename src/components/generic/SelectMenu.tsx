import { MenuItem, FormControl, InputLabel, Select } from '@mui/material';

type SelectMenuProps = {
    label: string;
    id: string;
    values: null | Array<string>;
};

export default function SelectMenu({ label, id, values }: SelectMenuProps) {
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
        <FormControl
            sx={{ mr: 1, ml: 1, pb: 2, minWidth: 120 }}
            variant="standard"
        >
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select label={label} labelId={labelId}>
                {items}
            </Select>
        </FormControl>
    );
}
