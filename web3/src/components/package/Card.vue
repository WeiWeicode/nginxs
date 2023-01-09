<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-8">
                <input type="text" class="form-control" v-model="titleSearch" pl aceholder="Search">
            </div>
            <div class="col-sm-4">
                <!-- <button type="button" class="btn btn-primary">
                    待結帳 <span class="badge badge-pill badge-success"> {{shoppingCartTotal}}</span>
                </button>    -->


                <!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop"
                    @click="shoppingcartToOrder(allshoppCart); shoppingCartPriceTotle()">
                    待結帳 <span class="badge badge-pill badge-success"> {{ shoppingCartTotal }}</span>
                </button>

                <!-- Modal -->

                <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1"
                    aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div class="modal-body">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">商品名稱</th>
                                            <th scope="col">單價</th>
                                            <th scope="col">刪除</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="shoppingCart in allshoppCart" :key="shoppingCart.id">
                                            <td>{{ shoppingCart.title }}</td>
                                            <td>{{ shoppingCart.price }}</td>
                                            <td>
                                                <button type="button" class="btn btn-danger"
                                                    @click="deleteShoppingCart(shoppingCart.id); shoppingCartPriceTotle()">刪除</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="alert alert-success" role="alert">
                                    總價:{{ PriceTotle }}
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">關閉</button>
                                <button type="button" class="btn btn-primary" @click="topayment" data-dismiss="modal"
                                    >結帳</button>
                            </div>
                            

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h1></h1>
        <div id="Products" class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col" v-for="product in ProductsID" :key="product.id">
                <div class="card h-100" style="width: 17rem;">
                    <img :src="path + product.image" class="card-img-top" alt="">
                    <!-- `http://localhost:3000/${productImage}` -->
                    <div class="card-body">
                        <h5 class="card-title">商品名稱:{{ product.title }}</h5>
                        <p class="card-text">產品描述:{{ product.description }}</p>
                        <p class="card-text">產品價格:{{ product.price }}</p>
                    </div>
                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                        <!-- <button @click="addShoppingCart(ProductsTable)" type="button" class="btn btn-success" >購物車</button> -->
                        <!-- 這會抓到全部 -->
                        <button @click="addShoppingCart(product)" type="button" class="btn btn-success">購物車</button>
                        <!-- 這抓單筆 -->
                    </div>
                </div>
            </div>
        </div>
    </div>


    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item" v-if="TempPage > 1">
                <a class="page-link" href="" @click.prevent="pageChange(page - 1)">Previous</a>
            </li>
            <li class="page-item" v-for="page in pages" :key="page">
                <a class="page-link" href="" @click.prevent="pageChange(page)">{{ page }}</a>
            </li>
            <li class="page-item" v-if="page < pages">
                <a class="page-link" href="" @click.prevent="pageChange(page + 1)">Next</a>
            </li>
        </ul>
    </nav>
</template>

<script>
// import { thisExpression } from "@babel/types";
import router from "@/router";
import axios from "axios";
// 引用axios
import AxiosAPI from "../../APIurl/axiosAPI.js";
const API_URL = AxiosAPI.ProductServiceurl();
const API_image = AxiosAPI.Imagepath();


