import Card from "./shared/Card"
import { useState, useEffect } from "react"
import Button from "./shared/Button"
import RatingSelect from "./RatingSelect"

function FeedbackForm({handleAdd}) {
    const [text, setText] = useState('')
    const [rating, setRating] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')

    const handleTextChange = (e) => {
        setText(e.target.value)
    }

    const validate = () => {
        if(text === '') {
            setBtnDisabled(true)
            setMessage(null)
        } else if(text !== '' && text.length <= 10) {
            setBtnDisabled(true)
            setMessage('Text must be at least 10 characters')
        } else {
            setMessage(null)
            setBtnDisabled(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(text.length > 10) {
            const newFeedback = {
                text,
                rating
            }

            handleAdd(newFeedback)
            setText('')
        }
    }

    useEffect(() => {
        validate(); // This is be executed when the state changes
    }, [text]);

  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate your service whit us?</h2>
            <RatingSelect select={(rating) => setRating(rating)}/>
            <div className="input-group">
                <input value={text} onChange={handleTextChange} type="text" placeholder="Write a review"/>
                <Button type="submit" isDisabled={btnDisabled}>
                    Send
                </Button>
            </div>

            {message && <div className="message">{message}</div>}
        </form>
    </Card>
  )
}

export default FeedbackForm