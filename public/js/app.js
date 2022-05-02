import * as Vue from './vue.js';

console.log("app.js is here")

const app = Vue.createApp({
    data() {
        return {
            images: [],

        }
    }, // CLOSES DATA 

    mounted() {
        fetch("/api/images").then((result) => {
            console.log("RESUUUUKLTS", result)
            return result.json()
        }).then((response) => {
            console.log("RESPONSE", response)
            this.images = response;
        })
        console.log("jetzt wollen wir mit dem server reden ")
    }, // CLOSES MOUNTED 

    methods: {
        handleSubmit(e) {
            // Prevent the default form submission behavior 
            e.preventDefault();

            // Create your data with the right encoding
            const formData = new FormData();
            formData.append("title", this.title);
            formData.append("image", this.image);
            formData.append("username", this.username);
            formData.append("description", this.description);

            // Trigger an Ajax to the server:
            fetch("/image", {
                method: "POST",
                body: formData,
            }).then((insertedImage) => {
                return res.json()
            }).then((insertedImage) => {
                console.log("RESPONSE", insertedImage)
                this.images.unshift(insertedImage)
            });
        },
        handleFileChange(e) {
            console.log("Handle File Change");
            this.image = e.target.files[0];
        },
    },

});
app.mount("#main");


/*
{
                    "id": 3,
                    "url": "https://s3.amazonaws.com/imageboard/XCv4AwJdm6QuzjenFPKJocpipRNNMwze.jpg",
                    "username": "discoduck",
                    "title": "To be or not to be",
                    "description": "That is the question.",
                    "created_at": "2022-04-28T14:31:48.627Z"
                },
                {
                    "id": 2,
                    "url": "https://s3.amazonaws.com/imageboard/wg8d94G_HrWdq7bU_2wT6Y6F3zrX-kej.jpg",
                    "username": "discoduck",
                    "title": "Elvis",
                    "description": "We can't go on together with suspicious minds.",
                    "created_at": "2022-04-28T14:31:48.627Z"
                },
                {
                    "id": 1,
                    "url": "https://s3.amazonaws.com/imageboard/jAVZmnxnZ-U95ap2-PLliFFF7TO0KqZm.jpg",
                    "username": "funkychicken",
                    "title": "Welcome to Spiced and the Future!",
                    "description": "This photo brings back so many great memories.",
                    "created_at": "2022-04-28T14:31:48.626Z"
                }*/