export default {

    data() {
        return {

            // page: '',
            // 目前頁數(預設1)
            TempPage: '',
            // TempPage: 暫存頁數
            // pages: '',
            // 總頁數
            pageLimit: 6,
            // 一頁顯示幾筆
            pageStart: 0,
            // 起始頁數
            pageEnd: 6,
            // 結束頁數
            // ProductsID: [],
            // ProductsID: 顯示的產品
            // pageID: '',
            // pageID: 沒用到拿來觀察是否取到

            // ProductsSearch: [],

            PriceTotle: 0,
            // PriceTotle: 購物車總價
            shoppingCartTotal: '',
            // shoppingCartTotal: 購物車總數
            published: true,
            // true:產品上架
            ProductsTable: [],
            // ProductsTable: 產品get資料表(ProductsTable變成類似母版給ProductsID去顯示使用)
            allshoppCart: [],
            // shoppingCart: 購物車資料表(local)
            shoppingCart: [],

            titleSearch: '',
            // titleSearch: 搜尋的標題 先給空值 也可以預設值
            // path: "http://192.168.68.60:8082/"
            path: API_image,
            // paht: 照片路徑使用
        };
    },



    mounted:
        function () {
            axios.get(API_URL + "allProducts")
                // 發出取得請求
                .then((response) => {
                    // 取得回應後的處理
                    console.log(response);
                    // 這裡的response是API回傳的資料

                    this.ProductsTable = response.data.filter
                        (searchResult => searchResult.published == this.published);
                    // 只篩選出published為true的資料 (原本放在mounted裡面,後來發現放在這裡才不會一直重複執行)
                    // this.ProductsSearch = this.ProductsTable
                    // this.pageID = this.ProductsTable.map(item => item.id).slice(this.pageStart, this.pageEnd)
                    // this.ProductsID = this.ProductsTable.slice(this.pageStart, this.pageEnd)
                    // 
                })
                .catch((error) => {
                    // 發生錯誤時的處理
                    console.log(error);
                });


            let shoppingCartTotal = JSON.parse(localStorage.getItem('ShoppingCart'))
            if (localStorage.getItem('ShoppingCart') !== null) {
                this.shoppingCartTotal = shoppingCartTotal.length
                this.allshoppCart = shoppingCartTotal

            }
            else {
                this.shoppingCartTotal = 0
            }
            // 取得shoppingcart localStorage資料

            // axios.get("http://192.168.68.60:8082/api/products/allProducts")
            //     .then((response) => {
            //         let e = response.data.filter
            //             (searchResult => searchResult.published == this.published);
            //         this.pages = Math.ceil(e.length / this.pageLimit)
            //         // 計算總頁數

            //     })
            this.TempPage = 1


        },



    methods: {
        // methods: 方法
        addShoppingCart(i)
        // addShoppingCart: 加入購物車
        // i: 產品資料
        {
            // localStorage.setItem('Products', JSON.stringify(this.ProductsTable))
            // 寫入全部產品資料到localStorage         
            let Products = JSON.parse(localStorage.getItem('ShoppingCart'))
            if (localStorage.getItem('ShoppingCart') !== null)
            // 在localStorage裡面找ShoppingCart 不等於 空值 
            // !==: 不等於
            // null: 空值
            {
                if (Products.some(item => item.id === i.id)) return
                // products.some: 有沒有符合的 https://noob.tw/js-every-some/
                // item.id === i.id: 有沒有相同的id 一樣的話就不加入
                Products.push(i)
                // push: 加入
                localStorage.setItem('ShoppingCart', JSON.stringify(Products))
                // localStorage.setItem: 寫入
                // LocalStorage: 瀏覽器的資料庫(SpopingCart: 購物車)
                // JSON.stringify: 轉成JSON格式


            }
            else {
                localStorage.setItem('ShoppingCart', JSON.stringify([i]))
            }


            let shoppingCartTotal = JSON.parse(localStorage.getItem('ShoppingCart'))
            return this.shoppingCartTotal = shoppingCartTotal.length, this.allshoppCart = shoppingCartTotal
            // this.shoppingCartTotal: 點擊購物車按鈕後的購物車數量
            // this.allshoppCart: 點擊購物車按鈕後的資料
            // 用觸發事件的產品資料i去找localStorage裡面的ShoppingCart數量

        },

        shoppingcartToOrder() {
            if (localStorage.getItem('user') !== null) {
                // localStorage.getItem('user') !== null: localStorage裡面有user

            }
            else {
                this.$router.push('/login')
                // 沒有user就this.$router.push: 跳轉頁面
            }
        },
        // 先判斷localStorage裡面有沒有user
        // 有的話就跳轉到訂單頁面
        // 沒有的話就跳轉到登入頁面

        deleteShoppingCart(i) {
            let Products = JSON.parse(localStorage.getItem('ShoppingCart'))
            // 取得localStorage裡面的ShoppingCart資料
            let ProductsId = Products.map(item => item.id)
            // Products.map: 把Products裡面的id取出來

            let index = ProductsId.indexOf(i)
            // index2: 找到i的位置 

            // 以下是測試用,看變數的狀態
            // let index = ProductsId
            // index: 找到i的位置
            // let index1 = i
            // indexOf: 找到i的位置
            // 原本用JOSN.parse(localStorage.getItem('ShoppingCart'))取得的資料是陣列,
            // ProductsId取id字串
            // 然後用indexOf找id的位置
            // 最後用splice刪除

            Products.splice(index, 1)
            // splice: 刪除
            localStorage.setItem('ShoppingCart', JSON.stringify(Products))
            // 寫入localStorage
            let shoppingCartTotal = JSON.parse(localStorage.getItem('ShoppingCart'))

            return this.shoppingCartTotal = shoppingCartTotal.length, this.allshoppCart = shoppingCartTotal
            // this.shoppingCartTotal: 點擊購物車按鈕後的購物車數量
            // this.allshoppCart: 點擊購物車按鈕後的資料
            // 用觸發事件的產品資料i去找localStorage裡面的ShoppingCart數量


        },

        shoppingCartPriceTotle() {
            let Products = JSON.parse(localStorage.getItem('ShoppingCart'))
            // 取得localStorage裡面的ShoppingCart資料
            let ProductsPrice = Products.map(item => item.price)
            // Products.map: 把Products裡面的price取出來
            let ProductsPriceTotle = ProductsPrice.reduce((a, b) => a + b, 0)
            // ProductsPrice.reduce: 把ProductsPrice裡面的值加總
            // a: 前一個值
            // b: 後一個值
            // 0: 初始值
            return this.PriceTotle = ProductsPriceTotle
            // this.shoppingCartPriceTotle: 購物車總價
            // ProductsPriceTotle: 購物車總價
        },

        // 分頁
        pageChange(b) {
            this.TempPage = b
            // this.page: 當前頁數
            // page: 當前頁數

            this.pageStart = (this.TempPage - 1) * this.pageLimit
            // this.pageStart: 開始頁數
            // pageStart: 開始頁數
            // this.page: 當前頁數
            // page: 當前頁數
            // this.pageLimit: 每頁顯示數量
            // pageLimit: 每頁顯示數量

            this.pageEnd = this.pageStart + this.pageLimit
            // this.pageEnd: 結束頁數
            // this.ProductsID = this.ProductsTable.filter(searchResult => searchResult.title.match(this.titleSearch) && searchResult.published == this.published)
            // .slice(this.pageStart, this.pageEnd)
            // this.pageID = this.ProductsID.map(item => item.id)
            // 只帶出ID

            // this.pageID = this.ProductsTable.map(item => item.id).slice(this.pageStart, this.pageEnd)
            // this.ProductsID = this.ProductsTable.slice(this.pageStart, this.pageEnd)
            // this.pages = Math.ceil(this.ProductsID.length / this.pageLimit)
        },
        // 顯示資料 回傳到ProductsTable
        // pageProductsTable() {
        //     return this.Products.slice(this.pageStart, this.pageEnd)
        //     // return: 一定要有回傳的值
        //     // this.Products: 查Products
        //     // slice: 切割
        //     // this.pageStart: 開始頁數
        //     // this.pageEnd: 結束頁數
        // },



        topayment() {
            if (this.shoppingCartTotal > 0) {                               
                // this.$router.push('/payment')
                router.push('/payment')

                // ('.modal-backdrop').remove()
                // 跳轉頁面到payment.vue,並且關閉modal-backdrop fade show

            }
            else {
                
                alert('購物車為空');

            }
            // ShoppingCart要有資料才能跳轉
            // 跳轉頁面到payment.vue,並且關閉modal
            // 關閉彈出視窗
            // 若沒有資料,彈出視窗顯示:"購物車沒有資料"            
            // 關閉彈出視窗

}

    },

    computed: {
        // computed: 計算屬性

        page() {

            if (this.titleSearch != '') {
                if (this.page > this.pages) {
                    this.pageStart = 0,
                        this.pageEnd = this.pageStart + this.pageLimit
                    this.TempPage = 1
                    return 1
                }

                return this.TempPage
                // , this.pageStart = 0, this.pageEnd = this.pageStart + this.pageLimit
                // return this.TempPage
                // this.page: 當前頁數
                // page: 當前頁數
            }
            else {
                return this.TempPage
            }
            // TempPage: 預設第一頁(只有開啟網頁觸發),只有變動才會觸發以下的判斷
            // 判斷: 如果page大於pages就回到第一頁
            // 判斷: titleSearch有變動就回到第一頁
        },

        ProductsID() {
            // ProductsTable: 資料表
            // return this.ProductsID.filter
            //     (searchResult => searchResult.title.match(this.titleSearch));
            if (this.titleSearch == '') {
                // titleSearch: 搜尋的標題有變動就會觸發
                return this.ProductsTable.slice(this.pageStart, this.pageEnd)
                // 計算頁數 ProductsTable回傳到ProductsID
            } else {
                return this.productsSearch.slice(this.pageStart, this.pageEnd)

            }
        },

        pages() {
            if (this.titleSearch == '') {
                // titleSearch: 搜尋的標題有變動就會觸發
                return Math.ceil(this.ProductsTable.length / this.pageLimit)
                // 計算頁數 ProductsTable

            } else {
                return Math.ceil(this.productsSearch.length / this.pageLimit)
                // 計算頁數 ProductsSearch
            }
        },

        productsSearch() {
            // ProductsSearch: 搜尋
            return this.ProductsTable.filter(searchResult => searchResult.title.match(this.titleSearch))

            // filter: 篩選
            // searchResult: 搜尋結果
            // title: 標題
            // match: 比對
            // this.titleSearch: 搜尋的標題
        },

        // (searchResult => searchResult.title.match(this.titleSearch) && searchResult.published == this.published); 

        // return: 一定要有回傳的值
        // this.ProductsTable: 查ProductsTable
        // filter: 篩選
        // searchResult: 搜尋結果            
        // searchResult.title: 搜尋結果的title
        // match: 符合
        // this.titleSearch: 輸入值titleSearch(input v-model="titleSearch")
        // &&: 且
        // searchResult.published == this.published: 搜尋結果的published == 輸入值published(參考data)






    },

};
</script>

