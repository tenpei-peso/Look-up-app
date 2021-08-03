import React from 'react'
import Router from './Router'
import "./assets/reset.css"
import "./assets/style.css"
import Header from './components/Header/Header'

function App() {
  return (
    <>
      <Header></Header>
      <main className="c-main">
        <Router></Router>
      </main>
    </>
  )
}

export default App
