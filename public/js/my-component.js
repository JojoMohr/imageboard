import commentsComponent from "./comments-component.js"


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
    components: {
        "comments-component": commentsComponent

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
                   <div id="closePopup"   v-if="selectedImage" :selected-image="selectedImage" id="X" @click="onCloseClick"></div>

            <img :src="url" alt="Selected_image" >
            
            
            <div id="rightcolumn">

              <div id="titleDescription">
                <h2 id="title" class="hidden">{{title}}</h2>
                <p id="description" class="hidden">{{description}}</p>
         </div>
          </div>
          <div id="commentsection">
            
            <p v-for="comment in comments" id="username" class="hidden">{
            {username}}</p>
            
            <comments-component :id="selectedImage"></comments-component>
        </div>
        </div>
        
    `

};

export default myComponent

// <img src="{{selectedImage.url}}" alt="Selected image">

//