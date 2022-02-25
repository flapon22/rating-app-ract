import Card from "./shared/Card"
import { useState, useEffect, useContext } from "react"
import Button from "./shared/Button"
import RatingSelect from "./RatingSelect"
import FeedbackContext from "../context/FeedbackContext"

function FeedbackForm() {
    const [text, setText] = useState('')
    const [rating, setRating] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [message, setMessage] = useState('')

    const {addFeedback, feedbackEdit, updateFeedback, editFeedback }= useContext(FeedbackContext)

    const handleTextChange = (e) => {
        let val = e.target.value
        setText(val)
        validate(val)
    }

    const validate = (val) => {
        if(!!val && val.length <=10){
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

            if(feedbackEdit.edit === true) {

                updateFeedback(feedbackEdit.item.id, newFeedback)
                editFeedback({}, false)

            } else {

                addFeedback(newFeedback)
            }

            setText('')
        }
    }

    useEffect(() => {
        if(feedbackEdit.edit === true){
            validate(feedbackEdit.item.text)
            setText(feedbackEdit.item.text)
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit]);

    // useEffect(() => {

    // }, [feedbackEdit]);

  return (
    <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate your service whit us?</h2>
            <RatingSelect autoRating={rating} select={(rating) => setRating(rating)}/>
            <div className="input-group">
                <input value={text} onInput={handleTextChange} type="text" placeholder="Write a review"/>
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