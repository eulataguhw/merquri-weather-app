import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FormattedMessageType } from '~/types/CommonTypes';
import { MessageType } from '~/types/reducers';

export const initialState: MessageType = {
    message: { id: '', value: {}, type: '' },
    showMessage: false
};

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        message: (state, action: PayloadAction<MessageType>) => {
            return { ...state, ...action.payload };
        }
    }
});

export const { message } = messageSlice.actions;

export default messageSlice.reducer;
