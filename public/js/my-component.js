const myComponent = {
    props: ["selected-image"],
    data() {
        return {
            title: "",
            url: "",
            username: "",
            description: "",
        };
    },
    mounted() {
        const url = "/image/" + this.selectedImage;
        console.log("URL: ", url)

        fetch(url)
            .then((response) => response.json())
            .then((image) => {
                console.log("image im fetch", image.rows[0])
                this.title = image.rows[0].title
                this.url = image.rows[0].url
                this.username = image.rows[0].username
                this.description = image.rows[0].description

            }).catch((error) => {
                console.log(error)
            })
    },
    methods: {
        onCloseClick() {
            console.log("CLOSE COMPONENT")
            this.$emit("close")
        }

    },
    template: `
        <div class="popupImageBorder">    </div>


    <div class="popupImage ">
    <div id="closePopup"   v-if="selectedImage" :selected-image="selectedImage" @click="onCloseClick">🅧</div>
        <img :src="url" alt="Selected_image" @click="onCloseClick">
        <p id="title" class="hidden">{{title}}</p>
        <p id="description" class="hidden">{{description}}</p>
        <p id="username" class="hidden">{{username}}</p>
        </div>

    `

};

export default myComponent

// <img src="{{selectedImage.url}}" alt="Selected image">