<template>
    <!-- 付款頁面 -->
    <!-- 先讀訂單頁面是用甚麼付款 也可以更換信用卡或轉帳付款-->
    <!-- 付款後跳轉到訂單頁面 -->
    <p class="h1">付款頁面</p>
    <P>未來在研究金流 這邊先大概帶過</P>
    <hr>
    <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label class="btn btn-secondary active">
            <input type="radio" name="options" id="option1" checked v-model="ord_payment" value="信用卡"> 信用卡付款
        </label>

        <label class="btn btn-secondary">
            <input type="radio" name="options" id="option2" checked v-model="ord_payment" value="ATM"> ATM 付款
        </label>
    </div>

    <div class="wrap">
        <!-- 判斷是否有訂單編號 -->
        <div v-if="judgeOrder">
            <div class="modal-body">
                <p class="h3">無訂單,請返回</p>
            </div>
            <!-- <div class="modal-footer">
                <button type="button" class="btn btn-primary" onclick="history.back()">返回</button>
            </div> -->
        </div>
        <!-- 判斷信用卡or轉帳 -->


        <div v-if="!judgeOrder">
            <div v-if="juduePayment">
                <p class="h3">信用卡付款</p>
                <div>
                    <a>訂單編號:{{ ord_number }}</a>
                </div>
                <br>
                <div>
                    <a>訂單總金額:{{ ord_total }}</a>
                </div>
                <br>
                <form>
                    <div>
                        <div class="form-group">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">請輸入信用卡號:</span>
                                </div>
                                <input type="text" aria-label="1groupCard" class="form-control" v-model="Card1"
                                    maxlength="4" size="4" oninput="value=value.replace(/[^\d]/g,'')">
                                <input type="text" aria-label="2groupCard" class="form-control" v-model="Card2"
                                    maxlength="4" size="4" oninput="value=value.replace(/[^\d]/g,'')">
                                <input type="text" aria-label="3groupCard" class="form-control" v-model="Card3"
                                    maxlength="4" size="4" oninput="value=value.replace(/[^\d]/g,'')">
                                <input type="text" aria-label="4groupCard" class="form-control" v-model="Card4"
                                    maxlength="4" size="4" oninput="value=value.replace(/[^\d]/g,'')">
                            </div>

                        </div>
                    </div>
                    <br>
                    <div class="form-group">

                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">信用卡背面三碼:</span>
                            </div>
                            <input type="text" aria-label="Card" class="form-control" v-model="Card_code" maxlength="3"
                                size="3" oninput="value=value.replace(/[^\d]/g,'')">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-4">
                            <label for="inputState">信用卡/年</label>
                            <select id="inputState" class="form-control" v-model="Card_year">
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                                <option value="32">32</option>
                                <option value="33">33</option>
                                <option value="34">34</option>
                                <option value="35">35</option>
                                <option value="36">36</option>
                                <option value="37">37</option>
                                <option value="38">38</option>
                                <option value="39">39</option>
                                <option value="40">40</option>
                                <option value="41">41</option>
                                <option value="42">42</option>
                                <option value="43">43</option>
                            </select>
                        </div>
                        <div class="form-group col-md-4">
                            <label for="inputState">信用卡/月</label>
                            <select id="inputState" class="form-control" v-model="Card_month">
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                                <option value="06">06</option>
                                <option value="07">07</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                        </div>
                    </div>
                    <br>

                    <!-- <button type="submit" class="btn btn-primary" @click="creditcardPay">付款</button> -->

                </form>

            </div>
            <div v-if="!juduePayment">
                <p class="h3">ATM付款</p>
                <div>
                    <div>
                        <a>訂單編號:{{ ord_number }}</a>
                    </div>
                    <br>
                    <div>
                        <a>訂單總金額:{{ ord_total }}</a>
                    </div>
                    <br>

                    <form>
                        <div>
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">您的銀行代碼:</span>
                                    </div>
                                    <input type="text" aria-label="bankcode" class="form-control" maxlength="5" size="5"
                                        oninput="value=value.replace(/[^\d]/g,'')">
                                </div>

                            </div>
                        </div>
                        <br>
                        <div class="form-group">

                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">您的銀行帳號後五碼:</span>
                                </div>
                                <input type="text" aria-label="bankacc" class="form-control" maxlength="5" size="5"
                                    oninput="value=value.replace(/[^\d]/g,'')">
                            </div>
                            <!-- <button type="submit" class="btn btn-primary" @click="bankPay">付款</button> -->
                        </div>
                        <br>

                    </form>


                </div>
            </div>
            <button type="submit" class="btn btn-primary" @click="Pay">付款</button>
        </div>


        <!-- <div v-else>
                    轉帳付款
                    <button type="submit" class="btn btn-primary" @click="Paying">付款</button>
                    輸入帳號
                </div> -->


        <!-- <button type="submit" class="btn btn-primary" @click="creditcardPay">付款</button> -->

    </div>





