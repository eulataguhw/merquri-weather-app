/**
 * Common Typography
 */
import { SxProps, Typography, TypographyProps } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import { FormattedMessageType } from '../../types/CommonTypes';
import { TYPOGRAPHY_TYPES } from '~/resources/common-constants';

interface ITypography extends TypographyProps {
    message: FormattedMessageType;
}

const getSxProps = (type: string, sx: SxProps): SxProps => {
    const baseSx = { fontFamily: 'Noto Sans', fontWeight: 400, fontSize: '16px' };
    if (type === TYPOGRAPHY_TYPES.FIELD_LABEL) {
        return {
            ...baseSx,
            ...sx,
            color: 'black'
        };
    }
    if (type === TYPOGRAPHY_TYPES.LABEL) {
        return {
            ...baseSx,
            ...sx,
            color: 'black'
        };
    }
    if (type === TYPOGRAPHY_TYPES.LABEL_GREY) {
        return { ...baseSx, ...sx, color: '#666666' };
    }
    return { ...sx };
};

/**
 * Provide the Typography based on the type of typography - FIELD_LABEL/TITLE/HEADER etc
 * Uses React-intl for localisation. Data are stored in resources/intl.json
 * @param props
 * @returns
 */
const CustomTypography = (props: ITypography) => {
    const { message, sx } = props;
    const commonSx = getSxProps(message.type, sx as {});
    return (
        <Typography {...props} sx={{ ...commonSx }}>
            <FormattedMessage id={message.id} values={message.value} />
        </Typography>
    );
};

export { CustomTypography };
