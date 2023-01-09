<template>
  <h1>訂單</h1>
  <!-- 查詢 -->
  <div class="container">
    <div class="row">
      <div class="col">
        <input type="text" v-model="select">

      </div>
      <div class="col">
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="已付款"
            v-model="selectOrdstate">
          <label class="form-check-label" for="inlineRadio1">已付款</label>
        </div>
        <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="未付款"
            v-model="selectOrdstate">
          <label class="form-check-label" for="inlineRadio2">未付款</label>
        </div>

      </div>
    </div>
  </div>

  <hr>

  <table class="table table-bordered">
    <thead>
      <tr>
        <!-- <th scope="col">#</th> -->
        <th scope="col">訂單編號</th>
        <th scope="col">產品項目</th>
        <th scope="col">金額</th>
        <th scope="col">是否付款</th>
        <th scope="col">物流狀態</th>
        <th scope="col">訂單日期</th>
        <th scope="col"></th>

      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in orders" :key="item.id">
        <!-- 取得陣列序號 -->
        <!-- <th scope="row">{{ index + 1 }}</th> -->
        <td>{{ item.ord_number }}</td>

        <td>
          <!-- 產品點擊顯示 資料在orders的orderproduct Json格式-->




          <table class="table table-borderless">

            <tbody>
              <tr v-for="(item, index) in item.orderproduct" :key="item.id">
                <td>{{ item.ord_product_title }}</td>
                <td>{{ item.ord_product_price }}</td>
              </tr>
            </tbody>
          </table>


        </td>

        <td>{{ item.ord_total }}</td>
        <td>{{ item.ord_state }}</td>
        <td>{{ item.ord_logistics }}</td>
        <td>{{ item.createdAt }}</td>
        <td>
          <button v-show="!judgmentPayment(item.id)" type="button" class="btn btn-primary" @click="orderPay(item.id)">結帳</button>
        </td>

      </tr>
    </tbody>

  </table>

  <!-- 分頁 -->

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

  <!-- <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"><a class="page-link" href="#">1</a></li>
      <li class="page-item"><a class="page-link" href="#">2</a></li>
      <li class="page-item"><a class="page-link" href="#">3</a></li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav> -->




</template>

<script>
import axios from "axios";
import AxiosAPI from "../../APIurl/axiosAPI.js";
const API_URL = AxiosAPI.ProductServiceurl();

export default {
  data() {
    return {
      ordersTemp: [],
      user_id: '',
      select: '',
      selectOrdstate: '已付款',

      TempPage: '',
      // TempPage: 暫存頁數
      // pages: '',
      // 總頁數
      pageLimit: 20,
      // 一頁顯示幾筆
      pageStart: 0,
      // 起始頁數
      pageEnd: 20,
      // 結束頁數
      // ProductsID: [],
      // ProductsID: 顯示的產品
      // pageID: '',
      // pageID: 沒用到拿來觀察是否取到

    }
  },

  mounted: function () {
    // 取得本地端user的id
    let user = JSON.parse(localStorage.getItem('user'));
    this.user_id = user.id


    // axios取得訂單資料
    axios.get(API_URL + 'getOrderProductsUser/' + this.user_id)
      .then((res) => {
        this.ordersTemp = res.data
        console.log(this.orders)
      })
      .catch((err) => {
        console.log(err)
      })

      this.TempPage = 1

  },

  methods: {
    pageChange(b) {
      this.TempPage = b
      this.pageStart = (this.TempPage - 1) * this.pageLimit
      this.pageEnd = this.pageStart + this.pageLimit
    },

    judgmentPayment() {
      if (this.selectOrdstate == '已付款') {
        return true
      } else if (this.selectOrdstate == '未付款') {
        return false
      }
    },

    orderPay(id) {
      // 將訂單寫入LoclaStorage,並且導向paypage
      let order = this.ordersTemp.find(item => item.id == id)
      localStorage.setItem('OrderData', JSON.stringify(order))
      this.$router.push('/paypage')
    }

    // 202212907003043
  },

  computed: {//
    // orders的createdAt取得年月日
    orders() {
      // 判斷select有值,執行分割日期字串與頁數統計,回傳select的查詢結果 


      if (this.select != '' || this.selectOrdstate != '') {
        this.ordersTemp.forEach((item) => {
          // forEach:陣列迴圈
          item.createdAt = item.createdAt.split('T')[0]
          // split:分割字串
        })
        return this.ordersTemp.filter
          (searchResult => searchResult.ord_number.includes(this.select) && searchResult.ord_state.includes(this.selectOrdstate))
          .slice(this.pageStart, this.pageEnd);
      } else {
        this.ordersTemp.forEach((item) => {
          // forEach:陣列迴圈
          item.createdAt = item.createdAt.split('T')[0]
          // split:分割字串
        })
        return this.ordersTemp.slice(this.pageStart, this.pageEnd);

      }

      

      // this.ordersTemp.forEach((item) => {
      //   // forEach:陣列迴圈
      //   item.createdAt = item.createdAt.split('T')[0]
      //   // split:分割字串
      // })
      // return this.ordersTemp.filter
      //   (searchResult => searchResult.ord_number.includes(this.select));


    },


    ordersPageTemp() {
      // 取得ordersTemp資料,搜尋select與selectOrdstate的值,回傳結果
      return this.ordersTemp.filter
        (searchResult => searchResult.ord_number.includes(this.select) && searchResult.ord_state.includes(this.selectOrdstate))
    },

    // 計算orders總頁數
    page() {

      if (this.select != '' || this.selectOrdstate != '') {
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



    pages() {
      if (this.select == '' || this.selectOrdstate == '') {
        // titleSearch: 搜尋的標題有變動就會觸發
        return Math.ceil(this.ordersPageTemp.length / this.pageLimit)
        // 計算頁數 ordersTemp

      } else {
        return Math.ceil(this.ordersPageTemp.length / this.pageLimit)
        // 計算頁數 orders
      }
    },


  },

}

</script>