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
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input v-model="scope.row.productName" placeholder="请输入商品名称"></el-input>
              <el-button type="warning" icon='el-icon-refresh' size='small' @click.native="edit('cancel', scope.row)">取消</el-button>
              <el-button type="success" icon='el-icon-check' size='small' @click.native="edit('compalte', scope.row)">确认</el-button>
            </template>
            <span v-else>{{scope.row.productName}}</span>
          </template>
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
            <el-button type="success" size="small" icon='el-icon-edit' @click.native='see(scope.row.productName)'>查看</el-button>
            <el-button type="primary" size="small" @click.native='scope.row.edit = !scope.row.edit; backProductName=scope.row.productName' v-if="!scope.row.edit">编辑</el-button>
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
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <h3>{{isSeeProductName}}</h3>
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getProductList } from '@/utils/api.js'
export default {
  data () {
    return {
      productList: [], // 商品列表
      total: 0, // 数据条目
      page: 1, // 当前页
      pageSize: 20, // 每页条目
      loading: true, // 是否正在加载
      productCode: '',
      isGroup: false,
      dialogTableVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      isSeeProductName: '',
      backProductName: ''
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
        res.data.forEach(item => {
          item.edit = false
        })
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
    },
    see (productName) {
      this.isSeeProductName = productName
      this.dialogTableVisible = true
    },
    edit (status, row) {
      row.edit = false
      if (status === 'cancel') {
        row.productName = this.backProductName
      }
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
