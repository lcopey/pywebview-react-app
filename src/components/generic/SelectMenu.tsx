import {
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    SxProps,
} from '@mui/material';
import { ReactNode } from 'react';
import { SelectChangeEvent } from '@mui/material';

type SelectMenuProps = {
    label: string;
    id: string;
    values?: null | Array<string>;
    value?: null | string;
    includeNull?: boolean;
    variant?: 'standard' | 'outlined' | 'filled' | undefined;
    onChange?: (
        event: SelectChangeEvent<string | null>,
        child: ReactNode,
    ) => void;
    sx?: SxProps;
};

export default function SelectMenu({
    label,
    id,
    values = null,
    includeNull = true,
    variant = 'standard',
    value = null,
    onChange = () => {},
    sx = {},
}: SelectMenuProps) {
    const labelId = `${id}-select-label`;
    let items =
        values?.map((value, n) => (
            <MenuItem key={n + 1} value={value}>
                {value}
            </MenuItem>
        )) || [];
    if (includeNull) {
        items = [
            <MenuItem key={0}>
                <em>None</em>
            </MenuItem>,
            ...items,
        ];
    }
    return (
        <FormControl sx={sx} variant={variant}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
                label={label}
                labelId={labelId}
                value={value}
                onChange={onChange}
            >
                {items}
            </Select>
        </FormControl>
    );
}
