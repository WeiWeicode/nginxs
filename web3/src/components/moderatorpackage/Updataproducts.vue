<template>
    <h1>產品更新</h1>
    <hr>



    <form>

        <!-- <div class="form-group">
            <label for="inputAddress">產品名稱</label>
            <input type="text" class="form-control" id="inputAddress" required v-model="title" >
           
        </div> -->

        <div class="form-group">
            <label for="inputAddress">產品名稱</label>
            <input type="text" class="form-control" required v-model="title">
        </div>



        <div class="form-group">
            <label for="inputAddress2">產品金額</label>
            <input type="text" class="form-control" oninput="value=value.replace(/[^\d]/g,'')" required v-model="price">
        </div>

        <div class="mb-3">
            <label for="validationTextarea">產品描述</label>
            <textarea class="form-control" required v-model="description"></textarea>
        </div>


        <!-- 照片上傳 -->
        <div class="form-group">
            <label for="exampleFormControlFile1">上傳照片</label>
            <input type="file" class="form-control-file" id="exampleFormControlFile1" @change="uploadImage">
        </div>



        <!-- 產品是否上架 -->



        <div class="custom-control custom-checkbox mb-3">
            <input type="checkbox" class="custom-control-input" id="customControlValidation1" required
                v-model="published">
            <label class="custom-control-label" for="customControlValidation1">是否上架產品</label>
        </div>

    </form>

    <button type="submit" class="btn btn-primary" @click="updateproducts">更新產品</button>



</template>

<script>
import axios from 'axios';
import AxiosAPI from "../../APIurl/axiosAPI.js";
const API_URL = AxiosAPI.ProductServiceurl();


export default {
    // 子接收父傳值
    props: ['accept'],
    data() {
        return {
            //     // // 產品名稱
            // title: '',
            //     // // 產品金額
            // price: '',
            //     // // 產品描述
            // description: '',
            //     // // 產品照片
            // image: '',
            //     // // 產品上架
            // published: '',

            // localProducts: [],

        }

    },

    mounted:
        function () {
            // this.title = this.accept.title;
            // this.price = this.accept.price;
            // this.description = this.accept.description;
            // this.published = this.accept.published;



        },

    methods: {
        // 新增產品 formdata
        uploadImage(event) {
            // 將image原本的值清空再上傳


            this.image = event.target.files[0];
        },

        updateproducts() {
            let formData = new FormData();
            formData.append('title', this.title);
            formData.append('price', this.price);
            formData.append('description', this.description);
            formData.append('image', this.image);
            formData.append('published', this.published);


            axios.patch(API_URL + 'patchProductid/' + this.accept.id, formData).then((res) => {
                console.log(res)
                alert('更新成功')
                // this.$router.push('/addproducts');


            }).catch((err) => {
                console.log(err);
            })
        }
    },

    computed: {

        title: {
            get() {
                return this.accept.title;
            },
            set(value) {
                this.accept.title = value;
            }
        },
        price: {
            get() {
                return this.accept.price;
            },
            set(value) {
                this.accept.price = value;
            }
        },
        description: {
            get() {
                return this.accept.description;
            },
            set(value) {
                this.accept.description = value;
            }
        },
        published: {
            get() {
                return this.accept.published;
            },
            set(value) {
                this.accept.published = value;
            }
        },
        image: {
            get() {
                return this.accept.image;
            },
            set(value) {
                this.accept.image = value;
            }
        },


        




    }


}



</script>