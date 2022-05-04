import * as Vue from './vue.js';
import myComponent from "./my-component.js"

const app = Vue.createApp({
    data() {
        return {
            images: [],
            title: "",
            description: "",
            username: "",
            image: null,
            selectedImage: null

        }
    }, // CLOSES DATA 

    mounted() {
        fetch("/api/images").then((result) => {
            console.log("RESULTS", result)
            return result.json()
        }).then((response) => {
            console.log("RESPONSE", response)
            this.images = response;
        })

    },
    // COMPONENTS ========================//
    components: {
        'my-component': myComponent,
    },
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
                return insertedImage.json()
            }).then((insertedImage) => {
                console.log("RESPONSE", insertedImage)
                this.images.unshift(insertedImage)
            });
        },
        handleFileChange(e) {
            console.log("Handle File Change");
            this.image = e.target.files[0];
        },
        onClick(image_id) {
            console.log("this is image nr: ", image_id)
                // this.$emit('clicked', selectedImage);
            this.selectedImage = image_id;

        },
        onCloseClick() {
            this.selectedImage = null
            console.log("CLOSE app")

        },
        loadMoreImages() {
            console.log("LOADING MORE IMAGES ");
            let lastImageId = this.images[this.images.length - 1].id
                // let lastImageId = lastImage.id
                // console.log("LAST IMAGE", lastImage);

            const myHeaders = new Headers();

            myHeaders.append("lastImageId", lastImageId);

            console.log("LAST IMAGE ID", lastImageId);
            fetch("/loading", {
                method: "GET",
                headers: myHeaders,
            }).then((response) => {
                console.log("THIS IS THE RESPONSE OF LOADING MORE", response);

            }).catch((error) => {
                console.log("ERROR IN LOADMOREIMAGES ", error);
            })


        },

    },

});
app.mount("#main");