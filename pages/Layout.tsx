import React, {  useContext } from 'react'
import Head from 'next/head';
import { Navbar } from '../cmps/Navbar'


 const Layout = (props) => (
  <main>
    <Head>
      <title>Todos App</title>
    </Head>
    <Navbar />
    <section >
      {props.children}
    </section>

  </main>
);
export default Layout