</template>

<script>
import axios from "axios";
// 引用APIurl資料夾的axiosAPI.js
import AxiosAPI from "../../APIurl/axiosAPI.js";
const API_URL = AxiosAPI.ProductServiceurl();

export default {
    data() {
        return {
            OrderData: [],
            ord_id: '',
            ord_number: '',
            ord_total: '',
            ord_payment: '',

            Card1: '',
            Card2: '',
            Card3: '',
            Card4: '',

            // 信用卡欄位
            // 信用卡號
            // card_number: '',
            // 信用卡背面三碼
            Card_code: '',
            // 信用卡年+月
            Card_year: '',
            Card_month: '',

            // ATM欄位

        }

    },


    mounted: function () {
        // 取得local OrderData資料
        let OrderData = JSON.parse(localStorage.getItem('OrderData'));
        this.OrderData = OrderData
        this.ord_id = OrderData.id
        this.ord_number = OrderData.ord_number;
        this.ord_total = OrderData.ord_total;
        this.ord_payment = OrderData.ord_payment;
        // 取出OrderData裡的id與ord_number欄位



    },

    methods: {

        Pay() {
            if (this.ord_payment == "信用卡") {
                this.creditcardPay()
            } else if (this.ord_payment == "ATM") {
                this.bankPay()
            }

            else {
                alert("請選擇付款方式")
            }
        },


        // 信用卡付款
        creditcardPay() {
            // card_number要加密
            // 回傳card_number,Card_code,card_date
            // 驗證是否加密成功
            // 之後再研究加密

            // this.$router.push('/myorder')

            let data = {
                ord_payment: "信用卡",
                ord_state: "已付款",
                ord_logistics: "待出貨"
            }

            axios.patch(API_URL + 'updateOrder/' + this.ord_id, data)
                .then((res) => {
                    // 跳轉到MyOrder
                    console.log(res.data)
                    localStorage.removeItem('OrderData')
                    this.$router.push('/myorder')
                }).catch((err) => {
                    console.log(err)
                })


        },

        // ATM付款
        bankPay() {

            // this.$router.push('/myorder')

            let data = {
                ord_payment: "ATM",
                ord_state: "已付款",
                ord_logistics: "待出貨"
            }

            axios.patch(API_URL + 'updateOrder/' + this.ord_id, data)
                .then((res) => {
                    // 跳轉到MyOrder
                    console.log(res.data)
                    localStorage.removeItem('OrderData')
                    this.$router.push('/myorder')
                }).catch((err) => {
                    console.log(err)
                })
        }
    },


    computed: {
        judgeOrder() {
            if (localStorage.getItem('OrderData') == null) {
                return true
            } else {
                return false
            }

            // 判斷localStorage Order是否有資料 
        },

        juduePayment() {
            if (this.ord_payment == '信用卡') {
                return true
            } else if (this.ord_payment == 'ATM') {
                return false
            }
            // 判斷localStorage Order裡的ord_payment欄位是否為信用卡
        },

        card_number() {
            // 把Card1+Card2+Card3+Card4四個欄位的字串組合
            let number = this.Card1 + this.Card2 + this.Card3 + this.Card4
            return number
        },

        card_date() {
            // 把Card_year+Card_month兩個欄位的字串組合
            let date = this.Card_year + this.Card_month
            return date
        }

    },

}


</script>