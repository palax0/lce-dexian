<template>
  <div class="login-container" @keydown.enter.prevent>
    <div class="login-box">
      <div class="login-box-left"></div>
      <div class="login-box-right">
        <h3 class="login-box-title">得闲管理系统</h3>
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules">
          <div class="choose-login-type">
            <button @click.prevent="loginType0" :class="{'login-type-active': !loginTypeFlag}">商家</button>
            <button @click.prevent="loginType1" :class="{'login-type-active': loginTypeFlag}">管理员</button>
          </div>
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" show-password placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-button @click.prevent="login">登录</el-button>
        </el-form>
        <!-- 下面是登录信息动画盒 -->
        <transition name="message">
          <div class="login-message" v-show="loginMessageShow">
            <div><i class="el-icon-warning"></i> {{loginMessage}}</div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      // 登录表单的数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      // 表单验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      loginTypeFlag: false,
      // 动画参数
      loginMessageShow: false,
      loginMessage: ''
    }
  },
  methods: {
    loginType0() {
      this.loginTypeFlag = false;
    },
    loginType1() {
      this.loginTypeFlag = true;
    },
    login() {
      // 防止用户狂点
      if (this.loginMessageShow)
        return;
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        const { username:account, password } = {...this.loginForm};
        const requestObj = { account, password, role: this.loginTypeFlag ? 1 : 0 };
        const { data: result } = await this.$http.post('/party/web/login/in', requestObj);
        if (result.code === '0') {
          window.sessionStorage.setItem('token', result.data.token)

          // ！！这样存数据不知道好不好 
          window.sessionStorage.setItem('userId', result.data.id)
          window.sessionStorage.setItem('userType', requestObj.role)
          window.sessionStorage.setItem('username', requestObj.account)

          this.$message.success('登陆成功');
          // 登陆成功用自己写的位置不好
          // this.showMessage('登陆成功');
          console.log(requestObj);
          if (requestObj.role === 0) // 商家
            this.$router.push('/user/home/' + result.data.id);
          else // 管理员
            this.$router.push('/admin/home/' + result.data.id);
        }
        else {
          // this.$message.error(result.msg);       
          this.showMessage(result.msg)
        }
      })
    },
    // 登录状态动画
    showMessage(msg) {
      this.loginMessageShow = true;
      this.loginMessage = msg;
      setTimeout(() => {this.loginMessageShow = false}, 3000);
    }
  }
}
</script>

<style lang="scss" scoped>
  $dexian-color: rgb(255, 142, 0);
  $easy-shadow: 0px 0px 15px 1px #ccc;

  // 背景
  .login-container {
    height: 100%;
    background-color: rgb(255, 234, 205);
  }
  // 登录盒
  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 1280px;
    height: 620px;

    box-shadow: $easy-shadow;
  }
  // 盒左边（图片部分）
  .login-box-left {
    display: inline-block;
    width: 710px;
    height: 100%;
    background-color: pink;
  }
  // 盒右边（登录部分）
  .login-box-right {
    position: relative;
    display: inline-block;
    width: 570px;
    height: 100%;
    background-color: #fff;
    vertical-align: top; /* 不加的话right的位置会很诡异 */

    > * {
      width: 315px;
      margin: auto;
      text-align: center;
    }
    // 标题
    .login-box-title {
      color: $dexian-color;
      font-weight: 500;
      font-size: 28px;
      margin: 40px auto 100px;
    }
    // 表单内
    .el-form {
      // 选择登录类型部分
      .choose-login-type {
        position: relative;
        margin-bottom: 40px;
        transition: left 0.2s;
        // 切换按钮
        button {
          width: 30%;
          background-color: #fff;
          border: 0;
          padding: 5px 0;
          margin: 0 20px;
          font-size: 18px;
          cursor: pointer;
          transition: color 0.2s, transform 0.3s;
          &:hover {
            transform: translateY(-5px);
          }
        }
        // 给动画用的属性
        .login-type-active {
          color: $dexian-color;
        }
        // 动画用伪元素
        // &::after {
        //   content: '';
        //   position: absolute;
        //   width: 20px;
        //   height: 2px;
        //   background-color: $dexian-color;
        // }
      }
      // 账号密码输入框
      .el-input {
        width: 90%;
        margin: 10px 0;
      }
      // 确认按钮
      .el-button {
        width: 90%;
        height: 45px;
        background: $dexian-color;
        margin-top: 40px;
        color: #fff;
        font-weight: 700;
        transition: background-color 0.3s;
        &:hover {
          background-color: lighten($dexian-color, 8%);
        }
      }
    }

    // 以下均为登录状态动画
    .login-message {
      opacity: 1;
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translateX(-50%);
      div {
        display: inline-block;
        height: 30px;
        background-color: #fff;
        border: 1px solid #ececec;
        padding: 5px 20px;
        color: $dexian-color;
        text-align: center;
        line-height: 30px;
        border-radius: 5px;
        box-shadow: 0px 0px 15px 0px #eee;
      }
    }
    .message-enter,
    .message-leave-to {
      transform: translateX(-50%) translateY(20px);
      opacity: 0;
    }
    .message-enter-active,
    .message-leave-active {
      transition: all ease 0.8s;
    }
  }
</style>