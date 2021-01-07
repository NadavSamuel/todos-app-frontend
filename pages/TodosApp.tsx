import React, { useEffect, useState, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Head } from '../cmps/Head'
import { TodosList } from '../cmps/TodosList'
import { RootStoreContext } from '../stores/RootStore'
import Layout from '../pages/Layout'
import { useRouter } from 'next/router'
import { NoTodosMsg } from '../cmps/NoTodosMsg'
import { ErrorModal } from '../cmps/ErrorModal'
import { Dimmer } from 'semantic-ui-react'
import { Todo } from '../interfaces'
const TodosApp = observer(() => {
  const rootStoreContext = useContext(RootStoreContext);
  const { todosStore, userStore, systemStore } = rootStoreContext;
  // const { todos, sortedTodos } = todosStore;
  const { loggedInUser } = userStore;
  const router = useRouter();
  const isError = systemStore.isError.existingError;

  useEffect(() => {
    onAppLoad()
  }, [])
  async function onAppLoad() {
    if (!loggedInUser) userStore.getLoggedInUser()
    try {
      await todosStore.loadTodos()
    }
    catch (err) {
      console.log('catch', err)
      // router.push('/')
    }
  }

  // if (!todos) return null;
  const todos: Todo[] = [{
    pinned: true,
    txt: 'hi',
    title: 'default',
    bgc: 'lime',
    _id: 'rfd',
    type: 'txt',
    created: 54354354354,
    lastUpdated: 54354354376,
  }]

  return (
    <React.Fragment>
      <Dimmer active={(isError)} style={{ position: 'fixed' }} />
      <Layout>
        <Head />
        {loggedInUser && todos && <TodosList todos={todos} />}
        {loggedInUser && !todos.length && <NoTodosMsg />}
        {isError &&
          <ErrorModal />
        }

      </Layout>
    </React.Fragment>
  )
})
export default TodosApp