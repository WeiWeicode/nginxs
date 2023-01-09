<template>
    <!-- 購物車轉付款的頁面 -->
    <h1>結帳</h1>

    <div class="wrap">
        <div v-if="!shoppingCartBoolean">
            <!-- 跳警告視窗並返回HOME -->
            <div class="modal-body">
                <p>購物車為空，請先選購商品</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary"  onclick="history.back()" >返回</button>
            </div>
        </div>

        <!-- id="from" method="POST" enctype="application/x-www-form-urlencoded" -->


        <div v-show="shoppingCartBoolean">

            <div>
                <table class="table table-striped table-bordered" id="from" method="POST"
                    enctype="application/x-www-form-urlencoded">
                    <thead>
                        <tr>
                            <th>商品名稱</th>
                            <th>商品價格</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in ProductsTable" :key="item.id">
                            <td>{{ item.title }}</td>
                            <td>{{ item.price }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>


            <div class="form-group">
                <div class="alert alert-success">
                    <label for="total">總金額:{{ ord_total }}</label>
                </div>
            </div>

            <div class="form-group">
                <label for="byusername">收件人</label>
                <input type="text" class="form-control" id="byusername" placeholder="請輸入收件人" v-model="ord_byusername">
            </div>

            <div class="form-group">
                <label for="phone">手機</label>
                <input type="tel" class="form-control" id="phone" placeholder="請輸入電話" v-model="ord_phone"
                    oninput="value=value.replace(/[^\d]/g,'')" maxlength="10">
            </div>

            <div class="form-group">
                <label for="address">地址</label>
                <input type="text" class="form-control" id="address" placeholder="請輸入地址" v-model="ord_address">
            </div>

            <div class="form-group">
                <!-- 單選式付款方式(radio) 信用卡,ATM,貨到付款-->
                <label for="payment">付款方式</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="payment" id="payment1" value="信用卡"
                        v-model="ord_payment">
                    <label class="form-check-label" for="payment1">
                        信用卡
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="payment" id="payment2" value="ATM"
                        v-model="ord_payment">
                    <label class="form-check-label" for="payment2">
                        ATM
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="payment" id="payment3" value="貨到付款"
                        v-model="ord_payment">
                    <label class="form-check-label" for="payment3">
                        貨到付款
                    </label>
                </div>
            </div>
            <!-- 付款按鈕 -->
            <button type="submit" class="btn btn-primary" @click="Paying">付款</button>

        </div>
    </div>

</template>


<script>

import axios from "axios";
import AxiosAPI from "../../APIurl/axiosAPI.js";
const API_URL = AxiosAPI.ProductServiceurl();

export default {

    data() {
        return {
            // isShow: true
            ProductsTable: [],

            ord_total: null,
            ord_phone: '',
            ord_address: '',
            ord_payment: '',
            ord_byusername: '',
            ord_byid: '',
            ord_state: '',
            testrempid: '',

            tempShppingCart: [],
            tempres: [],

            



        }

    },

    mounted: function () {
        let ProductsTable = JSON.parse(localStorage.getItem('ShoppingCart'))
        this.ProductsTable = ProductsTable
        // 取得localStorage資料
        this.ord_total = this.ProductsTable.reduce((total, item) => total + item.price, 0)
        // 計算總金額
        let user = JSON.parse(localStorage.getItem('user'))
        this.ord_byusername = user.username
        this.ord_byid = user.id
        // byid: 取得localStorage user裡的id

    },

    methods: {
        Paying() {

            // 將local資料轉成json格式
            let productsdata = this.ProductsTable.map((item) => {
                return {
                    ord_product_id: item.id,
                    ord_product_title: item.title,
                    ord_product_price: item.price
                }
            })

            let order = {
                ord_total: this.ord_total,
                ord_phone: this.ord_phone,
                ord_address: this.ord_address,
                ord_payment: this.ord_payment,
                ord_byusername: this.ord_byusername,
                ord_byid: this.ord_byid,
                ord_state: "未付款",
                ord_ord_logistics: "未出貨",
                orderproduct: productsdata
            }


            axios.post(API_URL + 'addOrderProduct', order)
                .then((res) => {
                    console.log(res)
                    // res寫入localStorage命名為:OrderData
                    localStorage.setItem('OrderData', JSON.stringify(res.data))
                }).then(() => {
                    if (this.ord_payment == "信用卡" || this.ord_payment == "ATM") {
                        
                        localStorage.removeItem('ShoppingCart')
                        this.$router.push('/PayPage')
                    } else {
                        localStorage.removeItem('ShoppingCart')
                        localStorage.removeItem('OrderData')
                        this.$router.push('/MyOrder')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })

            
            // 清掉localStorage ShoppingCart
            // 寫判斷式付款方式為:信用卡與轉帳,畫面跳轉到PayPage輸入資料,付款方式為:貨到付款,畫面跳轉到個人訂單 
            // if (res.status == 200) {
            //     // 清掉localStorage ShoppingCart
            //     // 寫判斷式付款方式為:信用卡與轉帳,畫面跳轉到PayPage輸入資料,付款方式為:貨到付款,畫面跳轉到個人訂單 
            //     if (this.ord_payment == "信用卡" || this.ord_payment == "ATM") {
            //         localStorage.removeItem('ShoppingCart')
            //         this.$router.push('/PayPage')
            //     } else {
            //         localStorage.removeItem('ShoppingCart')
            //         this.$router.push('/MyOrder')
            //     }
            // } else {
            //     alert('付款失敗')
            // }


            
        },

    },
    computed: {
        shoppingCartBoolean() {

            if (localStorage.getItem('ShoppingCart') == null) {
                return false
            } else {
                return true
            }

            // 判斷localStorage ShopoingCart是否有資料 
        },




    },
}

</script>