import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom'
import Header from "./components/Header"
import FeedbackList from "./components/FeedbackList"
import { useState } from "react"
// import FeedbackData from "./data/FeedbackData"
import FeedbackStats from "./components/FeedbackStats"
import FeedbackForm from "./components/FeedbackForm"
import About from './pages/About'
import Post from './pages/Post'
import AboutIconLink from './components/AboutIconLink'
import Card from './components/shared/Card'
import { FeedbackProvider } from './context/FeedbackContext'

function App() {
    // const [feedback, setFeedback] = useState(FeedbackData)

    return (
        <FeedbackProvider>
            <Router>
                <Header text="Feedback UI " />
                <div className="container">
                    <Routes>
                        <Route 
                            exact
                            path='/' 
                            element={
                                <>
                                    <FeedbackForm />
                                    <FeedbackStats />
                                    <FeedbackList />
                                </>
                            }
                        >
                        </Route>

                        <Route path='/about' element={<About />} />
                        <Route path='/post/:id/:name' element={<Post />} />
                    </Routes>

                    {/* <Card>
                        <NavLink to='/' activeClassName='active'>
                            Home
                        </NavLink>
                        <NavLink to='/about' activeClassName='active'>
                            About
                        </NavLink>
                    </Card> */}

                    <AboutIconLink />
                </div>
                
            </Router>
        </FeedbackProvider>
    )
}

export default App