const commentsComponent = {
    props: ["id"], // pass to it the id of the image (gets it from modal)
    data() {
        return {
            allComments: [],
            username: "",
            comment: "",
            image_id: ""
                //submitComment: ""
        }
    },

    // make an HTTP request to retrieve  all the comments
    // made about that particular image.
    mounted() {
        fetch("/comments/" + this.id).then((allComments) =>
            allComments.json()
        ).then((allComments) => {
            console.log("ALL COMMENTS", allComments)
            console.log("ALL THIS", this)
            this.allComments = allComments;
        });

    },
    methods: {
        addComment() {
            console.log("USERNAME:", this.username);
            console.log('COMMENT: ', this.comment)
            console.log('COMMENT: ', this.id)

            fetch('/comment', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    //  image_id: this.image_id,
                    username: this.username,
                    comment: this.comment,
                    image_id: this.id
                })
            }).then(
                response => response.json()
            ).then(
                response => {
                    console.log("RESPONSE", response.rows[0])
                    console.log("RESPONSE", this)
                    this.allComments.push(response.rows[0])
                    console.log("RESPONSE", this)
                }
            );
        }
    },
    template: `   
    <div class="comments">
        <input type="text" name="username" v-model="username" id="username" class="hidden" placeholder="Username">
        
        <input type="text" name="commentInput" v-model="comment" id="comment" class="hidden" placeholder="Write your comment">

        <button id="submitComment" class="hidden" @click="addComment">Submit</button>
        <div v-for="comment in allComments">
        <p id="allComments">{{comment.username}}: {{comment.comment}}</p>
        </div>       
    </div>
    `
};

export default commentsComponent