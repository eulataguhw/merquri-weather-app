/**
 * Search History List Component
 */
import { ListItem, ListItemText, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { CustomTypography } from '../Typographys/CustomTypography';
import { ISearchHistoryItemProps } from '~/types/CommonTypes';
import CustomIconButton from '../Buttons/IconButton';

function SearchHistoryItem({ location, date, onSearch, onDelete }: ISearchHistoryItemProps) {
    const buttonSx = { background: 'white', borderRadius: 5, width: 34, height: 34 };
    const iconSx = { color: 'grey', height: 20, width: 20 };
    return (
        <ListItem
            sx={{
                backgroundColor: '#f3e9fc',
                borderRadius: 2,
                mt: 2,
                mb: 1,
                display: 'flex',
                justifyContent: 'space-between',
                paddingLeft: 2,
                paddingRight: 2,
                overflowY: 'auto',
                whiteSpace: 'noWrap'
            }}
        >
            {/* Location and Date */}
            <ListItemText
                primary={<CustomTypography {...{ message: location }} />}
                slotProps={{
                    primary: {
                        style: { color: '#5e2ca5', fontWeight: 'bold' }
                    }
                }}
            />
            <Box>
                <ListItemText
                    primary={<CustomTypography {...{ message: date }} />}
                    slotProps={{
                        primary: {
                            style: { color: '#8c72c7' }
                        }
                    }}
                />
            </Box>
            {/* Action Buttons */}
            <Box sx={{ margin: 1 }}>
                <CustomIconButton onClick={onSearch} aria-label="search" sx={{ ...buttonSx, mr: 1 }} icon={<SearchIcon sx={iconSx} />} />
                <CustomIconButton onClick={onDelete} aria-label="delete" sx={buttonSx} icon={<DeleteIcon sx={iconSx} />} />
            </Box>
        </ListItem>
    );
}

export default SearchHistoryItem;
