<template>
    <h1>產品列表</h1>
    <hr>

    <table class="table table-bordered">
        <thead>
            <tr>
                <th scope="col">產品編號</th>
                <th scope="col">產品名稱</th>
                <th scope="col">產品價格</th>
                <th scope="col">產品圖片</th>
                <th scope="col">產品描述</th>

                <th scope="col">產品是否上架</th>
                <th scope="col">產品更新日期</th>
                <th scope="col">產品建立日期</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in products" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.price }}</td>
                <td><img :src="path + item.image" class="card-img-top" alt=""></td>
                <!-- <img :src="path + item.image" class="card-img-top" alt=""> -->

                <td>{{ item.description }}</td>

                <td>{{ item.published }}</td>
                <td>{{ item.updatedAt }}</td>
                <td>{{ item.createdAt }}</td>
                <td>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"
                        @click.prevent="updataproducts(item)">
                        修改
                    </button>
                    <!-- 修改彈出視窗 引用Updataproducts.vue面板 -->
                </td>
            </tr>
        </tbody>
    </table>



    <!-- Modal -->
    <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!-- <Updataproducts></Updataproducts> -->
                    <Updataproducts :accept="itemTemp"></Updataproducts>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>




</template>
    
<script>
import axios from 'axios';
// import { url } from 'inspector';
import Updataproducts from './Updataproducts.vue';

import AxiosAPI from "../../APIurl/axiosAPI.js";
const API_URL = AxiosAPI.ProductServiceurl();
const API_image = AxiosAPI.Imagepath();


export default {
    components: {
        Updataproducts,
    },
    data() {
        return {
            products: [],

            path: API_image,

            

            itemTemp: '',


        }
    },

    mounted:
        function () {
            axios.get(API_URL + "allProducts")
                .then((res) => {
                    this.products = res.data
                    console.log(this.products)
                })
                .catch((err) => {
                    console.log(err)
                })

        },

    methods: {
        sentToparent() {
            this.$emit('sentToparent', this.inputContent)
        },


        // updataproducts:item寫入localStorage
        updataproducts(item) {
            // 將item存到data,建立父傳子的資料
            // this.itemtemp = item;
            this.itemTemp = item;

            

            
            

            // localStorage.setItem('item', JSON.stringify(item));
            // 刷新vue computed
            // this.$forceUpdate();


        },



    },


    computed: {


    },



}

</script>