import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import RootComponent from './RootComponent';
import { store } from './store/stores/store';
import { IntlProvider } from 'react-intl';
import intl from './resources/intl.json';
import { CssBaseline, styled } from '@mui/material';
import Container from '@mui/material/Container';
import backgroundCloud from './assets/background-cloud.png';
const ThemeContainer = styled(Container)((props) => ({
    minWidth: '393px',
    height: '100vh',
    background: `radial-gradient(circle at 50% 50%, rgba(193, 150, 221, 0.6) 60%, rgba(141, 113, 208, 1) 100%), url(${backgroundCloud})`
}));

// Main container
const MainContainer = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeContainer maxWidth={false}>
            <CssBaseline />
            {children}
        </ThemeContainer>
    );
};

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <IntlProvider messages={intl} locale="en" defaultLocale="en">
                <MainContainer>
                    <RootComponent />
                </MainContainer>
            </IntlProvider>
        </Provider>
    );
};

export default App;
