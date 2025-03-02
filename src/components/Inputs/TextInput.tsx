/**
 * Common text field
 */
import Input, { TextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/material';
import { CustomTypography } from '../Typographys/CustomTypography';
import { ITextInput } from '../../types/CommonTypes';

const StyledTextField = styled(Input)({
    minWidth: 250,
    height: 60,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    '& .MuiFormLabel-root': {
        display: 'flex',
        marginLeft: 16,
        marginTop: 8
    },
    '& .MuiInputBase-input': {
        marginLeft: 16,
        marginTop: 8
    }
});

/**
 * Provide a common text field using Custom Typography for the text
 * @param props message is the FormattedMessageType.
 * @returns
 */
const TextInput = (props: ITextInput & TextFieldProps) => {
    const { message } = props;
    return (
        <StyledTextField
            label={<CustomTypography message={message} />}
            name={props.name}
            variant="standard"
            focused={true}
            fullWidth
            slotProps={{ input: { disableUnderline: true }, formHelperText: { sx: { ml: 2 } } }}
            {...props}
        />
    );
};

export { TextInput };
