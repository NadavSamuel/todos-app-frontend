import React, { useEffect, useState, useContext } from 'react'
import { NextPage, NextPageContext } from 'next';
import {parseCookies} from '../services/parseCookies'
import Cookie from 'js-cookie'
import { observer } from 'mobx-react-lite'
import { Head } from '../cmps/Head'
import { TodosList } from '../cmps/TodosList'
import { RootStoreContext } from '../stores/RootStore'
import Layout from '../pages/Layout'
import { useRouter } from 'next/router'
import { NoTodosMsg } from '../cmps/NoTodosMsg'
import { ErrorModal } from '../cmps/ErrorModal'
import { Dimmer } from 'semantic-ui-react'
import {User} from '../interfaces'
// interface Props {
//   user?: User;
// }
const TodosApp= observer(() => {
// const TodosApp:NextPage<Props>= observer(({user}) => {
  const rootStoreContext = useContext(RootStoreContext);
  const { todosStore, userStore, systemStore } = rootStoreContext;
  const { todos, sortedTodos } = todosStore;
  const { loggedInUser } = userStore;
  const router = useRouter();
  const isError = systemStore.isError.existingError;

  useEffect(() => {
    // if(!user){
    // console.log('sessionStorage, ',sessionStorage)
    // Cookie.set('user',sessionStorage.user)
    // }
    onAppLoad()
    // return () =>{
    //   Cookie.remove('user');
    // }
  }, [])
  async function onAppLoad() {
    if (!loggedInUser) userStore.getLoggedInUser()
    try {
      await todosStore.loadTodos()
    }
    catch(err) {
      console.log('catch',err)
      // router.push('/')
    }
  }

  if (!todos) return (<div><h1>Error! no todos</h1></div>);

  return (
    <React.Fragment>
      <Dimmer active={(isError)} style={{ position: 'fixed' }} />
      <Layout>
        <Head />
        {loggedInUser && todos && <TodosList todos={sortedTodos} />}
        {loggedInUser && !todos.length && <NoTodosMsg />}
        {isError &&
          <ErrorModal />
        }

      </Layout>
    </React.Fragment>
  )
})
// TodosApp.getInitialProps = (req) =>{
//   const cookies = parseCookies(req)
//   console.log('cookies,',cookies)

//   return {
//     user:cookies.user
//   }
// }
export default TodosApp