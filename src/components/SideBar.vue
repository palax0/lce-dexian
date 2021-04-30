<template>
  <div id="side-bar">
    <ul
      class="side-bar-part"
      v-for="(array, key, partIndex) in listData"
      :key="key"
    >
      <h3 class="part-title">
        <i :class="listIconData[partIndex]"></i>
        {{key}}
      </h3>
      <li 
        class="part-option"
        :class="{'part-option-selected': !(partIndex - sideBarIndex[0]) && !(index - sideBarIndex[1])}"
        v-for="(item, index) in array"
        :key="item"
        @click="getSideBarOptionIndex(partIndex, index)"
      >
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  props: {
    listData: {type: Object},
    listIconData: {type: Array}
  },
  data() {
    return {
      sideBarIndex: [0, 0]
    }
  },
  methods: {
    getSideBarOptionIndex(...allIndex) {
      this.sideBarIndex = allIndex
      this.$router.push({'path': '/admin/home/' + allIndex[0] + '/' + allIndex[1]}).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
  $dexian-color: rgb(255, 142, 0);
  #side-bar {
    display: inline-block;
    width: 160px;
    padding-left: 70px;
    background-color: #fff;
    .side-bar-part {
      .part-title {
        position: relative;
        margin-top: 50px;
        padding: 10px 0px 10px 20px;
        font-size: 16px;
        > i {
          position: absolute;
          top: 5px;
          left: -30px;
          color: $dexian-color;
          font-size: 36px;
        }
      }
      .part-option {
        margin-top: 5px;
        padding: 10px 0px 10px 20px;
        border-radius: 40px 0px 0px 40px;
        cursor: pointer;
        transition: all 0.3s, color 0.1s;
      }
      .part-option-selected {
        background-color: $dexian-color;
        color: #fff;
        transform: translateX(-5px);
      }
    }
  }
</style>