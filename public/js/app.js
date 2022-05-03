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
        console.log("jetzt wollen wir mit dem server reden ")
    }, // CLOSES MOUNTED 
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

    },

});
app.mount("#main");