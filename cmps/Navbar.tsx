import React, { useContext } from 'react'
import { Menu, Header, Button, Loader, Segment, Dimmer, Icon } from 'semantic-ui-react'
import { RootStoreContext } from '../stores/RootStore'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import Link from 'next/link'


export const Navbar: React.FC = observer(() => {
        const router = useRouter()
        const rootStoreContext = useContext(RootStoreContext);
        const { userStore, systemStore } = rootStoreContext;
        const { loggedInUser } = userStore;
        const { isLoading } = systemStore;
        async function onLogout() {
                try {
                        router.push('/')
                        await userStore.logout()

                }
                catch (err) {
                        systemStore.onError()
                        console.log('OOPS! had problem at logout, ', err)
                }
        }

        return (

                <Menu as="nav" fluid >
                        <Menu.Item as={Header} name="Todos App" >
                                <Link href={loggedInUser? `/TodosApp`:`/`}>
                                        <a>Todos App</a>
                                </Link>
                        </Menu.Item>
                        {loggedInUser && <Menu.Item position="left">
                                <Segment>
                                        <Dimmer active inverted>
                                                {isLoading ? <Loader inverted /> : <Icon color="green" size="large" name="check" />}
                                        </Dimmer>
                                </Segment>
                        </Menu.Item>}
                        <Menu.Menu position="right">
                                <Menu.Item>
                                        <Link href="/About">
                                                <a>About</a>
                                        </Link>
                                </ Menu.Item>
                                {loggedInUser && <Menu.Item position="right"><Button onClick={onLogout}>Logout</Button></Menu.Item>}
                        </Menu.Menu>

                </Menu >

        )
})