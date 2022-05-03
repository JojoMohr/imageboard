const commentsComponent = {
    props: ["selected-image"], // pass to it the id of the image (gets it from modal)
    data() {
        return {
            allComments: [],
            username: "",
            comment: "",
            submitComment: ""
        }
    },
    mounted() { // make an HTTP request to retrieve  all the comments made about that particular image.

    },
    methods: {
        /* you'll need a click handler for the submit button
            - when you click submit, you'll make a POST request to insert the new comment in the database
            - do NOT use formData! (this is only necessary when you're sending a file along to the server). 
                Instead, pass a body property as part of the 2nd argument to fetch.
            - upon success, you new comment should be added into the array of comments 
                (this is what you retrieved when your comment component mounted).
        */
        submitComment() {
            console.log("Comment submitted")
        }

    },
    template:

    /*
    
    Make sure you render all comments inside your template
    Modify the template for the modal component so that it renders the comments 
    component inside and passes the image id to it! */
        `   
    <div class="comments">
        <input type="text" name="username" id="username">
        <input type="text" name="commentInput" id="comment">
        <button id="submitComment">Submit</button>
        <p id="allComments">ALL COMMENTS SHOULD BE HERE</p>
    </div>
    `
}

export default commentsComponent