<template>
  <div class="index">
    <div class="search-box">
      <el-input placeholder="商品编码" v-model="productCode" clearable>
      </el-input>
      <el-checkbox v-model="isGroup" label="是否拼团商品团购" border></el-checkbox>
      <el-button type="primary" icon="el-icon-search" @click="this.getList">查询</el-button>
    </div>
    <template>
      <el-table
        v-loading="loading"
        :data="productList"
        stripe
        border
        style="width: 100%;"
        max-height="750">
        <el-table-column
          prop="id"
          label="商品ID"
          width="180"
          text-algin='center'>
        </el-table-column>
        <el-table-column
          prop="productCode"
          label="商品编码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="商品名称"
          width="400">
        </el-table-column>
        <el-table-column
          prop="categoryName"
          label="商品分类"
          width="180">
        </el-table-column>
        <el-table-column
          prop="groupName"
          label="商品款式"
          width="180">
        </el-table-column>
        <el-table-column
          prop="saleStatus"
          label="状态"
          width="180">
          <template slot-scope="scope">
            <span>{{scope.row.saleStatus === 'InStock' ? '下架' : '上架'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="240">
          <template slot-scope="scope" v-if="scope.row.createTime">
            <span>{{scope.row.createTime | moment('YYYY-MM-DD HH:mm')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="saleTime"
          label="发布时间"
          width="240">
          <template slot-scope="scope" v-if="scope.row.saleTime">
              <span>{{scope.row.saleTime | moment('YYYY-MM-DD HH:mm')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="240">
           <template slot-scope="scope">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getProductList } from '@/utils/api.js'
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      productList: [],
      total: 0,
      page: 1,
      pageSize: 20,
      loading: true,
      productCode: '',
      isGroup: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.loading = true
      const query = {
        start: (this.page - 1) * this.pageSize,
        limit: this.pageSize,
        q: '',
        isSpecial: false,
        productCode: this.productCode,
        isGroup: this.isGroup,
        preSaleDate: false,
        vipPrice: 0
      }
      getProductList(query).then(res => {
        this.loading = false
        this.productList = res.data
        this.total = res.iTotalDisplayRecords
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getList()
    }
  }
}
</script>

<style lang='scss' scoped>
  .index {
    .search-box,
    .block {
      padding: 10px 0;
    }
    .el-input {
      width: 200px;
    }
  }
</style>
