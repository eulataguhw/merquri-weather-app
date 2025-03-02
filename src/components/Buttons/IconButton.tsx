/**
 * Common Icon Button
 */
import { IconButton, IconButtonProps, styled } from '@mui/material';
import { IIconButton } from '~/types/CommonTypes';

const StyledIconButton = styled(IconButton)(() => ({}));

const CustomIconButton = (props: IIconButton & IconButtonProps) => {
    const { icon, ...temp } = props;
    return <StyledIconButton {...temp}>{icon}</StyledIconButton>;
};

export default CustomIconButton;
