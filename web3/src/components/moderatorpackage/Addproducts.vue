<template>
    <h1>新增產品</h1>
    <hr>



    <form>

        <div class="form-group">
            <label for="inputAddress">產品名稱</label>
            <input type="text" class="form-control" id="inputAddress" required v-model="title">
        </div>
        <div class="form-group">
            <label for="inputAddress2">產品金額</label>
            <input type="text" class="form-control" id="inputAddress2" oninput="value=value.replace(/[^\d]/g,'')"
                required v-model="price">
        </div>

        <div class="mb-3">
            <label for="validationTextarea">產品描述</label>
            <textarea class="form-control" id="validationTextarea2" required v-model="description"></textarea>
        </div>

        <!-- <div class="form-group">
            <label for="exampleFormControlFile1">上傳照片</label>
            <input type="file" class="form-control-file" id="exampleFormControlFile1">
        </div> -->

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

    <button type="submit" class="btn btn-primary" @click="addproducts">新增產品</button>

</template>

<script>
import axios from 'axios';
import AxiosAPI from "../../APIurl/axiosAPI.js";
const API_URL = AxiosAPI.ProductServiceurl();
const API_image = AxiosAPI.Imagepath();
export default {
    data() {
        return {
            // 產品名稱
            title: '',
            // 產品金額
            price: '',
            // 產品描述
            description: '',
            // 產品照片
            image: '',
            // 產品上架
            published: false,
        }
    },
    methods: {
        // 新增產品 formdata
        uploadImage(event) {
            this.image = event.target.files[0];
        },

        addproducts() {
            let formData = new FormData();
            formData.append('title', this.title);
            formData.append('price', this.price);
            formData.append('description', this.description);
            formData.append('image', this.image);
            formData.append('published', this.published);


            axios.post(API_URL + 'addProduct', formData).then((res) => {
                console.log(res)
                alert('新增成功')
                // this.$router.push('/addproducts');

                this.title = '';
                this.price = '';
                this.description = '';
                this.published = false;
                // 上傳成功跳出提示, 畫面重新整理

            }).catch((err) => {
                    console.log(err);
                })
        }
    }
}



</script>