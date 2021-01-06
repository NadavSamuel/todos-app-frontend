import React, { useContext, useEffect } from 'react'
import { Dimmer, Header, Icon, Button, Message } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../stores/RootStore'
import 'semantic-ui-css/semantic.min.css';

interface ErrorModalProps {

}

export const ErrorModal: React.FC<ErrorModalProps> = observer(({ }) => {

    useEffect(() => {
        console.log('err modal')

    }, [])
    const rootStoreContext = useContext(RootStoreContext);
    const { systemStore } = rootStoreContext;

    function onHandleSystemError() {
        systemStore.onErrorHandle()
    }
    const msgStyle = {
        position: 'fixed',
        top: '30%',
        border: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '9999',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    }

    return (

        <Message
            style={msgStyle}

            error
            onClose={onHandleSystemError}
            floating={true}
        >
            <Header icon>
                <Icon name='archive' />
        OOPS! an error occoured
      </Header>
            <Message.Content>
                <p>
                    Please try again
        </p>
            </Message.Content>
            <Message.Content>
                <Button onClick={onHandleSystemError} basic color='red'  >
                    <Icon name='remove' /> Ok
        </Button>
            </Message.Content>


        </Message>


    );
})