import React, { ReactNode } from 'react';

export type FormattedMessageType = {
    type: string;
    id: string;
    value?: { [key: string]: any };
};

export interface ITextInput {
    message: FormattedMessageType;
}

export interface IIconButton {
    icon: ReactNode;
}

export interface IModelProps {
    getter: { [key: string]: any };
    setter: {
        [key: string]: React.Dispatch<React.SetStateAction<any>>;
    };
}

export interface ISearchHistoryItemProps {
    location: FormattedMessageType;
    date: FormattedMessageType;
    onSearch: () => void;
    onDelete: () => void;
}
